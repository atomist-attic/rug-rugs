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

Feature: Ready Rug Project for TypeScript
  The AddTypeScript editor should add TypeScript supporting files to a
  Rug project


  Scenario: AddTypeScript should add support files for writing Rugs in TypeScript
    Given a Rug archive manifest
    When edit with AddTypeScript
    Then there should be a package file
    Then the package file depends on rugs
    Then there should be a tsconfig file
    Then the tsconfig file should have standard contents
    Then the node modules directory should not exist
    Then the rug interfaces should not exist


  Scenario: AddTypeScript should not make changes if the target project is not a Rug archive
    Given an empty project
    When edit with AddTypeScript
    Then no changes were made
