const db = require('../config/db.config');

exports.findAll = (req, res) => {
  const { page = 1, limit = 10, sortBy = 'id', sortOrder = 'asc', company, priceMin, priceMax } = req.query;
  const offset = (page - 1) * limit;
  
  let query = 'SELECT * FROM laptops WHERE 1=1';
  let countQuery = 'SELECT COUNT(*) as total FROM laptops WHERE 1=1';
  const queryParams = [];
  
  if (company) {
    query += ' AND company = ?';
    countQuery += ' AND company = ?';
    queryParams.push(company);
  }
  
  if (priceMin) {
    query += ' AND price_euros >= ?';
    countQuery += ' AND price_euros >= ?';
    queryParams.push(priceMin);
  }
  
  if (priceMax) {
    query += ' AND price_euros <= ?';
    countQuery += ' AND price_euros <= ?';
    queryParams.push(priceMax);
  }
  
  query += ` ORDER BY ${sortBy} ${sortOrder} LIMIT ? OFFSET ?`;
  queryParams.push(parseInt(limit), offset);

  db.query(countQuery, queryParams.slice(0, -2), (err, countResult) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving laptops."
      });
      return;
    }

    db.query(query, queryParams, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving laptops."
        });
        return;
      }

      res.send({
        total: countResult[0].total,
        totalPages: Math.ceil(countResult[0].total / limit),
        currentPage: parseInt(page),
        laptops: data
      });
    });
  });
};

exports.getLatest = (req, res) => {
  const query = 'SELECT * FROM laptops WHERE created_at > NOW() - INTERVAL 1 MINUTE';
  
  db.query(query, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving new laptops."
      });
      return;
    }
    
    res.send(data);
  });
};