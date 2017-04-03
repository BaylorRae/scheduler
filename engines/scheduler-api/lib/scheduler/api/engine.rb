module Scheduler
  module Api
    class Engine < ::Rails::Engine
      isolate_namespace Scheduler::Api
      config.generators.api_only = true
    end
  end
end
