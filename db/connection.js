const monk = require('monk');

const connectionstring='mongodb://localhost:27017/qart_new';

const db=monk(connectionstring);

module.exports=db;

