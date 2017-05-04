# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

[Unreleased]: https://github.com/atomist/rug-rugs/compare/0.29.0...HEAD

### Added

-   Command handler `show latest versions` that displays the latest versions
    of `com.atomist:rug` and `@atomist/rugs`

## [0.29.0] - 2017-04-26

[0.29.0]: https://github.com/atomist/rug-rugs/compare/0.28.0...0.29.0

Big time release

### Changed

-   Updated to rug 1.0.0-m.2 and @atomist/rugs 1.0.0-m.1

## [0.28.0] - 2017-04-25

[0.28.0]: https://github.com/atomist/rug-rugs/compare/0.27.1...0.28.0

New name release

### Changed

-   Changed archive name from rug-editors to more accurate rug-rugs

### Removed

-   Code of conduct is now references from the atomist/welcome repo

## [0.27.1] - 2017-04-24

[0.27.1]: https://github.com/atomist/rug-rugs/compare/0.27.0...0.27.1

Safer release

### Changed

-   UpdateSupportFiles edits, rather than overwrites, the package.json

## [0.27.0] - 2017-04-24

[0.27.0]: https://github.com/atomist/rug-rugs/compare/0.26.0...0.27.0

Publish release

### Changed

-   Update rug and rugs dependencies
-   Publish non-releases to staging team
-   Run tslint as part of Travis CI build
-   NewRugProject now adds TypeScript support files

### Fixed

-   UpdateSupportFiles will properly overwrite existing files
-   Fix lint errors
-   Update HavePathExpressionEngine to use property access

## [0.26.0] - 2017-04-22

[0.26.0]: https://github.com/atomist/rug-rugs/compare/0.25.0...0.26.0

Update release

### Changed

-   Update TypeScript compiler and linter configurations
-   Update to rug 0.25.3 and @atomist/rugs 0.24.3

### Fixed

-   The event handler added by AddTypeScriptEventHandler should now
    work with all types of events

### Added

-   UpdateSupportFiles editor

## [0.25.0] - 2017-04-11

[0.25.0]: https://github.com/atomist/rug-rugs/compare/0.24.0...0.25.0

Springtime release

### Changed

-   Update to rug 0.25.0, @atomist/rugs 0.24.0

## [0.24.0] - 2017-03-31

[0.24.0]: https://github.com/atomist/rug-rugs/compare/0.23.0...0.24.0

Rugs release

### Changed

-   Updated handler tests for rug 0.22.0
-   Switch NPM dependency to @atomist/rugs
-   No longer include node_modules when generating using
    NewStarterRugProject, it seems to frequently trigger GitHub rate
    limiting

### Fixed

-   AddTypeScriptEventHandler now replaces the type parameters

## [0.23.0] - 2017-03-29

[0.23.0]: https://github.com/atomist/rug-rugs/compare/0.22.0...0.23.0

Uptest release

### Changed

-   Updated handler tests for rug 0.20.0

## [0.22.0] - 2017-03-27

[0.22.0]: https://github.com/atomist/rug-rugs/compare/0.21.0...0.22.0

Handler tests release

### Added

-   Tests for sample handlers

## [0.21.0] - 2017-03-27

[0.21.0]: https://github.com/atomist/rug-rugs/compare/0.20.0...0.21.0

Handlers release

### Added

-   AddTypeScriptCommandHandler and AddTypeScriptEventHandler editors

### Removed

-   AddTypeScriptHandler was invalid

### Fixed

-   Do a better job cleaning the manifest added by AddManifestYml

### Changed

-   NewStarteRugProject also adds a command handler and an event
    handler

## [0.20.0] - 2017-03-26

[0.20.0]: https://github.com/atomist/rug-rugs/compare/0.19.0...0.20.0

Format release

### Changed

-   Corrected Rug descriptions
-   Added semicolons to TypeScript code
-   Changed test step file names to Steps.ts

## [0.19.0] - 2017-03-26

[0.19.0]: https://github.com/atomist/rug-rugs/compare/0.18.0...0.19.0

Hidden release

### Changed

-   Moved generators to `.atomist/generators` directory
-   The sample TypeScriptEditor and TypeScriptGenerator are now
    excluded from search results

## [0.18.0] - 2017-03-24

[0.18.0]: https://github.com/atomist/rug-rugs/compare/0.17.0...0.18.0

Nothing release

## [0.17.0] - 2017-03-21

[0.17.0]: https://github.com/atomist/rug-rugs/compare/0.16.0...0.17.0

Spring has sprung release

### Changed

-   Upgrade to rug 0.16.0
-   Updated all tests to TypeScript

## [0.16.0] - 2017-03-15

[0.16.0]: https://github.com/atomist/rug-rugs/compare/0.15.0...0.16.0

Beware the ides of March release

### Added

-   AddLocalEditor editor

### Removed

-   AddTypeScriptExecutor editor

