class UserFormLink < ActiveRecord::Base
	belongs_to :user
	belongs_to :form
end
