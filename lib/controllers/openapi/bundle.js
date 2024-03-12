'use strict';

const { readFile, writeFile } = require('node:fs/promises');

const recursiveReadDir = require('recursive-readdir');
const merge = require('lodash.merge');
const YAML = require('js-yaml');

module.exports.bundle = async config => {

	const files = await recursiveReadDir(config.sourceDir);

	const fileContents = await Promise.all(files.map(async filePath => {

		const fileContent = await readFile(filePath, 'utf8');

		if(filePath.endsWith('.yml') || filePath.endsWith('.yaml'))
			return YAML.load(fileContent);

		if(filePath.endsWith('.json'))
			return JSON.parse(fileContent);

	}));

	const bundle = merge({}, ...fileContents);

	await writeFile(config.target, JSON.stringify(bundle, null, config.prettify ? 2 : null));
};
