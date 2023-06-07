import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { logger } from "../utils/Logger.js";
class TowerEventsService{
    
    async getEventById(eventId) {
        const event = await dbContext.TowerEvent.findById(eventId).populate('creator ticketCount')
        if (!eventId) {
            throw new BadRequest(`event at ${eventId} could not be found`)
        }
        return event
    }
    async findEventById(eventId){
        const event = await dbContext.TowerEvent.findById(eventId)
        if (!event) {
            throw new BadRequest("Could not find this Event, try again")
        }
        return event
    }
    async editEvent(eventId, userId, eventData) {
        const event = await this.findEventById(eventId)
        if (event.isCanceled == true) {
            throw new BadRequest("You can not edit a cancelled event")
        }if (event.creatorId != userId){
            throw new Forbidden("This is not your event to edit")
        }

        //TODO finish this 
      
    }
    async createEvent(eventData){
        const event = await dbContext.TowerEvent.create(eventData)
        await event.populate('creator ticketCount')
        return event
    }
    async getAllEvents(){
        const events = await dbContext.TowerEvent.find().populate('creator ticketCount')
        return events
    }
    async cancelEvent(eventId, userId) {
        const event = await this.findEventById(eventId)
        if (event.creatorId != userId) {
            throw new Forbidden('Get out of here bro!')
        }
        if (event.isCanceled == true) {
            throw new BadRequest('This event is already cancelled you cant cancel it again')
        }
        event.isCanceled = true
        await event.save()
        return event

    }  
}

export const towerEventsService = new TowerEventsService()