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
    Given a Rug archive package.json
    Given a Travis CI config
    When edit with UpdateSupportFiles
    Then parameters were valid
    Then changes were made
    Then file at .atomist/package.json should exist
    Then file at .atomist/package.json should contain "@atomist/rugs":
    Then file at .atomist/package.json should contain "test": "mocha"
    Then file at .atomist/package.json should contain "autotest": "supervisor -q -n exit -e ts -x npm -- run mocha"
    Then file at .atomist/package.json should contain "lint": "tslint '**/*.ts' --exclude 'node_modules/**' --exclude 'target/**' -t verbose"
    Then file at .atomist/package.json should contain "mocha": "mocha --compilers ts:espower-typescript/guess 'mocha/**/*.ts'"
    Then file at .atomist/package.json should contain "test": "npm run mocha && rug test"
    Then file at .atomist/package.json should contain "compile": "tsc -p ."
    Then file at .atomist/package.json should contain "clean": "npm run clean-js ; rug clean"
    Then file at .atomist/package.json should contain "lint-fix": "npm run lint -- --fix"
    Then file at .atomist/package.json should contain "distclean": "npm run clean ; rm -rf node_modules"
    Then file at .atomist/tsconfig.json should exist
    Then file at .atomist/tsconfig.json should contain suppressImplicitAnyIndexErrors
    Then file at .atomist/tsconfig.json should contain outDir
    Then file at .atomist/.gitignore should exist
    Then file at .atomist/.gitignore should contain npm-debug.log
    Then directory at .atomist/node_modules should not exist
    Then file at .atomist/tslint.json should exist
    Then file at .atomist/build/cli.yml should exist
    Then file at .atomist/build/cli.yml should contain release
    Then there should not be deprecated CLI config files
    Then file at .atomist/build/publish-to-team should exist
    Then file at .atomist/build/travis-build.bash should contain if ! $rug publish -a "$project_version" -i release; then
    Then file at .gitattributes should contain .atomist.yml linguist-generated=true
    Then file at CODE_OF_CONDUCT.md should exist
    Then file at CONTRIBUTING.md should exist
    Then the Travis CI config should be up to date


  Scenario: UpdateSupportFile should abort if the target project is not a Rug archive
    Given an empty project
    When edit with UpdateSupportFiles
    Then the scenario aborted


  Scenario: UpdateSupportFiles should safely update gitattributes
    Given a Rug archive package.json
    Given a Travis CI config
    Given a gitattributes file
    When edit with UpdateSupportFiles
    Then parameters were valid
    Then changes were made
    Then file at .gitattributes should contain .atomist.yml linguist-generated=true
    Then file at .gitattributes should contain *.class binary
    Then file at .gitattributes should contain *.dll binary


  Scenario: UpdateSupportFiles should remove old CLI config files
    Given a Rug archive package.json
    Given a Travis CI config
    Given old build CLI configs
    When edit with UpdateSupportFiles
    Then parameters were valid
    Then changes were made
    Then there should not be deprecated CLI config files
