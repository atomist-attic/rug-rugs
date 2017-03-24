# Atomist 'rug-editors'

[![Build Status](https://travis-ci.org/atomist-rugs/rug-editors.svg?branch=master)](https://travis-ci.org/atomist-rugs/rug-editors)
[![Slack Status](https://join.atomist.com/badge.svg)](https://join.atomist.com)

[rug]: http://docs.atomist.com/

This [Rug][rug] project contains generators for creating a Rug archive
project, editors to create a Rug archive project from an existing
project, and editors to add Rugs to Rug projects.  Most meta.

## Rugs

### AddLocalEditor

The AddLocalEditor editor adds an editor for modifying the local
project, initiating a Rug archive if needed.

#### Prerequisites

A source code project.

#### Parameters

This Rug takes following parameters.

Name | Required | Default | Description
-----|----------|---------|------------
`editorName` | Yes | | Name of the editor to add, it should start with a capital letter and contain only alphanumeric characters
`description` | No | "an editor for modifying this project" | A short description of what the editor will do

#### Running

Run this Rug as follows:

```
$ cd project/directory
$ rug edit atomist-rugs:rug-editors:AddLocalEditor \
    editorName=MyLocalEditor \
    description='does something useful'
```

This will add a Rug editor as `.atomist/editors/MyLocalEditor.ts`.  If
the project is currently set up for Atomist, it will also create the
`.atomist` directory with appropriate initial contents like the
`manifest.yml` and `package.json` files and the Rug TypeScript typings
in the `node_modules` directory.

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
`archiveName` | Yes | | Name of the new Rug archive, typically the same as the repo name
`groupId` | Yes | | Maven group ID, e.g., "company-rugs", typically the GitHub owner of the repo
`version` | No | 0.1.0 | [Semantic version][semver] of the project.

#### Running

Run it as follows:

```
$ cd project/directory
$ rug edit atomist-rugs:rug-editors:AddManifestYml \
    archiveName=my-new-archive \
    groupId=my-rugs \
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
to the `.atomist` directory in the project.  You will need to install
the [node][] dependencies using NPM.

```
$ ( cd .atomist && npm install )
```

[node]: https://nodejs.org/

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
`editorName` | Yes | | A valid Rug editor name between 1-100 characters, starting with a capital letter, and containing only alphanumeric characters
`description` | Yes | | A description of the generator being added

#### Running

Run it as follows:

```
$ cd rug/project/directory
$ rug edit atomist-rugs:rug-editors:AddTypeScriptEditor \
    editorName=MyNewEditor \
    description="This is my newest editor... in TypeScript!"
```

This will add the files `.atomist/editors/MyNewEditor.ts` and
`.atomist/tests/MyNewEditor.rt` to the project.

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
`generatorName` | Yes | | A valid Rug generator name between 1-100 characters, starting with a capital letter, and containing only alphanumeric characters
`description` | Yes | | A description of the generator being added

#### Running

Run it as follows:

```
$ cd rug/project/directory
$ rug edit atomist-rugs:rug-editors:AddTypeScriptGenerator \
    generatorName=MyNewGenerator \
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
`handlerName` | Yes | | A valid Rug handler name between 1-100 characters, starting with a capital letter, and containing only alphanumeric characters
`description` | Yes | | A description of the handler being added
`pathExpression` | No | `/Tag()` | Path expression to the event in Atomist that will trigger this handler

#### Running

Run it as follows:

```
$ cd rug/project/directory
$ rug edit atomist-rugs:rug-editors:AddTypeScriptHandler \
    handlerName=MyNewHandler \
    description="This is my newest handler." \
    pathExpression="/Issue()"
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
`archiveName` | Yes | | Name of the new Rug archive, typically the same as the repo name
`groupId` | Yes | | Maven group ID, e.g., "company-rugs", typically the GitHub owner of the repo
`version` | No | 0.1.0 | [Semantic version][semver] of the project.
`generatorName` | Yes | | A valid Rug generator name between 1-100 characters, starting with a capital letter, and containing only alphanumeric characters
`description` | Yes | | A description of the generator being added

#### Running

Run it as follows:

```
$ cd project/directory
$ rug edit atomist-rugs:rug-editors:ConvertExistingProjectToGenerator \
    archiveName=my-new-archive \
    groupId=my-rugs \
    version=2.71.828 \
    generatorName=MyNewGenerator \
    description="This is my newest generator."
```

This will create a `.atomist` directory to the root of the project.
The `.atomist` directory will have valid `manifest.yml` and TypeScript
files, the generator script in `editors/MyNewGenerator.ts`, and its
test in `tests/MyNewGenerator.rt`.  You will need to install
the [node][] dependencies using NPM.

```
$ ( cd .atomist && npm install )
```

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
`archiveName` | Yes | | Name of the new Rug archive, typically the same as the repo name
`groupId` | Yes | | Maven group ID, e.g., "company-rugs", typically the GitHub owner of the repo
`version` | No | 0.1.0 | [Semantic version][semver] of the project.

#### Running

Run it as follows:

```
$ cd project/directory
$ rug edit atomist-rugs:rug-editors:ConvertExistingProjectToRugArchive \
    archiveName=my-new-archive \
    groupId=my-rugs \
    version=2.71.828
```

This will add the file `.atomist/manifest.yml` to the project.

### NewRugProject

The NewRugProject generator creates a new empty Rug archive project.
The generated project will have a `.atomist` directory and an
appropriate `.atomist/manifest.yml` file, but no Rugs.  If you want a
simple way to create a more complete Rug project with a sample editor
and tests, see [NewStarterRugProject](#newstarterrugproject).

#### Prerequisites

There are no prerequisites to running this generator.

#### Parameters

To run this generator, you must supply the following parameters.

Name | Required | Default | Description
-----|----------|---------|------------
Project Name | Yes | |  A valid GitHub repository name, which contains alphanumeric, `_`, and `-` characters
`groupId` | Yes | |  Maven group ID, e.g., "company-rugs", typically the GitHub owner of the repo being created is used
`description` | Yes | | A brief description of the project
`version` | No | 0.1.0 | [Semantic version][semver] of the project

#### Running

Run it as follows:

```
$ cd parent/directory
$ rug generate atomist-rugs:rug-editors:NewRugProject \
    ruggery \
    groupId=persian-rugs \
    description="Rug archive to hold my Rugs" \
    version=0.1.0
```

Note the first parameter, the `projectName`, is different in that you
do not need to supply the name of the parameter, just the value.  This
is because the `projectName` parameter is required for all
generators.  This will create a directory named `ruggery` and populate
it with a working Rug archive project.  You can use the editors in
this project to add Rugs to the generated project.

### NewStarterRugProject

The NewStarterRugProject generator creates a new Rug archive project
using a standard layout, sensible defaults, TypeScript dependencies,
and a simple TypeScript editor.  It is a great way to get started
writing Rugs!

#### Prerequisites

There are no prerequisites to running this generator.

#### Parameters

To run this generator, you must supply the following parameters.

Name | Required | Default | Description
-----|----------|---------|------------
Project Name | Yes | |  A valid GitHub repository name, which contains alphanumeric, `_`, and `-` characters

#### Running

Run it as follows:

```
$ cd parent/directory
$ rug generate atomist-rugs:rug-editors:NewStarterRugProject ruggery
```

Note the project name parameter is different in that you do not need
to supply the name of the parameter, just the value.  This is because
the project name parameter is required for all generators.  This will
create a directory named `ruggery` and populate it with a working Rug
archive project with a standard layout and TypeScript dependencies and
a simple editor.  It will also contain supporting files, e.g., a
license and code of conduct.  You can use the editors in this project
to add more Rugs to the generated project.

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
