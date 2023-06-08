import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId;

export const TowerEventSchema = new Schema(
  {
    creatorId: { type: ObjectId, required: true , ref: 'Account'},
    name: { type: String, required: true },
    description: { type: String, required: true },
    coverImg:{type: String, required: true, maxlength: 300, default:"https://images.unsplash.com/photo-1561489396-888724a1543d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"},
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    startDate: { type: String, required: true },
    isCanceled: { type: Boolean, required: true, default: false },
    type: { type: String, required: true, enum:['concert', 'convention', 'sport', 'digital', 'expos', 'exhibits'] },
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
TowerEventSchema.virtual('creator',{
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})


// TODO double check on this
TowerEventSchema.virtual('ticketCount', {
    localField: '_id',
    foreignField: 'eventId',
    ref: 'Ticket', // the schema that ^ foreign field is looking for
    count: true
})
