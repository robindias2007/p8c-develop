class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
 
  has_many :forms
  
  
 validates_uniqueness_of :username, :email
 validates :author, :presence => {:message => "Author can't be blank" }

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
