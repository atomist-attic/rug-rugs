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

Feature: Convert manifest.yml to package.json
  Use an editor to convert an existing manfiest.yml to a package.json
  honoring existing content in package.json. The editor create a new 
  package.json file if non exists.

  Scenario: Do not convert package.json if no manifest.yml exists
    Given an empty project
    When the ConvertManifestToPackageJson is run
    Then no changes were made

  Scenario: Merge manifest.yml into existing package.json
    Given a manifest.yml
    Given a package.json
    When the ConvertManifestToPackageJson is run
    Then the manifest.yml got merged into package.json
    Then the package.json has previous entries
    Then the manifest.yml got deleted

  Scenario: Convert manifest.yml into new package.json
    Given a manifest.yml
    When the ConvertManifestToPackageJson is run
    Then the manifest.yml got merged into package.json
    Then the package.json has previous entries
    Then the manifest.yml got deleted

