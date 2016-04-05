
exports.options = {
  host: 'myHost',
  user: 'myUser',
  password: 'myPassword',
  port: '3306', 
  database: 'myDB',
  cookie: {
    expires: false
  },
  schema: {
    tableName: 'sessions',
    columnNames: {
    session_id: 'session_id',
    expires: 'expires',
    data: 'data'
    }
  }
};

