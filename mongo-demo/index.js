const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("connected to mangoDB"))
  .catch((err) => console.error("could not connect to mangoDB", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular course",
    author: "Adrian",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

// to query there are a bunch of values !
// eq (equal)
// ne (not equal)
// gt (greater than)
// gte (greater than or equel to)
// lt (less than)
// lte (less than or equal to)
// in
// nin (not in)

//for example : .find ({price : {$gt : 10, $lte: 20}}) to query obect with attribute price greater than 10 and less or equal than 20

// we can use OR operator :
// .find().or([{author : Adrian}, {isPublished : true}]) // to find every athored by adrian or published

// can use regular expression inside  / /: {author : /.*Adrian.*/} to author containg adrian
async function getCourses() {
  const courses = await Course.find({ author: "Adrian", isPublished: true })
    .limit(10)
    .sort({ name: 1 }) // 1 croissant -1 décroissant
    .select({ name: 1, tags: 1 }); // select the field to display
  console.log(courses);
}

async function updateCourseMethode1(id) {
  // approach : query frist
  //findbyID()
  //modify its propreties
  //save()
  const course = await Course.findById(id);
  if (!course) return;
  course.isPublished = true;
  course.author = "Another Author";
  const result = await course.save();
  console.log(course);
}

async function updateCourseMethode2(id) {
  //approach : update first
  //update directly
  // optionnaly get the updated document
  const result = await Course.updateMany(
    { _id: id },
    {
      $set: {
        author: "again another author xd",
        isPublished: false,
      },
    }
  );
}

// .count() to have the number of document

updateCourseMethode2("66292fafe99c621f03176ead");
