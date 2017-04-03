class CalculateNextDueTime
  FREQUENCY_MAPPING = {
    'hourly' => :hour,
    'daily' => :day,
    'monthly' => :month,
    'yearly' => :year
  }

  def self.from_job(job)
    frequency_method = FREQUENCY_MAPPING[job.frequency]
    raise ArgumentError if frequency_method.nil?

    last_run = job.last_run || Time.parse(job.run_at + ' UTC')
    now = Time.now.utc

    if job.frequency == 'hourly' && last_run <= now
      last_run = last_run.change(hour: now.hour - 1, min: last_run.min)
    end

    last_run + 1.send(frequency_method)
  end
end
