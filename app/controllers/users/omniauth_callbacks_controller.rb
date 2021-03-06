class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController


  def all
    user = User.from_omniauth(env["omniauth.auth"], current_user)
    if user.persisted?
      if user.confirmed_at == nil
        flash[:notice] = "You have not confirmed your account. Please check your email for confirmation link!"
        redirect_to "/"
      else
        flash[:notice] = "You are in..!!!"
        sign_in_and_redirect(user)
      end
    else
      session["devise.user_attributes"] = user.attributes
      redirect_to new_user_registration_url
    end

  end

  def failure
    #handle you logic here..
    #and delegate to super.
    super
  end

  alias_method :facebook, :all
  alias_method :twitter, :all
  alias_method :passthru, :all
  alias_method :google_oauth2, :all

  def sign_in_and_redirect(resource_or_scope, *args)
    options  = args.extract_options!
    scope    = Devise::Mapping.find_scope!(resource_or_scope)
    resource = args.last || resource_or_scope
    sign_in(scope, resource, options)

    if resource.profile_completed
      redirect_to after_sign_in_path_for(resource)
    else
      redirect_to edit_user_path(resource)
    end
  end

end
