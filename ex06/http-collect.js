/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   http-collect.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ksano <ksano@student.42tokyo.jp>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/12/28 16:14:12 by ksano             #+#    #+#             */
/*   Updated: 2021/01/21 20:07:53 by ksano            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const http = require('http');
const bl = require('bl');
const url = process.argv[2];


try {

	http.get(url, (res) => {
		res.pipe(bl((err, data) => {
			if (err)
				return console.error(err.message);
			data = data.toString('ascii');
			console.log(data.length);
			console.log(data);
		}))
	}).on('error', (e) => {
		console.error(e.message);
	});
} catch(e) {
	console.error(e.message);
}

return;

// http.get(url, (res) => {
// 	let contents = '';
// 	res.on('data', (chunk) => {
// 		contents += chunk;
// 	})
// 	res.on('error', (e) => {
// 		return console.error(e);
// 	})
// 	res.on('end', () => {
// 		console.log(contents.length);
// 		console.log(contents);
// 	})
// })
