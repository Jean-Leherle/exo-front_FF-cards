const database = require('./database');

const dataMapper = {

  getAllCards: async function () {
    const query =  `SELECT * FROM "card"`;
    const result = await database.query(query);
    
    return result.rows;
  },
  getOneCards: async function (id) {
    const query = {
      text : `SELECT * FROM "card" WHERE "id" = $1 `
    };
    const result = await database.query(query, [id]);
    return result.rows;
  },
};


module.exports = dataMapper;