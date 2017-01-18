class StaticPagesController < ApplicationController
  def home
  end


  def thanks
   @forms = Form.order(created_at: :desc).where(publish:true)
  end

  def publish
   @forms = Form.order(created_at: :desc).where(user_id:current_user.id, publish:true)
  end

  def drafts
   @forms = Form.order(created_at: :desc).where(user_id:current_user.id, publish:false)
   if params[:commit] == 'Publish'
    @form.update(:publish => "true")
    redirect_to static_pages_publish_path , notice: 'Form was successfully created.' 
   end       
  end
  
  def destroy
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

  def saved
   @forms = Form.where(id: current_user.find_voted_items).order(created_at: :desc)
  end




end
