Given(/^I have created several jobs$/) do
  @user.jobs.create!({
    command: 'ls',
    dyno_size: 'Free',
    frequency: 'daily',
    last_run: nil,
    next_due: DateTime.new(2017, 1, 1, 2, 30),
    run_at: Time.parse('2:30')
  })
  @user.jobs.create!({
    command: 'sudo rm /*',
    dyno_size: 'Free',
    frequency: 'monthly',
    last_run: DateTime.new(2017, 1, 1, 6),
    next_due: DateTime.new(2017, 2, 1, 6),
    run_at: Time.parse('6:00')
  })
end

When(/^I view all my jobs$/) do
  get "/api/jobs"
end

Then(/^all my jobs should be returned$/) do
  expect(last_response.status).to eq(200)
end
