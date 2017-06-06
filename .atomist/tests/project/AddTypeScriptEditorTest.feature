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
    Given a Rug archive package.json
    Given a Rug README
    When AddTypeScriptEditor is run
    Then parameters were valid
    Then changes were made
    Then file at .atomist/editors/JoeHenry.ts should exist
    Then file at .atomist/editors/JoeHenry.ts should contain @Editor("JoeHenry"
    Then file at .atomist/editors/JoeHenry.ts should contain "wherein Richard Pryor addresses a tearful nation"
    Then file at .atomist/editors/JoeHenry.ts should contain class JoeHenry
    Then file at .atomist/editors/JoeHenry.ts should contain new JoeHenry()
    Then file at .atomist/editors/JoeHenry.ts should not contain TypeScriptEditor
    Then file at .atomist/editors/JoeHenry.ts should not contain sample TypeScript editor used by
    Then file at .atomist/editors/JoeHenry.ts should not contain export const typeScriptEditor
    Then file at .atomist/tests/project/JoeHenrySteps.ts should exist
    Then file at .atomist/tests/project/JoeHenryTest.feature should contain Scenario: JoeHenry
    Then file at .atomist/tests/project/JoeHenryTest.feature should not contain TypeScriptEditor
    Then file at README.md should exist
    Then file at README.md should contain ### JoeHenry
    Then file at README.md should contain Richard Pryor addresses a tearful nation
    Then file at README.md should contain Put your editor prerequisites here.
    Then file at README.md should contain `inputParameter` | Yes | | Example input parameter
    Then file at README.md should contain -l JoeHenry
    Then file at README.md should contain Explain what your editor does here.


  Scenario: AddTypeScriptEditor should add a TypeScript editor even if no README
    Given a Rug archive package.json
    When AddTypeScriptEditor is run
    Then parameters were valid
    Then changes were made
    Then file at .atomist/editors/JoeHenry.ts should exist
    Then file at .atomist/editors/JoeHenry.ts should contain @Editor("JoeHenry"
    Then file at .atomist/editors/JoeHenry.ts should contain "wherein Richard Pryor addresses a tearful nation"
    Then file at .atomist/editors/JoeHenry.ts should contain class JoeHenry
    Then file at .atomist/editors/JoeHenry.ts should contain new JoeHenry()
    Then file at .atomist/editors/JoeHenry.ts should not contain TypeScriptEditor
    Then file at .atomist/editors/JoeHenry.ts should not contain sample TypeScript editor used by
    Then file at .atomist/editors/JoeHenry.ts should not contain export const typeScriptEditor
    Then file at .atomist/tests/project/JoeHenrySteps.ts should exist
    Then file at .atomist/tests/project/JoeHenryTest.feature should contain Scenario: JoeHenry
    Then file at .atomist/tests/project/JoeHenryTest.feature should not contain TypeScriptEditor
    Then file at README.md should not exist


  Scenario: AddTypeScriptEditor should not make any changes if the target project is not a Rug archive
    Given an empty project
    When AddTypeScriptEditor is run
    Then the scenario aborted


  Scenario: AddTypeScriptEditor should make ready for typescript if not ready
    Given a manifest.yml
    When AddTypeScriptEditor is run
    Then parameters were valid
    Then changes were made
    Then file at .atomist/editors/JoeHenry.ts should exist
    Then file at .atomist/editors/JoeHenry.ts should contain @Editor("JoeHenry"
    Then file at .atomist/package.json should exist
    Then file at .atomist/manifest.yml should not exist


  Scenario: AddTypeScriptEditor should fail if no editor name provided
    Given a Rug archive package.json
    When AddTypeScriptEditor is run with no editor name provided
    Then parameters were invalid
