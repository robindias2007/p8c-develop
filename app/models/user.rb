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

  # validates_uniqueness_of :username, :email       #username and email should be unique
 # validates :author, :presence => {:message => "Author can't be blank" }  #author  cannot be blank

 devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable    #this is used for user sign in and sign out
                                                                  #to understand devise we have to refer devise on https://github.com/plataformatec/devise

 has_attached_file :avatar, styles: { medium: "300x300", thumb: "100x100" }
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


  def self.from_omniauth(auth, current_user)
    authorization = Authorization.where(:provider => auth.provider, :uid => auth.uid.to_s, :token => auth.credentials.token, :secret => auth.credentials.secret).first_or_initialize
    if authorization.user.blank?
      user = current_user || User.where('email = ?', auth["info"]["email"]).first
      if user.blank?
        user = User.new
        user.password = Devise.friendly_token[0,10]
        user.email = auth.info.email
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
