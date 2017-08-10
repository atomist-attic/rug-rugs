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


Feature: Create a customized new Rug project
  Users should be able to create a minimal Rug project with
  the appropriate name, group, and version.


  Scenario: Create a NewRugProject
    Given an empty project
    When NewRugProject creates gentlemen
    Then parameters were valid
    Then file at .atomist/package.json should exist
    Then file at .atomist/package.json should contain "version": "1993.10.5"
    Then file at .atomist/package.json should contain "name": "@afghan-whigs/gentlemen"
    Then file at .atomist/package.json should contain "@atomist/rugs"
    Then file at CHANGELOG.md should not exist
    Then file at CODE_OF_CONDUCT.md should exist
    Then file at CONTRIBUTING.md should exist
    Then file at travis.yml should not exist
    Then file at README.md should exist
    Then file at README.md should contain # gentlemen
    Then file at README.md should not contain Atomist 'rug-rugs'
    Then file at README.md should contain my curse
    Then file at README.md should not contain editors to create a Rug archive project
    Then file at README.md should not contain AddTypeScript
    Then file at README.md should contain https://travis-ci.org/afghan-whigs/gentlemen.svg?branch=master
    Then file at README.md should not contain ### NewRugProject
    Then file at README.md should not contain ruggery
    Then file at README.md should contain [rug]: http://docs.atomist.com/
    Then file at README.md should contain ## Support
    Then file at README.md should contain ## Development
    Then file at README.md should contain Created by [Atomist][atomist].
    Then file at README.md should contain Need Help?  [Join our Slack team][slack].
