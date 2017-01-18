class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  acts_as_voter 
  has_many :forms
  
  
 validates_uniqueness_of :username, :email
 validates :author, :presence => {:message => "Author can't be blank" }
 # validates_confirmation_of :email, :password



  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
