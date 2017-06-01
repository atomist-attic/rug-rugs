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
    Then parameters were valid
    Then changes were made
    Then there should be a package file
    Then the package file depends on rugs
    Then file at .atomist/tsconfig.json should exist
    Then the tsconfig file should have standard contents
    Then file at .atomist/tsconfig.json should contain outDir
    Then file at .atomist/.gitignore should exist
    Then file at .atomist/.gitignore should contain npm-debug.log
    Then the node modules directory should not exist
    Then the rug interfaces should not exist
    Then file at .atomist/tslint.json should exist
    Then file at .atomist/build/cli.yml should exist
    Then there should not be deprecated CLI config files
    Then file at .atomist/build/travis-build.bash should contain export TEAM_ID=
    Then file at .gitattributes should contain .atomist.yml linguist-generated=true


  Scenario: UpdateSupportFile should not make changes if the target project is not a Rug archive
    Given an empty project
    When edit with UpdateSupportFiles
    Then the scenario aborted


  Scenario: UpdateSupportFiles should safely update gitattributes
    Given a Rug archive manifest
    Given a Travis CI config
    Given a gitattributes file
    When edit with UpdateSupportFiles
    Then parameters were valid
    Then changes were made
    Then file at .gitattributes should contain .atomist.yml linguist-generated=true
    Then file at .gitattributes should contain *.class binary
    Then file at .gitattributes should contain *.dll binary
