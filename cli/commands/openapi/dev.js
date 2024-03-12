'use strict';

const path = require('node:path');

const chokidar = require('chokidar');

const { loggerFactory } = require('../../../lib/logger');
const { bundle } = require('../../../lib/controllers/openapi/bundle');
const { lint } = require('../../../lib/controllers/openapi/lint');
const { previewDocs } = require('../../../lib/controllers/openapi/docs');

const logger = loggerFactory('🔍 Dev');

exports.command = 'dev';

exports.describe = 'OpenAPI schema development loop';

exports.builder = {
	sourceDir: {
		default: './schemas/src/public',
		coerce: schemaPath => path.resolve(schemaPath)
	},
	target: {
		default: './schemas/public.json',
		coerce: schemaPath => path.resolve(schemaPath)
	},
	ruleset: {
		default: './.spectral.yaml',
		coerce: schemaPath => path.resolve(schemaPath)
	}
};

const triggerBundle = config => {
	bundle({
		sourceDir: config.sourceDir,
		target: config.target,
		prettify: true
	});
};

const watchBundle = config => {

	const watcher = chokidar.watch(config.sourceDir, {
		persistent: true,
		ignoreInitial: true
	});

	watcher.on('ready', () => {
		// Trigger initial bundle
		logger.info('Bundling');
		triggerBundle(config);
	});

	// Trigger new bundle on each change
	watcher.on('all', () => {
		logger.info('Rebuilding bundle');
		triggerBundle(config);
	});

	logger.info('Watching source file changes...');
};

const triggerLint = async config => {
	const { diagnostics } = await lint({
		schema: config.target,
		ruleset: config.ruleset
	});

	diagnostics?.map(diagnostic => logger.error(diagnostic));
};

const watchLint = config => {

	const watcher = chokidar.watch(config.target, {
		persistent: true,
		ignoreInitial: true,
		awaitWriteFinish: {
			stabilityThreshold: 200
		}
	});

	// Trigger new lint on each change (initial lint will be triggered by initial bundle)
	watcher.on('all', () => {
		logger.info('Linting bundle');
		triggerLint(config);
	});

	logger.info('Watching bundle changes...');
};

const triggerDocs = config => {
	logger.info('Previewing docs...');
	previewDocs({
		schema: config.target
	});
};

exports.handler = async argv => {

	logger.info('Starting OpenAPI Development loop...');

	watchLint(argv);

	watchBundle(argv);

	triggerDocs(argv);
};
