Feature: Make sure the sample TypeScript Editor has some tests
  This is just a sample Gherkin feature file for the
  sample TypeScript editor used by AddTypeScriptEditor.

  Scenario: TypeScriptEditor is added to your project by AddTypeScriptEditor
    Given the archive root
    When the TypeScriptEditor is run
    Then parameters were valid
    Then changes were made
    Then the hello file says hello
