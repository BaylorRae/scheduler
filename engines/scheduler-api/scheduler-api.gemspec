$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "scheduler/api/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "scheduler-api"
  s.version     = Scheduler::Api::VERSION
  s.authors     = ["Baylor Rae'"]
  s.email       = ["baylor@fastmail.com"]
  s.homepage    = "https://github.com/BaylorRae/scheduler"
  s.summary     = "https://github.com/BaylorRae/scheduler"
  s.description = "https://github.com/BaylorRae/scheduler"
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency "rails", "~> 5.0.1"

  s.add_development_dependency "pg"
end
