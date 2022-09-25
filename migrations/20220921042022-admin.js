'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {

  const bcrypt = require("bcryptjs");    
  const dotenv = require("dotenv"); 
  dotenv.config();

  const {
    ADMIN_EMAIL,
    ADMIN_PASSWORD,
    ADMIN_FIRST_NAME,
    ADMIN_LAST_NAME,
    pepper,
    saltRound,
  } = process.env;

  const hashedPassword = bcrypt.hashSync(ADMIN_PASSWORD + pepper, parseInt(saltRound));
  
  db.insert(
    "users",
    ['email', 'password', 'first_name', 'last_name', 'role'],
    [ADMIN_EMAIL, hashedPassword, ADMIN_FIRST_NAME, ADMIN_LAST_NAME, 'admin'], 
    (err)=>{
      if(err){ 
        console.log(err);
      } else {
        console.log("ADMIN SAVED TO DATABASE");
      }
    })
  return null;
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
