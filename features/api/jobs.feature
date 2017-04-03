@api
Feature: api/jobs

  Background:
    Given I have created a user

  Scenario: all jobs
    Given I have created several jobs
    When I view all my jobs
    Then all my jobs should be returned

  Scenario: create job
    When pending

  Scenario: update job
    When pending
