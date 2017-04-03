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
        run_at: '2:30',
        last_run: nil
      })
    end

    context "hourly" do
      it "runs in the future" do
        allow(job).to receive(:run_at) { '19:00' }
        allow(job).to receive(:frequency) { 'hourly' }
        expect(CalculateNextDueTime.from_job(job)).to eq(DateTime.new(2017, 1, 1, 20))
      end

      it "runs at the next available hour" do
        Timecop.freeze(DateTime.new(2017, 1, 1, 6)) do
          allow(job).to receive(:frequency) { 'hourly' }
          expect(CalculateNextDueTime.from_job(job)).to eq(DateTime.new(2017, 1, 1, 6, 30))
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
