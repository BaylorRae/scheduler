Given(/^I have created several jobs$/) do
  @user.jobs.create!([
    {
      command: 'ls',
      dyno_size: 'Free',
      frequency: 'daily',
      last_run: nil,
      run_at: '02:30'
    },
    {
      command: 'sudo rm /*',
      dyno_size: 'Free',
      frequency: 'monthly',
      last_run: DateTime.new(2017, 1, 1, 18),
      run_at: '18:00'
    }
  ])
end

When(/^I view all my jobs$/) do
  @last_response = page.driver.get "/api/jobs"
end

When(/^I create a new job$/) do
  @last_response = page.driver.post "/api/jobs", {
    command: "whoami",
    dyno_size: 'Free',
    frequency: 'hourly',
    run_at: '13:30'
  }
end

When(/^I update the last job$/) do
  @last_response = page.driver.put "/api/jobs/#{@user.jobs.last.id}", {
    command: "cat /etc/passwd",
    dyno_size: "Premium",
    frequency: "yearly",
    run_at: '18:00'
  }
end

When(/^I delete the last job$/) do
  page.driver.delete "/api/jobs/#{@user.jobs.last.id}"
end

Then(/^all my jobs should be returned$/) do
  ValidateResponse.with(@last_response)
    .expect_status(:ok)
    .expect_schema("./features/api/schemas/jobs/index.json")
    .expect_body([
      {
        "id" => Job.first.id,
        "command" => 'ls',
        "dynoSize" => 'Free',
        "runAt" => '02:30',
        "frequency" => 'daily',
        "lastRun" => nil,
        "nextDue" => (DateTime.now + 1.day).change(hour: 2, min: 30).strftime(API_TIME_FORMAT)
      },
      {
        "id" => Job.last.id,
        "command" => 'sudo rm /*',
        "dynoSize" => 'Free',
        "runAt" => '18:00',
        "frequency" => 'monthly',
        "lastRun" => DateTime.new(2017, 1, 1, 18).strftime(API_TIME_FORMAT),
        "nextDue" => DateTime.new(2017, 2, 1, 18).strftime(API_TIME_FORMAT)
      }
    ])
end

Then(/^the new job should be returned$/) do
  ValidateResponse.with(@last_response)
    .expect_status(:ok)
    .expect_schema("./features/api/schemas/jobs/job.json")
    .expect_body({
        "id" => Job.last.id,
        "command" => 'whoami',
        "dynoSize" => 'Free',
        "frequency" => 'hourly',
        "lastRun" => nil,
        "nextDue" => CalculateNextDueTime.from_job(Job.last).strftime(API_TIME_FORMAT),
        "runAt" => '13:30'
    })
end

Then(/^the job should be updated$/) do
  ValidateResponse.with(@last_response)
    .expect_status(:ok)
    .expect_schema("./features/api/schemas/jobs/job.json")
    .expect_body({
        "id" => Job.last.id,
        "command" => 'cat /etc/passwd',
        "dynoSize" => 'Premium',
        "frequency" => 'yearly',
        "lastRun" => nil,
        "lastRun" => DateTime.new(2017, 1, 1, 18).strftime(API_TIME_FORMAT),
        "nextDue" => CalculateNextDueTime.from_job(Job.last).strftime(API_TIME_FORMAT),
        "runAt" => '18:00'
    })
end

Then(/^I should only have one job$/) do
  @last_response = page.driver.get "/api/jobs"

  ValidateResponse.with(@last_response)
    .expect_status(:ok)
    .expect_schema("./features/api/schemas/jobs/index.json")
    .expect_body([
      {
        "id" => Job.last.id,
        "command" => 'ls',
        "dynoSize" => 'Free',
        "runAt" => '02:30',
        "frequency" => 'daily',
        "lastRun" => nil,
        "nextDue" => (DateTime.now + 1.day).change(hour: 2, min: 30).strftime(API_TIME_FORMAT)
      }
    ])
end
