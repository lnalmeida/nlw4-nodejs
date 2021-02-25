import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';


class UserController {
    
    async create(req: Request , res: Response) {
        const { name, email} = req.body;

        const usersRepository = getCustomRepository(UserRepository);

        const userAlreadyExists = await usersRepository.findOne({email})

        if(userAlreadyExists) {
            return res.status(400).json({error: 'User already exists!'})
        }
        
        const user = usersRepository.create({ name, email });

        await usersRepository.save(user);
        
        return res.status(201).json(user);
    };

    // async update(req: Request, res: Response) {

    //     const { id } = req.params;
    
    //     const usersRepository = getCustomRepository(UserRepository);

    //     const user = await usersRepository.findOne({id});

    //     if (user) {
    //         const { name, email } = req.body;
    //         const userUpdated = await usersRepository.merge(user, req.body);

    //         usersRepository.save(userUpdated);

    //         return res.status(200).json(userUpdated);
    //     };

    //     return res.status(404).json({error: 'User not found'});
    // };

    // async delete(req: Request, res: Response) {
    //     const { id } = req.params;
    
    //     const usersRepository = getCustomRepository(UserRepository);

    //     const user = await usersRepository.findOne(id);

    //     if (user) {
    //         await usersRepository.remove(user);

    //         return res.status(200).json({message: 'User deleted successfully!'});
    //     };

    //     return res.status(404).json({error: 'User not found'});
    // };

    async list(req: Request, res: Response) {
        const usersRepository = getCustomRepository(UserRepository);

        const users = await usersRepository.find();

           return res.status(200).json(users);
    };

    // async show(req: Request, res: Response) {
    //     const { id } = req.params;
    
    //     const usersRepository = getCustomRepository(UserRepository);

    //     const user = await usersRepository.findOne(id);

    //     if(user) {
    //         return res.status(200).json(user);
    //     }

    //     return res.status(404).json({error: 'User not found'});
    // };

};

export { UserController };
