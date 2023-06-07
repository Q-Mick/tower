import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { logger } from "../utils/Logger.js";
class CommentsService{
  async deleteComment(commentId, userId) {
    const comment = await this.findCommentById(commentId)
    if (comment.creatorId != userId) {
        throw new Forbidden("This is not your comment")
    }
    await comment.remove()
    return 'Comment has been deleted'
  }
  async getEventComments(eventId) {
    const comments = await dbContext.Comment.find({eventId})
    .populate('creator')
    return comments
  }
  async findCommentById(commentId){
    const comment = await dbContext.Comment.findById(commentId)
    if (!comment) {
        throw new BadRequest("Could not find this Comment, try again")
    }
    return comment
}
  async createComment(commentData) {
    const comment = await dbContext.Comment.create(commentData)
    await comment.populate('creator')
    return comment
  }

}

export const commentsService = new CommentsService()