const router = require('express').Router()
const Person = require('../models/Person');
// rotas da api
router.post('/', async(req,res) => {
    const {name, salary, approved, cpf} = req.body;
    if(!name){
        res.status(422).json({error: 'O nome é obrigatório'});
    }
    const person = {name, salary, approved, cpf}
    try{
        await Person.create(person);
        res.status(201).json({message: 'Pessoas inserida no sistema com sucesso'});

    }catch(erro){ res.status(500).json({error: erro})}

});

router.get('/', async (req, res) => {
    try{
        const people = await Person.find();
        res.status(200).json(people);
    }catch(erro){
        res.status(500).json({error: erro})
    }
});

router.get('/:id', async  (req, res) => {
    try {
        const id = req.params.id;
        const person = await Person.findOne({_id: id});
        if(!person){
            res.status(422).json({message: 'O usuário não foi enocntrado!'});
            return;
        }
        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({error: erro});
    }
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const  {name, salary, approved, cpf} = req.body;

    const person = {
        name, 
        salary, 
        approved,
        cpf,
    }

    try{
        const upDatePerson = await Person.updateOne({_id: id}, person);
        if(upDatePerson.matchedCount == 0){
            res.status(422).json({message: 'O usuário não foi encontrado'});
        }
        res.status(200).json(person);
    }catch(erro){
        res.status(500).json({error: erro});
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const person = await Person.findOne({_id: id});
    if(!person){
        res.status(422).json({message: 'O usuário não foi enocontrado'});
        return;
    }

    try{
        await Person.deleteOne({_id: id});
        res.status(200).json({message: 'Usuário removido com sucesso'});

    }catch(erro){res.status(500).json({error: erro});}

}

);
module.exports = router;


