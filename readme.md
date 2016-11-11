cli-reporter
============

A way of reporting results of multiple processes without overflowing the terminal.


Usage
-----

The interface:

```js
class CLIReporter {
	constructor({ showTime = true, showName = false })
	set(name, messages, { showTime = true, showName = false })
}
```


### Creating a new reporter

```js
import CLIReporter from 'cli-reporter'
// Or
const CLIReporter = require('cli-reporter')

const reporter = new CLIReporter()
```

The constructor can take some configuration options:

- `showTime`: Shows a timestamp that the message was received. Defaults to `true`.
- `showName`: Shows the name passed to `#set()`. Defaults to `false`.

```js
const reporter = new CLIReporter({
	showTime: false,
	showName: true,
})
```


### Writing logs

The `reporter.set()` method sets the latest output for a specific name.
```js
reporter.set('tool1', 'Some message')

/* output:
12:45:12: Some message
*/
```

There can only ever be one message per name, but there is no limit to the number
of names.

```js
reporter.set('tool2', 'Some other message')

/* output:
12:45:12: Some message
12:47:22: Some other message
*/

// skip 12 seconds

reporter.set('tool2', 'Something new happened')

/* output:
12:45:12: Some message
12:47:34: Something new happened
*/
```

The names are printed in the order that they were last modified, so the latest
message is always in the bottom.

```js
reporter.set('tool1', 'Something happened to the first tool')

/* output:
12:47:34: Something new happened
12:49:01: Something happened to the first tool
*/
```

Any characters can be added, including colors and newlines.

```js
reporter.set('tool1', 'Tool 1 is split\non lines')
/* output:
12:47:34: Something new happened
13:01:43: Tool 1 is split
on lines
*/
```


The message can also be an array, in which case the tool will print each value
on a separate line, all prefixed.

```js
reporter.set('tool1', [ 'Something happened', 'that should', 'be split\non lines' ])

/* output:
12:47:34: Something new happened
13:02:23: Something happened
13:02:23: that should
13:02:23: be split
on lines
*/
```


### Overriding options per message

The `#set()` call takes the same arguments as the constructor. The options will
override the default for that specific message only.

```js
const reporter = new CLIReporter({ showTime: true, showName: true })

reporter.set('tool1', 'abc')
/* output:
12:34:56: tool1: abc
*/

reporter.set('tool1', 'abc', { showName: false })
/* output:
12:34:56: abc
*/

reporter.set('tool2', 'def', { showTime: false })
/* output:
12:34:56: abc
tool2: def
*/

reporter.set('tool3', [ 'ghi', 'jkl' ])
/* output:
12:34:56: abc
tool2: def
12:34:56: tool3: ghi
12:34:56: tool3: jkl
*/
```
