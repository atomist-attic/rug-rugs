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


Feature: Convert existin project into an generator
  You should be able to easily convert an existing seed
  project into a generator.


  Scenario: ConvertExistingProjectToGenerator should add Rug archive files and default generator
    Given an empty project
    When ConvertExistingProjectToGenerator is run
    Then parameters were valid
    Then changes were made
    Then file at .atomist/manifest.yml should exist
    Then file at .atomist/manifest.yml should contain artifact: "my-rug-archive"
    Then file at .atomist/manifest.yml should contain group: "my-rug-group"
    Then file at .atomist/manifest.yml should contain 0.0.1
    Then there should be a package file
    Then the package file depends on rugs
    Then file at .atomist/tsconfig.json should exist
    Then file at .atomist/tsconfig.json should contain suppressImplicitAnyIndexErrors
    Then file at .atomist/.gitignore should exist
    Then file at .atomist/.gitignore should contain node_modules
    Then directory at .atomist/node_modules/@atomist/rug should not exist
    Then file at .atomist/node_modules/@atomist/rug/model/Core.ts should not exist
    Then file at .atomist/generators/MyNewGenerator.ts should exist
    Then file at .atomist/generators/MyNewGenerator.ts should contain @Generator("MyNewGenerator"
    Then file at .atomist/generators/MyNewGenerator.ts should contain class MyNewGenerator
    Then file at .atomist/generators/MyNewGenerator.ts should contain new MyNewGenerator()
    Then file at .atomist/generators/MyNewGenerator.ts should not contain TypeScriptGenerator
    Then file at .atomist/generators/MyNewGenerator.ts should not contain sample TypeScript generator used by
    Then file at .atomist/generators/MyNewGenerator.ts should not contain typeScriptGenerator
    Then file at .atomist/tests/project/MyNewGeneratorSteps.ts should exist
    Then file at .atomist/tests/project/MyNewGeneratorTest.feature should contain Scenario: MyNewGenerator
    Then file at .atomist/tests/project/MyNewGeneratorSteps.ts should not contain TypeScriptGenerator


  Scenario: ConvertExistingProjectToGenerator should make no change if project already contains a manifest
    Given a Rug archive manifest
    When ConvertExistingProjectToGenerator is run
    Then parameters were valid
    Then no changes were made
