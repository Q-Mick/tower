
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";
import { TowerEvent } from "../models/TowerEvent.js";
import { Ticket } from "../models/Tickets.js";
import { Comment } from "../models/Comment.js";
class TowerEventsService {
    // Add your service methods here
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
        // AppState.myTicket =  new Ticket(res.data)
        // logger.log(AppState.myTicket)
    }
    async getCommentsById(eventId){
        const res = await api.get(`api/events/${eventId}/comments`)
        // logger.log('[GETTING EVENT COMMENTS]', res.data)
        AppState.comments = res.data.map(c => new Comment(c))
        // logger.log(AppState.comments)
    }
    async createTicket(ticketData){
        const res = await api.post(ticketData)
        logger.log(res.data)
        AppState.tickets.push(new Ticket(res.data));
        
    }
}

export const towerEventsService = new TowerEventsService();