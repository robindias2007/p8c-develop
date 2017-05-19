class FormsController < ApplicationController
before_action :set_form, only: [:show, :edit, :update, :destroy, :like, :unlike]
before_action :authenticate_user!, :only => [:like]
respond_to :js, :json, :html

  
  # GET /forms
  # GET /forms.json
  def index #index.html.erb
    @forms = Form.order(created_at: :desc).where(user_id:current_user.id, publish:true) 
    #index is method where you get a list of all the forms avaliable in your database. In this they are showing all the published forms. We have set the value of publish to be true so its shows all the published forms
  end
  
  # GET /forms/1
  # GET /forms/1.json
  def show
    @form.punch(request)
    @forms = Form.where(id: params[:id]) #user_id value is current_user id shows the form created by a particular user. so if i click on robins form it shows my board.
  end

  # GET /forms/new
  def new
    @form = Form.new 
    #this is new method. where you can create a new form. It is basically a form.
  end

  # GET /forms/1/edit
  def edit
  end

  
  # POST /forms
  # POST /forms.json
  def create
    @form = Form.new(form_params)  #Form.new shows the new form to the user
    if @form.save                  # if form.save means if it clicked on publish or draft
      
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

      @form.update(readtime:meta.meta_tags + meta1.meta_tags + meta2.meta_tags + meta3.meta_tags + meta4.meta_tags) rescue nil 
      
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

      if params[:commit] == 'Publish'         # it checks if the user has clicked publish the it updates the form with publish
       @form.update(:publish => "true")       #publish becomes true
      redirect_to static_pages_publish_path , notice: 'Form was successfully created.' #then it redirects to static_pages/publish and stores the form there. 

      else params[:commit] == 'Save as Draft'   # it checks if the user has clicked drafs then publish becomes false so it updates it with false
        @form.update(:publish => "false")
        redirect_to static_pages_drafts_path  #then it redirects to static_pages/drafts and stores the form there. 
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

      @form.update(readtime:meta.meta_tags + meta1.meta_tags + meta2.meta_tags + meta3.meta_tags + meta4.meta_tags) rescue nil 


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
      

      if params[:commit] == 'Publish'
       @form.update(:publish => "true")
       redirect_to static_pages_publish_path , notice: 'Form was successfully created.' 

      else params[:commit] == 'Save as Draft'
        @form.update(:publish => "false")
        redirect_to static_pages_drafts_path
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
      format.html { redirect_to static_pages_publish_path, notice: 'Form was successfully destroyed.' }
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

  def upvote1
    @form = Form.find(params[:id])
    @form.update_attributes(bookmark:true)
    redirect_to :back
  end

  def downvote1
    @form = Form.find(params[:id])
    @form.update_attributes(bookmark:false)
    redirect_to :back
  end

  def tagss
    if params[:tag]
      @forms = Form.tagged_with(params[:tag]) 
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
      
      params.require(:form).permit(:user_id,:title, :description, :title1, :title2, :title3, :titel4, :title5, :url1, :url2, :url3, :url4, :url5, :tag_list, :note1, :note2, :note3, :note4, :note5, :readtime, :unspecified, :easy, :involved, :advanced, :description1, :description2, :description3, :description4, :description5, :content, :content2, :content3, :content4, :content5)
    end
end
