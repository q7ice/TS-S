const Router = require('koa-router');
const { AuthController } = require('./controllers/auth.controller');
const { UserSettingsController } = require('./controllers/user.settings.controller');
const { emailValidation, passwordValidation } = require('./middlewares/auth.validation.middleware');
const { tokenValidationMiddleware: tokenValidation } = require('./middlewares/token.validation.middleware');
const { TestController } = require('./controllers/test.controller');

const router = new Router();

router.post('/api/is-available-email', emailValidation, AuthController.isAvailableEmail);
router.post('/api/registration', emailValidation, passwordValidation, AuthController.registration);
router.post('/api/login', emailValidation, passwordValidation, AuthController.login);
router.post('/api/logout', AuthController.logout);

router.put('/api/change-name', tokenValidation, UserSettingsController.changeName);
router.put('/api/change-email', tokenValidation, emailValidation, UserSettingsController.changeEmail);
router.put('/api/change-password', tokenValidation, UserSettingsController.changePassword);
router.get('/api/personal-data', tokenValidation, UserSettingsController.getPersonalData);
router.get('/api/getAllTests', tokenValidation, TestController.getAll);
router.get('/api/validate', tokenValidation, AuthController.validate);

router.post('/api/getOne', tokenValidation, TestController.getOne);

router.post('/api/createNewTest', tokenValidation, TestController.createTest);
router.post('/api/editTest', tokenValidation, TestController.editTest);
router.post('/api/destroyTest', tokenValidation, TestController.destroyTest);
router.post('/api/takeTest', tokenValidation, TestController.takeTest);
router.post('/api/changeOpenTest', tokenValidation, TestController.changeOpenTest);
router.post('/api/saveAnswers', tokenValidation, TestController.saveAnswers);
router.post('/api/getResults', tokenValidation, TestController.getResults);

const checkWorking = async (ctx) => {
  ctx.body = 'Server is working';
};

router.get('/checkWorking', checkWorking);

module.exports = router;
