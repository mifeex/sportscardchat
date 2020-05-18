const mysql = require('mysql2');

const config = require('../connection');
const pool = mysql.createPool(config);
const fs = require('fs')

let resultCode = 1;
let filename = '';

const getValue = (value = '', reqInDB = '', type) => {
	return (req, res, next) => {
		let sqlQuery = '';
		let secondQuery = '';
		let totalCount = null;
		let isEmpty = false

		const data = req.params.data;
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 20;

		const startIndex = (page - 1) * limit;

		const step = `${startIndex}, ${limit}`;

		switch(type) {
			case 'category':
				sqlQuery = `${reqInDB} WHERE category='${data}'`;
				secondQuery = `${value} WHERE category='${data}' GROUP BY category, post LIMIT ${step}`;
				if (data === 'influencers') {
					sqlQuery = `SELECT COUNT(*) as count FROM user WHERE influencer=1`;
					secondQuery = `SELECT id, username, date FROM user WHERE influencer=1`
				}
				break;
			case 'comment': 
				secondQuery = `${value}'${data}'`;
				sqlQuery = `${reqInDB}'${data}'`;
				break;

			case 'normal': 
				sqlQuery = reqInDB;
				secondQuery = value
				break;

			case 'user': 
				secondQuery = `${value}'${data}' LIMIT 20`;
				sqlQuery = `${reqInDB}'${data}'`;
				break;

			case 'find':
				if (req.query.q === '') {
					sqlQuery = `${reqInDB}'${data}' GROUP BY category LIMIT ${step}`;
					isEmpty = true
				}

				else sqlQuery = `${reqInDB}'${data}' GROUP BY category, post LIMIT ${step}`;

				secondQuery = `SELECT category, text as post, tag, p.date, username,
						c.counts, u.id as userId, p.id FROM categories c
						JOIN post p ON p.post_category=c.id
						JOIN post_text pt ON p.post=pt.id
						JOIN user u ON p.user_data=u.id WHERE tag LIKE '%${req.query.q}%'
						AND category='${data}' ${isEmpty ? `LIMIT ${step}` : ''}`;
				break;

			default:
				break;
		}

		pool.getConnection((err, connection) => {
			connection.beginTransaction((err) => {
				connection.query(sqlQuery,
				(error, results) => {
					if (err) {
						return connection.rollback(() => {
							res.json('error')
						});
					}
					if (type === 'category' || type === 'find') {
						totalCount = results[0].count;
					}

					else {totalCount = results}

					connection.query(secondQuery,
					(error, result, rows, fields) => {
						if (error) {
							return connection.rollback(() => {
								res.json('error')
							});
						}
						else {
							resultCode = 0;
							res.status(200).json({resultCode, result, totalCount});
						};
					});
				});
			});
		connection.release();
		});
	};
};

exports.getQueryValue = getValue