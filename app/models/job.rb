require "./lib/calculate_next_due_time"

class Job < ApplicationRecord
  belongs_to :user

  def next_due
    CalculateNextDueTime.from_job(self)
  end
end
