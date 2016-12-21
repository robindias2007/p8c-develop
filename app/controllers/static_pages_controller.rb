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




end
