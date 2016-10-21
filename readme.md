cli-reporter
============

A way of reporting results of multiple processes without overflowing the terminal.


Usage
-----

The interface:

```js
class CLIReporter {
	constructor({ showTime = true, showName = false })
	set(name, messages, options)
}
```


Examples:

```js
import CLIReporter from 'cli-reporter'

const reporter = new CLIReporter()

reporter.set('tool1', 'Some message')

/* output:
12:45:12: Some message
*/

// skip two minutes and 10 seconds

reporter.set('tool2', 'Some other message')

/* output:
12:45:12: Some message
12:47:22: Some other message
*/

// skip another 12 seconds

reporter.set('tool2', 'Something new happened')

/* output:
12:45:12: Some message
12:47:34: Something new happened
*/

// skip forward some more

reporter.set('tool1', 'Something happened to the first tool')

/* output:
12:47:34: Something new happened
12:49:01: Something happened to the first tool
*/

// skip forward even more

reporter.set('tool1', [ 'Something happened', 'that should', 'be split\non lines' ])

/* output:
12:47:34: Something new happened
13:02:23: Something happened
13:02:23: that should
13:02:23: be split
on lines
*/
```


Options for the output
----------------------

The constructor and the `#set()` call can both take some options for adjusting
the output. If the options are given to the constructor, it works as defaults
for the `#set()` calls.

The following options are available:

- `showTime`: Shows a timestamp that the message was received. Defaults to `true`.
- `showName`: Shows the name passed to `#set()`. Defaults to `false`.


```js
const reporter = new CLIReporter({ showTime: true, showName: true })

reporter.set('tool1', 'abc', { showName: false })
reporter.set('tool2', 'def', { showTime: false })
reporter.set('tool3', [ 'ghi', 'jkl' ])

/* output:
12:34:56: abc
tool2: def
12:34:56: tool3: ghi
12:34:56: tool3: jkl
*/
```
