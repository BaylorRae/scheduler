require 'rails_helper'

describe Job do
  context "next_due" do
    it "calculates next due date" do
      next_due_at = double(:next_due_at)
      job = Job.new(run_at: '7:30')
      allow(CalculateNextDueTime).to receive(:from_job).with(job) { next_due_at }
      expect(job.next_due).to eq(next_due_at)
    end
  end
end
