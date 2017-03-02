/*
 * Copyright © 2017 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Project, File } from '@atomist/rug/model/Core'
import { PathExpression, PathExpressionEngine } from '@atomist/rug/tree/PathExpression'

export function addAssertionsForAllFilesInProject(project: Project, generatorName: string): void {
    let originalTestAssertionsString = "then\n  fileExists \"README.md\""

    let testAssertionsString = project.files().reduce(function(acc, file) {
      if (notACommonPeripheralArtifact(file)) {
          if(acc === "then") {
            acc +=  "\n  ";
          } else {
            acc +=  "\n    and ";
          }
          acc += `fileExists \"{file.path()}\"`;
      }
      return acc;
    },"then")

    let eng: PathExpressionEngine = project.context().pathExpressionEngine();
    let testPathExpression = new PathExpression<Project, File>("/*[@name='.atomist']/tests/*[@name='" + generatorName + ".rt']");
    let testFile: File = eng.scalar(project, testPathExpression);
    testFile.replace(originalTestAssertionsString, testAssertionsString)
}

function notACommonPeripheralArtifact(file: File): boolean {
    return (file.path().search("node_modules") < 0) &&
           (file.path().search(".idea") < 0) && 
           (file.path().search("target") < 0) &&
           (file.path().search(".atomist") < 0)
}
