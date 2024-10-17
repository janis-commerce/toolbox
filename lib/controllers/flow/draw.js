'use strict';

const { writeFile } = require('node:fs/promises');

const { generateDiagram } = require('../d2');

module.exports.draw = async serviceConfig => {

	const diagramFileContent = generateDiagram(serviceConfig);

	await writeFile('./test-infra-autogen.d2', diagramFileContent);
};
