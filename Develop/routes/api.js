const router = require("express").Router();
const Workout = require("../models/exerciseModel");

// Creating new workout
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

// Adding an exercise workout using exerciseModel.js
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

// Fetching all workouts
router.get("/api/workouts", (req, res) => {
  Workout.find()
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// Getting all workouts within range
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