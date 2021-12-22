const express = require('express')
const router = express.Router({mergeParams: true})


     const {getCourses,addCourse,updateCourse,deleteCourse} = require('../controllers/course')
     
     const {protect,authorize} = require('../middleware/Auth')


    router.route('/').get(getCourses).post(protect,authorize("publisher","admin"),addCourse)

    const {  getCourse } = require('../controllers/course')
    router.route('/:id').get(getCourse).put(protect,authorize("publisher","admin"),updateCourse).delete(protect,authorize("publisher","admin"),deleteCourse)


    
module.exports = router

