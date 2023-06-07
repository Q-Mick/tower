import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { logger } from "../utils/Logger.js";

class TicketsService{
    async findTicketById(ticketId){
        const ticket = await dbContext.Ticket.findById(ticketId)
        if (!ticket) {
            throw new BadRequest("Could not find this Ticket, try again")
        }
        return ticket
    }

    async deleteTicket(ticketId, userId) {
        const ticket = await this.findTicketById(ticketId)
        if (ticket.accountId != userId) {
            throw new Forbidden("You don't own this ticket") 
        }
        await ticket.remove()
        return 'This ticket has been deleted'

        
    }
    async getEventTickets(eventId) {
        const tickets = await dbContext.Ticket.find({eventId}).populate('profile event')
        return tickets
    }
    async getMyTicket(accountId) {
        const tickets = await dbContext.Ticket.find({accountId}).populate('profile event')
        return tickets
    }
    async createTicket(ticketData) {
        const ticket = await dbContext.Ticket.create(ticketData)
        await ticket.populate('profile event')
        return ticket
    }




}

export const ticketsService = new TicketsService()