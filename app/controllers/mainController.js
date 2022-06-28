const dataMapper = require('../dataMapper.js');

const mainController = {  //remplacement des callback par une fonction classique pour permettre l'ajout de parametre
  homePage: async (req, res, next) => {
    try {
      const cardList = await dataMapper.getAllCards()
      if (cardList) {
        res.render('cardList', {
          cards: cardList,
          title: 'Liste des cartes'
        })
      }
    }
    catch (error) {
      console.error(error);
      next() //TODO ajouter une page404 et un middleware de fin
    }



  },
  detailPage: async (req, res, next) => {
    try {
      id = req.params.id
      const cardDetail = await dataMapper.getOneCards(id)
      if (cardDetail) {
        res.render('cardDetail', {
          card: cardDetail[0],
          title: 'Detail de '+ cardDetail[0].name
        })
      }
    }
    catch (error) {
      console.error(error);
      next() //TODO ajouter une page404 et un middleware de fin
    }
  },

};

module.exports = mainController;