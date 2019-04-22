Rails.application.routes.draw do
  root to: "application#index"
  resources :countries

  # root action: :index, controller: 'home'
  # get 'search', action: :index, controller: 'application'

  resources :students
end
