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
    Given a manifest file
    Given an NPM package file
    When AddTypeScriptCommandHandler is run
    Then parameters were valid
    Then changes were made
    Then the command handler file exists
    Then the command handler file contains the name
    Then the command handler file contains the description
    Then the command handler file contains the intent
    Then the command handler file does not contain the original name
    Then the command handler file does not contain the original description
    Then the command handler file does not contain the original intent
    Then the command handler test feature file should exist
    Then the command handler test feature file contains the name
    Then the command handler test feature file does not contain the original name
    Then the command handler test steps file should exist
    Then the command handler test steps file contains the name
    Then the command handler test steps file does not contain the original name


  Scenario: AddTypeScriptCommandHandler should fail if not a Rug project
    Given an empty project
    When AddTypeScriptCommandHandler is run
    Then the scenario aborted
