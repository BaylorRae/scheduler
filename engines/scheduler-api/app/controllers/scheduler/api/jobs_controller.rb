module Scheduler
  module Api
    class JobsController < ApplicationController

      def index
        @jobs = current_user.jobs
      end

      def create
        @job = current_user.jobs.create!(job_params)
      end

      def update
        @job = current_user.jobs.find(params[:id])
        @job.update_attributes!(job_params)
      end

      def destroy
        @job = current_user.jobs.find(params[:id])
        @job.destroy
      end

      private

      def job_params
        params.permit(:command, :dyno_size, :frequency, :run_at)
      end 
    end
  end
end

