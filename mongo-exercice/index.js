const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/mongo-exercises")
  .then(() => console.log("connected to mangoDB"))
  .catch((err) => console.error("could not connect to mangoDB", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function getCoursesExercice1() {
  const courses = await Course.find({ tags: "backend", isPublished: true })
    .sort({ name: 1 }) // 1 croissant -1 décroissant
    .select({ name: 1, author: 1 }); // select the field to display
  console.log(courses);
}

async function getCoursesExercice2() {
  const courses = await Course.find({
    tags: { $in: ["frontend", "backend"] },
    isPublished: true,
  })
    .sort({ price: -1 }) // 1 croissant -1 décroissant
    .select({ name: 1, author: 1 }); // select the field to display
  console.log(courses);
}

getCoursesExercice2();
