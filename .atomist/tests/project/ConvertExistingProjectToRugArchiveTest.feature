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


Feature: Convert an existing project to a Rug archive project
  Use an editor to add the files needed to convert an
  existing project into a valid Rug archive project.


  Scenario: ConvertExistingProjectToRugArchive should add Rug archive files
    Given an empty project
    When ConvertExistingProjectToRugArchive is run
    Then parameters were valid
    Then changes were made
    Then file at .atomist/package.json should exist
    Then file at .atomist/.gitignore should exist
    Then file at .atomist/build/cli.yml should exist
    Then file at .atomist/tsconfig.json should exist
    Then file at .atomist/tslint.json should exist
    Then file at .atomist/package.json should contain "name": "@rem/reckoning"
    Then file at .atomist/package.json should contain "version": "1984.4.9"
    Then file at .atomist/package.json should not contain js-yaml
    Then file at .atomist/package.json should not contain deprecated-decorator


  Scenario: ConvertExistingProjectToRugArchive should abort when run on a Rug archive project
    Given a package.json
    When ConvertExistingProjectToRugArchive is run
    Then the scenario aborted
