import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { ticketsService } from "../services/TicketsService.js";

export class TicketsController extends BaseController {
  constructor() {
    super("api/tickets");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.createTicket)
      .delete("/:ticketId", this.deleteTicket);
  }
  async deleteTicket(req, res, next) {
    try {
      const ticket = await ticketsService.deleteTicket(
        req.params.ticketId,
        req.userInfo.id
      );
      return res.send(ticket);
    } catch (error) {
      next(error);
    }
  }

  async createTicket(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id;
      const ticket = await ticketsService.createTicket(req.body);
      return res.send(ticket);
    } catch (error) {
      next(error);
    }
  }
}
