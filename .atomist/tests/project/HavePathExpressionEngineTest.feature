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


Feature: Automatically add path expression to a Rug
  People have difficulty remembering what needs to be imported and
  how to instantiate an instance of the path expression engine.
  Automate it in an editor.


  Scenario: HavePathExpressionEngine puts a path expression in the typescript
    Given a Rug archive manifest
    Given a Rug archive package.json
    Given a TypeScript editor
    When HavePathExpressionEngine is run on TypeScriptEditor
    Then parameters were valid
    Then changes were made
    Then TypeScriptEditor has a path expression const
    Then TypeScriptEditor has the path expression imports
