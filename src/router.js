const Router = require('koa-router');
const multer = require('@koa/multer');
const uuid = require('uuid').v4;
const { AuthController } = require('./controllers/auth.controller');
const { RecipeController } = require('./controllers/recipe.controller');
const { UserSettingsController } = require('./controllers/user.settings.controller');
const { emailValidation, passwordValidation } = require('./middlewares/auth.validation.middleware');
const { tokenValidation } = require('./middlewares/token.validation.middleware');

const router = new Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/avatars');
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    cb(null, `${uuid()}-${originalName}`);
  },
});

const upload = multer({ storage });

router.post('/is-available-email', emailValidation, AuthController.isAvailableEmail);
router.post('/registration', emailValidation, passwordValidation, AuthController.registration);
router.post('/login', emailValidation, passwordValidation, AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/activate/:link', AuthController.activation);

router.put('/change-name', tokenValidation, UserSettingsController.changeName);
router.put('/change-status', tokenValidation, UserSettingsController.changeStatus);
router.put('/change-avatar', tokenValidation, upload.single('avatar'), UserSettingsController.changeAvatar);
router.put('/change-email', tokenValidation, emailValidation, UserSettingsController.changeEmail);
router.put('/change-password', tokenValidation, UserSettingsController.changePassword);
router.get('/personal-data', tokenValidation, UserSettingsController.getPersonalData);
router.get('/user-data', (ctx) => { ctx.body = 'This is the plug'; });

router.post('/create-recipe', tokenValidation, upload.single('preview'), RecipeController.createRecipe);
router.get('/recipes', RecipeController.getRecipes);
router.get('/test', (ctx) => {
  console.log('test!');
  ctx.body = 'Test answer';
});
module.exports = router;
