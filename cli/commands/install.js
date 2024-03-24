'use strict';

const childProcess = require('node:child_process');
const path = require('node:path');

const { loggerFactory } = require('../../lib/logger');

const logger = loggerFactory('Install');

exports.command = 'install';

exports.describe = 'Install toolbox';

exports.builder = {};

exports.handler = () => {
	logger.info(childProcess.execSync(path.resolve(__dirname, '../../lib/migration/initial.sh')).toString('utf8'));
};
