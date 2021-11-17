const Router = require('koa-router');
const { AuthController } = require('./controllers/auth.controller');
const { UserSettingsController } = require('./controllers/user.settings.controller');
const { emailValidation, passwordValidation } = require('./middlewares/auth.validation.middleware');
const { tokenValidationMiddleware: tokenValidation } = require('./middlewares/token.validation.middleware');
const { TestController } = require('./controllers/test.controller');

const router = new Router({ prefix: '/api' });

router.post('/is-available-email', emailValidation, AuthController.isAvailableEmail);
router.post('/registration', emailValidation, passwordValidation, AuthController.registration);
router.post('/login', emailValidation, passwordValidation, AuthController.login);
router.post('/logout', AuthController.logout);

router.put('/change-name', tokenValidation, UserSettingsController.changeName);
router.put('/change-email', tokenValidation, emailValidation, UserSettingsController.changeEmail);
router.put('/change-password', tokenValidation, UserSettingsController.changePassword);
router.get('/personal-data', tokenValidation, UserSettingsController.getPersonalData);
router.get('/getAllTests', tokenValidation, TestController.getAll);
router.get('/validate', tokenValidation, AuthController.validate);

router.post('/getOne', tokenValidation, TestController.getOne);

router.post('/createNewTest', tokenValidation, TestController.createTest);
router.post('/editTest', tokenValidation, TestController.editTest);
router.post('/destroyTest', tokenValidation, TestController.destroyTest);
router.post('/takeTest', tokenValidation, TestController.takeTest);
router.post('/changeOpenTest', tokenValidation, TestController.changeOpenTest);
router.post('/saveAnswers', tokenValidation, TestController.saveAnswers);
router.post('/getResults', tokenValidation, TestController.getResults);

const test = async (ctx) => {
  ctx.body = 'Server is working';
};

router.get('/test', test);

module.exports = router;
