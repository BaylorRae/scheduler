Rails.application.routes.draw do
  mount Scheduler::Api::Engine => "/scheduler-api"
end
