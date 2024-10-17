# toolbox

![Build Status](https://github.com/janis-commerce/toolbox/workflows/Build%20Status/badge.svg)
[![npm version](https://badge.fury.io/js/%40janiscommerce%2Ftoolbox.svg)](https://www.npmjs.com/package/@janiscommerce/toolbox)

Janis Developer toolbox

## Installation

```sh
npm install --save-dev @janiscommerce/toolbox
```

## Usage

Run with npx, for example:

```shell
npx @janiscommerce/toolbox openapi dev
```

## Available commands

### OpenAPI

- `npx @janiscommerce/toolbox openapi bundle`: Bundle OpenAPI schema from source
- `npx @janiscommerce/toolbox openapi lint`: Lint OpenAPI schema bundle
- `npx @janiscommerce/toolbox openapi docs`: Preview OpenAPI docs
- `npx @janiscommerce/toolbox openapi dev`: Bundle + Lint + Docs preview with change detection :sparkles:

### Service flow

- `npx @janiscommerce/toolbox flow draw`: Build the service flow diagram from service configuration files
