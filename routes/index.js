const categoryRouter = require('./category-router');
const authRouter = require('./auth-router');
const messageRouter = require('./message-router');
const subjectController = require('../controllers/subject-controller');
const subjectRouter = require('./subject-router');

const router = require('express').Router();


router.use('/category', categoryRouter);
router.use('/auth', authRouter)
router.use('/message', messageRouter);
router.use('/subject', subjectRouter);

module.exports = router;