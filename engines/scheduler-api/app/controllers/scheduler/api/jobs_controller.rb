module Scheduler
  module Api
    class JobsController < ApplicationController

      def index
        @jobs = Job.all
      end

    end
  end
end

