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
    Given a manifest file
    Given an NPM package file
    When AddTypeScriptEventHandler is run with default path expression
    Then parameters were valid
    Then changes were made
    Then the event handler file exists
    Then the event handler file contains the name
    Then the event handler file contains the description
    Then the event handler file contains the default path expression
    Then the event handler file does not contain the original name
    Then the event handler file does not contain the original description
    Then the event handler test feature file should exist
    Then the event handler test feature file contains the name
    Then the event handler test feature file does not contain the original name
    Then the event handler test steps file should exist
    Then the event handler test steps file contains the name
    Then the event handler test steps file does not contain the original name


  Scenario: AddTypeScriptEventHandler should add an event handler to a Rug project
    Given a manifest file
    Given an NPM package file
    When AddTypeScriptEventHandler is run providing a path expression
    Then parameters were valid
    Then changes were made
    Then the event handler file exists
    Then the event handler file contains the name
    Then the event handler file contains the description
    Then the event handler file contains the provided path expression
    Then the event handler file does not contain the original name
    Then the event handler file does not contain the original description
    Then the event handler file does not contain the original path expression
    Then the event handler file should import the proper node type
    Then the event handler file should use the proper type parameters
    Then the event handler file should have the proper root node type
    Then the event handler file should not import the original root node
    Then the event handler file should not use the original type parameters
    Then the event handler file should not have the original root node type
    Then the event handler file should define tags
    Then the event handler test steps file does not contain the original root node type
    Then the event handler test feature file does not contain the original root node type


  Scenario: AddTypeScriptEventHandler should fail if not a Rug project
    Given an empty project
    When AddTypeScriptEventHandler is run with default path expression
    Then the scenario aborted
