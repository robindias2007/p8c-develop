require 'uri'
require 'net/http'

class Form < ActiveRecord::Base

acts_as_votable
acts_as_taggable
acts_as_taggable 
acts_as_punchable
act_as_mentioner

belongs_to :user


# validates :description, length: { maximum: 200 }
# validates :title, :title1, :title2, :title3, :titel4, :title5 , length: { maximum: 50 }


# before_validation :smart_add_url_protocol 


  def save_social_image
    str = ApplicationController.new.render_to_string('forms/social_image', locals: {form: self}, layout: false)

    kit = IMGKit.new(str, :quality => 30, width: 1000, height: 500)

    # Please make sure to check 'forms/social_image.html.erb' file if any of the below stylesheets are updated
    kit.stylesheets << "#{Rails.root}/public#{ActionController::Base.helpers.asset_url('application.css')}"
    kit.stylesheets << "#{Rails.root}/public#{ActionController::Base.helpers.asset_url('material_icons.css')}"
    kit.stylesheets << "#{Rails.root}/public#{ActionController::Base.helpers.asset_url('form_social_image.css')}"

    kit.to_file(Rails.root + 'public/forms_social_images/' + "form_#{id}.png")
  end

# protected

# def smart_add_url_protocol
#   unless self.url1[/\Ahttp:\/\//] || self.url1[/\Ahttps:\/\//]
#     self.url1 = "http://#{self.url1}"
#   end
# end

end