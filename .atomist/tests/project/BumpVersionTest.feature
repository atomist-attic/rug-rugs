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
  version of a Rug archive in the manifest file.


  Scenario: BumpVersion should increment the major version
    Given a Rug archive manifest
    When BumpVersion bumps the major version
    Then parameters were valid
    Then changes were made
    Then file at .atomist/manifest.yml should contain version: "29.0.0"


  Scenario: BumpVersion should increment the minor version
    Given a Rug archive manifest
    When BumpVersion bumps the minor version
    Then parameters were valid
    Then changes were made
    Then file at .atomist/manifest.yml should contain version: "28.9.0"


  Scenario: BumpVersion should increment the patch level
    Given a Rug archive manifest
    When BumpVersion bumps the patch version
    Then parameters were valid
    Then changes were made
    Then file at .atomist/manifest.yml should contain version: "28.8.1964"


  Scenario: BumpVersion should increment version without quotes
    Given a Rug archive manifest with version 17.6.3
    When BumpVersion bumps the minor version
    Then parameters were valid
    Then changes were made
    Then file at .atomist/manifest.yml should contain version: "17.7.0"


  Scenario: BumpVersion should increment prerelease version
    Given a Rug archive manifest with version 17.6.3-SNAPSHOT
    When BumpVersion bumps the patch version
    Then parameters were valid
    Then changes were made
    Then file at .atomist/manifest.yml should contain version: "17.6.4-SNAPSHOT"


  Scenario: AddManifestYml should refuse to change bad version
    Given a Rug archive manifest with version "1.0"
    When BumpVersion bumps the major version
    Then the scenario aborted


  Scenario: AddManifestYml should fail if no manifest
    Given an empty project
    When BumpVersion bumps the minor version
    Then the scenario aborted
