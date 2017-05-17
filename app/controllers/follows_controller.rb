class FollowsController < ApplicationController

  def follow
    @user = User.find_by(params[:id])
    current_user.follow(@user)
  end

  def unfollow
    @user = User.find_by(params[:id])
    current_user.stop_following(@user)
  end

end