var mysql = require('mysql');

module.exports = function(sequelize, pool, router, passport) {

    // api ---------------------------------------------------------------------
    // --------- LOG ---------
    // GET /api/log/cumulative/:startDate/:endDate
    router.get('/log/cumulative/:startDate/:endDate',passport.isLoggedIn,function(req,res){
      var query = "SELECT pillars AS pillar, IFNULL(SUM(TIME_TO_SEC(duration))/3600,0) AS duration FROM pillars AS p LEFT OUTER JOIN pillars_log AS pl ON p.pillars = pl.pillar AND event_date between ? and ? GROUP BY p.pillars ORDER BY p.id;";
      var table = [req.params.startDate,req.params.endDate];
      query = mysql.format(query,table);
      pool.query(query,function(err,rows){
        if (err) {
          res.json({
            "Error"   : true,
            "Message" : "Error Executing MySQL query"
          });
        } else {
          res.json ({
            "Error"   : false,
            "Message" : "Success",
            "entries" : rows
          });
        }
      });
    });

    // GET /api/log/:startDate/:endDate
    router.get('/log/:startDate/:endDate',passport.isLoggedIn,function(req,res){
      var query = "SELECT * FROM ?? WHERE ?? >= ? AND event_date < ?;";
      var table = ['pillars_log','event_date',req.params.startDate,req.params.endDate];
      query = mysql.format(query,table);
      pool.query(query,function(err,rows){
        if (err) {
          res.json({
            "Error"   : true,
            "Message" : "Error Executing MySQL query"
          });
        } else {
          res.json ({
            "Error"   : false,
            "Message" : "Success",
            "entries" : rows
          });
        }
      });
    });

    // POST /log/
    router.post('/log/',passport.isLoggedIn,function(req,res){
      var query = "INSERT INTO pillars_log (pillar,event_date,duration,quality,notes,entry_utc_timestamp) VALUES (?,?,?,?,?,UTC_TIMESTAMP());";
      var table = [req.body.user_pillar,req.body.user_date,req.body.user_duration,req.body.user_quality,req.body.user_notes];
      query = mysql.format(query,table);
      pool.query(query,function(err,rows){
        if (err) {
          res.json({
            "Error"   : true,
            "Message" : "Error Executing MySQL query"
          });
        } else {
          var query2 = "SELECT * FROM pillars_log ORDER BY id DESC LIMIT 1;";
          pool.query(query2,function(err,rows){
            res.status(201).json ({
              "Error"   : false,
              "Message" : "Success",
              "entries" : rows
            });
          });
        }
      });
    });

    // PUT /summary/:id
    router.put('/log/:id',passport.isLoggedIn,function(req,res){
      var query = "UPDATE pillars_log SET pillar = ?, event_date = ?, duration = ?, quality = ?, notes = ? WHERE id = ?";
      var table = [req.body.user_pillar,req.body.user_date,req.body.user_duration,req.body.user_quality,req.body.user_notes,req.params.id];
      query = mysql.format(query,table);
      pool.query(query,function(err,rows){
        if (err) {
          res.json({
            "Error"   : true,
            "Message" : "Error Executing MySQL query"
          });
        } else {
          var query2 = "SELECT * FROM pillars_log WHERE id = ?;";
          var table2 = [req.params.id];
          query2 = mysql.format(query2,table2);
          pool.query(query2,function(err,rows){
            res.status(201).json ({
              "Error"   : false,
              "Message" : "Success",
              "entries" : rows
            });
          });
        }
      });
    });

    // --------- SUMMARY ---------
    // GET /summary/:startDate/:endDate
    router.get('/summary/:startDate/:endDate',passport.isLoggedIn,function(req,res){
      var query = "SELECT * FROM ?? WHERE ?? >= ? AND event_date < ?;";
      var table = ['pillars_days','event_date',req.params.startDate,req.params.endDate];
      query = mysql.format(query,table);
      pool.query(query,function(err,rows){
        if (err) {
          res.json({
            "Error"   : true,
            "Message" : "Error Executing MySQL query"
          });
        } else {
          res.status(201).json ({
            "Error"   : false,
            "Message" : "Success",
            "entries" : rows
          });
        }
      });
    });

    // POST /summary/
    router.post('/summary/',passport.isLoggedIn,function(req,res){
      var query = "INSERT INTO pillars_days (event_date,quality,notes,entry_utc_timestamp) VALUES (?,?,?,UTC_TIMESTAMP());";
      var table = [req.body.user_date,req.body.user_quality,req.body.user_notes];
      query = mysql.format(query,table);
      pool.query(query,function(err,rows){
        if (err) {
          res.json({
            "Error"   : true,
            "Message" : "Error Executing MySQL query"
          });
        } else {
          var query2 = "SELECT * FROM pillars_days ORDER BY id DESC LIMIT 1;";
          pool.query(query2,function(err,rows){
            res.status(201).json ({
              "Error"   : false,
              "Message" : "Success",
              "entries" : rows
            });
          });
        }
      });
    });

    // PUT /summary/:id
    router.put('/summary/:id',passport.isLoggedIn,function(req,res){
      var query = "UPDATE pillars_days SET event_date = ?, quality = ?, notes = ? WHERE id = ?;";
      var table = [req.body.user_date,req.body.user_quality,req.body.user_notes,req.params.id];
      query = mysql.format(query,table);
      pool.query(query,function(err,rows){
        if (err) {
          res.json({
            "Error"   : true,
            "Message" : "Error Executing MySQL query"
          });
        } else {
          var query2 = "SELECT * FROM pillars_days WHERE id = ?;";
          var table2 = [req.params.id];
          query2 = mysql.format(query2,table2);
          pool.query(query2,function(err,rows){
            res.status(201).json ({
              "Error"   : false,
              "Message" : "Success",
              "entries" : rows
            });
          });
        }
      });
    });

    // --------- DATA EXPLORER ---------
    // GET /api/query
    router.get('/query',passport.isLoggedIn,function(req,res){
      var Entry = require('./models/Entry')(sequelize);

      var prepared = {
        where: {}
      };

      if (req.query.pillar) {
        prepared.where.pillar = req.query.pillar;
      }

      if (req.query.minDuration && req.query.maxDuration) {
        prepared.where.duration = {
          $lt: req.query.maxDuration,
          $gt: req.query.minDuration
        };
      } else if (req.query.minDuration && !req.query.maxDuration) {
        prepared.where.duration = {
          $gt: req.query.minDuration
        };
      } else if (!req.query.minDuration && req.query.maxDuration) {
        prepared.where.duration = {
          $lt: req.query.maxDuration
        };
      }

      if (req.query.notes) {
        prepared.where.notes = {
          like: "%" + req.query.notes + "%"
        };
      }

      if (req.query.quality) {
        prepared.where.quality = req.query.quality;
      }

      if (req.query.startDate && req.query.endDate) {
        prepared.where.date = {
          $lte: req.query.endDate,
          $gte: req.query.startDate
        };
      } else if (req.query.startDate && !req.query.endDate) {
        prepared.where.date = {
          $gte: req.query.startDate
        };
      } else if (!req.query.startDate && req.query.endDate) {
        prepared.where.date = {
          $lt: req.query.endDate
        };
      }

      Entry.findAll(prepared).then(function(entry){
        res.status(201).json(entry);
      });
    });
};
