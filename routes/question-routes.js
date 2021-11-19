const { postQuestion, getQuestions, deleteQuestions } = require('../controllers/question-controller'),
    { isAuth } = require('../middleware/isAuth'),
    router = require('express').Router();

router
    .route('/')
    .get(isAuth, getQuestions)
    .post(isAuth, postQuestion);

router
    .route('/:id')
    .delete(isAuth, deleteQuestions);

module.exports = router;