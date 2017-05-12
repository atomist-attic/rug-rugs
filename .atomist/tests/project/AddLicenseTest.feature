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

Feature: Add license file and license headers to all TS files
  Use an editor to add appropriate LICENSE file to project
  as well to add matching license header comment to each *.ts
  file under specified root directory

  Scenario: AddLicense should edit TS files in given rootDir
    Given a mix of TypeScript files and non TS files
    When the AddLicense is run
    Then parameters were valid
    Then changes were made
    Then the project has new LICENSE
    Then the src/hello1.ts file has license
    Then the src/subdir/hello2.ts file has license
    Then the src/hello3.txt file does not have license
    Then the hello1.ts file has previous code
    Then the test/hello4.ts file has license
    Then the other/hello4.ts file does not have license

  Scenario: AddLicense should edit all TS files
    Given project with existing license and some TypeScript files
    When the AddLicense is run without include parameter
    Then parameters were valid
    Then changes were made
    Then the project has old LICENSE
    Then the hello5.ts file has license
    Then the src/hello6.ts file has license
    Then the test/hello7.ts file has license
