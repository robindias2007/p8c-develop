class Form < ActiveRecord::Base
validates :description, length: { maximum: 200 }
validates :title, :title1, :title2, :title3, :titel4, :title5 , length: { maximum: 50 }

end
