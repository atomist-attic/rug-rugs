# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

[Unreleased]: https://github.com/atomist-rugs/rug-editors/compare/0.16.0...HEAD

## [0.16.0] - 2017-03-15

[0.16.0]: https://github.com/atomist-rugs/rug-editors/compare/0.15.0...0.16.0

Beware the ides of March release

### Added

-   AddLocalEditor editor

### Removed

-   AddTypeScriptExecutor editor

## [0.15.0] - 2017-03-13

[0.15.0]: https://github.com/atomist-rugs/rug-editors/compare/0.14.0...0.15.0

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

[0.14.0]: https://github.com/atomist-rugs/rug-editors/compare/0.13.0...0.14.0

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

[0.13.0]: https://github.com/atomist-rugs/rug-editors/compare/0.12.0...0.13.0

One-step generator release

### Added

-   `ConvertExistingProjectToGenerator` editor

## [0.12.0] - 2017-03-01

[0.12.0]: https://github.com/atomist-rugs/rug-editors/compare/0.11.0...0.12.0

README release

### Changed

-   AddTypeScriptEditor and AddTypeScriptGenerator now also add
    instructions to the project README

## [0.11.0] - 2017-02-27

[0.11.0]: https://github.com/atomist-rugs/rug-editors/compare/0.10.0...0.11.0

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

[0.10.0]: https://github.com/atomist-rugs/rug-editors/compare/0.9.0...0.10.0

### Added

-   AddTypeScript adds .atomist/node_modules

### Changed

-   AddTypeScript now adds an appropriate .gitignore
-   AddTypeScript is now in TypeScript
-   TypeScript Rugs export constants rather than variables

## [0.9.0] - 2017-02-17

[0.9.0]: https://github.com/atomist-rugs/rug-editors/compare/0.8.0...0.9.0

TypeScript is good

### Added

-   AddTypeScriptGenerator editor

### Changed

-   AddTypeScriptEditor will no longer create a package.json, run
    AddTypeScript first
-   AddTypeScriptEditor now takes a `description` parameter

## [0.8.0] - 2017-02-09

[0.8.0]: https://github.com/atomist-rugs/rug-editors/compare/0.7.0...0.8.0

Templates are bad, mkay release

### Changed

-   Use real generator as basis for AddRugGenerator

## [0.7.0] - 2017-02-09

[0.7.0]: https://github.com/atomist-rugs/rug-editors/compare/0.6.0...0.7.0

TypeScripty release

### Added

-   AddTypeScriptEditor

### Changed

-   Move base executor for AddRugExecutor under .atomist so we can at
    least be sure it compiles

## [0.6.0] - 2017-02-06

[0.6.0]: https://github.com/atomist-rugs/rug-editors/compare/0.5.0...0.6.0

Repair release

### Fixed

-   Fix some issues with AddTypeScript editor

## [0.5.0] - 2017-01-31

[0.5.0]: https://github.com/atomist-rugs/rug-editors/compare/0.4.0...0.5.0

Added an editor that introduces a Rug executor to an existing Rug Archive.

### Changed

-   Added AddRugExecutor and accompanying test.

## [0.4.0] - 2017-01-24

[0.4.0]: https://github.com/atomist-rugs/rug-editors/compare/0.3.0...0.4.0

Lengthy release

### Changed

-   Updated rug
-   Increased maximum project name length to 100

## [0.3.0] - 2017-01-05

[0.3.0]: https://github.com/atomist-rugs/rug-editors/compare/0.2.0...0.3.0

Brand new Rug release

### Changed

-   Updates for rug 0.8.0

## [0.2.0] - 2016-12-19

[0.2.0]: https://github.com/atomist-rugs/rug-editors/compare/0.1.0...0.2.0

Update your Rug release

### Added

-   Add UpdateRugVersion Editor

## [0.1.0] - 2016-12-13

[0.1.0]: https://github.com/atomist-rugs/rug-editors/tree/0.1.0

Initial release

### Added

-   Add Editors and Generators to a project
