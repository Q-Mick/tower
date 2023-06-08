
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";
import { TowerEvent } from "../models/TowerEvent.js";
import { Ticket } from "../models/Tickets.js";
class TowerEventsService {
    // Add your service methods here
    async getTowerEvents(){
        const res = await api.get("api/events");
        // logger.log("[RES DATA]", res.data)
        AppState.events = res.data.map(e => new TowerEvent(e))
        // logger.log('[EVENT DATA DUMP]', AppState.events )
    }
    async getEventById(eventId){
        const res = await api.get(`api/events/${eventId}`)
        // logger.log('[GETTING EVENT BY ID]', res.data)
        AppState.activeEvent = new TowerEvent(res.data)
        logger.log(AppState.activeEvent)
    }
    async getEventTicketsById(eventId){
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log('[GETTING EVENT TICKETS]', res.data)
        AppState.tickets = res.data.map(t => new Ticket(t))
        logger.log(AppState.tickets)
    }
}

export const towerEventsService = new TowerEventsService();