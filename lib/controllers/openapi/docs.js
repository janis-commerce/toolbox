'use strict';

const childProcess = require('node:child_process');

const open = require('open');

const { loggerFactory } = require('../../logger');

const logger = loggerFactory('🔍 Docs');

const mantainDocsAlive = argv => {

	return new Promise(resolve => {

		const docsProcess = childProcess.spawn('npx', ['redocly', 'preview-docs', argv.schema], {
			cwd: __dirname
		});

		// Output forwarding makes a lot of noice
		// docsProcess.stdout.on('data', data => {
		// 	logger.info(data.toString('utf8'));
		// });

		docsProcess.stderr.on('data', data => {
			logger.error(data.toString('utf8'));
		});

		docsProcess.on('close', code => {
			if(code === 0)
				return resolve(false);

			logger.info('Restarting docs...');
			setTimeout(() => {
				resolve(true);
			}, 1000);
		});
	});
};

module.exports.previewDocs = async config => {

	let shouldRunDocs = true;

	setTimeout(() => open('http://127.0.0.1:8080/'), 1000);

	while(shouldRunDocs)
		shouldRunDocs = await mantainDocsAlive(config);
};
