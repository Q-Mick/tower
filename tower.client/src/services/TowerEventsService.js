
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";
import { TowerEvent } from "../models/TowerEvent.js";
class TowerEventsService {
    // Add your service methods here
    async getTowerEvents(){
        const res = await api.get("api/events");
        // logger.log("[RES DATA]", res.data)
        AppState.events = res.data.map(e => new TowerEvent(e))
        logger.log('[EVENT DATA]', AppState.events )
    }
}

export const towerEventsService = new TowerEventsService();