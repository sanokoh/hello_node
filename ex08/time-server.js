/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   time-server.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ksano <ksano@student.42tokyo.jp>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/01/20 08:32:14 by ksano             #+#    #+#             */
/*   Updated: 2021/01/23 14:43:49 by ksano            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const net = require('net');
let port = process.argv[2] ? parseInt(process.argv[2]) : 8080;
const host = 'localhost'
try {
	const server = net.createServer((c) => {
		c.on('end', () => {
			console.log('client disconneted');
		})
		const d = new Date(Date.now());
		const year = d.getFullYear();
		let times = {
			month: d.getMonth() + 1,
			day: d.getDate(),
			hours: d.getHours(),
			minutes: d.getMinutes()
		};
		for (const value in times) {
			if (times[value] < 10)
				times[value] = `0${times[value]}`;
		}
		c.write(`${year}-${times.month}-${times.day} ${times.hours}:${times.minutes}`);
		c.write('\n');
		c.end();
	}).on('error', (e) => {
		throw e;
	});
	server.listen(port, host, () => {
		console.log('server bound');
		console.log('Port: ' + server.address().port);
	}).on('error', (e) => {
		throw e;
	});
} catch (e) {
	console.error(e.message);
}
