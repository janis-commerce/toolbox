'use strict';

const path = require('node:path');

const { loggerFactory } = require('../../../lib/logger');
const { previewDocs } = require('../../../lib/controllers/openapi/docs');

const logger = loggerFactory('🔍 Docs');

exports.command = 'docs';

exports.describe = 'Docs OpenAPI schema';

exports.builder = {
	schema: {
		default: './schemas/public.json',
		coerce: schemaPath => path.resolve(schemaPath)
	}
};

exports.handler = async argv => {

	logger.info('Previewing OpenAPI Docs...');

	previewDocs(argv);

};
