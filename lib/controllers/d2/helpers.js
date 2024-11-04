'use strict';

const { nodeTypes } = require('./constants');

module.exports.isIsolated = (node, edges) => {
	const { type, logicalName } = node;
	return [nodeTypes.api, nodeTypes.lambda].includes(type) && !edges.some(edge => edge.origin === logicalName || edge.target === logicalName);
};

module.exports.formatNode = ({ type, logicalName, label }) => `${logicalName}: {
  class: ${type}${label ? `
  label: '${label}'` : ''}
}
`;

module.exports.formatEdge = (originName, targetName) => `${originName} -> ${targetName}
`;

/**
 * @param {string} arn
 */
module.exports.isRemoteTopic = arn => arn.includes('self:custom.awsAccountsByService.');

/**
 * @param {string} arn
 */
module.exports.parseCrossAccountArn = arn => {

	if(this.isRemoteTopic(arn))
		return arn.replace(/^.*\$\{self:custom\.awsAccountsByService\.(.+)\}:/, '$1 ');

	return `${arn}`;

};
