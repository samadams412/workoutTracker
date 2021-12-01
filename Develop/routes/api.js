const router = require("express").Router();
const Workout = require("../models/exerciseModel");

// Creating a new workout
router.post("/api/workouts", (req, res) => {
  Workout.create({
      exercises: []
    })
    .then(dbWorkout => {
      res.json(dbWorkout)
    })
    .catch((err) => {
      res.json(err);
    })
});

// Adding an exercise to our workout using exerciseModel.js
router.put("/api/workouts/:id", ({
  body,
  params
}, res) => {
     Workout.findByIdAndUpdate({
      _id: params.id
    }, {
      $push: {
        exercises: {
          type: body.type,
          name: body.name,
          duration: body.duration,
          weight: body.weight,
          reps: body.reps,
          sets: body.sets,
          distance: body.distance
        }
      }
    })
    .then(res => {
      res.json(res);
    })
    .catch((err) => {
      res.json(err);
    })
});

// Fetching all of our workouts
router.get("/api/workouts", (req, res) => {
  Workout.find()
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// Getting all of our workouts within range, for the stats page.
router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
  .sort({ "day": -1 })
  .limit(7)
  .exec((err, docs) => {
    if (err) throw err;
    res.status(200).json(docs);
  })
});

module.exports = router;