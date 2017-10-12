require 'uri'
require 'net/http'

class Form < ActiveRecord::Base

acts_as_votable
acts_as_taggable
acts_as_punchable

belongs_to :user
belongs_to :category
has_many :user_form_bookmarks
has_many :votes
has_many :user_form_links



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

  def slug_url
    "#{self.slug}-#{self.secure_id}"
  end
  

  def self.staff_pick()
    f = Form.joins(:user).published.where(staff_picks:true).limit(3)
    return f
  end

  def self.trending()
    Form.published.limit(3)
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

  def get_share_count
    current_date = Time.now.to_date.to_s
    from_date = self.created_at.to_date.to_s
    url = 'https://mixpanel.com/api/2.0/segmentation/?event=Board Interaction&type=general&where=(properties["Board id"] == "' + self.secure_id.to_s + '") and ((properties["Appreciation Action"] == "Share - Facebook") or (properties["Appreciation Action"] == "Share - Copy Link") or (properties["Appreciation Action"] == "Share - Twitter"))&from_date=2017-10-03&to_date='+current_date+'&unit=day'
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    request = Net::HTTP::Get.new(uri.request_uri)
    request.basic_auth(ENV["MIXPANEL_KEY"], "")
    
    response = http.request(request)
    data = JSON.parse(response.body)    
    return data["data"]["values"]["Board Interaction"].values.inject :+
  end

  def get_clicks


    #url = 'https://data.mixpanel.com/api/2.0/export/?from_date=2017-10-03&to_date=2017-10-06&where=(properties["Board id"] == "' + self.secure_id.to_s + '")&event=["Link 1 Clicked", "Link 2 Clicked", "Link 3 Clicked", "Link 4 Clicked", "Link 5 Clicked"]'
    
    #uri = URI.parse(url)

    #http = Net::HTTP.new(uri.host, uri.port)
    #http.use_ssl = true
    #http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    #request = Net::HTTP::Get.new(uri.request_uri)
    #request.basic_auth("81506d6ba6779c730f439e1ffc4fd1aa", "")
    
    #response = http.request(request)
    #data = response.body
    #data_array = (data.split("\n").map{|a| JSON.parse(a)})
    #event_and_users = data_array.map{|a| {event: a["event"], user: a["properties"]["User"]}}.uniq
    #click_events_by_users = event_and_users.group_by{|h| h[:user]}.each{|_, v| v.map!{|h| h[:event]}}
    #return click_events_by_users
  end

  def get_this_board_completion_rate
    all_user_form_links_for_board = self.user_form_links
    total_users = all_user_form_links_for_board.length
    if total_users == 0
      return 0.0
    else
      board_completion_rate = (all_user_form_links_for_board.pluck(:progress).inject :+)/total_users
      return board_completion_rate.round(2)
    end
  end

  def get_interaction_count
    current_date = Time.now.to_date.to_s
    from_date = self.created_at.to_date.to_s
    url = 'https://mixpanel.com/api/2.0/segmentation/?event=Board Interaction&type=general&where=(properties["Board id"] == "' + self.secure_id.to_s + '")&from_date=2017-10-03&to_date='+current_date+'&unit=day'

    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    request = Net::HTTP::Get.new(uri.request_uri)
    request.basic_auth(ENV["MIXPANEL_KEY"], "")
    
    response = http.request(request)
    data = JSON.parse(response.body)    
    return data["data"]["values"]["Board Interaction"].values.inject :+
  end

# protected

# def smart_add_url_protocol
#   unless self.url1[/\Ahttp:\/\//] || self.url1[/\Ahttps:\/\//]
#     self.url1 = "http://#{self.url1}"
#   end
# end

end