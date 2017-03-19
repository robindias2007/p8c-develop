class StaticPagesController < ApplicationController
  def home
  end


  def home #home.html.erb
   @home_user = true;
   @forms = Form.order(created_at: :desc).where(publish:true)  #thanks is a method used for thanks_page.html.erb our homepage  where publish is true which shows published boards of all the possible users in our database 
  end

  def publish   #publish.html.erb
   @home_banner = true;
   @forms = Form.order(created_at: :desc).where(user_id:current_user.id, publish:true)  #it shows published boards where user_id:current_user.id which means it will show only the current user logged in published boards
  end 

  def drafts  #drafts.html.erb
   @home_banner = true;
   @forms = Form.order(created_at: :desc).where(user_id:current_user.id, publish:false)   #this is for drafts for current__user
   if params[:commit] == 'Publish'
    @form.update(:publish => "true")
    redirect_to static_pages_publish_path , notice: 'Form was successfully created.' 
   end       
  end
  
  def destroy #to delete the form
   @form.destroy
   respond_to do |format|
    format.html { redirect_to forms_url, notice: 'Form was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

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
  
  def show
  end

  def saved #saved.html.erb
   @home_user = true;   #board validation for showing things and to not show somethings
   @home_user1 = true;
   @forms = Form.where(id: current_user.find_up_voted_items).order(created_at: :desc) #id: current_user.find_voted_items means it shows current_users liked boards. find_voted_item is a predefined function by acts_as_votable.
  end    




end
