class UsersController < ApplicationController
  def index
   
  end

  def show
    

  	if (User.find_by_username(params[:id]))
   	 @username = params[:id]
   	else 
   		redirect_to root_path, :notice=> "USer not found"
    end
    
    @forms = Form.order(created_at: :desc).where("user_id = ?",User.find_by_username(params[:id]).id  ).where(publish:true)
  end



end
