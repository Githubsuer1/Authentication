import userControll from '..//controllers/user.controllers.js'
import express from 'express';
import auth from '../middlewares/auth.js';
const router = express.Router()

router.route('/getuser').get(auth,userControll.getUser);
router.route('/register').post(userControll.register);
router.route('/login').post(userControll.login);
router.route('/logout').get(userControll.logout);
router.route('/refreshtoken').get(auth,userControll.refreshtoken);

export default router;