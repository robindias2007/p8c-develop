require 'uri'
require 'net/http'

class Form < ActiveRecord::Base

acts_as_votable
acts_as_taggable
acts_as_punchable

belongs_to :user
belongs_to :category
has_many :user_form_bookmarks

has_attached_file :photo,
        :url => ":s3_domain_url",
        :path => "/:class/:attachment/:id_partition/:style/:filename",
        :s3_host_name => "s3.us-east-2.amazonaws.com"
validates_attachment_content_type :photo, content_type: /\Aimage\/.*\Z/

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
  
  def self.trending(ids)
    Form.where.not(id: ids).published.limit(3)
  end

  def self.most_recent(ids)
    Form.where.not(id: ids).order(created_at: :desc).published.limit(3)
  end
  
  def self.most_liked(ids)
    Form.where.not(id: ids).where("cached_votes_total > ?", 0).order(cached_votes_total: :desc).published.limit(3)
  end
  
  def self.most_viewed(ids)
    Form.where.not(id: ids).order(view_count: :desc).published.limit(3)
  end

  def self.most_saved(ids)
    Form.where.not(id: ids).order(saved_count: :desc).published.limit(3)
  end

  def self.most_shared(ids)
    Form.where.not(id: ids).order(share_count: :desc).published.limit(3)
  end

  # def self.most_shared
  #   Form.order(share_count: :desc).published.limit(3)
  # end

  # def self.most_saved
  #   Form.order(saved_count: :desc).published.limit(3)
  # end


  def save_social_image
    str = ApplicationController.new.render_to_string('forms/social_image', locals: {form: self}, layout: false)

    kit = IMGKit.new(str, :quality => 30, width: 1000, height: 450)
    kit.javascripts << "#{Rails.root}/public#{ActionController::Base.helpers.asset_url('application.js')}"
    # Please make sure to check 'forms/social_image.html.erb' file if any of the below stylesheets are updated
    kit.stylesheets << "#{Rails.root}/public#{ActionController::Base.helpers.asset_url('application.css')}"
    kit.stylesheets << "#{Rails.root}/public#{ActionController::Base.helpers.asset_url('material_icons.css')}"
    kit.stylesheets << "#{Rails.root}/public#{ActionController::Base.helpers.asset_url('form_social_image.css')}"
    img = kit.to_img(:png)
    file = File.new("#{Rails.root}/public/forms_social_images/template_#{self.id.to_s}.png", 'w', :encoding => 'ascii-8bit')
    file.write(img)
    self.photo = file
    self.save
    File.delete("#{Rails.root}/public/forms_social_images/template_#{self.id.to_s}.png")
  end

# protected

# def smart_add_url_protocol
#   unless self.url1[/\Ahttp:\/\//] || self.url1[/\Ahttps:\/\//]
#     self.url1 = "http://#{self.url1}"
#   end
# end

end