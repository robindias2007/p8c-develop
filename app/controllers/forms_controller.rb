class FormsController < ApplicationController
before_action :set_form, only: [:show, :edit, :update, :destroy, :upvote]
before_action :authenticate_user!, :only => [:upvote]


respond_to :js

  
  # GET /forms
  # GET /forms.json
  def index #index.html.erb
    @forms = Form.order(created_at: :desc).where(user_id:current_user.id, publish:true) 
    #index is method where you get a list of all the forms avaliable in your database. In this they are showing all the published forms. We have set the value of publish to be true so its shows all the published forms
  end

  # GET /forms/1
  # GET /forms/1.json
  def show
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
      
      
      meta = MetaInspector.new(@form.url1) rescue nil #meta is variable where you input the url in the form and stores it. MetaInspector is a predefined class taken from metainspector gem which fetches all the url information
      @form.update(title1:meta.title, image1:meta.images.best, description1:meta.description) rescue nil
      
      #MetaInspector stores all the url values like title, description and images.best whose response is given to us. 
      # Then we store it in our database and our database updates the current_form with title, image and description.
      # Instead of loading the entire page it saves the value in our database and it updates it.


      meta1 = MetaInspector.new(@form.url2)   rescue nil
      @form.update(title2:meta1.title, image2:meta1.images.best, description2:meta1.description) rescue nil
      
      meta2 = MetaInspector.new(@form.url3) rescue nil
      @form.update(title3:meta2.title, image3:meta2.images.best, description3:meta2.description) rescue nil
      
      meta3 = MetaInspector.new(@form.url4)   rescue nil
      @form.update(titel4:meta3.title, image4:meta3.images.best, description4:meta3.description) rescue nil
      
      meta4 = MetaInspector.new(@form.url5)   rescue nil
      @form.update(title5:meta4.title, image5:meta4.images.best, description5:meta4.description) rescue nil
      
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
      meta = MetaInspector.new(@form.url1) rescue nil
      @form.update(title1:meta.title, image1:meta.images.best, description1:meta.description) rescue nil
      
      meta1 = MetaInspector.new(@form.url2) rescue nil
      @form.update(title2:meta1.title, image2:meta1.images.best, description2:meta1.description) rescue nil
      
      meta2 = MetaInspector.new(@form.url3) rescue nil   
      @form.update(title3:meta2.title, image3:meta2.images.best, description3:meta2.description) rescue nil
      
      meta3 = MetaInspector.new(@form.url4) rescue nil
      @form.update(titel4:meta3.title, image4:meta3.images.best, description4:meta3.description) rescue nil
      
      meta4 = MetaInspector.new(@form.url5) rescue nil
      @form.update(title5:meta4.title, image5:meta4.images.best, description5:meta4.description) rescue nil
      
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
      format.html { redirect_to forms_url, notice: 'Form was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def upvote
    @form = Form.find(params[:id])   #upvote is a method used to like a post taken from acts_as_votable gem  where params[:id] means it takes parameters of the current form.
    @form.liked_by current_user      #liked_by is predefined function to like a form 
    redirect_to :back
  end


  def downvote
   @form = Form.find(params[:id])    #Opposite of upvote.
   @form.downvote_from current_user
   redirect_to :back
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_form
      @form = Form.find(params[:id])
    end

    def form_params
    #these are the list of parameters for a form
    #require means compulsary fields and permit is used to protect our data.
      
      params.require(:form).permit(:user_id,:title, :description, :title1, :title2, :title3, :titel4, :title5, :url1, :url2, :url3, :url4, :url5, :tag_list)
    end
end
