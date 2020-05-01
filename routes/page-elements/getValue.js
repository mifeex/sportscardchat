const mysql = require('mysql2');

const config = require('../connection');
const pool = mysql.createPool(config);

const getValue = (value = '', reqInDB = '') => {
	return (req, res, next) => {
		const category = req.params.category;
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 5;

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const step = `${startIndex}, ${endIndex}`

		let sqlQuery = `${reqInDB}'${category}'`
		let secondQuery = `${value}'${category}' GROUP BY category, post LIMIT ${step}`

		pool.getConnection((err, connection) => {
			connection.beginTransaction((err) => {
				connection.query(sqlQuery,
				(error, results) => {
					if (err) {
						return connection.rollback(() => {
							res.json('error')
						});
					}

					let totalCount = results[0].count;

					connection.query(secondQuery,
					(error, result) => {
						if (error) {
							return connection.rollback(() => {
								res.json('error')
					      	});
						}
						else {
							res.status(200).json({result, totalCount});
						}
					})	
				})
			})
		connection.end();
		})
	}
}

exports.getQueryValue = getValue