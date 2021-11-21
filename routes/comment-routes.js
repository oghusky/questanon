const {
    postCommentByQuestionId,
    getCommentsByQuestionId,
    deleteCommentByCommentId
} = require('../controllers/comment-controller'),
    { isAuth } = require('../middleware/isAuth'),
    router = require('express').Router();

router
    .route('/questionid_:questionId')
    .get(isAuth, getCommentsByQuestionId)
    .post(isAuth, postCommentByQuestionId);

router
    .route('/commentid_:questionId/:commentId')
    .delete(isAuth, deleteCommentByCommentId);

module.exports = router;