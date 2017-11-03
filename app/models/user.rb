class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  acts_as_voter
  acts_as_tagger

  acts_as_followable
  acts_as_follower

  
  has_many :forms
  has_many :authorizations
  has_many :categories
  has_many :user_form_bookmarks
  has_many :bookmarks, through: :user_form_bookmarks, source: :form

  validates_presence_of :email

  validates_uniqueness_of :username, case_sensitive: false, allow_blank: true
  validates_presence_of :username, :author, :name

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable, :confirmable    #this is used for user sign in and sign out
  #to understand devise we have to refer devise on https://github.com/plataformatec/devise

  has_attached_file :avatar, styles: {medium: "300x300", thumb: "100x100"}, 
  		:url => ":s3_domain_url",
        :path => "/:class/:attachment/:id_partition/:style/:filename",
        :s3_host_name => "s3.us-east-2.amazonaws.com"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/
  serialize :categories_ids, Array

  def provider
    provider = self.authorizations.pluck(:provider).first
    if provider == nil
      return "email"
    elsif provider == 'google_oauth2'
      return "google"
    elsif provider == 'facebook'
      return "facebook"
    elsif provider == 'twitter'
      return "twitter"
    end
  end

  def update_without_password(params, *options)

    if params[:password].blank?
      params.delete(:password)
      params.delete(:password_confirmation) if params[:password_confirmation].blank?
    end

    result = update_attributes(params, *options)
    clean_up_passwords
    result
  end

  def profile_completed?
    self.profile_completed
  end

  def photo_url(size = nil)
    self.avatar.present? ? self.avatar.url((size.to_sym if size.present?)) : (self.social_image_url.present? ? self.social_image_url : "")
  end

  def self.username_from_oauth(auth)
    if auth.provider == "twitter"
      auth.info.nickname
    else
      first_name = auth.info.first_name
      last_name = auth.info.last_name

      if first_name && last_name
        "#{first_name[0].downcase}#{last_name.downcase}"
      else
        first_name ? first_name.downcase : last_name.try(:downcase)
      end
    end
  end

  def self.large_social_image_url(auth)
    if auth.provider == 'twitter'
      auth.info.image.gsub('_normal.', '_reasonably_small.')
    elsif auth.provider == 'facebook'
      "#{auth.info.image}?type:large"
    else
      auth.info.image
    end
  end

  def self.from_omniauth(auth, current_user)
    authorization = Authorization.where(:provider => auth.provider, :uid => auth.uid.to_s, :token => auth.credentials.token, :secret => auth.credentials.secret).first_or_initialize
    if authorization.user.blank?
      user = current_user || User.where('email = ?', auth["info"]["email"]).first
      if user.blank?
        user = User.new
        user.password = Devise.friendly_token[0, 10]
        user.email = auth.info.email
        user.avatar = large_social_image_url(auth)
        user.name = auth.info.name
        user.username = username_from_oauth(auth)
        user.author = auth.info.description
        user.confirm # Confirm the email

        if auth.provider == "twitter"
          user.save(:validate => false)
        else
          user.save
        end
      end
      authorization.user_id = user.id
      authorization.save
    end
    authorization.user
  end
end
