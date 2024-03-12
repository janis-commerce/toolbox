'use strict';

exports.command = 'openapi';

exports.describe = 'OpenAPI Tools';

exports.builder = {};

exports.builder = yargs => {
	return yargs
		.demandCommand()
		.commandDir('./openapi');
};
