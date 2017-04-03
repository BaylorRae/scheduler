@api
Feature: api/authentication

  Scenario: log in
    When I make a request after logging in
    Then I should receive an ok response

  Scenario: request jobs without logging in
    When I make a request without logging in
    Then I should receive an unauthorized response
