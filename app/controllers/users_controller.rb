class UsersController < ApplicationController

  before_filter :authenticate_admin, :only => [:index]
  before_action :set_user
  before_action :check_profile_complted, only: :edit
  before_filter :find_userid, :only => [:show, :show_saved, :show_drafts]


  def index
    @users = User.all
  end

  def show   #show.html.erb
  	@home_banner = true;
    @forms = Form.order(created_at: :desc).where("user_id = ?",User.find_by_username(params[:id])).published
  	#it willl show other persons published boards if you click on the usernamw or if you click on your own name it will show your own username
    #It will show only published because publish is true.
  end
  
  def show_saved   #show.html.erb
    @forms = Form.saved.order(created_at: :desc).where("user_id = ?",User.find_by_username(params[:id]))
  	#it willl show other persons published boards if you click on the usernamw or if you click on your own name it will show your own username
    #It will show only published because publish is true.
  end
  
  def show_drafts   #show.html.erb
  	@home_banner = true;
    @forms = Form.drafts.order(created_at: :desc).where("user_id = ?",User.find_by_username(params[:id])).where(user_id:current_user.id)
  	#it willl show other persons published boards if you click on the usernamw or if you click on your own name it will show your own username
    #It will show only published because publish is true.
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
    params.require(:user).permit(:username, :name, :avatar, :author, :email, :categories_ids).merge(profile_completed: true)
  end

  def set_user
    @user = current_user
  end

  def find_userid
    @user = User.find_by_username(params[:id])
  end

  def authenticate_admin
      authenticate_admin!
    end

  def check_profile_complted
    if current_user.profile_completed
      redirect_to root_path
    end
  end

end
