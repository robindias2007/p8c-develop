class UserStepsController < ApplicationController
  include Wicked::Wizard
  steps :personal

  def show
    @user = current_user
    render_wizard
  end
  
  def personal
    @user.update_attributes(user_params)
    redirect_to root_url
  end 

  def update
    @user = current_user
    @user.update_attributes(user_params)
    render_wizard @user
  end

end
