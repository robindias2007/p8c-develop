class Users::SessionsController < Devise::SessionsController
# before_action :configure_sign_in_params, only: [:create]

  before_action :check_user_confirmation, only: [:create]

# GET /resource/sign_in
  def new
    self.resource = resource_class.new(sign_in_params)
    clean_up_passwords(resource)
    yield resource if block_given?
  end

  # POST /resource/sign_in
  def create
    self.resource = warden.authenticate(auth_options)
    if self.resource.present?
      set_flash_message!(:notice, :signed_in)
      sign_in(resource_name, resource)
      yield resource if block_given?
    end
  end

# DELETE /resource/sign_out
# def destroy
#   super
# end

  protected

  def check_user_confirmation
    @unconfirmed_user = false
    @user_email_exist = false
    email = params[:user][:email]
    password = params[:user][:password]
    if User.find_by_email(email)
      @user_email_exist = true
    end
    # TODO: Remove order from below query if uniqueness added for user 'email' column.
    user = password.present? ? User.order(id: :asc).where(email: email).first : nil
    if user && user.valid_password?(password) && !user.confirmed?
      @unconfirmed_user = true
      @unconfirmed_email = email
      render 'create'
    end
  end

# If you have extra params to permit, append them to the sanitizer.
# def configure_sign_in_params
#   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
# end
# private

#     def user_params
#       params.require(:user).permit(:email, :password)
#     end

end


