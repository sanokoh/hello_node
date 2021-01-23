/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   async-http-collect.js                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ksano <ksano@student.42tokyo.jp>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/12/28 16:22:21 by ksano             #+#    #+#             */
/*   Updated: 2021/01/23 14:43:44 by ksano            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const http = require('http');
const async = require('async');

let i;
let data;

function get_result(url){
	return new Promise((resolve, reject) => {
		http.get(url, res => {
			data = "";
			res.on("data", (d) => data += d);
			res.on("end", () => resolve(data));
		}).on("error", (err) => reject(err));
	});
}

async function display_result(){
	try{
		i = 2;
		while (process.argv.length - i > 0){
			result = await get_result(process.argv[i]);
			console.log(result);
			i++;
		}
	} catch(e){
		console.error(e.message);
	}
}

if (process.argv.length == 5)
{
	display_result();
}
