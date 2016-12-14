class StaticPagesController < ApplicationController
  def home
  end

  def thanks
  end

  def publish
   @forms = Form.where(user_id:current_user.id, publish:true)
  end

  def drafts
   @forms = Form.where(user_id:current_user.id, publish:false)
  end




end
