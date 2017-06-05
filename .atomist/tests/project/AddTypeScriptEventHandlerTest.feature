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


Feature: AddTypeScriptEventHandler should add a sample event handler
  The AddTypeScriptEventHandler should add a simple event handler
  to proper Rug projects.  If the Rug project is not set up for
  TypeScript, it should set it up.


  Scenario: AddTypeScriptEventHandler should add an event handler using default path expression to a Rug project
    Given a Rug archive package.json
    When AddTypeScriptEventHandler is run with default path expression
    Then parameters were valid
    Then changes were made
    Then file at .atomist/handlers/event/PattiSmith.ts should exist
    Then file at .atomist/handlers/event/PattiSmith.ts should contain class PattiSmith
    Then file at .atomist/handlers/event/PattiSmith.ts should contain debut album released in 1975
    Then file at .atomist/handlers/event/PattiSmith.ts should contain /Tag()
    Then file at .atomist/handlers/event/PattiSmith.ts should not contain TypeScriptEventHandler
    Then file at .atomist/handlers/event/PattiSmith.ts should not contain sample TypeScript event handler
    Then file at .atomist/tests/handlers/event/PattiSmithTest.feature should exist
    Then file at .atomist/tests/handlers/event/PattiSmithTest.feature should contain PattiSmith
    Then file at .atomist/tests/handlers/event/PattiSmithTest.feature should not contain TypeScriptEventHandler
    Then file at .atomist/tests/handlers/event/PattiSmithSteps.ts should exist
    Then file at .atomist/tests/handlers/event/PattiSmithSteps.ts should contain PattiSmith
    Then file at .atomist/tests/handlers/event/PattiSmithSteps.ts should not contain TypeScriptEventHandler


  Scenario: AddTypeScriptEventHandler should add an event handler to a Rug project
    Given a Rug archive package.json
    When AddTypeScriptEventHandler is run providing a path expression
    Then parameters were valid
    Then changes were made
    Then file at .atomist/handlers/event/PattiSmith.ts should exist
    Then file at .atomist/handlers/event/PattiSmith.ts should contain class PattiSmith
    Then file at .atomist/handlers/event/PattiSmith.ts should contain debut album released in 1975
    Then file at .atomist/handlers/event/PattiSmith.ts should contain /Horses()/track2::RedondoBeach()
    Then file at .atomist/handlers/event/PattiSmith.ts should not contain TypeScriptEventHandler
    Then file at .atomist/handlers/event/PattiSmith.ts should not contain sample TypeScript event handler
    Then file at .atomist/handlers/event/PattiSmith.ts should not contain /Tag()
    Then file at .atomist/handlers/event/PattiSmith.ts should contain import { Horses } from "@atomist/cortex/Types";
    Then file at .atomist/handlers/event/PattiSmith.ts should contain implements HandleEvent<Horses, Horses>
    Then file at .atomist/handlers/event/PattiSmith.ts should not contain import { Tag }
    Then file at .atomist/handlers/event/PattiSmith.ts should not contain HandleEvent<Tag, Tag>
    Then file at .atomist/handlers/event/PattiSmith.ts should contain @Tags
    Then file at .atomist/tests/handlers/event/PattiSmithTest.feature should exist
    Then file at .atomist/tests/handlers/event/PattiSmithTest.feature should contain PattiSmith
    Then file at .atomist/tests/handlers/event/PattiSmithTest.feature should not contain TypeScriptEventHandler
    Then file at .atomist/tests/handlers/event/PattiSmithTest.feature should not contain Tag
    Then file at .atomist/tests/handlers/event/PattiSmithSteps.ts should exist
    Then file at .atomist/tests/handlers/event/PattiSmithSteps.ts should contain PattiSmith
    Then file at .atomist/tests/handlers/event/PattiSmithSteps.ts should not contain TypeScriptEventHandler
    Then file at .atomist/tests/handlers/event/PattiSmithSteps.ts should not contain Tag


  Scenario: AddTypeScriptEventHandler should fail if not a Rug project
    Given an empty project
    When AddTypeScriptEventHandler is run with default path expression
    Then the scenario aborted
