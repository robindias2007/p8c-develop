class UsersController < ApplicationController
  def index 
  end

  def show   #show.html.erb
  	if (User.find_by_username(params[:id])) #User.find_by_username is to find a user with their username along  with its unique id.
   	 @username = params[:id] 
   	else 
   		redirect_to root_path, :notice=> "USer not found"
    end
    
    #it willl show other persons published boards if you click on the usernamw or if you click on your own name it will show your own username
    #It will show only published because publish is true.
    @forms = Form.order(created_at: :desc).where("user_id = ?",User.find_by_username(params[:id]).id  ).where(publish:true)
  end



end
