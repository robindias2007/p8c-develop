class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  #protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
  
  protected

  def configure_permitted_parameters
    added_attrs = [:username, :email, :author, :name, :avatar, :password, :password_confirmation, :remember_me]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    devise_parameter_sanitizer.permit :account_update, keys: (added_attrs - [:username, :email])
  end

  def after_sign_up_path_for(resource)
    redirect_to '/published' # Or :prefix_to_your_route
  end

  def after_sign_in_path_for(resource)
    if admin_signed_in?
      dashboard_path
    else
      root_url
    end
  end

end
