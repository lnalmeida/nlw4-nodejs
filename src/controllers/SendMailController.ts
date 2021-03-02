import { resolve } from 'path';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { SurveyUserRepository } from '../repositories/SurveysUsersRepository';
import { UserRepository } from '../repositories/UserRepository';
import SendMailService from '../services/SendMailService';

class SendMailController {
    async execute(req:Request, res: Response) {
        const {email, survey_id} = req.body;

        const usersRepository = getCustomRepository(UserRepository);
        const surveysRepository = getCustomRepository(SurveyRepository);
        const surveysUsersRepository = getCustomRepository(SurveyUserRepository);
        const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');

        const userAlreadyExists = await usersRepository.findOne({email});

        
        if(!userAlreadyExists) {
            return res.status(400).json({error: 'User does not exists!'});
        };

        const surveyAlreadyExists = await surveysRepository.findOne({id: survey_id});

        if(!surveyAlreadyExists) {
            return res.status(400).json({error: 'Survey does not exists!'});
        };

        
        //Verificando se já existe uma pesquisa aquele usuário
        
        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: {user_id: userAlreadyExists.id, value:null},
            relations: ["user", "survey"]
        });
        
        const variables = {
            id: "",
            name: userAlreadyExists.name,
            title: surveyAlreadyExists.title, 
            description: surveyAlreadyExists.description,
            link: process.env.URL_MAIL
        };

        if(surveyUserAlreadyExists) {
            variables.id = surveyUserAlreadyExists.id;
            await SendMailService.execute(email, surveyAlreadyExists.title, variables, npsPath );
            return res.json(surveyUserAlreadyExists);
        }

        //Salvar as informações na tabela surveys_users
        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id
        })

        await surveysUsersRepository.save(surveyUser);

        //enviar email para o usuário
        variables.id = surveyUser.id;

        await SendMailService.execute(email, surveyAlreadyExists.title, variables, npsPath);

        return res.status(200).json({surveyUser});
    };
};

export {SendMailController};