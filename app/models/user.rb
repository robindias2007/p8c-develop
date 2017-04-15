class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  acts_as_voter 
  acts_as_tagger
  
  has_many :forms
  
  
 validates_uniqueness_of :username, :email       #username and email should be unique
 validates :author, :presence => {:message => "Author can't be blank" }  #author  cannot be blank


 devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable    #this is used for user sign in and sign out
                                                                  #to understand devise we have to refer devise on https://github.com/plataformatec/devise

 has_attached_file :avatar, styles: { medium: "300x300", thumb: "100x100" }
 validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

end
