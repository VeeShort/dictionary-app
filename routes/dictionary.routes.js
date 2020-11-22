const { Router } = require('express');
const router = Router();
const Word = require('../models/Word');
const authMW = require('../middleware/auth.middleware');

// POST /api/dictionary/create
router.post('/create', authMW, async (request, response) => {
  try {
    const { en, translation } = request.body;
    const exists = await Word.findOne({ en, owner: request.user.userId });

    if (exists) {
      return response.status(403).json({ message: 'Such word already exist ' });
    }

    const word = new Word({
      startLetter: en[0],
      en,
      translation,
      owner: request.user.userId,
    });

    await word.save();
    response.status(201).json({ word, message: 'Word successfully created' });
  } catch (err) {
    console.error(err);
    response.status(500).json({ message: 'Something went wrong, try again' });
  }
});

// GET /api/dictionary
router.get('/', authMW, async (request, response) => {
  try {
    const words = await Word.find({ owner: request.user.userId });

    response.json(words);
  } catch (err) {
    response.status(500).json({ message: 'Something went wrong, try again' });
  }
});

// GET /api/dictionary/:id
router.get('/:id', authMW, async (request, response) => {
  try {
    const word = await Word.findById(request.params.id);

    response.json(word);
  } catch (err) {
    response.status(500).json({ message: 'Something went wrong, try again' });
  }
});

module.exports = router;
