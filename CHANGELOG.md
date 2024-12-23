# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.5] - 2024-06-05
- Installation script now migrates post `npm run api-schema-build` script properly

## [1.1.4] - 2024-03-27
### Fixed
- Installation script now migrates `npm run build` and pre-commit hooks properly

## [1.1.3] - 2024-03-25
### Added
- Install output is now streamed to stdout and stderr

## [1.1.2] - 2024-03-25
### Added
- Toolbox is installed as dev dependency in initial migration script

## [1.1.1] - 2024-03-23
### Added
- Initial migration script is now available as a command

## [1.1.0] - 2024-03-12
### Added
- Unknown commands handling as error
- Recommend commands when current command is not recognized
- Initial migration script for services implementing the toolbox

### Changed
- Lint diagnostic report improved

## [1.0.2] - 2024-03-12
### Fixed
- Package bundling fix

## [1.0.1] - 2024-03-12
### Fixed
- CLI command support

## [1.0.0] - 2024-03-12
### Added
- OpenAPI toolbox
