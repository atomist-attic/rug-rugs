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


Feature: Create a new Rug project with sensible defaults
  Provide an easy path for people to create a Rug
  project without having to answer a lot of questions
  they might not understand.


  Scenario: NewStarterRugProject should create a Rug project
    Given an empty project
    When NewStarterRugProject creates breeders
    Then parameters were valid
    Then file at .atomist/package.json should exist
    Then file at .atomist/package.json should contain "version": "0.1.0"
    Then file at .atomist/package.json should contain "name": "@atomist-contrib/breeders"
    Then file at .atomist/package.json should contain "@atomist/rugs"
    Then file at CHANGELOG.md should exist
    Then file at CHANGELOG.md should contain [0.1.0]
    Then file at CHANGELOG.md should contain All notable changes to this project will be documented in this file.
    Then file at CHANGELOG.md should contain https://github.com/atomist-contrib/breeders/compare/0.1.0...HEAD
    Then file at CHANGELOG.md should not contain rug-rugs
    Then file at CHANGELOG.md should not contain 0.2.0
    Then file at CHANGELOG.md should not contain NewRugProject
    Then file at .travis.yml should not exist
    Then file at LICENSE should exist
    Then file at LICENSE should contain APPENDIX: How to apply the Apache License to your work
    Then file at README.md should exist
    Then file at README.md should contain # breeders
    Then file at README.md should not contain Atomist 'rug-rugs'
    Then file at README.md should contain Atomist Rug archive project
    Then file at README.md should not contain editors to create a Rug archive project
    Then file at README.md should not contain AddTypeScript
    Then file at README.md should contain https://travis-ci.org/atomist-contrib/breeders.svg?branch=master
    Then file at README.md should contain [![Slack Status](https://join.atomist.com/badge.svg)](https://join.atomist.com)
    Then file at README.md should not contain ### NewRugProject
    Then file at README.md should not contain ruggery
    Then file at README.md should contain [rug]: http://docs.atomist.com/
    Then file at README.md should contain ## Support
    Then file at README.md should contain ## Development
    Then file at README.md should contain Created by [Atomist][atomist].
    Then file at README.md should contain Need Help?  [Join our Slack team][slack].
    Then file at .atomist/tsconfig.json should exist
    Then file at .atomist/tsconfig.json should contain "experimentalDecorators": true
    Then file at .atomist/editors/MyFirstEditor.ts should exist
    Then file at .atomist/editors/MyFirstEditor.ts should contain "a sample Rug TypeScript editor"
    Then file at .atomist/tests/project/MyFirstEditorTest.feature should exist
    Then file at .atomist/tests/project/MyFirstEditorSteps.ts should exist
    Then file at .atomist/tests/project/MyFirstEditorSteps.ts should contain MyFirstEditor
    Then file at .atomist/handlers/command/MyFirstCommandHandler.ts should exist
    Then file at .atomist/handlers/event/MyFirstEventHandler.ts should exist
