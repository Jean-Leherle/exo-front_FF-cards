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
          title: 'Detail de ' + cardDetail[0].name
        })
      }
    }
    catch (error) {
      console.error(error);
      next() //TODO ajouter une page404 et un middleware de fin
    }
  },
  addCardToDeck: async (req, res, next) => {
    try {
      id = req.params.id

      //Dans le cas ou la carte est déjà présente ou qu'il y ai déjà 5 cartes
      if (!(req.session.deck.find(card => { return parseInt(card.id) === parseInt(id) }) || req.session.deck.length >= 5)) {
        const cardDetail = await dataMapper.getOneCards(id)
        req.session.deck.push(cardDetail[0])
      }

      res.redirect('back')

    }
    catch (error) {
      console.error(error)
      next()
    }
  },
  deckPage: (req, res) => {
    const deckList = req.session.deck

    res.render('deckList', {
      cards: deckList,
      title: 'votre deck'
    });
  },
  removeCardFromDeck: (req, res) =>{
    const id= req.params.id

    req.session.deck = req.session.deck.filter((card) =>{
    
      return parseInt(card.id) !== parseInt(id)
    })

    res.redirect('back')
  }

};

module.exports = mainController;