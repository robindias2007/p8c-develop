class Category < ActiveRecord::Base
  belongs_to :form
  belongs_to :user
end
