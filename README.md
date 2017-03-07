# Atomist 'rug-editors'

[![Build Status](https://travis-ci.org/atomist-rugs/rug-editors.svg?branch=master)](https://travis-ci.org/atomist-rugs/rug-editors)
[![Slack Status](https://join.atomist.com/badge.svg)](https://join.atomist.com)

This [Rug][rug] archive contains editors to create a a Rug archive
from an existing project and to add editors and generators to Rug
archives.  Most meta.

[rug]: http://docs.atomist.com/

## Rugs

### AddManifestYml

The AddManifestYml editor adds the Rug archive `manifest.yml` file to
your project.

#### Prerequisites

Before running this editor, you must have the following prerequisites
satisfied.

*   A source code repository that does not have a
    `.atomist/manifest.yml`

#### Parameters

To run this editor, you must supply the following parameters.

Name | Required | Default | Description
-----|----------|---------|------------
`archive_name` | Yes | | Name of the new Rug archive, typically the same as the repo name
`group_id` | Yes | | Maven group ID, e.g., "company-rugs", typically the GitHub owner of the repo
`version` | No | 0.1.0 | [Semantic version][semver] of the project.

#### Running

Run it as follows:

```
$ cd project/directory
$ rug edit atomist-rugs:rug-editors:AddManifestYml \
    archive_name=my-new-archive \
    group_id=my-rugs \
    version=2.71.828
```

This will add the file `.atomist/manifest.yml` to the project.

### AddTypeScript

The AddTypeScript editor adds support files so that you can write your
Rugs in TypeScript.

#### Prerequisites

Before running this editor, you must have the following prerequisites
satisfied.

*   A Rug archive source code repository

#### Parameters

This editor has no parameters.

#### Running

Run it as follows:

```
$ cd rug/project/directory
$ rug edit atomist-rugs:rug-editors:AddTypeScript
```

This will add `package.json`, `tsconfig.json`, and `.gitignore` files
and the `node_modules` directory to the `.atomist` directory in the
project.

### AddTypeScriptEditor

The AddTypeScriptEditor editor adds a sample TypeScript editor and
corresponding test to your Rug project.

#### Prerequisites

Before running this editor, you must have the following prerequisites
satisfied.

*   A Rug archive source code repository set up for TypeScript

#### Parameters

To run this editor, you must supply the following parameters.

Name | Required | Default | Description
-----|----------|---------|------------
`editor_name` | Yes | | A valid Rug editor name between 1-100 characters, starting with a capital letter, and containing only alphanumeric characters
`description` | Yes | | A description of the generator being added

#### Running

Run it as follows:

```
$ cd rug/project/directory
$ rug edit atomist-rugs:rug-editors:AddTypeScriptEditor \
    editor_name=MyNewEditor \
    description="This is my newest editor... in TypeScript!"
```

This will add the files `.atomist/editors/MyNewEditor.ts` and
`.atomist/tests/MyNewEditor.rt` to the project.

### AddTypeScriptExecutor

The AddTypeScriptExecutor editor adds a Rug TypeScript editor to an existing Rug Archive.

#### Prerequisites

Before running this editor, you must have the following prerequisites
satisfied.

*   A Rug archive source code repository set up for TypeScript

#### Parameters

To run this editor, you must supply the following parameters.

Name | Required | Default | Description
-----|----------|---------|------------
`executor_name` | Yes | | A valid Rug Executor name starting with a capital letter and containing only alphanumeric characters from one to 100 characters long.
`description` | Yes | | A brief description of the new executor.
`bot_intent` | Yes | | The phrase that will be used to run this executor from the Bot.

#### Running

Run it as follows:

```
$ cd rug/project/directory
$ rug edit atomist-rugs:rug-editors:AddTypeScriptExecutor \
    executor_name=MyNewExecutor \
    description="This is going to create something great." \
    bot_intent="do it"
```

This will add a
`.atomist/executors/MyNewExecutor.ts` file to the project.

### AddTypeScriptGenerator

The AddTypeScriptGenerator editor adds a sample TypeScript generator
and corresponding test to your Rug project.

#### Prerequisites

Before running this editor, you must have the following prerequisites
satisfied.

*   A Rug archive source code repository set up for TypeScript

#### Parameters

To run this editor, you must supply the following parameters.

Name | Required | Default | Description
-----|----------|---------|------------
`generator_name` | Yes | | A valid Rug generator name between 1-100 characters, starting with a capital letter, and containing only alphanumeric characters
`description` | Yes | | A description of the generator being added

#### Running

Run it as follows:

```
$ cd rug/project/directory
$ rug edit atomist-rugs:rug-editors:AddTypeScriptGenerator \
    generator_name=MyNewGenerator \
    description="This is my newest generator."
```

This will add the files `.atomist/editors/MyNewGenerator.ts` and
`.atomist/tests/MyNewGenerator.rt` to the project.

### AddTypeScriptHandler

The AddTypeScriptHandler editor adds a sample TypeScript handler
and corresponding test to your Rug project.

#### Prerequisites

Before running this editor, you must have the following prerequisites
satisfied.

*   A Rug archive source code repository set up for TypeScript

#### Parameters

To run this editor, you must supply the following parameters.

Name | Required | Default | Description
-----|----------|---------|------------
`handler_name` | Yes | | A valid Rug handler name between 1-100 characters, starting with a capital letter, and containing only alphanumeric characters
`description` | Yes | | A description of the handler being added
`path_expression` | No | `/Tag()` | Path expression to the event in Atomist that will trigger this handler

#### Running

Run it as follows:

```
$ cd rug/project/directory
$ rug edit atomist-rugs:rug-editors:AddTypeScriptHandler \
    handler_name=MyNewHandler \
    description="This is my newest handler."
```

This will add the file `.atomist/handlers/MyNewHandler.ts` to the
project.

### ConvertExistingProjectToGenerator

The ConvertExistingProjectToGenerator editor creates a valid Rug
generator from the current project.  It does not make sense to run
this more than once on a project.

#### Prerequisites

Before running this editor, you must have the following prerequisites
satisfied.

*   A source code repository for a "model" project that does not have
    a `.atomist/manifest.yml`

#### Parameters

To run this editor, you must supply the following parameters.

Name | Required | Default | Description
-----|----------|---------|------------
`archive_name` | Yes | | Name of the new Rug archive, typically the same as the repo name
`group_id` | Yes | | Maven group ID, e.g., "company-rugs", typically the GitHub owner of the repo
`version` | No | 0.1.0 | [Semantic version][semver] of the project.
`generator_name` | Yes | | A valid Rug generator name between 1-100 characters, starting with a capital letter, and containing only alphanumeric characters
`description` | Yes | | A description of the generator being added

#### Running

Run it as follows:

```
$ cd project/directory
$ rug edit atomist-rugs:rug-editors:ConvertExistingProjectToGenerator \
    archive_name=my-new-archive \
    group_id=my-rugs \
    version=2.71.828 \
    generator_name=MyNewGenerator \
    description="This is my newest generator."
```

This will create a `.atomist` directory to the root of the project.
The `.atomist` directory will have valid `manifest.yml` and
`package.json` files, the generator script in
`editors/MyNewGenerator.ts`, and its test in
`tests/MyNewGenerator.rt`.

### ConvertExistingProjectToRugArchive

The ConvertExistingProjectToRugArchive editor creates a valid Rug
archive in the current project.  It does not make sense to run this
more than once on a project.

#### Prerequisites

Before running this editor, you must have the following prerequisites
satisfied.

*   A source code repository that does not have a
    `.atomist/manifest.yml`

#### Parameters

To run this editor, you must supply the following parameters.

Name | Required | Default | Description
-----|----------|---------|------------
`archive_name` | Yes | | Name of the new Rug archive, typically the same as the repo name
`group_id` | Yes | | Maven group ID, e.g., "company-rugs", typically the GitHub owner of the repo
`version` | No | 0.1.0 | [Semantic version][semver] of the project.

#### Running

Run it as follows:

```
$ cd project/directory
$ rug edit atomist-rugs:rug-editors:ConvertExistingProjectToRugArchive \
    archive_name=my-new-archive \
    group_id=my-rugs \
    version=2.71.828
```

This will add the file `.atomist/manifest.yml` to the project.

## Support

General support questions should be discussed in the `#support`
channel on our community Slack team
at [atomist-community.slack.com][slack].

If you find a problem, please create an [issue][].

[issue]: https://github.com/atomist-rugs/rug-editors/issues

## Development

You can build, test, and install the project locally with
the [Rug CLI][cli].

[cli]: https://github.com/atomist/rug-cli

```
$ rug test
$ rug install
```

To create a new release of the project, simply push a tag of the form
`M.N.P` where `M`, `N`, and `P` are integers that form the next
appropriate [semantic version][semver] for release.  For example:

[semver]: http://semver.org

```
$ git tag -a 1.2.3
```

The Travis CI build (see badge at the top of this page) will
automatically create a GitHub release using the tag name for the
release and the comment provided on the annotated tag as the contents
of the release notes.  It will also automatically upload the needed
artifacts.

---
Created by [Atomist][atomist].
Need Help?  [Join our Slack team][slack].

[atomist]: https://www.atomist.com/
[slack]: https://join.atomist.com/
