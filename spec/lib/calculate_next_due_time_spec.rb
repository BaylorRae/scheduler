require "spec_helper"
require "timecop"
require "active_support"
require "active_support/core_ext"

require "./lib/calculate_next_due_time"

describe CalculateNextDueTime do

  before do
    Timecop.freeze(Date.new(2017, 1, 1))
  end

  after do
    Timecop.return
  end

  context "from_job" do
    let(:job) do
      double(:job, {
        run_at: '2:30'
      })
    end

    it "works with hourly" do
      allow(job).to receive(:frequency) { 'hourly' }
      expect(CalculateNextDueTime.from_job(job)).to eq(DateTime.new(2017, 1, 1, 3, 30))
    end

    it "works with daily" do
      allow(job).to receive(:frequency) { 'daily' }
      expect(CalculateNextDueTime.from_job(job)).to eq(DateTime.new(2017, 1, 2, 2, 30))
    end

    it "works with monthly" do
      allow(job).to receive(:frequency) { 'monthly' }
      expect(CalculateNextDueTime.from_job(job)).to eq(DateTime.new(2017, 2, 1, 2, 30))
    end

    it "works with yearly" do
      allow(job).to receive(:frequency) { 'yearly' }
      expect(CalculateNextDueTime.from_job(job)).to eq(DateTime.new(2018, 1, 1, 2, 30))
    end

    it "raises an argument error when invalid" do
      allow(job).to receive(:frequency) { 'foo' }
      expect do
        CalculateNextDueTime.from_job(job)
      end.to raise_error(ArgumentError)
    end
  end

end
