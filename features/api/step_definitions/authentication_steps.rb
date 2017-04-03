When(/^I make a request after logging in$/) do
  User.create!(email: 'bob@example.com', password: 'secret')

  page.driver.post "/api/authenticate", {
    email: 'bob@example.com',
    password: 'secret'
  }

  @last_response = page.driver.get "/api/jobs"
end

When(/^I make a request without logging in$/) do
  @last_response = page.driver.get "/api/jobs"
end

Then(/^I should receive an ok response$/) do
  ValidateResponse.with(@last_response)
    .expect_status(:ok)
end

Then(/^I should receive an unauthorized response$/) do
  ValidateResponse.with(@last_response)
    .expect_status(:unauthorized)
end