## [0.15.0] - 2017-03-13

[0.15.0]: https://github.com/atomist/rug-rugs/compare/0.14.0...0.15.0

Look ma, no tests release

### Changed

-   Export all Rug classes
-   Use TypeScript naming conventions
-   Update to rug 0.13.0, tests have not been migrated

### Added

-   NewRugProject and NewStarterRugProject generators

### Fixed

-   Hid rug 0.12.0-style handler from TypeScript compiler.

## [0.14.0] - 2017-03-07

[0.14.0]: https://github.com/atomist/rug-rugs/compare/0.13.0...0.14.0

Less is more release

### Changed

-   Have editors that add TypeScript Rugs add the TypeScript support
    files if they are not present
-   AddTypeScript and ConvertExistingProjectToGenerator no longer add
    the node_modules directory
-   Generators no longer require the project_name parameter be
    declared so its was removed from the generator added by
    AddTypeScriptGenerator

### Removed

-   UpdateRugVersion has been moved to rug-upgrade

## [0.13.0] - 2017-03-03

[0.13.0]: https://github.com/atomist/rug-rugs/compare/0.12.0...0.13.0

One-step generator release

### Added

-   `ConvertExistingProjectToGenerator` editor

## [0.12.0] - 2017-03-01

[0.12.0]: https://github.com/atomist/rug-rugs/compare/0.11.0...0.12.0

README release

### Changed

-   AddTypeScriptEditor and AddTypeScriptGenerator now also add
    instructions to the project README

## [0.11.0] - 2017-02-27

[0.11.0]: https://github.com/atomist/rug-rugs/compare/0.10.0...0.11.0

Non-DSL release

### Added

-   AddManifestYml editor moved from rug-archive and migrated to
    TypeScript
-   Predicate-like TypeScript functions

### Changed

-   All remaining Rugs are implemented in TypeScript
-   Standardized naming of source Rugs

### Removed

-   Editors that add DSL Rugs
-   ConvertExistingProjectToRugArchiveWith* editors replaced with
    ConvertExistingProjectToRugArchive, you can add the editor or
    generator with another editor
-   AddAtomistCopyrightToRug will be made more generic and moved to
    common-editors
-   DSL predicates

## [0.10.0] - 2017-02-24

[0.10.0]: https://github.com/atomist/rug-rugs/compare/0.9.0...0.10.0

### Added

-   AddTypeScript adds .atomist/node_modules

### Changed

-   AddTypeScript now adds an appropriate .gitignore
-   AddTypeScript is now in TypeScript
-   TypeScript Rugs export constants rather than variables

## [0.9.0] - 2017-02-17

[0.9.0]: https://github.com/atomist/rug-rugs/compare/0.8.0...0.9.0

TypeScript is good

### Added

-   AddTypeScriptGenerator editor

### Changed

-   AddTypeScriptEditor will no longer create a package.json, run
    AddTypeScript first
-   AddTypeScriptEditor now takes a `description` parameter

## [0.8.0] - 2017-02-09

[0.8.0]: https://github.com/atomist/rug-rugs/compare/0.7.0...0.8.0

Templates are bad, mkay release

### Changed

-   Use real generator as basis for AddRugGenerator

## [0.7.0] - 2017-02-09

[0.7.0]: https://github.com/atomist/rug-rugs/compare/0.6.0...0.7.0

TypeScripty release

### Added

-   AddTypeScriptEditor

### Changed

-   Move base executor for AddRugExecutor under .atomist so we can at
    least be sure it compiles

## [0.6.0] - 2017-02-06

[0.6.0]: https://github.com/atomist/rug-rugs/compare/0.5.0...0.6.0

Repair release

### Fixed

-   Fix some issues with AddTypeScript editor

## [0.5.0] - 2017-01-31

[0.5.0]: https://github.com/atomist/rug-rugs/compare/0.4.0...0.5.0

Added an editor that introduces a Rug executor to an existing Rug Archive.

### Changed

-   Added AddRugExecutor and accompanying test.

## [0.4.0] - 2017-01-24

[0.4.0]: https://github.com/atomist/rug-rugs/compare/0.3.0...0.4.0

Lengthy release

### Changed

-   Updated rug
-   Increased maximum project name length to 100

## [0.3.0] - 2017-01-05

[0.3.0]: https://github.com/atomist/rug-rugs/compare/0.2.0...0.3.0

Brand new Rug release

### Changed

-   Updates for rug 0.8.0

## [0.2.0] - 2016-12-19

[0.2.0]: https://github.com/atomist/rug-rugs/compare/0.1.0...0.2.0

Update your Rug release

### Added

-   Add UpdateRugVersion Editor

## [0.1.0] - 2016-12-13

[0.1.0]: https://github.com/atomist/rug-rugs/tree/0.1.0

Initial release

### Added

-   Add Editors and Generators to a project
