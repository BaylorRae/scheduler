Scheduler::Api::Engine.routes.draw do
  resources :jobs, defaults: { format: :json }
end
