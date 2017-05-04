Feature: TypeScriptGenerator should generate a project
  This is the sample Gherkin feature file for the BDD tests of
  the sample TypeScript generator used by AddTypeScriptGenerator.
  Feel free to modify and extend to suit the needs of your generator.


  Scenario: TypeScriptGenerator should create a new project based on this seed
    Given an empty project
    When TypeScriptGenerator is run
    Then parameters were valid
    Then the README file exists
