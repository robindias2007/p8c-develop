class StaticPagesController < ApplicationController
  def home
  end

  def thanks
   @forms = Form.where(publish:true)
  end

  def publish
   @forms = Form.where(user_id:current_user.id, publish:true)
  end

  def drafts
   @forms = Form.where(user_id:current_user.id, publish:false)
   if params[:commit] == 'Publish'
   @form.update(:publish => "true")
              
          
        redirect_to static_pages_publish_path , notice: 'Form was successfully created.' 
  end       
  end




end
