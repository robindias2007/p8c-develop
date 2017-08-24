class StaticPagesController < ApplicationController
  before_filter :authenticate_admin, :only => [:dashboard]
  #before_action :set_boards, only: [:trending, :most_recent, :most_liked, :most_viewed]
  
  def get_customized_forms(forms)
    forms.map {|f| {id: f.id, title: f.title, liked: current_user.get_up_voted(Form).pluck(:id).include?(f.id) ,bookmark: current_user.bookmarks.pluck(:id).include?(f.id) ,dsc: f.description, likes: f.get_likes.size ,updated_at: f.updated_at ,user: f.user ,links: 
        [{url: f.url1, title: f.title1, dsc: f.description1, image: f.image1, note: f.note1, host: f.url1.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first },
        {url: f.url2, title: f.title2, dsc: f.description2, image: f.image2, note: f.note2, host: f.url2.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first},
        {url: f.url3, title: f.title3, dsc: f.description3, image: f.image3, note: f.note3, host: f.url3.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first },
        {url: f.url4, title: f.titel4, dsc: f.description4, image: f.image4, note: f.note4, host: f.url4.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first },
        {url: f.url5, title: f.title5, dsc: f.description5, image: f.image5, note: f.note5, host: f.url5.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first }]}}
  end

  def home #home.html.erb
    @home_user = true;
    @forms = Form.order(created_at: :desc).published #thanks is a method used for thanks_page.html.erb our homepage  where publish is true which shows published boards of all the possible users in our database 

    if current_user
      trending = Form.trending
      trend_hash = { category: "trending", boards: get_customized_forms(trending)}
      
      most_recent = Form.most_recent
      recent_hash = { category: "most recent", boards: get_customized_forms(most_recent)}
      
      most_liked = Form.most_liked
      liked_hash = {category: "most liked", boards: get_customized_forms(most_liked)}
      
      most_viewed = Form.most_viewed
      viewed_hash = {category: "most viewed", boards: get_customized_forms(most_viewed)}
      
      most_shared = Form.most_shared
      shared_hash = {category: "most shared", boards: get_customized_forms(most_shared)}

      most_saved = Form.most_saved
      saved_hash = {category: "most saved", boards: get_customized_forms(most_saved)}


      @cat_boards = []
      categories = current_user.categories_ids.reject { |c| c.empty? }
      categories.each do |category|
        cat_hash = { category: category, boards: [] }
        forms = Form.tagged_with("cat_#{category}").order(created_at: :desc).published
        cat_hash[:boards] = get_customized_forms(forms)
        @cat_boards.push cat_hash

      end
      
      @cat_boards.push trend_hash
      @cat_boards.push recent_hash
      @cat_boards.push liked_hash
      @cat_boards.push viewed_hash
      @cat_boards.push shared_hash
      @cat_boards.push saved_hash

      # TODO: Fetch categories_ids
      @formss = @cat_boards.to_json
    else
      @boards = @forms.map {|f| {id: f.id, title: f.title,dsc: f.description, likes: f.get_likes.size ,updated_at: f.updated_at ,user: f.user ,links: 
      [{url: f.url1, title: f.title1, dsc: f.description1, image: f.image1, note: f.note1 },
      {url: f.url2, title: f.title2, dsc: f.description2, image: f.image2, note: f.note2 },
      {url: f.url3, title: f.title3, dsc: f.description3, image: f.image3, note: f.note3 },
      {url: f.url4, title: f.titel4, dsc: f.description4, image: f.image4, note: f.note4 },
      {url: f.url5, title: f.title5, dsc: f.description5, image: f.image5, note: f.note5 }]}}
      @formss = @boards.to_json
    end
  end

  def categories
    @home_user = true;
    @cat_name = params[:name].downcase
    if Category.pluck(:category_name).include?(@cat_name)
      @forms = Form.tagged_with("cat_#{@cat_name}").order(created_at: :desc).published
      puts @forms.count
      if current_user
        @boards = @forms.map {|f| {id: f.id, title: f.title, liked: current_user.get_up_voted(Form).pluck(:id).include?(f.id) ,bookmark: current_user.bookmarks.pluck(:id).include?(f.id) ,dsc: f.description, likes: f.get_likes.size ,updated_at: f.updated_at ,user: f.user ,links: 
        [{url: f.url1, title: f.title1, dsc: f.description1, image: f.image1, note: f.note1, host: f.url1.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first },
        {url: f.url2, title: f.title2, dsc: f.description2, image: f.image2, note: f.note2, host: f.url2.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first },
        {url: f.url3, title: f.title3, dsc: f.description3, image: f.image3, note: f.note3, host: f.url3.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first },
        {url: f.url4, title: f.titel4, dsc: f.description4, image: f.image4, note: f.note4, host: f.url4.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first },
        {url: f.url5, title: f.title5, dsc: f.description5, image: f.image5, note: f.note5, host: f.url5.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first }]}}
      else
        @boards = @forms.map {|f| {id: f.id, title: f.title,dsc: f.description, likes: f.get_likes.size ,updated_at: f.updated_at ,user: f.user ,links: 
        [{url: f.url1, title: f.title1, dsc: f.description1, image: f.image1, note: f.note1, host: f.url1.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first },
        {url: f.url2, title: f.title2, dsc: f.description2, image: f.image2, note: f.note2, host: f.url2.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first },
        {url: f.url3, title: f.title3, dsc: f.description3, image: f.image3, note: f.note3, host: f.url3.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first },
        {url: f.url4, title: f.titel4, dsc: f.description4, image: f.image4, note: f.note4, host: f.url4.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first },
        {url: f.url5, title: f.title5, dsc: f.description5, image: f.image5, note: f.note5, host: f.url5.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first }]}}
      end
    else
      redirect_to root_url
    end
    
    @formss = @boards.to_json
  end

  def get_boards(forms)
    forms.map {|f| {id: f.id, title: f.title,liked: current_user.get_up_voted(Form).pluck(:id).include?(f.id), bookmark: current_user.bookmarks.pluck(:id).include?(f.id) ,dsc: f.description, likes: f.get_likes.size ,updated_at: f.updated_at ,user: f.user ,links: 
      [{url: f.url1, title: f.title1, dsc: f.description1, image: f.image1, note: f.note1, host: f.url1.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first },
      {url: f.url2, title: f.title2, dsc: f.description2, image: f.image2, note: f.note2, host: f.url2.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first },
      {url: f.url3, title: f.title3, dsc: f.description3, image: f.image3, note: f.note3, host: f.url3.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first },
      {url: f.url4, title: f.titel4, dsc: f.description4, image: f.image4, note: f.note4, host: f.url4.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first },
      {url: f.url5, title: f.title5, dsc: f.description5, image: f.image5, note: f.note5, host: f.url5.sub(/https?\:(\\\\|\/\/)(www.)?/,'').split('/').first }]}}
  end

  def trending
    @forms = Form.published.sample(5)
    @boards = get_boards(@forms)
    @formss = @boards.to_json
  end

  def most_viewed
    @forms = Form.order(view_count: :desc).published
    @boards = get_boards(@forms)
    @formss = @boards.to_json
  end

  def most_liked
    @forms = Form.where("cached_votes_total > ?", 0).order(cached_votes_total: :desc).published
    @boards = get_boards(@forms)
    @formss = @boards.to_json
  end

  def most_recent
    @forms = Form.order(created_at: :desc).published
    @boards = get_boards(@forms)
    @formss = @boards.to_json
  end

  def most_shared
    @forms = Form.order(share_count: :desc).published
    @boards = get_boards(@forms)
    @formss = @boards.to_json
  end

  def most_saved
    @forms = Form.order(saved_count: :desc).published
    @boards = get_boards(@forms)
    @formss = @boards.to_json
  end
  
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
