#!/usr/bin/env node

'use strict';

const yargs = require('yargs');

yargs.commandDir('./commands')
	.help('h')
	.demandCommand()
	.parse();
