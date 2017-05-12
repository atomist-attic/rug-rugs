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

import { Project } from "@atomist/rug/model/Project";
import { Given, ProjectScenarioWorld, Then, When } from "@atomist/rug/test/project/Core";

Given("an NPM package file", (p: Project) => {
    p.addFile(".atomist/package.json", `{
  "dependencies": {
    "@atomist/rugs": "0.18.2",
    "mustache": "^2.3.0"
  },
  "devDependencies": {
    "@types/mocha": "^2.2.40",
    "@types/mustache": "^0.8.29",
    "@types/power-assert": "^1.4.29",
    "espower-typescript": "^8.0.0",
    "mocha": "^3.2.0",
    "power-assert": "^1.4.2",
    "tslint": "^5.0.0",
    "typescript": "2.3.2",
    "yarn": "^0.23.4"
  },
  "directories": {
    "test": "mocha"
  },
  "scripts": {
    "lint": "tslint '**/*.ts' --exclude 'node_modules/**' -t verbose",
    "mocha": "mocha --compilers ts:espower-typescript/guess 'mocha/**/*.ts'",
    "test": "yarn run mocha && rug test"
  }
}
`);
});

const handlerName = "MyNewHandler";
const description = "this handler rocks";

When("AddTypeScriptEventHandler is run with default path expression", (p: Project, w: ProjectScenarioWorld) => {
    const editor = w.editor("AddTypeScriptEventHandler");
    w.editWith(editor, { handlerName, description });
});

const pathExpression = `/Push()[/on::Repo()/channel::ChatChannel()]
                            [/contains::Commit()/author::GitHubId()
                                [/hasGithubIdentity::Person()/hasChatIdentity::ChatId()]?]`;
const newRootNode = "Push";

When("AddTypeScriptEventHandler is run providing a path expression", (p: Project, w: ProjectScenarioWorld) => {
    const editor = w.editor("AddTypeScriptEventHandler");
    w.editWith(editor, {
        handlerName,
        description,
        pathExpression,
    });
});

const handlerPath = ".atomist/handlers/event/MyNewHandler.ts";

Then("the event handler file exists", (p: Project, w: ProjectScenarioWorld) => {
    return p.fileExists(handlerPath);
});

Then("the event handler file contains the name", (p: Project, w: ProjectScenarioWorld) => {
    return p.fileContains(handlerPath, `class ${handlerName}`);
});

Then("the event handler file contains the description", (p: Project, w: ProjectScenarioWorld) => {
    return p.fileContains(handlerPath, description);
});

Then("the event handler file contains the default path expression", (p: Project, w: ProjectScenarioWorld) => {
    return p.fileContains(handlerPath, "/Tag()");
});

Then("the event handler file contains the provided path expression", (p: Project, w: ProjectScenarioWorld) => {
    return p.fileContains(handlerPath, pathExpression);
});

Then("the event handler file does not contain the original name", (p: Project, w: ProjectScenarioWorld) => {
    return !p.fileContains(handlerPath, "TypeScriptEventHandler");
});

Then("the event handler file does not contain the original description", (p: Project, w: ProjectScenarioWorld) => {
    return !p.fileContains(handlerPath, "sample TypeScript event handler");
});

Then("the event handler file does not contain the original path expression", (p: Project, w: ProjectScenarioWorld) => {
    return !p.fileContains(handlerPath, "/Tag()");
});

const featurePath = `.atomist/tests/handlers/event/${handlerName}Test.feature`;

Then("the event handler test feature file should exist", (p: Project, w: ProjectScenarioWorld) => {
    return p.fileExists(featurePath);
});

Then("the event handler test feature file contains the name", (p: Project, w: ProjectScenarioWorld) => {
    return p.fileContains(featurePath, handlerName);
});

Then("the event handler test feature file does not contain the original name",
    (p: Project, w: ProjectScenarioWorld) => {
        return !p.fileContains(featurePath, "TypeScriptEventHandler");
    },
);

Then("the event handler file does not contain the original intent", (p: Project, w: ProjectScenarioWorld) => {
    return !p.fileContains(handlerPath, "run TypeScriptEventHandler");
});

const stepsPath = `.atomist/tests/handlers/event/${handlerName}Steps.ts`;

Then("the event handler test steps file should exist", (p: Project, w: ProjectScenarioWorld) => {
    return p.fileExists(stepsPath);
});

Then("the event handler test steps file contains the name", (p: Project, w: ProjectScenarioWorld) => {
    return p.fileContains(stepsPath, handlerName);
});

Then("the event handler test steps file does not contain the original name", (p: Project, w: ProjectScenarioWorld) => {
    return !p.fileContains(stepsPath, "TypeScriptEventHandler");
});

Then("the event handler file should import the proper node type", (p: Project, w: ProjectScenarioWorld) => {
    return p.fileContains(handlerPath, `import { ${newRootNode} } from "@atomist/cortex/${newRootNode}";`);
});

Then("the event handler file should use the proper type parameters", (p: Project, w: ProjectScenarioWorld) => {
    return p.fileContains(handlerPath, `implements HandleEvent<${newRootNode}, ${newRootNode}>`);
});

Then("the event handler file should have the proper root node type", (p: Project, w: ProjectScenarioWorld) => {
    return p.fileContains(handlerPath, `const root: ${newRootNode} = event.root;`);
});

Then("the event handler file should not import the original root node", (p: Project, w: ProjectScenarioWorld) => {
    return !p.fileContains(handlerPath, "import { Tag }");
});

Then("the event handler file should not use the original type parameters", (p: Project, w: ProjectScenarioWorld) => {
    return !p.fileContains(handlerPath, "HandleEvent<Tag, Tag>");
});

Then("the event handler file should not have the original root node type", (p: Project, w: ProjectScenarioWorld) => {
    return !p.fileContains(handlerPath, "const root: Tag = event.root;");
});

Then("the event handler file should define tags", (p: Project, w: ProjectScenarioWorld) => {
    return p.fileContains(handlerPath, "@Tags");
});

Then("the event handler test steps file does not contain the original root node type",
    (p: Project, w: ProjectScenarioWorld) => {
        return !p.fileContains(stepsPath, "Tag");
    },
);

Then("the event handler test feature file does not contain the original root node type",
    (p: Project, w: ProjectScenarioWorld) => {
        return !p.fileContains(featurePath, "Tag");
    },
);
