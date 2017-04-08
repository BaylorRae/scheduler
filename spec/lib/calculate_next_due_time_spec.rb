require "spec_helper"
require "timecop"
require "active_support"
require "active_support/core_ext"

require "./lib/calculate_next_due_time"

describe CalculateNextDueTime do

  before do
    Timecop.freeze(DateTime.new(2017, 1, 1, 0, 0))
  end

  after do
    Timecop.return
  end

  context "from_job" do
    let(:job) do
      double(:job, {
        run_at: '2:30',
        last_run: nil
      })
    end

    context "hourly" do
      before do
        allow(job).to receive(:frequency) { 'hourly' }
      end

      it "runs for the current hour" do
        allow(job).to receive(:run_at) { '00:20' }
        Timecop.freeze(DateTime.new(2017, 1, 1, 3, 15)) do
          expect(CalculateNextDueTime.from_job(job)).to eq(DateTime.new(2017, 1, 1, 3, 20))
        end
      end

      it "runs for the next hour it's passed" do
        allow(job).to receive(:run_at) { '00:10' }
        Timecop.freeze(DateTime.new(2017, 1, 1, 3, 11)) do
          expect(CalculateNextDueTime.from_job(job)).to eq(DateTime.new(2017, 1, 1, 4, 10))
        end
      end
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

    it "uses the last run if exists" do
      allow(job).to receive(:last_run) { DateTime.new(2020, 1, 1, 12) }
      allow(job).to receive(:frequency) { 'daily' }
      expect(CalculateNextDueTime.from_job(job)).to eq(DateTime.new(2020, 1, 2, 12))
    end

    it "raises an argument error when invalid" do
      allow(job).to receive(:frequency) { 'foo' }
      expect do
        CalculateNextDueTime.from_job(job)
      end.to raise_error(ArgumentError)
    end
  end

end
