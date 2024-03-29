import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { commentsService } from "../services/CommentsService.js"
export class CommentsController extends BaseController {
    constructor() {
      super('api/comments')
      this.router
        .get('', this.getComments)
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createComment)
        .delete('/:commentId', this.deleteComment)
    }
  async deleteComment(req, res, next) {
    try {
      const comment = await commentsService.deleteComment(req.params.commentId, req.userInfo.id)
      res.send(comment)
    } catch (error) {
      next(error);
    }
  }
    
  async createComment(req, res, next){
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.createComment(req.body)
      res.send(comment)
    } catch (error) {
      next(error);
    }
  }

  async getComments(req, res, next) {
    try {
      
    } catch (error) {
      next(error);
    }
  }
}