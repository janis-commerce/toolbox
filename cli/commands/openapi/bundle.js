'use strict';

const path = require('node:path');

const { loggerFactory } = require('../../../lib/logger');
const { bundle } = require('../../../lib/controllers/openapi/bundle');

const logger = loggerFactory('🛠️ Bundle');

exports.command = 'bundle';

exports.describe = 'Bundle OpenAPI schema';

exports.builder = {
	sourceDir: {
		default: './schemas/src/public',
		coerce: schemaPath => path.resolve(schemaPath)
	},
	target: {
		default: './schemas/public.json',
		coerce: schemaPath => path.resolve(schemaPath)
	},
	prettify: {
		type: 'boolean',
		default: true
	}
};

exports.handler = async argv => {

	logger.info('Bundling OpenAPI Schema...');

	await bundle(argv);
};
