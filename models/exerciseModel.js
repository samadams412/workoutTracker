const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema(
  {
    day: {
      type: Date,
      default: () => new Date(),
    },

    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: "You must provide the type of exercise",
        },
        name: {
          type: String,
          trim: true,
          required: "You must name this exercise",
        },
        duration: {
          type: Number,
          required: "Please enter the duration of this exercise",
        },

        weight: {
          type: Number,
        },
        reps: {
          type: Number,
        },
        sets: {
          type: Number,
        },
        distance: {
          type: Number,
        },
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// total duration
ExerciseSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model("Exercise", ExerciseSchema);

module.exports =  Workout ;
