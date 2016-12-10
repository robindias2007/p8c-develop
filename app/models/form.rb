require 'uri'
require 'net/http'

class Form < ActiveRecord::Base
belongs_to :user


validates :description, length: { maximum: 200 }
validates :title, :title1, :title2, :title3, :titel4, :title5 , length: { maximum: 50 }



before_validation :smart_add_url_protocol 



protected

def smart_add_url_protocol
  unless self.url1[/\Ahttp:\/\//] || self.url1[/\Ahttps:\/\//]
    self.url1 = "http://#{self.url1}"
  end
end

end