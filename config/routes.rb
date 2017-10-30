Rails.application.routes.draw do
  

   devise_for :admins, controllers: {
        sessions: 'admins/sessions'
      }
  


  
  get 'users/index'
  get 'tags/:tag', to: 'forms#tagss', as: :tag 
 

  devise_for :users, :controllers => { sessions: "users/sessions", :registrations => 'users/registrations',
                                       :confirmations => 'users/confirmations', :passwords => 'users/passwords', omniauth_callbacks: "users/omniauth_callbacks"}

  resources :user_steps

  get '/:id/new_form' => 'forms#new_modal'
  get '/:id/:slug_url/edit_form' => 'forms#edit_modal'
  get '/:id/:slug_url/get_form_data' => 'forms#get_form_data'
  post '/:id/:slug_url/update_form' => 'forms#update_form'
  get '/:id/:slug_url/get_meta_data' => 'forms#get_meta_data'
  get '/:id/get_meta_data' => 'forms#get_meta_data'
  post '/:id/create_form' => 'forms#create_form'

  get '/users/categories' => 'users#categories'
  post '/users/update_categories' => 'users#update_categories'  
  
  get '/admin_forms' => 'forms#admin_index'
  get '/get_forms' => 'forms#get_admin_forms'
  resources :forms, :only => [:index, :edit, :update, :destroy] do
    member do
      get "like"
      get "unlike"
      get "book"
      get "booknot"
      put "difficulty", to: "forms#difficulty"
    end
  end

  resources :users, :only => [:index, :show, :edit, :update] do
    member do
      get 'categories' => 'users#categories'
      post 'update_categories' => 'users#update_categories'
      post 'link_clicked' => 'users#link_clicked' 
    end
    resources :follows, :only => [:create, :destroy]
  end

  resources :profile_validation, only: [:index]
  
  resources :categories, :only => [:index, :new, :create, :update, :destroy, :edit]
  get '/categories/:name' => 'static_pages#categories'

  get '/following' => 'follows#following'
  get '/followers' => 'follows#followers'

  resources :follows, :only => [:create, :destroy]

  get '/forms/:id/edittag' => 'forms#edittag'
  get 'forms/bookmarks' => 'forms#bookmarks'     
  get '/trending' =>  'static_pages#trending'
  get '/most_viewed' =>  'static_pages#most_viewed'
  get '/most_liked' =>  'static_pages#most_liked'
  get '/most_recent' =>  'static_pages#most_recent'
  get '/most_shared' =>  'static_pages#most_shared'
  get '/most_saved' =>  'static_pages#most_saved'
  get '/staff_picks' =>  'static_pages#staff_picks'
  get '/most_popular' =>  'static_pages#most_popular'
  get '/dashboard' => 'static_pages#dashboard'
  
  get ':id/published'          =>   'users#show'
  get ':id/saved'          =>   'users#show_saved'
  get ':id/drafts'          =>   'users#show_drafts'

  get ':id/liked'          =>   'users#show_liked'
  get 'user/:id/followings' => 'users#followings'
  get 'user/:id/followers' => 'users#followers'
  
  get '/user_admin' => 'users#user_for_admin'
  post '/user_admin' => 'users#user_create_for_admin'

  get '/mixpanel_data' => 'forms#mixpanel_data'
  get '/update_all_forms' => 'forms#update_all_forms'
  post '/update_form_list' => 'forms#update_form_list'
  post '/update_form_admin' => 'forms#update_form_admin'
  delete '/delete_form' => 'forms#delete_form'

  get '/get_trending_board_data' => 'forms#get_trending_board_data'
  post '/update_form_score' => 'forms#update_form_score'

  get '/:id/:slug_url' => 'forms#show'

  root 'static_pages#home'
   
  


  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
