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


Feature: Automatically increment Rug archive version
  Use an editor to safely and easily increment the
  version of a Rug archive in the package.json file.


  Scenario: BumpVersion should increment the major version
    Given a Rug archive package.json
    When BumpVersion bumps the major version
    Then parameters were valid
    Then changes were made
    Then file at .atomist/package.json should contain "version": "2002.0.0"


  Scenario: BumpVersion should increment the minor version
    Given a Rug archive package.json
    When BumpVersion bumps the minor version
    Then parameters were valid
    Then changes were made
    Then file at .atomist/package.json should contain "version": "2001.6.0"


  Scenario: BumpVersion should increment the patch level
    Given a Rug archive package.json
    When BumpVersion bumps the patch version
    Then parameters were valid
    Then changes were made
    Then file at .atomist/package.json should contain "version": "2001.5.16"


  Scenario: BumpVersion should increment different version
    Given a Rug archive package.json with version 1963.8.28
    When BumpVersion bumps the minor version
    Then parameters were valid
    Then changes were made
    Then file at .atomist/package.json should contain "version": "1963.9.0"


  Scenario: BumpVersion should increment prerelease version
    Given a Rug archive package.json with version 1963.8.28-SNAPSHOT
    When BumpVersion bumps the patch version
    Then parameters were valid
    Then changes were made
    Then file at .atomist/package.json should contain "version": "1963.8.29-SNAPSHOT"


  Scenario: BumpVersion should refuse to change bad version
    Given a Rug archive package.json with version "1.0"
    When BumpVersion bumps the major version
    Then the scenario aborted


  Scenario: BumpVersion should fail if no package.json
    Given an empty project
    When BumpVersion bumps the minor version
    Then the scenario aborted


 Scenario: BumpVersion should convert manifest to package.json when incrementing
    Given a Rug archive manifest with version 1963.8.28
    When BumpVersion bumps the minor version
    Then parameters were valid
    Then changes were made
    Then the manifest was deleted
    Then file at .atomist/package.json should contain "version": "1963.9.0"
