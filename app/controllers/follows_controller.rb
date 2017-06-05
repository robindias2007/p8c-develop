class FollowsController < ApplicationController

  def create
  	@user = User.find(params[:user_id])
    current_user.follow(@user)
  end

  def destroy
    @user = User.find(params[:user_id])
    current_user.stop_following(@user)
  end

  def following
  	@user = User.find(params[:user_id])
  end

  def followers
  	@user = User.find(params[:user_id])
  end
end