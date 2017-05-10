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
    Given a manifest file
    When BumpVersion bumps the major version
    Then parameters were valid
    Then changes were made
    Then file at .atomist/manifest.yml should contain version: "1.0.0"


  Scenario: BumpVersion should increment the minor version
    Given a manifest file
    When BumpVersion bumps the minor version
    Then parameters were valid
    Then changes were made
    Then file at .atomist/manifest.yml should contain version: "0.2.0"


  Scenario: BumpVersion should increment the patch level
    Given a manifest file
    When BumpVersion bumps the patch version
    Then parameters were valid
    Then changes were made
    Then file at .atomist/manifest.yml should contain version: "0.1.1"


  Scenario: AddManifestYml should refuse to change bad version
    Given a bad manifest file
    When BumpVersion bumps the major version
    Then the scenario aborted
