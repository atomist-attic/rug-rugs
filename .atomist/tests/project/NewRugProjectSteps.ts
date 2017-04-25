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

const pName = "new-test-project";
const owner = "my.rugs";
const version = "0.0.1";
const description = "this is a test of the emergency broadcast system";

When("NewRugProject for NewRugProjectSetParameters", (p, world) => {
    const w = world as ProjectScenarioWorld;
    const generator = w.generator("NewRugProject");
    w.generateWith(generator, pName, { owner, version, description });
});

Then("the Rug archive manifest file exists", (p, world) => {
    return p.fileExists(".atomist/manifest.yml");
});

Then("fileContains atomist manifest yml version for NewRugProjectSetParameters", (p, world) => {
    return p.fileContains(".atomist/manifest.yml", version);
});

Then("the Rug archive manifest file contains the project name", (p, world) => {
    return p.fileContains(".atomist/manifest.yml", pName);
});

Then("fileContains atomist manifest yml owner for NewRugProjectSetParameters", (p, world) => {
    return p.fileContains(".atomist/manifest.yml", owner);
});

Then("not result fileExists CHANGELOG md for NewRugProjectSetParameters", (p, world) => {
    return !p.fileExists("CHANGELOG.md");
});

Then("not result fileExists CODE OF CONDUCT md for NewRugProjectSetParameters", (p, world) => {
    return !p.fileExists("CODE_OF_CONDUCT.md");
});

Then("not result fileExists travis yml for NewRugProjectSetParameters", (p, world) => {
    return !p.fileExists(".travis.yml");
});

Then("fileExists README md for NewRugProjectSetParameters", (p, world) => {
    return p.fileExists("README.md");
});

Then("fileContains README md pName for NewRugProjectSetParameters", (p, world) => {
    return p.fileContains("README.md", "# " + pName);
});

Then("not result fileContains README md Atomist rug editors for NewRugProjectSetParameters", (p, world) => {
    return !p.fileContains("README.md", "Atomist 'rug-rugs'");
});

Then("fileContains README md description for NewRugProjectSetParameters", (p, world) => {
    return p.fileContains("README.md", description);
});

Then("not result fileContains README md editors to create a Rug archive project for NewRugProjectSetParameters",
    (p, world) => {
        return !p.fileContains("README.md", "editors to create a Rug archive project");
    });

Then("not result fileContains README md AddTypeScript editor adds support files for NewRugProjectSetParameters",
    (p, world) => {
        return !p.fileContains("README.md", "AddTypeScript editor adds support files");
    });

Then("fileContains README md https travis ci org owner pName svg branch master for NewRugProjectSetParameters",
    (p, world) => {
        return p.fileContains("README.md", "https://travis-ci.org/" + owner + "/" + pName + ".svg?branch=master");
    });

Then("the README contains the Slack badge", (p, world) => {
    return p.fileContains("README.md",
        "[![Slack Status](https://join.atomist.com/badge.svg)](https://join.atomist.com)");
});

Then("not result fileContains README md NewRugProject for NewRugProjectSetParameters", (p, world) => {
    return !p.fileContains("README.md", "### NewRugProject");
});

Then("not result fileContains README md ruggery for NewRugProjectSetParameters", (p, world) => {
    return !p.fileContains("README.md", "ruggery");
});

Then("fileContains README md rug http docs atomist com for NewRugProjectSetParameters", (p, world) => {
    return p.fileContains("README.md", "[rug]: http://docs.atomist.com/");
});

Then("fileContains README md Support for NewRugProjectSetParameters", (p, world) => {
    return p.fileContains("README.md", "## Support");
});

Then("fileContains README md Development for NewRugProjectSetParameters", (p, world) => {
    return p.fileContains("README.md", "## Development");
});

Then("fileContains README md Created by Atomist atomist for NewRugProjectSetParameters", (p, world) => {
    return p.fileContains("README.md", "---\nCreated by [Atomist][atomist].");
});

