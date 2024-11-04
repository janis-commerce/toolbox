'use strict';

const { buildSnsArns, buildSqsArns } = require('./arns');
const { nodeTypes } = require('./constants');
const { isRemoteTopic, parseCrossAccountArn } = require('./helpers');
const { getTopicLabel, getQueueLabel } = require('./labels');

/**
 * This function mutates nodes and edges passed as args
 */
module.exports.parseResources = (resources, nodes, edges) => {

	if(!resources)
		return;

	Object.entries(resources)?.forEach(([resourceName, resourceConfig]) => {

		if(resourceConfig.Type === 'AWS::SNS::Topic') {

			const topicArn = buildSnsArns(resourceConfig.Properties.TopicName).topic;

			nodes[topicArn] ??= {
				type: nodeTypes.topic,
				logicalName: resourceName,
				physicalName: topicArn,
				label: getTopicLabel(resourceConfig.Properties.TopicName)
			};

		}

		if(resourceConfig.Type === 'AWS::SQS::Queue') {

			if(resourceConfig.Properties.Tags.some(({ Key }) => Key === 'IsDLQ' || Key === 'DelayQueue'))
				return;

			const queueArn = buildSqsArns(resourceConfig.Properties.QueueName).queue;

			nodes[queueArn] ??= {
				type: nodeTypes.queue,
				logicalName: resourceName,
				physicalName: queueArn,
				label: getQueueLabel(resourceConfig.Properties.QueueName)
			};

		}

		if(resourceConfig.Type === 'AWS::SNS::Subscription') {

			if(resourceConfig.Properties.Protocol !== 'sqs')
				return;

			const {
				TopicArn: topicArn,
				Endpoint: queueArn
			} = resourceConfig.Properties;

			if(isRemoteTopic(topicArn)) {

				const remoteTopicIdentifier = parseCrossAccountArn(topicArn);

				edges.push({
					origin: remoteTopicIdentifier,
					target: queueArn
				});

				nodes[remoteTopicIdentifier] ??= {
					type: nodeTypes.remoteTopic,
					logicalName: remoteTopicIdentifier,
					physicalName: remoteTopicIdentifier,
					label: remoteTopicIdentifier
				};

			} else {

				edges.push({
					origin: topicArn,
					target: queueArn
				});
			}

		}

	});
};
