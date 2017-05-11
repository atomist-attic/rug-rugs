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

Feature: Bring a Rug project up to the latest versions and conventions
  We should be able to update a Rug project files to use
  the latest version of rug and @atomist/rugs as well as
  the latest TypeScript and build configuration.


  Scenario: UpdateRug should safely update Rug dependencies and support files
    Given a Rug archive manifest
    Given an NPM package file
    When UpdateRug is run
    Then parameters were valid
    Then changes were made
    Then file at .atomist/manifest.yml should exist
    Then file at .atomist/package.json should exist
    Then the manifest file requires the current version of rug
    Then file at .atomist/manifest.yml should contain group: non-atomist
    Then file at .atomist/manifest.yml should contain artifact: some-rugs
    Then file at .atomist/manifest.yml should contain version: "28.8.1963"
    Then the package file depends on the current version of rugs
    Then file at .atomist/package.json should contain "mustache": "^2.3.0"
    Then file at .atomist/package.json should contain devDependencies
    Then file at .atomist/package.json should contain "test": "mocha"
    Then file at .atomist/package.json should contain "lint": "tslint '**/*.ts' --exclude 'node_modules/**' -t verbose",
    Then file at .atomist/.gitignore should exist
    Then file at .atomist/tsconfig.json should exist
    Then file at .atomist/tslint.json should exist
    Then file at .atomist/build/travis-build.bash should exist
    Then file at .atomist/build/cli.yml should exist


  Scenario: UpdateRug should abort if project is not a Rug project
    Given an empty project
    When UpdateRug is run
    Then the scenario aborted
