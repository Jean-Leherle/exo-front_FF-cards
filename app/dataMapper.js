const database = require('./database');

const dataMapper = {

  getAllCards: async function () {
    const query = `SELECT * FROM "card"`;
    const result = await database.query(query);

    return result.rows;
  },
  getOneCards: async function (id) {

    const query = `SELECT * FROM "card" WHERE "id" = $1 ;`;
    const result = await database.query(query, [id]);
    return result.rows;
  },
  getByElement: async function (element) {
    let result
    if (element === "null") { //si l'element est null on doit changer la query car null n'existe pas en sql
      const query = `SELECT * FROM "card" WHERE "element" IS NULL`;
      result = await database.query(query);
    }
    else {
      const query = `SELECT * FROM "card" WHERE "element" = $1 `;
      result = await database.query(query, [element]);
    }
    
    return result.rows;
  },
};


module.exports = dataMapper;