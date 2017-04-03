@api
Feature: api/jobs

  Background:
    Given I have created a user

  Scenario: all jobs
    Given I have created several jobs
    When I view all my jobs
    Then all my jobs should be returned

  Scenario: create job
    When I create a new job
    Then the new job should be returned

  Scenario: update job
    Given I have created several jobs
    When I update the last job
    Then the job should be updated
