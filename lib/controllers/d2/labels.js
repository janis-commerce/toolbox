'use strict';

module.exports.getLambdaLabel = (fnName, fnConfig) => {

	if(fnConfig.events?.[0]?.http) {
		const apiConfig = fnConfig.events[0].http;
		const apiMethod = apiConfig.methodName || apiConfig.method.toUpperCase();

		return `${apiMethod} ${apiConfig.path}`;
	}

	const lambdaName = fnConfig.name ?? fnName;

	if(lambdaName.endsWith('QueueConsumer'))
		return lambdaName.replace('QueueConsumer', '');

	return lambdaName;
};

module.exports.getQueueLabel = queueName => {

	return queueName
		// eslint-disable-next-line no-template-curly-in-string
		.replace('${self:custom.serviceName}', '')
		.replace('Queue', '');
};

module.exports.getTopicLabel = queueName => queueName;
