module Scheduler
  module Api
    class Engine < ::Rails::Engine
      isolate_namespace Scheduler::Api
      config.generators.api_only = true
      Jbuilder.key_format camelize: :lower
    end
  end
end
