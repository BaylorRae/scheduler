@api
Feature: api/jobs

  Background:
    Given I have created a user
    And I have created several jobs

  Scenario: all jobs
    When I view all my jobs
    Then all my jobs should be returned

  Scenario: create job
    When I create a new job
    Then the new job should be returned

  Scenario: update job
    When I update the last job
    Then the job should be updated

  Scenario: delete job
    When I delete the last job
    Then I should only have one job
