'use strict';

const path = require('node:path');

const { loggerFactory } = require('../../../lib/logger');
const { draw } = require('../../../lib/controllers/flow/draw');

const logger = loggerFactory('🛠️ Draw');

exports.command = 'draw';

exports.describe = 'Draw Service Flow';

exports.handler = async () => {

	logger.info('Drawing service flow...');

	// eslint-disable-next-line global-require, import/no-dynamic-require
	const serviceConfig = require(path.resolve('serverless.js'));

	await draw(serviceConfig);
};
