import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { towerEventsService } from "../services/TowerEventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";

export class TowerEventsController extends BaseController {
  constructor() {
    super("api/events");
    this.router
      .get('', this.getTowerEvents)
      .get('/:eventId', this.getEventById)
      .get('/:eventId/tickets',this.getEventTickets)
      .get('/:eventId/comments', this.getEventComments)
      .use(Auth0Provider.getAuthorizedUserInfo)
        .put('/:eventId', this.editEvent)
        .post('', this.createEvent)
        .delete('/:eventId', this.cancelEvent)
  }
  async getEventComments(req, res, next) {
    try {
      const comments = await commentsService.getEventComments(req.params.eventId)
      return res.send(comments)
    } catch (error) {
      next(error);
    }
  }
  async getEventTickets(req, res, next) {
    try {
      const tickets = await ticketsService.getEventTickets(req.params.eventId)
      return res.send(tickets)
    } catch (error) {
      next(error);
    }
  }

  async createEvent(req,res,next) {
    try {
      req.body.creatorId = req.userInfo.id // verify not a bad actor
      const event = await towerEventsService.createEvent(req.body)
      return res.send(event)
    } catch (error) {
      next(error);
    }
  }
  async getTowerEvents(req, res, next) {
    try {
      const events = await towerEventsService.getAllEvents()
      return res.send (events)
    } catch (error) {
      next(error);
    }
    
  }

  async getEventById(req, res, next) {
    try {
      const event = await towerEventsService.getEventById(req.params.eventId)
      return res.send(event)
    } catch (error) {
      next(error);
    }
  }
  async editEvent(req, res, next) {
    try {
      const event = await towerEventsService.editEvent(req.body, req.params.eventId, req.userInfo.id)
      return res.send(event)
    } catch (error) {
      next(error);
    }
  }
  async cancelEvent(req, res, next) {
    try {
      const event = await towerEventsService.cancelEvent(req.params.eventId, req.userInfo.id)
      return res.send(event)
    } catch (error) {
      next(error);
    }
  
  }
}
