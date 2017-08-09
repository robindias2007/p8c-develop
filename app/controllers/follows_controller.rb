class FollowsController < ApplicationController

  before_action :set_user

  def create
  	current_user.follow(@user)
  end

  def destroy
    current_user.stop_following(@user)
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