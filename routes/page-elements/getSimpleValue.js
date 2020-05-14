const express = require('express');
const router = express();

const mysql = require('mysql2');

const config = require('../connection');
const pool = mysql.createPool(config);
let resultCode = 1;

const getSimpleValue = (value, type) => {
	return (req, res, next) => {
		let data = ''

		switch(type) {
			case 'getUser':
				data = `${value}${req.params.data}`;
				break;
			case 'getValue':
				data = value;
				break;
			default:
				break;
		}

		pool.getConnection((err, connection) => {
			connection.query(`${data}`, 
			(err, result) => {
				resultCode = 0
				res.json({resultCode, result});
			})
		connection.release();
		})
	}
}

exports.getSimpleValue = getSimpleValue