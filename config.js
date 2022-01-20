
exports.connectionString = [
  `DRIVER=IBM i Access ODBC Driver`,
  `SYSTEM=${process.env.DB_HOST}`,
  `UID=${process.env.DB_USER}`,
  `Password=${process.env.DB_PASS}`,
  `Naming=1`,
  `DBQ=,*USRLIBL`,
  `SSL=1`
].join(`;`);