Then("fileContains README md Need Help Join our Slack team slack for NewRugProjectSetParameters", (p, world) => {
    return p.fileContains("README.md", "Need Help?  [Join our Slack team][slack].");
});

const dOwner = "my-rugs";
const dDescription = "this is not a test of the emergency broadcast system";

When("NewRugProject for NewRugProjectDefaultParameters", (p, world) => {
    const w = world as ProjectScenarioWorld;
    const generator = w.generator("NewRugProject");
    w.generateWith(generator, pName, { owner: dOwner, description: dDescription });
});

Then("fileContains atomist manifest yml 0 1 0 for NewRugProjectDefaultParameters", (p, world) => {
    return p.fileContains(".atomist/manifest.yml", "0.1.0");
});

Then("fileContains atomist manifest yml owner for NewRugProjectDefaultParameters", (p, world) => {
    return p.fileContains(".atomist/manifest.yml", dOwner);
});

Then("not result fileExists CHANGELOG md for NewRugProjectDefaultParameters", (p, world) => {
    return !p.fileExists("CHANGELOG.md");
});

Then("not result fileExists CODE OF CONDUCT md for NewRugProjectDefaultParameters", (p, world) => {
    return !p.fileExists("CODE_OF_CONDUCT.md");
});

Then("not result fileExists travis yml for NewRugProjectDefaultParameters", (p, world) => {
    return !p.fileExists(".travis.yml");
});

Then("fileExists README md for NewRugProjectDefaultParameters", (p, world) => {
    return p.fileExists("README.md");
});

Then("fileContains README md pName for NewRugProjectDefaultParameters", (p, world) => {
    return p.fileContains("README.md", "# " + pName);
});

Then("not result fileContains README md Atomist rug editors for NewRugProjectDefaultParameters", (p, world) => {
    return !p.fileContains("README.md", "Atomist 'rug-rugs'");
});

Then("fileContains README md description for NewRugProjectDefaultParameters", (p, world) => {
    return p.fileContains("README.md", dDescription);
});

Then("not result fileContains README md editors to create a Rug archive project for NewRugProjectDefaultParameters",
    (p, world) => {
        return !p.fileContains("README.md", "editors to create a Rug archive project");
    });

Then("not result fileContains README md AddTypeScript editor adds support files for NewRugProjectDefaultParameters",
    (p, world) => {
        return !p.fileContains("README.md", "AddTypeScript editor adds support files");
    });

Then("fileContains README md https travis ci org owner pName svg branch master for NewRugProjectDefaultParameters",
    (p, world) => {
        return p.fileContains("README.md", "https://travis-ci.org/" + dOwner + "/" + pName + ".svg?branch=master");
    });

Then("not result fileContains README md NewRugProject for NewRugProjectDefaultParameters", (p, world) => {
    return !p.fileContains("README.md", "### NewRugProject");
});

Then("not result fileContains README md ruggery for NewRugProjectDefaultParameters", (p, world) => {
    return !p.fileContains("README.md", "ruggery");
});

Then("fileContains README md rug http docs atomist com for NewRugProjectDefaultParameters", (p, world) => {
    return p.fileContains("README.md", "[rug]: http://docs.atomist.com/");
});

Then("fileContains README md Support for NewRugProjectDefaultParameters", (p, world) => {
    return p.fileContains("README.md", "## Support");
});

Then("fileContains README md Development for NewRugProjectDefaultParameters", (p, world) => {
    return p.fileContains("README.md", "## Development");
});

Then("fileContains README md Created by Atomist atomist for NewRugProjectDefaultParameters", (p, world) => {
    return p.fileContains("README.md", "---\nCreated by [Atomist][atomist].");
});

Then("fileContains README md Need Help Join our Slack team slack for NewRugProjectDefaultParameters", (p, world) => {
    return p.fileContains("README.md", "Need Help?  [Join our Slack team][slack].");
});
