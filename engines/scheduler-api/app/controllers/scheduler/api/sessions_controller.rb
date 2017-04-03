module Scheduler
  module Api
    class SessionsController < ApplicationController
      skip_before_action :authenticate_user!

      def authenticate
        user = User.find_by(email: params[:email])
        if user && user.valid_password?(params[:password])
          sign_in user
          render json: { message: "Logged in successfully." }
        else
          render json: { message: "Invalid email or password" }, status: :bad_request
        end
      end

    end
  end
end
