const express = require('express')
const router = express.Router()

const Bootcamp = require('../model/bootcamp')

//destructure functions from controller/bootcamps.js

const reviewRouter = require('./reviews');
router.use('/:bootcampId/reviews', reviewRouter);


const { getBootcamp, getBootcamps, createBootcamp, updateBootcamp, deleteBootcamp,getBootcampsInRadius ,bootcampPhotoUpload } = require('../controllers/bootcamps') 


const courseRouter =require('./course')

const {protect,authorize} = require('../middleware/Auth')

const advancedResult=require('../middleware/advancedResult')



 

router.use('/:bootcampId/course',authorize("publisher","admin"), courseRouter)

router.route('/radius/:zipcode/:distance').get(authorize("publisher","admin"),getBootcampsInRadius);



router.route('/').get(advancedResult(Bootcamp,"Courses"),getBootcamps).post(protect,authorize("publisher","admin"),createBootcamp)

router.route('/:id').get(getBootcamp).put(protect,authorize("publisher","admin"),updateBootcamp).delete(protect,authorize("publisher","admin"),deleteBootcamp)

router.route('/:id/photo').put(protect,authorize("publisher","admin"),bootcampPhotoUpload)

module.exports = router

