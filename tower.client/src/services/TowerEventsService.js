
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";
import { TowerEvent } from "../models/TowerEvent.js";
import { Ticket } from "../models/Tickets.js";
import { Comment } from "../models/Comment.js";
class TowerEventsService {
    // Add your service methods here
    async createEvent(eventData){
        const res = await api.post('api/events',eventData)
        logger.log(res.data)
        AppState.events.push(new TowerEvent(res.data));
        return res.data
    }

    async cancelEvent(eventId){
        const res = await api.delete(`api/events/${eventId}`)
        logger.log(res.data)
        
        return res.data
    }
    async getTowerEvents(){
        const res = await api.get("api/events");
        // logger.log("[RES DATA EVENTS]", res.data)
        AppState.events = res.data.map(e => new TowerEvent(e))
        // logger.log('[EVENT DATA DUMP]', AppState.events )
    }
    async getEventById(eventId){
        const res = await api.get(`api/events/${eventId}`)
        // logger.log('[GETTING EVENT BY ID]', res.data)
        AppState.activeEvent = new TowerEvent(res.data)
        // logger.log(AppState.activeEvent)
    }
    async getEventTicketsById(eventId){
        const res = await api.get(`api/events/${eventId}/tickets`)
        // logger.log('[GETTING EVENT TICKETS]', res.data)
        AppState.tickets = res.data.map(t => new Ticket(t))
        // logger.log(AppState.tickets)
    }
    async getMyTickets(){
        const res = await api.get(`/account/tickets`)
        logger.log('[GETTING MY TICKETS]', res.data)
        AppState.myTickets =  res.data.map(t => new Ticket(t))
        logger.log(AppState.myTickets)
    }
    async getCommentsById(eventId){
        const res = await api.get(`api/events/${eventId}/comments`)
        // logger.log('[GETTING EVENT COMMENTS]', res.data)
        AppState.comments = res.data.map(c => new Comment(c))
        // logger.log(AppState.comments)
    }
    async createComment(commentData){
        const newComment = {body: commentData,eventId: AppState.activeEvent.id}
        logger.log(newComment)
        const res = await api.post('api/comments',newComment)
        logger.log(res.data)
        AppState.comments.push(new Comment(res.data));
        logger.log(AppState.comments)
        
    }
    async deleteComment(commentId){
        const res = await api.delete(`api/comments/${commentId}`)
        AppState.comments = AppState.comments.filter(c => c.id != commentId)
        logger.log(res.data)
    }
    async createTicket(ticketData){
        const res = await api.post('api/tickets',ticketData)
        logger.log(res.data)
        AppState.tickets.push(new Ticket(res.data));
        AppState.myTickets.push(new Ticket(res.data));
        AppState.activeEvent.capacity--
        
    }

    async deleteTicket(ticketId){  
        const res = await api.delete(`api/tickets/${ticketId}`)
        logger.log(res.data)
        AppState.tickets = AppState.tickets.filter(t => t.id != ticketId)
        AppState.myTickets = AppState.myTickets.filter(t => t.id != ticketId)
        AppState.activeEvent.capacity++

        // look at all the tickets and filter out the deleted one
        // look at MY tickets and filter out the deleted one
        // change the capacity back
    }
}

export const towerEventsService = new TowerEventsService();