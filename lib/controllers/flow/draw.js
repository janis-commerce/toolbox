'use strict';

const { writeFile } = require('node:fs/promises');

const { generateDiagram } = require('../d2');

module.exports.draw = async serviceConfig => {

	const diagramFileContent = generateDiagram(serviceConfig);

	await writeFile('./service-flow.d2', diagramFileContent);
};
