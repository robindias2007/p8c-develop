class Form < ActiveRecord::Base
validates :description, length: { maximum: 300 }

end
