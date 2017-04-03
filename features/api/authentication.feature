@api
Feature: api/authentication

  Scenario: log in
    When pending

  Scenario: request jobs without logging in
    When I make a request without logging in
    Then I should receive an unauthorized response
