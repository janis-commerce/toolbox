'use strict';

const childProcess = require('node:child_process');
const path = require('node:path');

const { loggerFactory } = require('../../lib/logger');

const logger = loggerFactory('Install');

exports.command = 'install';

exports.describe = 'Install toolbox';

exports.builder = {};

exports.handler = () => {

	return new Promise((resolve, reject) => {
		const command = childProcess.spawn(path.resolve(__dirname, '../../lib/migration/initial.sh'));

		command.stdout.on('data', data => logger.info(data));

		command.stderr.on('data', data => logger.error(data));

		command.on('close', exitStatus => {
			return !exitStatus ? resolve() : reject(new Error(`Exited with status ${exitStatus}`));
		});
	});
};
