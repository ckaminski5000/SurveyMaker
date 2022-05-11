//CRUD options to update database with inventory items
const asyncHandler = require('express-async-handler');
const Survey = require('../models/surveyModel');

// get all surveys
//@route GET /surveys
const getSurvey = asyncHandler(async (req, res) => {
    const survey = await Survey.find({id: req.body.id});
    res.status(200).json(survey);
})


//create new surveys
//@route POST /surveys/create
const createSurvey = asyncHandler(async (req, res) => {
    
    const survey = await Survey.create({
        questions: req.body.questions,
        user_id: req.user._id,
        title: req.body.title
    })
    
    res.status(200).json(survey);
})

//update surveys
//@route PUT /surveys/update
const updateSurvey = asyncHandler(async (req, res) => {
    const survey = await Survey.findById(req.params.id);
    if(!survey){
        res.status(400);
        throw new Error('That Survey was not found.');
    }
    const updatedSurvey = await Survey.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedSurvey);
})



//delete surveys
//@route DELETE /surveys/delete
const deleteSurvey = asyncHandler(async (req, res) => {
    const survey = await Survey.findById(req.params.id);
    if(!survey){
        res.status(400);
        throw new Error('That Survey was not found.');
    }
    await Survey.deleteOne({ _id: req.params.id});
    const existState = await Survey.findOne({_id: req.params.id})
    res.status(200).json({id: req.params.id, exists: existState});
})

module.exports = {
    getSurvey,
    createSurvey,
    updateSurvey,
    deleteSurvey
}