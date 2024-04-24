const express = require('express');
const  router = express.Router();

const courses = [
    {id: 1, name : "course1"},
    {id: 2, name : "course2"},
    {id: 3, name : "course3"},
]

router.get ('/', (req,res) => {
    res.send(courses);
})

router.get ('/:id',(req,res) => {
   const course = courses.find((course)=> (course.id === parseInt(req.params.id)));

   if (!course) res.status(404).send("course ID not found");
   res.send(course);
})

router.post('/',(req,res)=> {
   /* if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send("Name is required and should be 3 character minimum")
    } */ // strat sans joi package

    const {error} = validateCourse(req.body);

    if (result.error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

router.put('/:id', (req,res) => {
    const course = courses.find((course)=> (course.id === parseInt(req.params.id)));
    if (!course) res.status(404).send("course ID not found");

    const {error} = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    } 
    courseIndex = courses.findIndex(obj => obj.id === parseInt(req.params.id));
    console.log(courseIndex);
    courses[courseIndex].name = req.body.name;
    console.log(courses[courseIndex]);
    res.send(courses[courseIndex]);
})

router.delete('/:id', (req,res) => {
    const course = courses.find((course)=> (course.id === parseInt(req.params.id)));
    if (!course){ 
        res.status(404).send("course ID not found");
        return;
    }

    const index = courses.indexOf(course);
    courses.splice(index,1);
    console.log(courses);
    res.send(course);

})

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

module.exports = router;