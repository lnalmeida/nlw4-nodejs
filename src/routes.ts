import { Router } from 'express';
import { SurveyController } from './controllers/SurveyController';

import  { UserController }  from './controllers/UserController';


const router = Router();

const userController = new UserController();

const surveyController = new SurveyController();

//Users
router.post('/users', userController.create);

// router.put('/users/:id', userController.update);

// router.delete('/users/:id', userController.delete);

router.get('/users', userController.list);

// router.get('/users/:id', userController.show);

//Surveys
router.post('/surveys', surveyController.create);

// router.put('/surveys/:id', surveyController.update);

// router.delete('/surveys/:id', surveyController.delete);

router.get('/surveys', surveyController.list);

// router.get('/surveys/:id', surveyController.show);


export { router };