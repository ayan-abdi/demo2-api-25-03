const categoryRouter = require('./category-router');
const authRouter = require('./auth-router');
const messageRouter = require('./message-router');

const router = require('express').Router();


router.use('/category', categoryRouter);
router.use('/auth', authRouter)
router.use('/message', messageRouter);

module.exports = router;