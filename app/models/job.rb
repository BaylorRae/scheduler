class Job < ApplicationRecord
  belongs_to :user

  def next_due
    CalculateNextDueTime.from_job(self)
  end
end
