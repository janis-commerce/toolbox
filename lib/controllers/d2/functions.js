'use strict';

const { nodeTypes } = require('./constants');
const { getLambdaLabel } = require('./labels');

/**
 * This function mutates nodes and edges passed as args
 */
module.exports.parseFunctions = (functions, nodes, edges) => {

	functions.forEach(fn => {

		const [[fnName, fnConfig]] = Object.entries(fn);

		nodes[fnName] = {
			type: fnName.startsWith('API-') ? nodeTypes.api : nodeTypes.lambda,
			logicalName: fnName,
			physicalName: fnConfig.name ?? fnName,
			label: getLambdaLabel(fnName, fnConfig)
		};

		if(fnConfig.environment) {
			Object.values(fnConfig.environment).forEach(envVarValue => {

				if(envVarValue.startsWith('arn:aws:sns:')) {

					const topicName = envVarValue.split(':').pop();

					edges.push({
						origin: fnName,
						target: `${topicName}Topic`
					});

				} else if(envVarValue.startsWith('https://sqs.')) {

					const queueName = envVarValue
						.split('/')
						.pop()
						// eslint-disable-next-line no-template-curly-in-string
						.replace('${self:custom.serviceName}', '');

					edges.push({
						origin: fnName,
						target: queueName
					});

				}
			});
		}

		if(fnConfig.events?.length) {

			fnConfig.events.forEach(event => {
				const [[eventType, eventConfig]] = Object.entries(event);

				if(eventType === 'sqs') {

					edges.push({
						origin: eventConfig.arn,
						target: fnName
					});

				}
			});

		}

	});
};
