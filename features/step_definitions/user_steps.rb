Given(/^I have created a user$/) do
  @user = User.create!(email: 'bob@example.com', password: 'secret')
end
