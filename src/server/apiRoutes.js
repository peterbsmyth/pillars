var mysql = require('mysql');

module.exports = function(router) {

    // api ---------------------------------------------------------------------
    // GET /api/summary/:startDate/:endDate
    router.get('/summary/:startDate/:endDate',function(req,res){
      res.json ({
        "Error"   : false,
        "Message" : "Success",
        "Entries" : req.params.startDate
      });
    });

    // POST /api/summary/

    // PUT /api/summary/

    // DELETE /api/summary/:id

    // GET /api/log/:startDate/:endDate
    // router.get('/log/:startDate/:endDate',function(req,res){
    //   res.json ({
    //     "Error"   : false,
    //     "Message" : "Success",
    //     "Entries" : req.params.endDate
    //   });
    // });

    // GET /api/log/:startDate/:endDate
    router.get('/log/:startDate/:endDate',function(req,res){
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
            "Entries" : rows
          });
        }
      });
    });

    // POST /api/log/

    // PUT /api/log/

    // DELETE /api/log/:id

    // application -------------------------------------------------------------
    // app.get('*', function(req, res) {
    //     res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    // });

    // app.use('/api',apiRouter);

};
