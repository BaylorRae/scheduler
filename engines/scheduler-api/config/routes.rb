Scheduler::Api::Engine.routes.draw do
  resources :jobs, defaults: { format: :json }
  post "/authenticate", to: "sessions#authenticate"
end
