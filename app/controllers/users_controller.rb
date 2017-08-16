class UsersController < ApplicationController

  before_filter :authenticate_admin, :only => [:index]
  before_action :set_user
  before_action :check_profile_complted, only: :edit
  before_filter :find_userid, :only => [:show, :show_saved, :show_drafts, :show_liked]


  def index
    @users = User.all
  end

  def show   #show.html.erb
    @home_banner = true;
    @forms = Form.order(created_at: :desc).where("user_id = ?",User.find_by_username(params[:id])).published
  	#it willl show other persons published boards if you click on the usernamw or if you click on your own name it will show your own username
    #It will show only published because publish is true.
    @boards = @forms.map {|f| {id: f.id, title: f.title, bookmark: true ,dsc: f.description, likes: f.get_likes.size ,updated_at: f.updated_at ,user: f.user ,links: 
      [{url: f.url1, title: f.title1, dsc: f.description1, image: f.image1, note: f.note1 },
      {url: f.url2, title: f.title2, dsc: f.description2, image: f.image2, note: f.note2 },
      {url: f.url3, title: f.title3, dsc: f.description3, image: f.image3, note: f.note3 },
      {url: f.url4, title: f.titel4, dsc: f.description4, image: f.image4, note: f.note4 },
      {url: f.url5, title: f.title5, dsc: f.description5, image: f.image5, note: f.note5 }]}}
  end
  
  def show_saved   #show.html.erb
    if @user == current_user
      @forms = Form.saved.order(created_at: :desc).where("user_id = ?",User.find_by_username(params[:id])).where(user_id:current_user.id)
  	else
      redirect_to "/user/#{@user.username }/publish"
    end
    #it willl show other persons published boards if you click on the usernamw or if you click on your own name it will show your own username
    #It will show only published because publish is true.
  end
  
  def show_drafts   #show.html.erb
  	@home_banner = true;
    if @user == current_user
      @forms = Form.drafts.order(created_at: :desc).where("user_id = ?",User.find_by_username(params[:id])).where(user_id:current_user.id)
  	else
      redirect_to "/user/#{@user.username }/publish"
    end
    #it willl show other persons published boards if you click on the usernamw or if you click on your own name it will show your own username
    #It will show only published because publish is true.
  end
  
  def show_liked
    if @user != current_user 
      @forms = @user.get_up_voted(Form).order(created_at: :desc)
    else
      redirect_to "/user/#{current_user.username }/publish"
    end
  end

  def edit
  end

  def update
    if @user.update_attributes(user_params)
      redirect_to root_path
    else
      render "edit"
    end
  end


  private

  def user_params
    params.require(:user).permit(:username, :name, :avatar, :author, :email, :categories_ids).merge(profile_completed: true)
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

end
