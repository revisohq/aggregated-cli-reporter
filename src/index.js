import { stdout as log } from 'single-line-log'
const messages = Symbol('messages')

function getTime(now) {
	return [now.getHours(), now.getMinutes(), now.getSeconds()]
		.map(function(num) {
			return ('0' + num).slice(-2);
		})
		.join(':');
}

export default class CLIReporter {
	constructor() {
		this[messages] = []
	}

	set(name, message, { level = 'log', showTime = true, showName = false } = {}) {
		this[messages] = this[messages].filter(x => x.name != name)
		this[messages].push({
			name, message, level, showTime, showName, time: new Date
		})

		this.print()
	}

	print() {
		const message = this[messages]
			.map(x => {
				const name = x.showName ? x.name + ': ' : ''
				const time = x.showTime ? getTime(x.time) + ': ' : ''
				return name + time + x.message
			})
			.join('\n') + '\n'

		log(message)
	}
}
