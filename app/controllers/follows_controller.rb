class FollowsController < ApplicationController

  before_action :set_user

  def create
  	current_user.follow(@user)
    respond_to do |format|
      format.html
      format.json { render json: { status: "deleted" } }
    end
  end

  def destroy
    current_user.stop_following(@user)
    respond_to do |format|
      format.html
      format.json { render json: { status: "deleted" } }
    end
  end

  def following
  end

  def followers
  	
  end

  private
    
    def set_user
      @user = User.find(params[:user_id])
    end

end