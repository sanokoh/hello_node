/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   http-json-api-server.js                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ksano <ksano@student.42tokyo.jp>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/01/20 09:55:52 by ksano             #+#    #+#             */
/*   Updated: 2021/01/23 10:42:39 by ksano            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const http = require('http');
const url = require('url');

const port = process.argv[2] ? parseInt(process.argv[2]) : 8080;
const host = 'localhost';
try {
	const server = http.createServer();
	server.on('request', (req, res) => {
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		let isoTime;
		let hour;
		let minute;
		let second;
		let param = url.parse(req.url, true).query;
		switch (url.parse(req.url).pathname) {
			case '/api/parsetime':
				if (param['iso']) {
					isoTime = param['iso'];
					const posT = isoTime.indexOf('T');
					hour = parseInt(isoTime.substring(posT + 1, posT + 3));
					minute = parseInt(isoTime.substring(posT + 4, posT + 6));
					second = parseInt(isoTime.substring(posT + 7, posT + 9));
				}
				else {
					isoTime = Date();
					let isoTimes = isoTime.split(' ');
					isoTimes = isoTimes[4].split(':');
					hour = parseInt(isoTimes[0]);
					minute = parseInt(isoTimes[1]);
					second = parseInt(isoTimes[2]);
				}
				let retIso = JSON.stringify({
					"hour": hour,
					"minute": minute,
					"second": second
				})
				res.write(retIso + '\n');
				res.end();
				break;

			case '/api/unixtime':
				let unixTime;
				let retUnix;
				if (param['iso']) {
					isoTime = param['iso'];
					unixTime = Date.parse(isoTime);
				}
				else {
					unixTime = Date.now();
				}
				retUnix = JSON.stringify({
					"unixtime": unixTime
				})
				res.write(retUnix + '\n');
				res.end();
				break;
			default:
				res.write('Error: 401\n');
				res.end();
				break;
		}
	}).on('error', (e) => {
		console.error(e.message);
	});

	server.listen(port, host, () => {
		console.log('server bound');
		console.log('Port: ' + server.address().port);
	})
} catch (e) {
	console.error(e.message);
};
