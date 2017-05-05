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


Feature: Add a TypeScript editor to an existing Rug project
  Use a Rug editor to add a TypeScript editor to an
  existing Rug project.


  Scenario: AddTypeScriptEditor should add a TypeScript editor to a Rug archive
    Given a Rug archive manifest
    Given a Rug archive package.json
    Given a Rug README
    When AddTypeScriptEditor is run
    Then parameters were valid
    Then changes were made
    Then the editor file exists
    Then the editor file contains the editor annotation
    Then the editor file contains the description
    Then the editor file contains the editor class
    Then the editor file instantiates the class
    Then the editor file does not contain the original editor name
    Then the editor file does not contain the original description
    Then the editor file does not contain the original export
    Then the editor test steps file exists
    Then the editor feature file has the proper scenario
    Then the editor test steps file does not contain the original editor name
    Then the README exists
    Then the README contains a section for the editor
    Then the README contains the editor description
    Then the README contains default editor prerequisites
    Then the README contains the editor parameter
    Then the README contains the editor usage
    Then the README contains default editor text


  Scenario: AddTypeScriptEditor should add a TypeScript editor even if no README
    Given a Rug archive manifest
    Given a Rug archive package.json
    When AddTypeScriptEditor is run
    Then parameters were valid
    Then changes were made
    Then the editor file exists
    Then the editor file contains the editor annotation
    Then the editor file contains the description
    Then the editor file contains the editor class
    Then the editor file instantiates the class
    Then the editor file does not contain the original editor name
    Then the editor file does not contain the original description
    Then the editor file does not contain the original export
    Then the editor test steps file exists
    Then the editor feature file has the proper scenario
    Then the editor test steps file does not contain the original editor name
    Then the README does not exist


  Scenario: AddTypeScriptEditor should not make any changes if the target project is not a Rug archive
    Given an empty project
    When AddTypeScriptEditor is run
    Then parameters were valid
    Then no changes were made


  Scenario: AddTypeScriptEditor should make ready for typescript if not ready
    Given a Rug archive manifest
    When AddTypeScriptEditor is run
    Then parameters were valid
    Then changes were made
    Then the editor file exists
    Then the editor file contains the editor annotation
    Then the Rug archive package.json exists


  Scenario: AddTypeScriptEditor should fail if no editor name provided
    Given a Rug archive manifest
    Given a Rug archive package.json
    When AddTypeScriptEditor is run with no editor name provided
    Then parameters were invalid
