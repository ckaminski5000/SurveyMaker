//CRUD options to update database with inventory items
const asyncHandler = require('express-async-handler');
const Question = require('../models/questionModel');

// get all questions
//@route GET /questions
const getQuestion = asyncHandler(async (req, res) => {
    const question = await Question.find({id: req.body.id});
    res.status(200).json(question);
})


//create new questions
//@route POST /questions/create
const createQuestion = asyncHandler(async (req, res) => {
    
    const question = await Question.create({
        question: req.body.question,
        type: req.body.type,
        answer_choices: req.body.answer_choices,
        survey_id: req.body.survey_id,
        user_id: req.user._id
    })
    
    res.status(200).json(question);
})

//update questions
//@route PUT /questions/update
const updateQuestion = asyncHandler(async (req, res) => {
    console.log(req.user);
    const question = await Question.findById(req.params.id);
    if(!question){
        res.status(400);
        throw new Error('That question was not found.');
    }

    const user = await User.findById({id: req.question.user_id})



    const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedQuestion);
})



//delete questions
//@route DELETE /questions/delete
const deleteQuestion = asyncHandler(async (req, res) => {
    const question = await Question.findById(req.params.id);
    if(!question){
        res.status(400);
        throw new Error('That question was not found.');
    }
    await Question.deleteOne({ _id: req.params.id});
    const existState = await Question.findOne({_id: req.params.id})
    res.status(200).json({id: req.params.id, exists: existState});
})

module.exports = {
    getQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion
}