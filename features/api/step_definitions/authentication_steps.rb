When(/^I make a request without logging in$/) do
  @last_response = page.driver.get "/api/jobs"
end

Then(/^I should receive an unauthorized response$/) do
  ValidateResponse.with(@last_response)
    .expect_status(:unauthorized)
end
