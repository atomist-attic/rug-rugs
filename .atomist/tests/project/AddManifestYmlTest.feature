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


Feature: Tests from AddManifestYml.rt
  This file was autogenerated.
  It aims to avoid collisions, not remove redundancy.
  You can probably consolidate a lot of the elements.


  Scenario: AddManifestYml should add the Rug manifest
    Given an empty project
    When AddManifestYml for AddManifestYml should add the Rug manifest
    Then parameters were valid
    Then changes were made
    Then fileExists manifest for AddManifestYml should add the Rug manifest
    Then fileContains manifest artifact archiveName for AddManifestYml should add the Rug manifest
    Then fileContains manifest group groupId for AddManifestYml should add the Rug manifest
    Then fileContains manifest version for AddManifestYml should add the Rug manifest
    Then not result fileContains manifest rug editors for AddManifestYml should add the Rug manifest
    Then not result fileContains manifest atomist rugs for AddManifestYml should add the Rug manifest
    Then not result fileContains manifest repo for AddManifestYml should add the Rug manifest
    Then not result fileContains manifest branch for AddManifestYml should add the Rug manifest
    Then not result fileContains manifest sha for AddManifestYml should add the Rug manifest
    Then not result fileContains manifest for AddManifestYml should add the Rug manifest


  Scenario: AddManifestYml should add the Rug manifest using default version
    Given an empty project
    When AddManifestYml for AddManifestYml should add the Rug manifest using default version
    Then parameters were valid
    Then changes were made
    Then fileExists manifest for AddManifestYml should add the Rug manifest using default version
    Then fileContains manifest artifact archiveName for AddManifestYml should add the Rug manifest using default version
    Then fileContains manifest group groupId for AddManifestYml should add the Rug manifest using default version
    Then fileContains manifest 0 1 0 for AddManifestYml should add the Rug manifest using default version


  Scenario: AddManifestYml should fail if parameters are missing
    Given an empty project
    When AddManifestYml archiveName is my-rug-archive for AddManifestYml should fail if parameters are missing
    Then parameters were invalid
    Then no changes were made


  Scenario: AddManifestYml should make no change if project already contains a manifest
    Given the archive root
    When AddManifestYml archiveName is my-rug-archive, groupId is my-rug-group, version is 0.0.1 for AddManifestYml should make no change if project already contains a manifest
    Then parameters were valid
    Then no changes were made
