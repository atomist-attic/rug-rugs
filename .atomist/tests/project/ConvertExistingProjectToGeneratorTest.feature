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


Feature: Convert existing project into an generator
  You should be able to easily convert an existing seed
  project into a generator.


  Scenario: ConvertExistingProjectToGenerator should add Rug archive files and default generator
    Given an empty project
    When ConvertExistingProjectToGenerator is run
    Then parameters were valid
    Then changes were made
    Then file at .atomist/package.json should exist
    Then file at .atomist/package.json should contain "name": "@chance-the-wrapper/coloring-book"
    Then file at .atomist/package.json should contain "version": "2016.5.13"
    Then file at .atomist/package.json should contain "@atomist/rugs":
    Then file at .atomist/tsconfig.json should exist
    Then file at .atomist/tsconfig.json should contain suppressImplicitAnyIndexErrors
    Then file at .atomist/.gitignore should exist
    Then file at .atomist/.gitignore should contain node_modules
    Then directory at .atomist/node_modules/@atomist/rug should not exist
    Then file at .atomist/node_modules/@atomist/rug/model/Core.ts should not exist
    Then file at .atomist/generators/NoProblem.ts should exist
    Then file at .atomist/generators/NoProblem.ts should contain @Generator("NoProblem"
    Then file at .atomist/generators/NoProblem.ts should contain class NoProblem
    Then file at .atomist/generators/NoProblem.ts should contain new NoProblem()
    Then file at .atomist/generators/NoProblem.ts should not contain TypeScriptGenerator
    Then file at .atomist/generators/NoProblem.ts should not contain sample TypeScript generator used by
    Then file at .atomist/generators/NoProblem.ts should not contain typeScriptGenerator
    Then file at .atomist/tests/project/NoProblemSteps.ts should exist
    Then file at .atomist/tests/project/NoProblemTest.feature should contain Scenario: NoProblem
    Then file at .atomist/tests/project/NoProblemSteps.ts should not contain TypeScriptGenerator
