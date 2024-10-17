'use strict';

const { parseFunctions } = require('./functions');
const { isIsolated, formatNode, formatEdge } = require('./helpers');
const { parseResources } = require('./resources');

module.exports.generateDiagram = serviceConfig => {

	const nodes = {};
	const edges = [
	// Invoker edges
		{
			origin: 'API-PostRouteIdVarStart',
			target: 'HandleRouteChanges'
		}
	];

	parseFunctions(serviceConfig.functions, nodes, edges);

	parseResources(serviceConfig.resources?.Resources, nodes, edges);

	// Base template
	let generatedFile = `direction: right

classes: {
  sqsQueue: {
    width: 80
    height: 80
    shape: image
    icon: 'https://icons.terrastruct.com/aws%2FApplication%20Integration%2FAmazon-Simple-Queue-Service-SQS.svg'
  }

  apiGateway: {
    width: 80
    height: 80
    shape: image
    icon: 'https://icons.terrastruct.com/aws%2FNetworking%20&%20Content%20Delivery%2FAmazon-API-Gateway.svg'
  }

  snsTopic: {
    width: 80
    height: 80
    shape: image
    icon: 'https://icons.terrastruct.com/aws%2FApplication%20Integration%2FAmazon-Simple-Notification-Service-SNS.svg'
  }

  lambdaFunction: {
    width: 80
    height: 80
    shape: image
    icon: 'https://icons.terrastruct.com/aws%2FCompute%2FAWS-Lambda_Lambda-Function_light-bg.svg'
  }
}

`;

	// Set non-isolated nodes
	Object.values(nodes).forEach(node => {

		if(isIsolated(node, edges))
			return;

		generatedFile = generatedFile.concat(formatNode(node));
	});

	// Set edges
	edges.forEach(edge => {

		const { origin, target } = edge;

		const originName = origin.startsWith('arn:') ? nodes[origin]?.logicalName : origin;
		const targetName = target.startsWith('arn:') ? nodes[target]?.logicalName : target;

		generatedFile = generatedFile.concat(formatEdge(originName, targetName));
	});

	return generatedFile;

};
