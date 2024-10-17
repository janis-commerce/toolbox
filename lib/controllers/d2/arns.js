'use strict';

// eslint-disable-next-line no-template-curly-in-string
const baseSnsArn = 'arn:aws:sns:${aws:region}:${aws:accountId}';

module.exports.buildSnsArns = topicName => {
	return {
		topic: `${baseSnsArn}:${topicName}`
	};
};

// eslint-disable-next-line no-template-curly-in-string
const baseSqsArn = 'arn:aws:sqs:${aws:region}:${aws:accountId}';

module.exports.buildSqsArns = queueName => {
	return {
		queue: `${baseSqsArn}:${queueName}`
	};
};
