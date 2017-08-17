Rails.application.routes.draw do
  

   devise_for :admins, controllers: {
        sessions: 'admins/sessions'
      }
  


  
  get 'users/index'
  get 'tags/:tag', to: 'forms#tagss', as: :tag 
 

  devise_for :users, :controllers => { sessions: "users/sessions", :registrations => 'users/registrations',
                                       :confirmations => 'users/confirmations', :passwords => 'users/passwords', omniauth_callbacks: "users/omniauth_callbacks"}

  resources :user_steps

  resources :forms do
    member do
      get "like"
      get "unlike"
      get "book"
      get "booknot"
      put "difficulty", to: "forms#difficulty"
    end
  end

  resources :users, :only => [:index, :show, :edit, :update] do
    resources :follows, :only => [:create, :destroy]
  end

  resources :profile_validation, only: [:index]
  
  resources :categories


  get '/following' => 'follows#following'
  get '/followers' => 'follows#followers'

  resources :follows, :only => [:create, :destroy]

  get '/forms/:id/edittag' => 'forms#edittag'
  get 'forms/bookmarks' => 'forms#bookmarks'     
  # get '/publish' =>  'static_pages#publish'
  # get '/drafts' =>  'static_pages#drafts'
  # get '/saved' =>  'static_pages#saved'
  get '/dashboard' => 'static_pages#dashboard'
  
  get 'user/:id/publish'          =>   'users#show'
  get 'user/:id/saved'          =>   'users#show_saved'
  get 'user/:id/drafts'          =>   'users#show_drafts'

  get 'user/:id/liked'          =>   'users#show_liked'

  get '/home' => 'static_pages#home'
  
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
