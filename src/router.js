const Router = require('koa-router');
const { AuthController } = require('./controllers/auth.controller');
const { UserSettingsController } = require('./controllers/user.settings.controller');
const { emailValidation, passwordValidation } = require('./middlewares/auth.validation.middleware');
const { tokenValidation } = require('./middlewares/token.validation.middleware');

const router = new Router();

router.post('/is-available-email', emailValidation, AuthController.isAvailableEmail);
router.post('/registration', emailValidation, passwordValidation, AuthController.registration);
router.post('/login', emailValidation, passwordValidation, AuthController.login);
router.post('/logout', AuthController.logout);

router.put('/change-name', tokenValidation, UserSettingsController.changeName);
router.put('/change-email', tokenValidation, emailValidation, UserSettingsController.changeEmail);
router.put('/change-password', tokenValidation, UserSettingsController.changePassword);
router.get('/personal-data', tokenValidation, UserSettingsController.getPersonalData);

module.exports = router;
