class CalculateNextDueTime
  FREQUENCY_MAPPING = {
    'hourly' => :hour,
    'daily' => :day,
    'monthly' => :month,
    'yearly' => :year
  }

  def self.from_job(job)
    frequencyMethod = FREQUENCY_MAPPING[job.frequency]
    raise ArgumentError if frequencyMethod.nil?
    Time.parse(job.run_at + ' UTC') + 1.send(frequencyMethod)
  end
end
