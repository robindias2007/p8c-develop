class StaticPagesController < ApplicationController
  before_filter :authenticate_admin, :only => [:dashboard]
  # before_filter :authenticate_user, :only => [:home]
  #before_action :set_boards, only: [:trending, :most_recent, :most_liked, :most_viewed]
  
  def get_customized_forms(forms)
    forms.map {|f| {secure_id: f.secure_id, form_url: "#{root_url}#{f.user.username}/#{f.slug_url}", slug_url: f.slug_url, id: f.id, title: f.title,liked:f.votes.map{|v| v.voter_id}.include?(current_user.id), bookmark: f.user_form_bookmarks.map{|u| u.user_id}.include?(current_user.id) ,sub_header: f.sub_header ,dsc: f.description, likes: f.cached_votes_total ,updated_at: f.order_date ,user: f.user,user_image: (f.user.avatar_file_name == nil ? nil : f.user.avatar(:thumb)) ,links: 
      [{url: f.url1, title: f.title1, dsc: f.description1, image: f.image1, note: f.note1, host: f.host1 },
      {url: f.url2, title: f.title2, dsc: f.description2, image: f.image2, note: f.note2, host: f.host2 },
      {url: f.url3, title: f.title3, dsc: f.description3, image: f.image3, note: f.note3, host: f.host3 },
      {url: f.url4, title: f.titel4, dsc: f.description4, image: f.image4, note: f.note4, host: f.host4 },
      {url: f.url5, title: f.title5, dsc: f.description5, image: f.image5, note: f.note5, host: f.host5 }]}}
  end

  def get_uniq_forms_from_category(category, ids)
    @forms_uniq_ids = ids
    if @forms_uniq_ids == []
      forms = Form.tagged_with("cat_#{category.downcase.split(' ').join('_')}").includes(:user, :user_form_bookmarks, :votes).order(order_date: :desc).published.limit(3)
      @forms_uniq_ids = forms.pluck(:id)
      return forms
    else
      forms = Form.tagged_with("cat_#{category.downcase.split(' ').join('_')}").includes(:user, :user_form_bookmarks, :votes).where.not(id: @forms_uniq_ids).order(order_date: :desc).published.limit(3)
      @forms_uniq_ids = @forms_uniq_ids + forms.pluck(:id)
      return forms
    end
  end

  def home #home.html.erb    
    @home_user = true;
    @keys = ENV['FACEBOOK_KEY'].to_json
    if current_user
      puts current_user.profile_completed
      if current_user.profile_completed
        @cat_boards = []
        @forms_uniq_ids = []      

        staff_pick = Form.includes(:user, :user_form_bookmarks, :votes).where(id: AllForm.find_by_forms_type("s_b").form_ids).order(order_date: :desc).published.sample(3)
        staff_pick_hash = { category: "staff_picks", name: "staff picks", boards: get_customized_forms(staff_pick)}
        @cat_boards.push staff_pick_hash

        form_ids = AllForm.find_by_forms_type("t_b").form_ids
        forms_ids = Form.includes(:user, :user_form_bookmarks, :votes).where(id: form_ids).published.index_by(&:id)
        trending = form_ids.collect {|id| forms_ids[id] }[0..2]      
        trend_hash = { category: "trending", name: "trending", boards: get_customized_forms(trending)}

        categories = current_user.categories_ids.reject { |c| c.empty? }      
        categories.each_with_index do |category, index|
          next if index > 2
          cat_hash = { category: category.downcase.split(" ").join("_"), name: category, boards: [] }
          forms = get_uniq_forms_from_category(category, @forms_uniq_ids)
          cat_hash[:boards] = get_customized_forms(forms)
          if index == 1
            @cat_boards.push trend_hash  
          end
          @cat_boards.push cat_hash
        end
      else
        redirect_to edit_user_path(current_user)
      end

      # TODO: Fetch categories_ids
      @formss = @cat_boards.to_json
    else
      @skip_header = true;
    end
  end

  def categories
    @home_user = true;
    @cat_name = "cat_" + params[:name].downcase
    @keys = ENV['FACEBOOK_KEY'].to_json
    if Category.pluck(:tag).include?(@cat_name)
      @forms = Form.tagged_with("#{@cat_name}").includes(:user, :user_form_bookmarks, :votes).order(order_date: :desc).published
      if current_user
        @boards = @forms.map {|f| {secure_id: f.secure_id, form_url: "#{root_url}#{f.user.username}/#{f.slug_url}", slug_url: f.slug_url, id: f.id, title: f.title,liked:f.votes.map{|v| v.voter_id}.include?(current_user.id), bookmark: f.user_form_bookmarks.map{|u| u.user_id}.include?(current_user.id) ,sub_header: f.sub_header ,dsc: f.description, likes: f.cached_votes_total ,updated_at: f.order_date ,user: f.user,user_image: (f.user.avatar_file_name == nil ? nil : f.user.avatar(:thumb)) ,links: 
      [{url: f.url1, title: f.title1, dsc: f.description1, image: f.image1, note: f.note1, host: f.host1 },
      {url: f.url2, title: f.title2, dsc: f.description2, image: f.image2, note: f.note2, host: f.host2 },
      {url: f.url3, title: f.title3, dsc: f.description3, image: f.image3, note: f.note3, host: f.host3 },
      {url: f.url4, title: f.titel4, dsc: f.description4, image: f.image4, note: f.note4, host: f.host4 },
      {url: f.url5, title: f.title5, dsc: f.description5, image: f.image5, note: f.note5, host: f.host5 }]}}
      else
        redirect_to root_url  
      end
    else
      redirect_to root_url
    end
    @formss = @boards.to_json
  end

  def get_boards(forms)
    forms.map {|f| {secure_id: f.secure_id, form_url: "#{root_url}#{f.user.username}/#{f.slug_url}", slug_url: f.slug_url, id: f.id, title: f.title,liked: f.votes.map{|v| v.voter_id}.include?(current_user.id), bookmark: f.user_form_bookmarks.map{|u| u.user_id}.include?(current_user.id) ,sub_header: f.sub_header ,dsc: f.description, likes: f.cached_votes_total ,updated_at: f.order_date ,user: f.user,user_image: (f.user.avatar_file_name == nil ? nil : f.user.avatar(:thumb)) ,links: 
      [{url: f.url1, title: f.title1, dsc: f.description1, image: f.image1, note: f.note1, host: f.host1 },
      {url: f.url2, title: f.title2, dsc: f.description2, image: f.image2, note: f.note2, host: f.host2 },
      {url: f.url3, title: f.title3, dsc: f.description3, image: f.image3, note: f.note3, host: f.host3 },
      {url: f.url4, title: f.titel4, dsc: f.description4, image: f.image4, note: f.note4, host: f.host4 },
      {url: f.url5, title: f.title5, dsc: f.description5, image: f.image5, note: f.note5, host: f.host5 }]}}
  end

  def trending
    @keys = ENV['FACEBOOK_KEY'].to_json
    form_ids = AllForm.find_by_forms_type("t_b").form_ids    
    forms_ids = Form.includes(:user, :user_form_bookmarks, :votes).where(id: form_ids).published.index_by(&:id)    
    @forms = form_ids.collect {|id| forms_ids[id] }    
    @boards = get_boards(@forms)
    @formss = @boards.to_json
  end

  def most_viewed
    @keys = ENV['FACEBOOK_KEY'].to_json
    @forms = Form.includes(:user, :user_form_bookmarks, :votes).where(id: AllForm.find_by_forms_type("m_v_b").form_ids).published
    @boards = get_boards(@forms)
    @formss = @boards.to_json
  end

  def most_liked
    @keys = ENV['FACEBOOK_KEY'].to_json
    @forms = Form.includes(:user, :user_form_bookmarks, :votes).where(id: AllForm.find_by_forms_type("m_l_b").form_ids).published
    @boards = get_boards(@forms)
    @formss = @boards.to_json
  end

  def most_recent
    @keys = ENV['FACEBOOK_KEY'].to_json
    @forms = Form.includes(:user, :user_form_bookmarks, :votes).where(id: AllForm.find_by_forms_type("m_r_b").form_ids).order(order_date: :desc).published
    @boards = get_boards(@forms)
    @formss = @boards.to_json
  end

  def most_shared
    @keys = ENV['FACEBOOK_KEY'].to_json
    @forms = Form.includes(:user, :user_form_bookmarks, :votes).where(id: AllForm.find_by_forms_type("m_sh_b").form_ids).published
    @boards = get_boards(@forms)
    @formss = @boards.to_json
  end

  def most_saved
    @keys = ENV['FACEBOOK_KEY'].to_json
    @forms = Form.includes(:user, :user_form_bookmarks, :votes).where(id: AllForm.find_by_forms_type("m_sa_b").form_ids).published
    @boards = get_boards(@forms)
    @formss = @boards.to_json
  end

  def most_popular
    @keys = ENV['FACEBOOK_KEY'].to_json
    @forms = Form.includes(:user, :user_form_bookmarks, :votes).where(id: AllForm.find_by_forms_type("m_l_b").form_ids).published
    @boards = get_boards(@forms)
    @formss = @boards.to_json
  end
  
  def staff_picks
    @keys = ENV['FACEBOOK_KEY'].to_json
    @forms = Form.includes(:user, :user_form_bookmarks, :votes).where(id: AllForm.find_by_forms_type("s_b").form_ids).order(order_date: :desc).published
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

  def authenticate_user
    authenticate_user!
  end

  
end
