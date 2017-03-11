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


Feature: Add a local editor to current project
  Test the AddLocalEditor editor.
  This editor is useful for automating common tasks within a project.
  Does this really need to be three lines?


  Scenario: AddLocalEditor should work using defaults
    Given the archive root
    When edit with AddLocalEditor using defaults
    Then the new editor file should exist
    Then the new editor file should contain the editor name
    Then the new editor file should contain the default description
    Then the new editor file should contain the editor class
    Then the new editor file should contain the editor instance
    Then the new editor file should not contain the sample editor name
    Then the new editor file should not contain the sample editor description
    Then the new editor file should not contain the sample editor variable
    Then the new editor feature file should exist
    Then the new editor test file should exist


  Scenario: AddLocalEditor should use the provided description
    Given the archive root
    When edit with AddLocalEditor using description
    Then the new editor file should exist
    Then the new editor file should contain the editor name
    Then the new editor file should contain the editor description
    Then the new editor file should contain the editor class
    Then the new editor file should contain the editor instance
    Then the new editor file should not contain the sample editor name
    Then the new editor file should not contain the sample editor description
    Then the new editor file should not contain the sample editor variable
    Then the new editor feature file should exist
    Then the new editor test file should exist


  Scenario: AddLocalEditor should work if there is no .atomist directory
    Given an empty project
    When edit with AddLocalEditor using defaults
    Then the Atomist directory should exist
    Then the manifest file should exist
    Then the npm package file should exist
    Then the TypeScript typings should exist
    Then the new editor file should exist
    Then the new editor file should contain the editor name
    Then the new editor file should contain the default description
    Then the new editor file should contain the editor class
    Then the new editor file should contain the editor instance
    Then the new editor file should not contain the sample editor name
    Then the new editor file should not contain the sample editor description
    Then the new editor file should not contain the sample editor variable
    Then the new editor feature file should exist
    Then the new editor test file should exist
