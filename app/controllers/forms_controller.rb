class FormsController < ApplicationController
before_action :set_form, only: [:show, :edit, :update, :destroy, :upvote]
before_action :authenticate_user!, :only => [:upvote]

respond_to :js

  
  # GET /forms
  # GET /forms.json
  def index
    
    @forms = Form.order(created_at: :desc).where(user_id:current_user.id, publish:true)
    # if params[:url1].present?
    #   page = MetaInspector.new("")
    #   end
  end

  # GET /forms/1
  # GET /forms/1.json
  def show
    @forms = Form.where(user_id:current_user.id)
  end

  # GET /forms/new
  def new
    @form = Form.new
  end

  # GET /forms/1/edit
  def edit
  end

  
  # POST /forms
  # POST /forms.json
  def create
    @form = Form.new(form_params)
    if @form.save
      
      # redirect_to forms_show_path

      meta = MetaInspector.new(@form.url1)
      @form.update(title1:meta.title, image1:meta.images.best, description1:meta.description)
      
      meta1 = MetaInspector.new(@form.url2)   
      @form.update(title2:meta1.title, image2:meta1.images.best, description2:meta1.description)
      
      meta2 = MetaInspector.new(@form.url3)   
      @form.update(title3:meta2.title, image3:meta2.images.best, description3:meta2.description)
      
      meta3 = MetaInspector.new(@form.url4)   
      @form.update(titel4:meta3.title, image4:meta3.images.best, description4:meta3.description)
      
      meta4 = MetaInspector.new(@form.url5)   
    @form.update(title5:meta4.title, image5:meta4.images.best, description5:meta4.description)
      
      if params[:commit] == 'Publish'
       @form.update(:publish => "true")
      redirect_to static_pages_publish_path , notice: 'Form was successfully created.' 

      else params[:commit] == 'Save as Draft'
        @form.update(:publish => "false")
        redirect_to static_pages_drafts_path
      end
  
  
    else
      format.html { render :new }
      format.json { render json: @form.errors, status: :unprocessable_entity }
    end
  end
  
    
   

  # PATCH/PUT /forms/1
  # PATCH/PUT /forms/1.json
  def update
    respond_to do |format|
      if @form.update(form_params)
        format.html { redirect_to @form, notice: 'Form was successfully updated.' }
        format.json { render :show, status: :ok, location: @form }
      else
        format.html { render :edit }
        format.json { render json: @form.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /forms/1
  # DELETE /forms/1.json
  def destroy
    @form.destroy
    respond_to do |format|
      format.html { redirect_to forms_url, notice: 'Form was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def upvote
    @form = Form.find(params[:id])
    @form.liked_by current_user
    redirect_to :back
  end


  def downvote
   @form = Form.find(params[:id])
   @form.downvote_from current_user
   redirect_to :back
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_form
      @form = Form.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def form_params
      params.require(:form).permit(:user_id,:title, :description, :title1, :title2, :title3, :titel4, :title5, :url1, :url2, :url3, :url4, :url5)
    end
end
