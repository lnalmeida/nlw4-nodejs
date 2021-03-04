import { Router } from 'express';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';
import { SendMailController } from './controllers/SendMailController';
import { SurveyController } from './controllers/SurveyController';

import  { UserController }  from './controllers/UserController';


const router = Router();

const userController = new UserController();

const surveyController = new SurveyController();

const sendMailController = new SendMailController();

const answerController = new AnswerController();

const npsController = new NpsController();

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


router.post('/sendmail', sendMailController.execute);

router.get('/answers/:value', answerController.execute);

router.get('/nps/:survey_id', npsController.execute); 

export { router };