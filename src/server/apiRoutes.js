var mysql = require('mysql');

module.exports = function(pool, router, passport) {

    // api ---------------------------------------------------------------------
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

    // application -------------------------------------------------------------
    // app.get('*', function(req, res) {
    //     res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    // });

    // app.use('/api',apiRouter);

};
