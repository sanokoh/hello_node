const http = require('http');
const url = process.argv[2];

try {

	http.get(url, (res) => {
		res.setEncoding('utf8');
		res.on('error', (e) => {
			console.log(e);
		});
		let data = '';
		res.on('data', (chunk) => {
			data += chunk;
		})
		res.on('end', () => {
			try {
				console.log(data);
			}
			catch (e) {
				console.error(e);
			}
		})
	}).on('error', (e) => {
		console.error(e);
	});
}catch(e){
	console.error(e.message);
}
return;
