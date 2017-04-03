Given(/^I have created several jobs$/) do
  @user.jobs.create!([
    {
      command: 'ls',
      dyno_size: 'Free',
      frequency: 'daily',
      last_run: nil,
      next_due: DateTime.new(2017, 1, 1, 2, 30),
      run_at: Time.parse('2:30 UTC')
    },
    {
      command: 'sudo rm /*',
      dyno_size: 'Free',
      frequency: 'monthly',
      last_run: DateTime.new(2017, 1, 1, 18),
      next_due: DateTime.new(2017, 2, 1, 18),
      run_at: Time.parse('18:00 UTC')
    }
  ])
end

When(/^I view all my jobs$/) do
  get "/api/jobs"
end

Then(/^all my jobs should be returned$/) do
  ValidateResponse.with(last_response)
    .expect_status(:ok)
    .expect_schema("./features/api/schemas/jobs/index.json")
    .expect_body([
      {
        "command" => 'ls',
        "dynoSize" => 'Free',
        "frequency" => 'daily',
        "lastRun" => nil,
        "nextDue" => DateTime.new(2017, 1, 1, 2, 30).strftime(API_TIME_FORMAT),
        "runAt" => '02:30'
      },
      {
        "command" => 'sudo rm /*',
        "dynoSize" => 'Free',
        "frequency" => 'monthly',
        "lastRun" => DateTime.new(2017, 1, 1, 18).strftime(API_TIME_FORMAT),
        "nextDue" => DateTime.new(2017, 2, 1, 18).strftime(API_TIME_FORMAT),
        "runAt" => '18:00'
      }
    ])
end
