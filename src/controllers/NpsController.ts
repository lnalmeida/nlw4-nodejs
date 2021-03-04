import { Request, Response} from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { SurveyUserRepository } from '../repositories/SurveysUsersRepository';
import { UserRepository } from '../repositories/UserRepository';
class NpsController {
    
    async execute(req: Request, res: Response) {
        const {survey_id} = req.params;


        const surveysUsersRepository = getCustomRepository(SurveyUserRepository);

        const surveysUsers = await (await surveysUsersRepository
                .find({
                    survey_id,
                    value: Not(IsNull())
                }));

        const detractors = surveysUsers.filter(
            survey => (survey.value >= 0 && survey.value <= 6)
            ).length;
        
        const promoters = surveysUsers.filter(
            survey => (survey.value >= 9 && survey.value <= 10)).length;

        const passives = surveysUsers.filter(
            survey => (survey.value >= 7 && survey.value <= 8)).length;
    

        const totalAnswers = surveysUsers.length;

        const npsAverage =  Number((((promoters - detractors)/totalAnswers) * 100).toFixed(2));
        
        return res.json({
            "TotalAnswers":totalAnswers,
            "Promoters":promoters,
            "Detractors":detractors,
            "Passives":passives,
            "NPS": npsAverage
        });

    };


};

export {NpsController};