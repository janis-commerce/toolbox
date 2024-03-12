'use strict';

const path = require('node:path');

const { loggerFactory } = require('../../../lib/logger');
const { lint } = require('../../../lib/controllers/openapi/lint');

const logger = loggerFactory('📝 Lint');

exports.command = 'lint';

exports.describe = 'Lint OpenAPI schema';

exports.builder = {
	schema: {
		default: './schemas/public.json',
		coerce: schemaPath => path.resolve(schemaPath)
	},
	ruleset: {
		default: './.spectral.yaml',
		coerce: schemaPath => path.resolve(schemaPath)
	}
};

exports.handler = async argv => {

	logger.info('Linting OpenAPI Schema...');

	const { diagnostics, errorsCount } = await lint(argv);

	diagnostics?.map(diagnostic => logger.error(diagnostic));

	process.exit(errorsCount);
};
