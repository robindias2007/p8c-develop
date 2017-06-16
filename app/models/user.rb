class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  acts_as_voter
  acts_as_tagger

  acts_as_followable
  acts_as_follower

  act_as_mentionee

  has_many :forms
  has_many :authorizations

  validates_presence_of :email

  validates_uniqueness_of :username, case_sensitive: false, allow_blank: true
  validates_presence_of :username, :author, if: :profile_completed?

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable, :confirmable    #this is used for user sign in and sign out
  #to understand devise we have to refer devise on https://github.com/plataformatec/devise

  has_attached_file :avatar, styles: {medium: "300x300", thumb: "100x100"}
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

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

  def self.from_omniauth(auth, current_user)
    authorization = Authorization.where(:provider => auth.provider, :uid => auth.uid.to_s, :token => auth.credentials.token, :secret => auth.credentials.secret).first_or_initialize
    if authorization.user.blank?
      user = current_user || User.where('email = ?', auth["info"]["email"]).first
      if user.blank?
        user = User.new
        user.password = Devise.friendly_token[0, 10]
        user.email = auth.info.email
        user.social_image_url = auth.info.image
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
