class FormsController < ApplicationController
  before_action :set_form, only: [:edit, :update, :destroy, :like, :unlike, :book, :booknot]
  before_action :authenticate_user!, :only => [:like]
  respond_to :js, :json, :html
  before_filter :authenticate_admin, :only => [:index, :mixpanel_data]
  
  # GET /forms
  # GET /forms.json
  def index #index.html.erb
    @forms = Form.order(created_at: :desc).all
    #index is method where you get a list of all the forms avaliable in your database. In this they are showing all the published forms. We have set the value of publish to be true so its shows all the published forms
      @form = Form.find(params[:format]) rescue nil
      if params[:commit] == 'Publish'         # it checks if the user has clicked publish the it updates the form with publish
        @form.record_timestamps=false
        @form.update_attributes(form_params)      #publish becomes true
        redirect_to :back
      end
    end

  def get_boards(forms)
    forms.map {|f| {secure_id: f.secure_id, form_url: "#{root_url}#{f.user.username}/#{f.slug_url}", slug_url: f.slug_url, id: f.id, title: f.title,liked: current_user.get_up_voted(Form).pluck(:id).include?(f.id), bookmark: current_user.bookmarks.pluck(:id).include?(f.id) ,sub_header: f.sub_header, dsc: f.description, likes: f.get_likes.size ,updated_at: f.updated_at ,user: f.user, user_image: (f.user.avatar_file_name == nil ? nil : f.user.avatar.url) ,links: 
      [{url: f.url1, title: f.title1, dsc: f.description1, image: f.image1, note: f.note1, host: f.url1.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first },
      {url: f.url2, title: f.title2, dsc: f.description2, image: f.image2, note: f.note2, host: f.url2.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first },
      {url: f.url3, title: f.title3, dsc: f.description3, image: f.image3, note: f.note3, host: f.url3.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first },
      {url: f.url4, title: f.titel4, dsc: f.description4, image: f.image4, note: f.note4, host: f.url4.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first },
      {url: f.url5, title: f.title5, dsc: f.description5, image: f.image5, note: f.note5, host: f.url5.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first }]}}
  end
  
  # GET /forms/1
  # GET /forms/1.json
  def show
    secure_id = params[:slug_url].split("-").last
    @form = Form.find_by_secure_id(secure_id)
    if @form.present?
      @form.punch(request)
      @forms = Form.where(id: @form.id)
      @keys = ENV['FACEBOOK_KEY'].to_json
      if current_user
        #user_id value is current_user id shows the form created by a particular user. so if i click on robins form it shows my board.
        @boards = get_boards(@forms)    
      else
        @boards = @forms.map {|f| {secure_id: f.secure_id, form_url: "#{root_url}#{f.user.username}/#{f.slug_url}", slug_url: f.slug_url, id: f.id, title: f.title,sub_header: f.sub_header,dsc: f.description, likes: f.get_likes.size ,updated_at: f.updated_at ,user: f.user, user_image: (f.user.avatar_file_name == nil ? nil : f.user.avatar.url) ,links: 
        [{url: f.url1, title: f.title1, dsc: f.description1, image: f.image1, note: f.note1 },
        {url: f.url2, title: f.title2, dsc: f.description2, image: f.image2, note: f.note2 },
        {url: f.url3, title: f.title3, dsc: f.description3, image: f.image3, note: f.note3 },
        {url: f.url4, title: f.titel4, dsc: f.description4, image: f.image4, note: f.note4 },
        {url: f.url5, title: f.title5, dsc: f.description5, image: f.image5, note: f.note5 }]}}
      end   
      @pub_boards = @boards.to_json  
    else
      redirect_to "/"
    end
    
  end

  # GET /forms/new
  def new
    @form = Form.new 
    #this is new method. where you can create a new form. It is basically a form.
  end

  # GET /forms/1/edit
  def edit
    @edit_tag = true;
  end

  # POST /forms
  # POST /forms.json

  def generate_slug(form)
    @slug = "#{form.title.parameterize}"
    return @slug
  end

  def generate_secure_id(form)
    loop do
      @secure_id = SecureRandom.hex(6)
      break unless Form.where(secure_id: @secure_id).exists?
    end
    return @secure_id
  end

  def create
    @form = Form.new(form_params)  #Form.new shows the new form to the user
    if @form.save                  # if form.save means if it clicked on publish or draft
      
      @form.slug = generate_slug(@form)
      @form.secure_id = generate_secure_id(@form)
      @form.update_attributes(slug:@form.slug, secure_id:@form.secure_id)

      meta = MetaInspector.new(@form.url1, :allow_non_html_content => true) rescue nil #meta is variable where you input the url in the form and stores it. MetaInspector is a predefined class taken from metainspector gem which fetches all the url information
        if @form.url1.empty?
          @form.update_attributes(content:"", title1:"", image1:"", description1:"") rescue nil
        else
          @form.update_attributes(content:meta.content_type, title1:meta.title, image1:meta.images.best, description1:meta.description, tag1:meta.meta_tags["name"]["keywords"]) rescue nil
            if @form.content == "application/pdf" 
              @form.update_attributes(title1:"#{@form.content}")
            end
        end


      meta1 = MetaInspector.new(@form.url2, :allow_non_html_content => true)   rescue nil
      if @form.url2.empty?
          @form.update_attributes(content2:"", title2:"", image2:"", description2:"") rescue nil
        else
          @form.update_attributes(content2:meta1.content_type, title2:meta1.title, image2:meta1.images.best, description2:meta1.description, tag2:meta1.meta_tags["name"]["keywords"]) rescue nil
            if @form.content2 == "application/pdf" 
              @form.update_attributes(title2:"#{@form.content2}")
            end
        end     

      meta2 = MetaInspector.new(@form.url3, :allow_non_html_content => true) rescue nil
      if @form.url3.empty?
          @form.update_attributes(content3:"", title3:"", image3:"", description3:"") rescue nil
        else
          @form.update_attributes(content3:meta2.content_type, title3:meta2.title, image3:meta2.images.best, description3:meta2.description, tag3:meta2.meta_tags["name"]["keywords"]) rescue nil
            if @form.content3 == "application/pdf" 
              @form.update_attributes(title3:"#{@form.content3}")
            end
        end
      
      meta3 = MetaInspector.new(@form.url4, :allow_non_html_content => true)   rescue nil
      if @form.url4.empty?
          @form.update_attributes(content4:"", titel4:"", image4:"", description4:"") rescue nil
        else
          @form.update_attributes(content4:meta3.content_type, titel4:meta3.title, image4:meta3.images.best, description4:meta3.description, tag4:meta3.meta_tags["name"]["keywords"]) rescue nil
            if @form.content4 == "application/pdf" 
              @form.update_attributes(titel4:"#{@form.content4}")
            end
        end

      meta4 = MetaInspector.new(@form.url5, :allow_non_html_content => true)   rescue nil
      if @form.url5.empty?
          @form.update_attributes(content5:"", title5:"", image5:"", description5:"") rescue nil
        else
          @form.update_attributes(content5:meta4.content_type, title5:meta4.title, image5:meta4.images.best, description5:meta4.description, tag5:meta4.meta_tags["name"]["keywords"]) rescue nil
            if @form.content5 == "application/pdf" 
              @form.update_attributes(title5:"#{@form.content5}")
            end
        end
      # @form.update(readtime:meta.meta_tags + meta1.meta_tags + meta2.meta_tags + meta3.meta_tags + meta4.meta_tags) rescue nil 
        tags = @form.tag1.to_s.tr('[""]', '').split(',').map(&:to_s) + @form.tag2.to_s.tr('[""]', '').split(',').map(&:to_s) + @form.tag3.to_s.tr('[""]', '').split(',').map(&:to_s) + @form.tag4.to_s.tr('[""]', '').split(',').map(&:to_s) + @form.tag5.to_s.tr('[""]', '').split(',').map(&:to_s)     
        @form.update(tag_list: tags.join(',') )
        
        @form.update(admins_date: @form.created_at)
        if params[:unspecified]
          @form.update_attributes(unspecified:true)
        elsif params[:easy] 
         @form.update_attributes(easy:true)
        elsif params[:involved] 
         @form.update_attributes(involved:true)
        elsif  
         @form.update_attributes(advanced:true) 
        else
        end
      @form.save_social_image # Save social image
      
      if params[:commit] == 'Publish'         # it checks if the user has clicked publish the it updates the form with publish
        @form.update(:publish => "true")       #publish becomes true
        redirect_to "/#{current_user.username}/published" , notice: 'Form was successfully created.' #then it redirects to static_pages/published and stores the form there. 

      else params[:commit] == 'Save as Draft'   # it checks if the user has clicked drafs then publish becomes false so it updates it with false
        @form.update(:publish => "false")
        redirect_to "/#{current_user.username}/drafts" , notice: 'Form is successfully saved as draft'  #then it redirects to static_pages/drafts and stores the form there. 
      end
    
  
  
    else
      format.html { render :new }
      format.json { render json: @form.errors, status: :unprocessable_entity }
    end
  end
  
    
   

  # PATCH/PUT /forms/1
  # PATCH/PUT /forms/1.json
  def update
    
    # When you draft your board and you want to publish that draft you edit and publish it here. So the form is updated or edited here using metainspector again with the update function
    if @form.update(form_params)  

      @form.slug = generate_slug(@form)
      @form.secure_id = generate_secure_id(@form)
      @form.update_attributes(slug:@form.slug, secure_id:@form.secure_id)

      meta = MetaInspector.new(@form.url1, :allow_non_html_content => true) rescue nil #meta is variable where you input the url in the form and stores it. MetaInspector is a predefined class taken from metainspector gem which fetches all the url information
        if @form.url1.empty?
          @form.update_attributes(content:"", title1:"", image1:"", description1:"") rescue nil
        else
          @form.update_attributes(content:meta.content_type, title1:meta.title, image1:meta.images.best, description1:meta.description) rescue nil
            if @form.content == "application/pdf" 
              @form.update_attributes(title1:"#{@form.content}")
            end
        end


      meta1 = MetaInspector.new(@form.url2, :allow_non_html_content => true)   rescue nil
      if @form.url2.empty?
          @form.update_attributes(content2:"", title2:"", image2:"", description2:"") rescue nil
        else
          @form.update_attributes(content2:meta1.content_type, title2:meta1.title, image2:meta1.images.best, description2:meta1.description) rescue nil
            if @form.content2 == "application/pdf" 
              @form.update_attributes(title2:"#{@form.content2}")
            end
        end     

      meta2 = MetaInspector.new(@form.url3, :allow_non_html_content => true) rescue nil
      if @form.url3.empty?
          @form.update_attributes(content3:"", title3:"", image3:"", description3:"") rescue nil
        else
          @form.update_attributes(content3:meta2.content_type, title3:meta2.title, image3:meta2.images.best, description3:meta2.description) rescue nil
            if @form.content3 == "application/pdf" 
              @form.update_attributes(title3:"#{@form.content3}")
            end
        end
      
      meta3 = MetaInspector.new(@form.url4, :allow_non_html_content => true)   rescue nil
      if @form.url4.empty?
          @form.update_attributes(content4:"", titel4:"", image4:"", description4:"") rescue nil
        else
          @form.update_attributes(content4:meta3.content_type, titel4:meta3.title, image4:meta3.images.best, description4:meta3.description) rescue nil
            if @form.content4 == "application/pdf" 
              @form.update_attributes(titel4:"#{@form.content4}")
            end
        end

      meta4 = MetaInspector.new(@form.url5, :allow_non_html_content => true)   rescue nil
      if @form.url5.empty?
          @form.update_attributes(content5:"", title5:"", image5:"", description5:"") rescue nil
        else
          @form.update_attributes(content5:meta4.content_type, title5:meta4.title, image5:meta4.images.best, description5:meta4.description) rescue nil
            if @form.content5 == "application/pdf" 
              @form.update_attributes(title5:"#{@form.content5}")
            end
        end

      # @form.update(readtime:meta.meta_tags + meta1.meta_tags + meta2.meta_tags + meta3.meta_tags + meta4.meta_tags) rescue nil 
      tags = @form.tag1.to_s.tr('[""]', '').split(',').map(&:to_s) + @form.tag2.to_s.tr('[""]', '').split(',').map(&:to_s) + @form.tag3.to_s.tr('[""]', '').split(',').map(&:to_s) + @form.tag4.to_s.tr('[""]', '').split(',').map(&:to_s) + @form.tag5.to_s.tr('[""]', '').split(',').map(&:to_s)     
      @form.update(tag_list: tags.join(',') )

      if params[:unspecified]
        @form.update_attributes(unspecified:true)
      elsif params[:easy] 
       @form.update_attributes(easy:true)
      elsif params[:involved] 
       @form.update_attributes(involved:true)
      elsif params[:advanced]  
       @form.update_attributes(advanced:true) 
      else
      end

      @form.save_social_image # Save social image

      if params[:commit] == 'Publish'
       @form.update(:publish => "true")
       redirect_to "/#{current_user.username}/published" 

      else params[:commit] == 'Save as Draft'
        @form.update(:publish => "false")
        redirect_to "/#{current_user.username}/drafts"
      end

      else  #if this gives an error it will go back to edit page

        respond_to do |format|
        format.html { render :edit }
        format.json { render json: @form.errors, status: :unprocessable_entity }
      end
    end
  end
  
  # DELETE /forms/1
  # DELETE /forms/1.json
  def destroy
    # destroy is method to delete a form.

    @form.destroy
    respond_to do |format|
      format.html { redirect_to "/#{current_user.username}/published", notice: 'Form was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def like
    @form.liked_by current_user      #liked_by is predefined function to like a form 
    respond_to do |format|
      format.html { redirect_to :back }
      format.js
    end
  end


  def unlike
   @form.unliked_by current_user
   respond_to do |format|
     format.html { redirect_to :back }
     format.js
    end
  end

  def book
    user_form = UserFormBookmark.create(user_id: current_user.id, form_id: @form.id)
    respond_to do |format|
      format.html { redirect_to :back }
      format.js
    end
  end

  def booknot
    user_form = UserFormBookmark.where(user_id: current_user.id, form_id: @form.id)
    if user_form
      user_form.first.destroy
    end
    respond_to do |format|
      format.html { redirect_to :back }
      format.js
    end
  end

  def tagss
    redirect_to root_url
    # if params[:tag]
    #   @forms = Form.tagged_with(params[:tag]).paginate(:page => params[:page], :per_page => 2)
       
    #   @boards = @forms.map {|f| {id: f.id, title: f.title, bookmark: true ,dsc: f.description, likes: f.get_likes.size ,updated_at: f.updated_at ,user: f.user ,links: 
    #   [{url: f.url1, title: f.title1, dsc: f.description1, image: f.image1, note: f.note1 },
    #   {url: f.url2, title: f.title2, dsc: f.description2, image: f.image2, note: f.note2 },
    #   {url: f.url3, title: f.title3, dsc: f.description3, image: f.image3, note: f.note3 },
    #   {url: f.url4, title: f.titel4, dsc: f.description4, image: f.image4, note: f.note4 },
    #   {url: f.url5, title: f.title5, dsc: f.description5, image: f.image5, note: f.note5 }]}}
    # end
    end

  def new_modal
  end

  def get_meta_data
    meta = MetaInspector.new(params[:url], :allow_non_html_content => true)   rescue nil
    @data = nil
    if meta == nil
      @data = meta
    else
      @data = {url: params[:url], content:meta.content_type, title:((meta.content_type == "application/pdf") ? meta.content_type : meta.title), image:meta.images.best, description:meta.description, tags: meta.meta_tags["name"]["keywords"], host: params[:url].sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first} 
    end          

    respond_to do |format|
      format.html
      format.json { render json: @data.to_json }
    end
  end

  def create_form
   
    form = Form.new
    form.user_id = params[:user_id].to_i
    form.title = params[:title]
    form.sub_header = params[:sub_header]
    form.description = params[:dsc]
    form.publish = params[:text] == 'publish' ? true : false
    params[:forms].each_with_index do |f, index|
      if index == 0
        form.title1 = f["title"]
        form.url1 = f["url"] == nil ? "" : f["url"]
        form.note1 = f["note"] == nil ? "" : f["note"]
        form.description1 = f["dsc"] == nil ? "" : f["dsc"]
        form.content = f["content"] == nil ? "" : f["content"]
        form.tag1 = f["tag"] == nil ? nil : f["tag"]
        form.image1 = f["image"] == nil ? nil : f["image"]
      elsif index == 1
        form.title2 = f["title"]
        form.url2 = f["url"] == nil ? "" : f["url"]
        form.note2 = f["note"] == nil ? "" : f["note"]
        form.description2 = f["dsc"] == nil ? "" : f["dsc"]
        form.content2 = f["content"] == nil ? "" : f["content"]
        form.tag2 = f["tag"] == nil ? nil : f["tag"]
        form.image2 = f["image"] == nil ? nil : f["image"]
      elsif index == 2
        form.title3 = f["title"]
        form.url3 = f["url"] == nil ? "" : f["url"]
        form.note3 = f["note"] == nil ? "" : f["note"]
        form.description3 = f["dsc"] == nil ? "" : f["dsc"]
        form.content3 = f["content"] == nil ? "" : f["content"]
        form.tag3 = f["tag"] == nil ? nil : f["tag"]
        form.image3 = f["image"] == nil ? nil : f["image"]
      elsif index == 3
        form.titel4 = f["title"]
        form.url4 = f["url"] == nil ? "" : f["url"]
        form.note4 = f["note"] == nil ? "" : f["note"]
        form.description4 = f["dsc"] == nil ? "" : f["dsc"]
        form.content4 = f["content"] == nil ? "" : f["content"]
        form.tag4 = f["tag"] == nil ? nil : f["tag"]
        form.image4 = f["image"] == nil ? nil : f["image"]
      elsif index == 4
        form.title5 = f["title"]
        form.url5 = f["url"] == nil ? "" : f["url"]
        form.note5 = f["note"] == nil ? "" : f["note"]
        form.description5 = f["dsc"] == nil ? "" : f["dsc"]
        form.content5 = f["content"] == nil ? "" : f["content"]
        form.tag5 = f["tag"] == nil ? nil : f["tag"]
        form.image5 = f["image"] == nil ? nil : f["image"]
      end
    end

    if form.save
      form.slug = generate_slug(form)
      form.secure_id = generate_secure_id(form)      
      tags = form.tag1.to_s.tr('[""]', '').split(',').map(&:to_s) + form.tag2.to_s.tr('[""]', '').split(',').map(&:to_s) + form.tag3.to_s.tr('[""]', '').split(',').map(&:to_s) + form.tag4.to_s.tr('[""]', '').split(',').map(&:to_s) + form.tag5.to_s.tr('[""]', '').split(',').map(&:to_s)
      form.update(tag_list: tags.join(','), slug:form.slug, secure_id:form.secure_id )
      form.save_social_image      
      respond_to do |format|
        format.html
        format.json { render json: form.to_json }
      end
    else
      respond_to do |format|
        format.html
        format.json { render json: "Error" }
      end
    end
  end

  def get_trending_board_data
    @data = []
    @avg_board_completion_rate = 0
    @current_date = Time.now.to_date
    @forms = Form.includes(:user_form_bookmarks, :user_form_links, :user).published
    @forms.each_with_index do |f, index|
      form_interactions_count = f.get_interaction_count()      
      data_hash = {}
      data_hash[:no] = index+1
      data_hash[:id] = f.secure_id
      data_hash[:title] = f.title
      data_hash[:username] = f.user.username
      data_hash[:created_at] = f.created_at.to_date
      data_hash[:likes] = form_interactions_count <= 10 ? 2 : f.cached_votes_total
      data_hash[:saves] = form_interactions_count <= 10 ? 1 : f.user_form_bookmarks.length
      data_hash[:shares] = form_interactions_count <= 10 ? 1 : f.get_share_count()
      data_hash[:this_board_completion_rate] = f.get_this_board_completion_rate()
      data_hash[:boards_by_user] = f.user.forms.length
      data_hash[:users_followers] = f.user.followers.length
      data_hash[:a] = ( 1/Math.log10((((@current_date - f.created_at.to_date).to_i + 2).abs)*2) ).round(2)
      data_hash[:b] = ( Math.log10((((1*data_hash[:likes]) + (3*data_hash[:saves]) + (4*data_hash[:shares])) + 2)) ).round(2)
      data_hash[:d] = ( Math.log10(data_hash[:boards_by_user] + (10*data_hash[:users_followers]) + 1) ).round(2)
      data_hash[:score] = 0.0
      data_hash[:extra_weight] = 0
      data_hash[:form_interactions_count] = form_interactions_count
      @data.push data_hash
    end

    @avg_boards_count = []
    
    @data.each do |d|
      @avg_boards_count.push d if (d[:this_board_completion_rate] != 0.0)
    end
    
    @avg_board_completion_rate = ((@data.collect {|s| s[:this_board_completion_rate]}.inject :+)/@avg_boards_count.length).round(2)

    @data.each do |data|
      data[:avg_board_completion_rate] = @avg_board_completion_rate
      if data[:form_interactions_count] <= 10
        data[:this_board_completion_rate] = @avg_board_completion_rate
      end
      data[:c] = (data[:this_board_completion_rate] - @avg_board_completion_rate).round(2)
      data[:score] = (((data[:a] + data[:b]) + (data[:c] * data[:d]))*100).round(2)
    end

    respond_to do |format|
      format.html
      format.json { render json: @data.to_json }
    end
  end

  def mixpanel_data
    @current_date = Time.now.to_date
  end

  def update_form_score
    
    @forms = params[:forms]
    @forms.each do |f|
      Form.where(secure_id: f[:id]).update_all(score: f[:score], extra_weight: (f[:extra_weight].present? ? f[:extra_weight] : 0.0) )      
    end

    respond_to do |format|
      format.html
      format.json { render json: params[:forms] }
    end
  end


  private
    # Use callbacks to share common setup or constraints between actions.
    def set_form
      @form = Form.find(params[:id])
    end

    def form_params
    #these are the list of parameters for a form
    #require means compulsary fields and permit is used to protect our data.
      
      params.require(:form).permit(:user_id,:title, :sub_header ,:description, :title1, :title2, :title3, :titel4, :title5, :url1, :url2, :url3, :url4, :url5, :tag_list, :note1, :note2, :note3, :note4, :note5, :readtime, :unspecified, :easy, :involved, :advanced, :description1, :description2, :description3, :description4, :description5, :content, :content2, :content3, :content4, :content5, :tag1, :tag2, :tag3, :tag4, :tag5, :admins_date, :staff_picks, :view_count, :likes_count, :saved_count, :share_count, :most_popular)
    end

    def authenticate_admin
      authenticate_admin!
    end
  end
