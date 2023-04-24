const { cpp, python, java, c, node } = require('compile-run');

const getResult = (res) => {
	if (res.stderr) {
		return res.stderr
	} else {
		return res.stdout
	}
}



const eval = async (code, lang) => {
	let result;
	if (lang === 'c') {
		result = await c.runSource(code, { stdin: '2\n3' })
	} else if (lang === 'cpp') {
		result = await cpp.runSource(code, { stdin: '2\n3' })
	} else if (lang === 'python') {
		result = await python.runSource(code, { stdin: '2\n3' })
	} else if (lang === 'java') {
		result = await java.runSource(code, { stdin: '2\n3' })
	} else if (lang === 'javascript') {
		result = await node.runSource(code, { stdin: '2\n3' })
	}
	return getResult(result);
};

module.exports = { eval };