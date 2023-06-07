
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class TowerEventsService {
    // Add your service methods here
    async getTowerEvents(){
        const res = await api.get("api/events");
        logger.log("[RES DATA]", res.data)
    }
}

export const towerEventsService = new TowerEventsService();