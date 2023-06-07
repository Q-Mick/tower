import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const EventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    type: { type: String, required: true },
    startDate: { type: String, required: true },
    isCanceled: { type: Boolean, required: true },
    ticketCount: { type: Number, required: true },
    creatorId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true, toJson: { virtuals: true } }
  )

// id
// creatorId
// name
// description
// location
// capacity
// type
// startDate
// isCanceled
// ticketCount
