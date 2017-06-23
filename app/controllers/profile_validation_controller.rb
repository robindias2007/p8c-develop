class ProfileValidationController < ApplicationController

  before_action :authenticate_user!

  def index
    attributes = {username: params[:username]}
    attributes[:email] = params[:email] if params[:email]

    current_user.assign_attributes(attributes)
    @errors = current_user.errors.messages unless current_user.valid?
  end

end
