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


Feature: Add a TypeScript generator to an existing Rug project
  Use a Rug editor to add a TypeScript generator to an
  existing Rug project, effectively making that project
  a seed project.


  Scenario: AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project
    Given a Rug archive manifest
    Given a Rug archive package.json
    Given a Rug README
    When AddTypeScriptGenerator is run
    Then parameters were valid
    Then changes were made
    Then file at .atomist/generators/MyNewGenerator.ts should exist
    Then file at .atomist/generators/MyNewGenerator.ts should contain @Generator("MyNewGenerator"
    Then file at .atomist/generators/MyNewGenerator.ts should contain "description of MyNewGenerator"
    Then file at .atomist/generators/MyNewGenerator.ts should contain class MyNewGenerator
    Then file at .atomist/generators/MyNewGenerator.ts should contain new MyNewGenerator()
    Then file at .atomist/generators/MyNewGenerator.ts should not contain TypeScriptGenerator
    Then file at .atomist/generators/MyNewGenerator.ts should not contain sample TypeScript generator used by
    Then file at .atomist/generators/MyNewGenerator.ts should not contain typeScriptGenerator
    Then file at .atomist/tests/project/MyNewGeneratorSteps.ts should exist
    Then file at .atomist/tests/project/MyNewGeneratorTest.feature should contain Scenario: MyNewGenerator
    Then file at .atomist/tests/project/MyNewGeneratorSteps.ts should not contain TypeScriptGenerator
    Then file at README.md should exist
    Then file at README.md should contain ### MyNewGenerator
    Then file at README.md should contain description of MyNewGenerator
    Then file at README.md should contain This Rug has no prerequisites.
    Then file at README.md should contain `projectName` | Yes | | Name of project to be created
    Then file at README.md should contain -l MyNewGenerator
    Then file at README.md should contain Explain what your generator does here.


  Scenario: AddTypeScriptGenerator should add a new TypeScript generator even if no README
    Given a Rug archive manifest
    Given a Rug archive package.json
    When AddTypeScriptGenerator is run
    Then parameters were valid
    Then changes were made
    Then file at .atomist/generators/MyNewGenerator.ts should exist
    Then file at .atomist/generators/MyNewGenerator.ts should contain @Generator("MyNewGenerator"
    Then file at .atomist/generators/MyNewGenerator.ts should contain "description of MyNewGenerator"
    Then file at .atomist/generators/MyNewGenerator.ts should contain class MyNewGenerator
    Then file at .atomist/generators/MyNewGenerator.ts should contain new MyNewGenerator()
    Then file at .atomist/generators/MyNewGenerator.ts should not contain TypeScriptGenerator
    Then file at .atomist/generators/MyNewGenerator.ts should not contain sample TypeScript generator used by
    Then file at .atomist/generators/MyNewGenerator.ts should not contain typeScriptGenerator
    Then file at .atomist/tests/project/MyNewGeneratorSteps.ts should exist
    Then file at .atomist/tests/project/MyNewGeneratorTest.feature should contain Scenario: MyNewGenerator
    Then file at .atomist/tests/project/MyNewGeneratorSteps.ts should not contain TypeScriptGenerator
    Then file at README.md should not exist


  Scenario: AddTypeScriptGenerator should make no changes if no manifest.yml
    Given a Rug archive package.json
    When AddTypeScriptGenerator is run
    Then the scenario aborted


  Scenario: AddTypeScriptGenerator should add package.json if not preset
    Given a Rug archive manifest
    When AddTypeScriptGenerator is run
    Then parameters were valid
    Then changes were made
    Then file at .atomist/generators/MyNewGenerator.ts should exist
    Then file at .atomist/package.json should exist


  Scenario: AddTypeScriptGenerator should fail if no generator name provided
    Given a Rug archive manifest
    Given a Rug archive package.json
    When AddTypeScriptGenerator is run without generator name
    Then parameters were invalid
    Then no changes were made
