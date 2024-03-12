'use strict';

// eslint-disable-next-line no-console
module.exports.loggerFactory = namespace => {

	const prefix = `[${namespace}] `;
	const prefixPlaceholder = ' '.repeat(prefix.length);

	const logMessage = args => {
		return `${prefix}${args.join('')
			// Remove initial linebreaks
			.replace(/^\n/, '')
			// Remove final linebreaks
			.replace(/\n+$/, '')
			// Add whitespace after internal linebreaks
			// And add a final linebreak
			.replaceAll(/\n/g, `\n${prefixPlaceholder}`)}\n`;
	};

	return {
		info: (...args) => process.stdout.write(logMessage(args)),
		error: (...args) => process.stderr.write(logMessage(args))
	};
};
