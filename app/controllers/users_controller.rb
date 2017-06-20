class UsersController < ApplicationController

  before_action :authenticate_user!
  before_action :set_user
  before_action :check_profile_complted, only: :edit

  def index
  end

  def show   #show.html.erb
  	@user = User.find_by_username(params[:id]) #User.find_by_username is to find a user with their username along  with its unique id.
    #it willl show other persons published boards if you click on the usernamw or if you click on your own name it will show your own username
    #It will show only published because publish is true.
    @forms = Form.order(created_at: :desc).where("user_id = ?",User.find_by_username(params[:id]).id  ).where(publish:true, bookmark:true)
  end

  def edit
  end

  def update
    if @user.update_attributes(user_params)
      redirect_to root_path
    else
      render "edit"
    end
  end


  private

  def user_params
    params.require(:user).permit(:username, :name, :avatar, :author, :email).merge(profile_completed: true)
  end

  def set_user
    @user = current_user
  end

  def check_profile_complted
    if current_user.profile_completed
      redirect_to root_path
    end
  end

end
