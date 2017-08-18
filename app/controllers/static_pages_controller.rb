class StaticPagesController < ApplicationController
  before_filter :authenticate_admin, :only => [:dashboard]

  def home #home.html.erb
    @home_user = true;
    @forms = Form.order(created_at: :desc).published #thanks is a method used for thanks_page.html.erb our homepage  where publish is true which shows published boards of all the possible users in our database 
    if current_user
      # TODO: Fetch categories
      @boards = @forms.map {|f| {id: f.id, title: f.title, liked: current_user.get_up_voted(Form).pluck(:id).include?(f.id) ,bookmark: current_user.bookmarks.pluck(:id).include?(f.id) ,dsc: f.description, likes: f.get_likes.size ,updated_at: f.updated_at ,user: f.user ,links: 
      [{url: f.url1, title: f.title1, dsc: f.description1, image: f.image1, note: f.note1 },
      {url: f.url2, title: f.title2, dsc: f.description2, image: f.image2, note: f.note2 },
      {url: f.url3, title: f.title3, dsc: f.description3, image: f.image3, note: f.note3 },
      {url: f.url4, title: f.titel4, dsc: f.description4, image: f.image4, note: f.note4 },
      {url: f.url5, title: f.title5, dsc: f.description5, image: f.image5, note: f.note5 }]}}
    else
      @boards = @forms.map {|f| {id: f.id, title: f.title,dsc: f.description, likes: f.get_likes.size ,updated_at: f.updated_at ,user: f.user ,links: 
      [{url: f.url1, title: f.title1, dsc: f.description1, image: f.image1, note: f.note1 },
      {url: f.url2, title: f.title2, dsc: f.description2, image: f.image2, note: f.note2 },
      {url: f.url3, title: f.title3, dsc: f.description3, image: f.image3, note: f.note3 },
      {url: f.url4, title: f.titel4, dsc: f.description4, image: f.image4, note: f.note4 },
      {url: f.url5, title: f.title5, dsc: f.description5, image: f.image5, note: f.note5 }]}}
    end
    @formss = @boards.to_json
  end

  def categories
    @home_user = true;
    @cat_name = params[:name].downcase
    if Category.pluck(:category_name).include?(@cat_name)
      @forms = Form.tagged_with("cat_#{@cat_name}").order(created_at: :desc).published
      puts @forms.count
      if current_user
        @boards = @forms.map {|f| {id: f.id, title: f.title, liked: current_user.get_up_voted(Form).pluck(:id).include?(f.id) ,bookmark: current_user.bookmarks.pluck(:id).include?(f.id) ,dsc: f.description, likes: f.get_likes.size ,updated_at: f.updated_at ,user: f.user ,links: 
        [{url: f.url1, title: f.title1, dsc: f.description1, image: f.image1, note: f.note1 },
        {url: f.url2, title: f.title2, dsc: f.description2, image: f.image2, note: f.note2 },
        {url: f.url3, title: f.title3, dsc: f.description3, image: f.image3, note: f.note3 },
        {url: f.url4, title: f.titel4, dsc: f.description4, image: f.image4, note: f.note4 },
        {url: f.url5, title: f.title5, dsc: f.description5, image: f.image5, note: f.note5 }]}}
      else
        @boards = @forms.map {|f| {id: f.id, title: f.title,dsc: f.description, likes: f.get_likes.size ,updated_at: f.updated_at ,user: f.user ,links: 
        [{url: f.url1, title: f.title1, dsc: f.description1, image: f.image1, note: f.note1 },
        {url: f.url2, title: f.title2, dsc: f.description2, image: f.image2, note: f.note2 },
        {url: f.url3, title: f.title3, dsc: f.description3, image: f.image3, note: f.note3 },
        {url: f.url4, title: f.titel4, dsc: f.description4, image: f.image4, note: f.note4 },
        {url: f.url5, title: f.title5, dsc: f.description5, image: f.image5, note: f.note5 }]}}
      end
    else
      redirect_to root_url
    end
    
    @formss = @boards.to_json
  end

  # def publish   #publish.html.erb
  #  @home_banner = true;
  #  @forms = Form.order(created_at: :desc).where(user_id:current_user.id, publish:true)  #it shows published boards where user_id:current_user.id which means it will show only the current user logged in published boards
  #  end 

  # def drafts  #drafts.html.erb
  #  @home_banner = true;
  #  @forms = Form.order(created_at: :desc).where(user_id:current_user.id, publish:false)   #this is for drafts for current__user
  #  if params[:commit] == 'Publish'
  #   @form.update(:publish => "true")
  #   redirect_to publish_path , notice: 'Form was successfully created.' 
  #  end       
  #  end
  
  def destroy #to delete the form
   @form.destroy
   respond_to do |format|
    format.html { redirect_to root_url, notice: 'Form was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def update 
    respond_to do |format|
      if @form.update(form_params)
        format.html { redirect_to @form, notice: 'Form was successfully updated.' }
        format.json { render :show, status: :ok, location: @form }
      else
        format.html { render :edit }
        format.json { render json: @form.errors, status: :unprocessable_entity }
      end
    end
  end
  
  def show
  end

  # def saved #saved.html.erb
  #  @home_user = true;   #board validation for showing things and to not show somethings
  #  @home_user1 = true;
  #  @forms = Form.where(bookmark:true).order(created_at: :desc) #id: current_user.find_voted_items means it shows current_users liked boards. find_voted_item is a predefined function by acts_as_votable.
  # end    
 
  def dashboard
  end
  
  private

  def authenticate_admin
    authenticate_admin!
  end

end
