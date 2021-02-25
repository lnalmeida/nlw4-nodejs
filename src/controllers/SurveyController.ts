import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import {SurveyRepository } from '../repositories/SurveyRepository';

class SurveyController {
    
    async create(req: Request , res: Response) {
        const { id, title, description } = req.body;

        const surveyRepository = getCustomRepository(SurveyRepository);

        // const surveyAlreadyExists = await surveyRepository.findOne({id})

        // if(surveyAlreadyExists) {
        //     return res.status(400).json({error: 'Survey already exists!'})
        // }
        
        const survey = surveyRepository.create({title, description});

        await surveyRepository.save(survey);
        
        return res.status(201).json(survey);
    };

    // async update(req: Request, res: Response) {

    //     const { id } = req.params;
    
    //     const surveyRepository = getCustomRepository(SurveyRepository);

    //     const survey = await surveyRepository.findOne({id});

    //     if (survey) {
    //         const { title, description } = req.body;
    //         const surveyUpdated = await surveyRepository.merge(survey, req.body);

    //         surveyRepository.save(surveyUpdated);

    //         return res.status(200).json(surveyUpdated);
    //     };

    //     return res.status(404).json({error: 'Survey not found'});
    // };

    // async delete(req: Request, res: Response) {
    //     const { id } = req.params;
    
    //     const surveyRepository = getCustomRepository(SurveyRepository);

    //     const survey = await surveyRepository.findOne(id);

    //     if (survey) {
    //         await surveyRepository.remove(survey);

    //         return res.status(200).json({message: 'Survey deleted successfully!'});
    //     };

    //     return res.status(404).json({error: 'Survey not found'});
    // };

    async list(req: Request, res: Response) {
        const surveyRepository = getCustomRepository(SurveyRepository);

        const surveys = await surveyRepository.find();

           return res.status(200).json(surveys);
    };

    // async show(req: Request, res: Response) {
    //     const { id } = req.params;
    
    //     const surveyRepository = getCustomRepository(SurveyRepository);

    //     const survey = await surveyRepository.findOne(id);

    //     if(survey) {
    //         return res.status(200).json(survey);
    //     }

    //     return res.status(404).json({error: 'Survey not found'});
    // };

};

export { SurveyController };
