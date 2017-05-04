Feature: TypeScriptEventHandler handler handles events
  This is the sample Gherkin feature file for the BDD tests of
  the sample TypeScript event handler used by AddTypeScriptEventHandler.
  Feel free to modify and extend to suit the needs of your handler.


  Scenario: Executing a sample event handler
    Given the TypeScriptEventHandler is registered
    When a new Tag is received
    Then the TypeScriptEventHandler event handler should respond with the correct message
