#!/usr/bin/env bash

# Set new npm scripts
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
rm .spectral.yaml