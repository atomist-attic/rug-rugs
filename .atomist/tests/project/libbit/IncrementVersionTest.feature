Feature: Lib lib libbits IncrementVersion
  The IncrementVersion libbit editor copies IncrementVersion into your project.


  Scenario: IncrementVersionLibbit should add sample files to the project
    Given an empty project
    When the IncrementVersionLibbit is run
    Then changes were made
    Then the new IncrementVersion source file exists
    Then the new IncrementVersion test files exist

  Scenario: IncrementVersionLibbit should do nothing when a file already exists
    Given the new IncrementVersion source file already exists
    When the IncrementVersionLibbit is run
    Then no changes were made