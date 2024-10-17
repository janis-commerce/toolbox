'use strict';

exports.command = 'flow';

exports.describe = 'Service Flow Tools';

exports.builder = {};

exports.builder = yargs => {
	return yargs
		.demandCommand()
		.commandDir('./flow');
};
