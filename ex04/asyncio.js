const fs = require('fs');
let path = process.argv[2];
let lines = {};

try{
	fs.readFile(path, 'utf-8', (e, files) => {
		if (e)
			throw (e);
		lines = files.split('\n').length - 1;
		console.log(lines);
	});
}
catch(e){
	console.error(e.message + "AAA");
}

