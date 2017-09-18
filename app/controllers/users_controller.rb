class UsersController < ApplicationController

  before_filter :authenticate_admin, :only => [:index, :user_for_admin]
  before_action :set_user, except: [:followers]
  before_action :check_profile_complted, only: :edit
  before_filter :find_userid, :only => [:show, :show_saved, :show_drafts, :show_liked]


  def index
    @users = User.all
  end

  def get_boards(forms)
    forms.map {|f| {slug_url: f.slug_url, id: f.id, title: f.title,liked: current_user.get_up_voted(Form).pluck(:id).include?(f.id), bookmark: current_user.bookmarks.pluck(:id).include?(f.id) ,dsc: f.description, likes: f.get_likes.size ,updated_at: f.updated_at ,user: f.user, user_image: (f.user.avatar_file_name == nil ? nil : f.user.avatar.url) ,links: 
      [{url: f.url1, title: f.title1, dsc: f.description1, image: f.image1, note: f.note1, host: f.url1.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first },
      {url: f.url2, title: f.title2, dsc: f.description2, image: f.image2, note: f.note2, host: f.url2.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first },
      {url: f.url3, title: f.title3, dsc: f.description3, image: f.image3, note: f.note3, host: f.url3.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first },
      {url: f.url4, title: f.titel4, dsc: f.description4, image: f.image4, note: f.note4, host: f.url4.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first },
      {url: f.url5, title: f.title5, dsc: f.description5, image: f.image5, note: f.note5, host: f.url5.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first }]}}
  end

  def show   #show.html.erb
    @keys = ENV['FACEBOOK_KEY'].to_json
    @user = User.find_by_username(params[:id])
    @home_banner = true;
    @forms = Form.order(created_at: :desc).where("user_id = ?", @user).published.paginate(:page => params[:page], :per_page => 2)
    #it willl show other persons published boards if you click on the usernamw or if you click on your own name it will show your own username
    #It will show only published because publish is true.
    @boards = get_boards(@forms)    
    @pub_boards = @boards.to_json

    respond_to do |format|
      format.html
      format.json { render json: { boards: @pub_boards, next_page: @forms.next_page } }
    end
  end
  
  def show_saved   #show.html.erb
    if @user == current_user
      @forms = current_user.bookmarks.paginate(:page => params[:page], :per_page => 2)
      @boards = get_boards(@forms)
      @saved_boards = @boards.to_json

      respond_to do |format|
        format.html
        format.json { render json: { boards: @saved_boards, next_page: @forms.next_page } }
      end
  	else
      redirect_to "/#{@user.username }/publish"
    end
    #it willl show other persons published boards if you click on the usernamw or if you click on your own name it will show your own username
    #It will show only published because publish is true.
  end
  
  def show_drafts   #show.html.erb
  	@home_banner = true;
    if @user == current_user
      @forms = Form.drafts.order(created_at: :desc).where("user_id = ?",User.find_by_username(params[:id])).where(user_id:current_user.id).paginate(:page => params[:page], :per_page => 2)
  	  @boards = get_boards(@forms)
      @draft_boards = @boards.to_json 

      respond_to do |format|
        format.html
        format.json { render json: { boards: @draft_boards, next_page: @forms.next_page } }
      end
    else
      redirect_to "/#{@user.username }/publish"
    end
    #it willl show other persons published boards if you click on the usernamw or if you click on your own name it will show your own username
    #It will show only published because publish is true.
  end
  
  def show_liked
    if @user != current_user
      @keys = ENV['FACEBOOK_KEY'].to_json
      @forms = @user.get_up_voted(Form).order(created_at: :desc).paginate(:page => params[:page], :per_page => 2)
      
      @boards = get_boards(@forms)
      @liked_boards = @boards.to_json
      respond_to do |format|
        format.html
        format.json { render json: { boards: @liked_boards, next_page: @forms.next_page } }
      end
    else
      redirect_to "/#{current_user.username }/publish"
    end
  end

  def edit
  end

  def update
    if @user.update_attributes(user_params)
      @user.update_attributes(categories_ids:params[:user][:categories_ids])
      redirect_to root_path
    else
      render "edit"
    end
  end

  def followings
    user = User.find(params[:user_id].to_i)
    @followings = user.all_following
    @followings_arr = @followings.map {|f| {id: f.id, name: f.name, author: f.author, username: f.username, image: (f.avatar_file_name == nil ? nil : f.avatar.url), following: current_user.following?(f) }}
    respond_to do |format|
      format.html
      format.json { render json: { followings: @followings_arr.to_json } }
    end
  end

  def followers
    user = User.find(params[:user_id].to_i)
    @followers = user.followers
    @followers_arr = @followers.map {|f| {id: f.id, name: f.name, author: f.author, username: f.username, image: (f.avatar_file_name == nil ? nil : f.avatar.url), following: current_user.following?(f) }}
    respond_to do |format|
      format.html
      format.json { render json: { followers: @followers_arr.to_json } }
    end
  end

  def user_for_admin
    @user = User.new
  end

  def user_create_for_admin
    @user = User.new(user_params)
    if params[:commit] == 'Create_User'
      @user.update(email:@user.username + "@curativ.com", categories_ids:params[:user][:categories_ids], :confirmed_at => DateTime.now)
      @user.skip_confirmation!
      @user.save
      redirect_to user_admin_path
    else
      redirect_to dashboard_path
    end
  end


  private

  def user_params
    params.require(:user).permit(:username, :name, :password, :password_confirmation, :avatar, :author, :email, :categories_ids, :profile_completed).merge(profile_completed: true)
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

  def authenticate_admin
    authenticate_admin!
  end
end
