const dataMapper = require("../dataMapper")

const searchController = {
  searchPage: (req, res) => {
    res.render('search')
  },

  searchByElement: async (req, res, next) => {
    try{
    element = req.query.element
    const cards= await dataMapper.getByElement(element)
    console.log(cards)
    res.render('cardList', {
      cards: cards,
      title: 'recherche par element ' + element
    })
  }
  catch(error)
  {
    console.error(error);
    next()
  }
  },

  searchByLevel: async (req, res, next) => {
    try{
    level = req.query.level
    const cards= await dataMapper.getByLevel(level)
  
    res.render('cardList', {
      cards: cards,
      title: 'recherche par level ' + level
    })
  }
  catch(error)
  {
    console.error(error);
    next()
  }
  }
}




module.exports = searchController;