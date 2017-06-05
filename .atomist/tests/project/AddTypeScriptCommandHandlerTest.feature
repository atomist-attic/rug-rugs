# Copyright © 2017 Atomist, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


Feature: AddTypeScriptCommandHandler should add a sample command handler
  The AddTypeScriptCommandHandler should add a simple command handler
  to proper Rug projects.  If the Rug project is not set up for
  TypeScript, it should set it up.


  Scenario: AddTypeScriptCommandHandler should add a command handler
    Given a Rug archive package.json
    When AddTypeScriptCommandHandler is run
    Then parameters were valid
    Then changes were made
    Then file at .atomist/handlers/command/BoDeans.ts should exist
    Then file at .atomist/handlers/command/BoDeans.ts should contain class BoDeans
    Then file at .atomist/handlers/command/BoDeans.ts should contain fourth studio album
    Then file at .atomist/handlers/command/BoDeans.ts should contain @Intent("black and white")
    Then file at .atomist/handlers/command/BoDeans.ts should not contain TypeScriptCommandHandler
    Then file at .atomist/handlers/command/BoDeans.ts should not contain sample TypeScript command handler
    Then file at .atomist/handlers/command/BoDeans.ts should not contain run TypeScriptCommandHandler
    Then file at .atomist/tests/handlers/command/BoDeansTest.feature should exist
    Then file at .atomist/tests/handlers/command/BoDeansTest.feature should contain BoDeans
    Then file at .atomist/tests/handlers/command/BoDeansTest.feature should not contain TypeScriptCommandHandler
    Then file at .atomist/tests/handlers/command/BoDeansSteps.ts should exist
    Then file at .atomist/tests/handlers/command/BoDeansSteps.ts should contain BoDeans
    Then file at .atomist/tests/handlers/command/BoDeansSteps.ts should not contain TypeScriptCommandHandler


  Scenario: AddTypeScriptCommandHandler should fail if not a Rug project
    Given an empty project
    When AddTypeScriptCommandHandler is run
    Then the scenario aborted
