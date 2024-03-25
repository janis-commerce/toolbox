#!/usr/bin/env bash

# Add toolbox as dev dependency
echo 'Installing toolbox in the repo...';
npm i -D @janiscommerce/toolbox@latest

# Set new npm scripts
echo 'Setting up npm scripts...';
npm pkg set \
	scripts.toolbox="npx @janiscommerce/toolbox" \
	scripts.openapi-bundle="toolbox openapi bundle" \
	scripts.openapi-lint="toolbox openapi lint" \
	scripts.openapi-docs="toolbox openapi docs" \
	scripts.openapi="toolbox openapi dev"

# Migrate post build script to post bundle
if [[ $(npm pkg get scripts.postapi-schema-build) == "{}" ]]; then
	npm pkg set --json scripts.postopenapi-bundle="$(npm pkg get scripts.postapi-schema-build)"
fi

echo 'Cleaning up...'

# Remove old scripts
npm pkg delete \
	scripts.api-schema-build \
	scripts.postapi-schema-build \
	scripts.validate-schema \
	scripts.validate-schema:ci \
	scripts.test-schema

# Remove old dependencies
npm rm \
	@janiscommerce/api-schema-builder \
	ibm-openapi-validator \
	redoc-cli

# Remove custom ruleset
if [[ -f .spectral.yaml ]]; then
	rm .spectral.yaml
fi

# Remove ibm validator config file
if [[ -f .validaterc ]]; then
	rm .validaterc
fi
