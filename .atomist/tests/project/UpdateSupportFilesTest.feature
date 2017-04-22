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

Feature: Keep TypeScript support and build files up to date
  An editor should take the TypeScript support files and Travis CI
  build files from this project and use them to update the versions
  in other Rug projects.


  Scenario: UpdateSupportFiles should update the files
    Given a Rug archive manifest
    Given a Travis CI config
    When edit with UpdateSupportFiles
    Then there should be a package file
    Then the package file depends on rug
    Then there should be a tsconfig file
    Then the tsconfig file should have standard contents
    Then the tsconfig file should set output directory
    Then there should be a gitignore file
    Then the gitignore file should ignore npm logs
    Then the node modules directory should not exist
    Then the rug interfaces should not exist
    Then there should be a tslint file
    Then there should be a CLI config file
    Then there should not be deprecated CLI config files
    Then the travis build script should set team ID
    Then the travis config should install yarn


  Scenario: UpdateSupportFile should not make changes if the target project is not a Rug archive
    Given an empty project
    When edit with UpdateSupportFiles
    Then no changes were made
