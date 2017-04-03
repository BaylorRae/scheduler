Given(/^I have created a user$/) do
  @user = User.create!(email: 'bob@example.com', password: 'secret')
  
  visit "/users/sign_in"

  fill_in "Email", with: 'bob@example.com'
  fill_in "Password", with: 'secret'
  click_button 'Log in'
end
