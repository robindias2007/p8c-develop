class Form < ActiveRecord::Base
validates :description, length: { maximum: 200 }
validates :title, length: { maximum: 50 }          
end
