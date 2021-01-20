const fs = require('fs');
let path = process.argv[2];
let files = {};
let lines = 0;

if (path)
{
	try
	{
		files = fs.readFileSync(path, 'utf-8');
		for (let i = 0; files[i]; i++)
		{
			if (files[i] == '\n')
			lines++;
		}
		console.log(lines);
	}
	catch(e)
	{
		console.log(e.message);
	}
}

