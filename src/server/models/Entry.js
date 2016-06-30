var Sequelize = require('sequelize');

module.exports = function(sequelize){
  return sequelize.define('Entry',{
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true
    },
    pillar: {
      type: Sequelize.CHAR(11),
      field: 'pillar'
    },
    date: {
      type: Sequelize.DATE,
      field: 'event_date'
    },
    duration: {
      type: Sequelize.TIME,
      field: 'duration'
    },
    quality: {
      type: Sequelize.CHAR(11),
      field: 'quality'
    },
    notes: {
      type: Sequelize.BLOB('long'),
      field: 'notes'
    },
    timestamp: {
      type: Sequelize.INTEGER,
      field: 'entry_utc_timestamp'
    }
  },{
    tableName: 'pillars_log',
    timestamps: false
  });
};
