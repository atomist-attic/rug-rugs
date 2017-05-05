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
    When AddTypeScriptGenerator generatorName is MyNewGenerator, description is Description of MyNewGenerator for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project
    Then parameters were valid
    Then changes were made
    Then fileExists atomist editors MyNewGenerator ts for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project
    Then fileContains atomist editors MyNewGenerator ts Generator MyNewGenerator for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project
    Then fileContains atomist editors MyNewGenerator ts description for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project
    Then fileContains atomist editors MyNewGenerator ts class MyNewGenerator for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project
    Then fileContains atomist editors MyNewGenerator ts new MyNewGenerator for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project
    Then not result fileContains atomist editors MyNewGenerator ts TypeScriptGenerator for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project
    Then not result fileContains atomist editors MyNewGenerator ts sample TypeScript generator used by for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project
    Then not result fileContains atomist editors MyNewGenerator ts typeScriptGenerator for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project
    Then fileExists atomist tests project MyNewGeneratorTest ts for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project
    Then fileContains atomist tests project MyNewGeneratorTest ts scenario MyNewGenerator for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project
    Then not result fileContains atomist tests project MyNewGeneratorTest ts TypeScriptGenerator for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project
    Then fileExists README md for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project
    Then fileContains README md MyNewGenerator for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project
    Then fileContains README md Description of MyNewGenerator for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project
    Then fileContains README md This Rug has no prerequisites for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project
    Then fileContains README md projectName Yes Name of project to be created for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project
    Then fileContains README md MyNewGenerator example for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project
    Then fileContains README md Explain what your generator does here for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project


  Scenario: AddTypeScriptGenerator should add a new TypeScript generator even if no README
    Given a Rug archive manifest
    Given a Rug archive package.json
    When AddTypeScriptGenerator generatorName is MyNewGenerator, description is Description of MyNewGenerator for AddTypeScriptGenerator should add a new TypeScript generator even if no README
    Then parameters were valid
    Then changes were made
    Then fileExists atomist editors MyNewGenerator ts for AddTypeScriptGenerator should add a new TypeScript generator even if no README
    Then fileContains atomist editors MyNewGenerator ts Generator MyNewGenerator for AddTypeScriptGenerator should add a new TypeScript generator even if no README
    Then fileContains atomist editors MyNewGenerator ts description for AddTypeScriptGenerator should add a new TypeScript generator even if no README
    Then fileContains atomist editors MyNewGenerator ts class MyNewGenerator for AddTypeScriptGenerator should add a new TypeScript generator even if no README
    Then fileContains atomist editors MyNewGenerator ts new MyNewGenerator for AddTypeScriptGenerator should add a new TypeScript generator even if no README
    Then not result fileContains atomist editors MyNewGenerator ts TypeScriptGenerator for AddTypeScriptGenerator should add a new TypeScript generator even if no README
    Then not result fileContains atomist editors MyNewGenerator ts sample TypeScript generator used by for AddTypeScriptGenerator should add a new TypeScript generator even if no README
    Then not result fileContains atomist editors MyNewGenerator ts typeScriptGenerator for AddTypeScriptGenerator should add a new TypeScript generator even if no README
    Then fileExists atomist tests project MyNewGeneratorTest ts for AddTypeScriptGenerator should add a new TypeScript generator even if no README
    Then fileContains atomist tests project MyNewGeneratorTest ts scenario MyNewGenerator for AddTypeScriptGenerator should add a new TypeScript generator even if no README
    Then not result fileContains atomist tests project MyNewGeneratorTest ts TypeScriptGenerator for AddTypeScriptGenerator should add a new TypeScript generator even if no README
    Then not result fileExists README md for AddTypeScriptGenerator should add a new TypeScript generator even if no README


  Scenario: AddTypeScriptGenerator should make no changes if no manifest.yml
    Given a Rug archive package.json
    When AddTypeScriptGenerator generatorName is MyNewGenerator, description is Description of MyNewGenerator for AddTypeScriptGenerator should make no changes if no manifest.yml
    Then parameters were valid
    Then no changes were made


  Scenario: AddTypeScriptGenerator should add package.json if not preset
    Given a Rug archive manifest
    When AddTypeScriptGenerator generatorName is MyNewGenerator, description is Description of MyNewGenerator for AddTypeScriptGenerator should add package.json if not preset
    Then parameters were valid
    Then changes were made
    Then fileExists atomist editors MyNewGenerator ts for AddTypeScriptGenerator should add package json if not preset
    Then fileExists atomist package json for AddTypeScriptGenerator should add package json if not preset


  Scenario: AddTypeScriptGenerator should fail if no generator name provided
    Given a Rug archive manifest
    Given a Rug archive package.json
    When AddTypeScriptGenerator descriptionisSomething wicked this way comes for AddTypeScriptGenerator should fail if no generator name provided
    Then parameters were invalid
    Then no changes were made
