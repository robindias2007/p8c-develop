require 'uri'
require 'net/http'

class Form < ActiveRecord::Base

acts_as_votable
acts_as_taggable
acts_as_punchable

belongs_to :user
belongs_to :category
has_many :user_form_bookmarks

scope :published, -> {
  where(:publish => true)
}

scope :drafts, -> {
  where(:publish => false)
}

scope :saved, -> {
  where(:bookmark => true)
}
# validates :description, length: { maximum: 200 }
# validates :title, :title1, :title2, :title3, :titel4, :title5 , length: { maximum: 50 }


# before_validation :smart_add_url_protocol 
  
  def self.trending
    Form.published.sample(3)
  end

  def self.most_recent
    Form.order(created_at: :desc).published.limit(3)
  end
  
  def self.most_liked
    Form.where("cached_votes_total > ?", 0).order(cached_votes_total: :desc).published.limit(3)
  end
  
  def self.most_viewed
    Form.order(view_count: :desc).published.limit(3)
  end


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