'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { readFile, access, constants } = require('node:fs/promises');
const Parsers = require('@stoplight/spectral-parsers');
const { bundleAndLoadRuleset } = require('@stoplight/spectral-ruleset-bundler/with-loader');
const { fetch } = require('@stoplight/spectral-runtime');
const { Spectral, Document } = require('@stoplight/spectral-core');
require('colors');

const SEVERITIES = {
	0: 'ERROR',
	1: 'WARNING',
	2: 'INFO',
	3: 'HINT'
};

const SEVERITIES_COLORS = {
	0: 'red',
	1: 'yellow',
	2: 'cyan',
	3: 'blue'
};

const formatDiagnosticToString = ({
	code,
	message,
	path: diagnosticPath,
	severity,
	source,
	range
}) => {

	const formattedSeverity = `[${SEVERITIES[severity]}]`[SEVERITIES_COLORS[severity]];

	return `${formattedSeverity} ${message} (${code})
	at ${path.relative(path.dirname('.'), source)}:${range.start.line + 1}:${range.start.character + 1} (${diagnosticPath})`;
};

const defaultRuleset = path.resolve(__dirname, 'default-ruleset.yml');

module.exports.lint = async config => {

	const schemaContent = await readFile(config.schema, 'utf8');

	const document = new Document(schemaContent, Parsers.Json, config.schema);

	const spectral = new Spectral();

	let customRulesetFileExists = true;
	try {
		await access(config.ruleset, constants.R_OK);
	} catch(e) {
		customRulesetFileExists = false;
	}

	spectral.setRuleset(await bundleAndLoadRuleset(customRulesetFileExists ? config.ruleset : defaultRuleset, { fs, fetch }));

	const diagnostics = await spectral.run(document);

	if(!diagnostics?.length)
		return { errorsCount: 0 };

	return {
		diagnostics: diagnostics.map(formatDiagnosticToString),
		errorsCount: diagnostics.filter(diagnostic => SEVERITIES[diagnostic.severity] === 'ERROR').length
	};
};
