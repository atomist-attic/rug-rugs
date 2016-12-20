# Atomist 'rug-editors'

[![Build Status](https://travis-ci.org/atomist-rugs/rug-editors.svg?branch=master)](https://travis-ci.org/atomist-rugs/rug-editors)
[![Slack Status](https://join.atomist.com/badge.svg)](https://join.atomist.com)

This [Rug][rug] archive contains a Editors to create a a Rug Archive
from an existing project and add Editors and Generators to Rug
Archives.  Most meta.

[rug]: http://docs.atomist.com/

## Rugs

### AddRugEditor

The AddRugEditor Editor adds a simple Editor to a Rug Archive project.

#### Prerequisites

Before running this Editor, you must have the following prerequisites
satisfied.

*   A Rug Archive source code repository

#### Parameters

To run this Editor, you must supply the following parameters.

Name | Required | Default | Description
-----|----------|---------|------------
`editor_name` | Yes | | A valid Rug Editor name starting with a capital letter and containing only alphanumberic characters from one to 100 characters long.

#### Running

Run it as follows:

```
$ cd rug/archive/directory
$ rug edit atomist-rugs:rug-editors:AddRugEditor \
    editor_name=MyNewEditor
```

This will add the files `.atomist/editors/MyNewEditor.rug` and
`.atomist/tests/MyNewEditor.rt` to the project.  Edit those files to
do and test what you want to do with the Editor.

### AddRugGenerator

The AddRugGenerator Editor adds a simple Generator to a Rug Archive
project.  It probably does not make sense to run this more than once
on a project.

#### Prerequisites

Before running this Editor, you must have the following prerequisites
satisfied.

*   A Rug Archive source code repository

#### Parameters

To run this Editor, you must supply the following parameters.

Name | Required | Default | Description
-----|----------|---------|------------
`generator_name` | Yes | | A valid Rug Editor name starting with a capital letter and containing only alphanumberic characters from one to 100 characters long.

#### Running

Run it as follows:

```
$ cd rug/archive/directory
$ rug edit atomist-rugs:rug-editors:AddRugGenerator \
    generator_name=MyNewGenerator
```

This will add the files `.atomist/editors/MyNewGenerator.rug` and
`.atomist/tests/MyNewGenerator.rt` to the project.  Edit those files
to do and test what you want to do with the Generator.

### ConvertExistingProjectToRugArchiveWithEditor

The ConvertExistingProjectToRugArchiveWithEditor Editor creates a
valid Rug Archive in the current project and adds a simple Editor.  It
probably does not make sense to run this more than once on a project.

#### Prerequisites

Before running this Editor, you must have the following prerequisites
satisfied.

*   A source code repository that does not have a `.atomist` directory

#### Parameters

To run this Editor, you must supply the following parameters.

Name | Required | Default | Description
-----|----------|---------|------------
`editor_name` | Yes | | A valid Rug Editor name starting with a capital letter and containing only alphanumberic characters from one to 100 characters long.
`rug_archive_name` | Yes | | A valid GitHub repository name.  It must be 21 characters or less to avoid truncating name when the its Slack channel is created.
`group_id` | Yes | | Maven group ID, e.g., "company-rugs".  Typically the GitHub owner of the repo being created is used.
`version` | No | 0.1.0 | [Semantic version][semver] of the project.
`description` | No | My new project | A brief description of the project.

#### Running

Run it as follows:

```
$ cd project/directory
$ rug edit atomist-rugs:rug-editors:ConvertExistingProjectToRugArchiveWithEditor \
    editor_name=MyNewEditor \
    rug_archive_name=my-new-editor \
    group_id=my-rugs \
    version=2.7.1 \
    description="This is going to be great."
```

This will add the files `.atomist/manifest.yml`,
`.atomist/editors/MyNewEditor.rug`, and
`.atomist/tests/MyNewEditor.rt` to the project.  Edit the latter two
files to do and test what you want to do with the Editor.

### ConvertExistingProjectToRugArchiveWithGenerator

The ConvertExistingProjectToRugArchiveWithGenerator Editor creates a
valid Rug Archive in the current project and adds a simple Generator.  It
probably does not make sense to run this more than once on a project.

#### Prerequisites

Before running this Editor, you must have the following prerequisites
satisfied.

*   A source code repository that does not have a `.atomist` directory

#### Parameters

To run this Editor, you must supply the following parameters.

Name | Required | Default | Description
-----|----------|---------|------------
`generator_name` | Yes | | A valid Rug Editor name starting with a capital letter and containing only alphanumberic characters from one to 100 characters long.
`rug_archive_name` | Yes | | A valid GitHub repository name.  It must be 21 characters or less to avoid truncating name when the its Slack channel is created.
`group_id` | Yes | | Maven group ID, e.g., "company-rugs".  Typically the GitHub owner of the repo being created is used.
`version` | No | 0.1.0 | [Semantic version][semver] of the project.
`description` | No | My new project | A brief description of the project.

#### Running

Run it as follows:

```
$ cd project/directory
$ rug edit atomist-rugs:rug-editors:ConvertExistingProjectToRugArchiveWithGenerator \
    generator_name=MyNewGenerator \
    rug_archive_name=my-new-generator \
    group_id=my-rugs \
    version=3.1.4 \
    description="This is going to create something great."
```

This will add the files `.atomist/manifest.yml`,
`.atomist/editors/MyNewGenerator.rug`, and
`.atomist/tests/MyNewGenerator.rt` to the project.  Edit the latter
two files to do and test what you want to do with the Generator.

### UpdateRugVersion

The UpdateRugVersion Editor updates the version of the rug dependency
in the Rug Archive's `manifest.yml` or `package.json`.  Since the
manifest and package version formats are different, their new values
are specified as different parameters.

#### Prerequisites

Before running this Editor, you must have the following prerequisites
satisfied.

*   A Rug Archive source code repository

#### Parameters

To run this Editor, you must supply the following parameters.

Name | Required | Default | Description
-----|----------|---------|------------
`manifest_version` | Yes | | A valid Rug version of the form M.N.P or a version range of the form [M.N.P,X.Y.Z) where a square bracket includes the adjacent version and a parenthesis excludes it.
`package_version` | Yes | | A valid NPM dependency version, https://docs.npmjs.com/files/package.json#dependencies, representing valid Rug version(s).

#### Running

Run it as follows:

```
$ cd rug/archive/directory
$ rug edit atomist-rugs:rug-editors:UpdateRugVersion \
    manifest_version='[0.8.0,1.0.0)' \
    package_version='~0.8.0'
```

This will update the rug version in either the `.atomist/manifest.yml`
or `.atomist/package.json`, whichever exists.  If there is no
`.atomist` directory, nothing will be done.

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
