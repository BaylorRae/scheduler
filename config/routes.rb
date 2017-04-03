Rails.application.routes.draw do
  devise_for :users

  mount Scheduler::Api::Engine, at: '/api'
end
