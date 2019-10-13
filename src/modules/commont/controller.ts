import * as Sequelize from "../../models/base";
import { RequestHandler } from "../common/request-handler";
import _ = require("lodash");
import commentService from "../../graph-db/services/CommentService"
import {Comment,Replies} from "../../type/types"

export async function createComment(handler: RequestHandler) {
  try {
    const body = handler.getBody();
    const { text, replyTo, user } = body;
    const data: Comment = { userId: user.id, userName: user.name, text: text }
    if (replyTo) {
      data["replyTo"] = replyTo;
    }
    const comment = await commentService.saveCommet(data);
    return handler.sendResponse({ comment });  
  } catch (error) {
    return handler.sendServerError(error); 
  }
  
}

export async function updateComment(handler:RequestHandler){
  try {
    const body = handler.getBody();
    const { user, text } = body;
    const commentId: number = handler.getRequestParameter("id");
    const comment: any = await commentService.getCommet(commentId);
    const cmd = constructSingleComment(comment)
    if (cmd.userId !== user.id) {
      return handler.sendNotFoundResponse({ message: "Invalid User" });
    }
    await commentService.updateCommet(text, commentId);
    return handler.sendResponse({ commentId });  
  } catch (error) {
    return handler.sendServerError(error); 
  }
  
}

export async function deleteComment(handler:RequestHandler){
  try {
    const { user } = handler.getBody();
    const commentId: number = handler.getRequestParameter("id");
    const comment: any = await commentService.getCommet(commentId);
    const cmd = constructSingleComment(comment)
    console.log(cmd, " cfdsfdsf", user.id)
    if (cmd.userId !== user.id) {
      return handler.sendNotFoundResponse({ message: "Invalid User" });
    }
    await commentService.deleteCommet(commentId);
    return handler.sendResponse({ commentId });
  } catch (error) {
    return handler.sendServerError(error);
  }
  
}

export async function getComment(handler: RequestHandler) {
  try {
    const commentId: number = handler.getRequestParameter("id");
    const comment: any = await commentService.getCommet(commentId);
    return handler.sendResponse(constructSingleComment(comment));
  } catch (error) {
    return handler.sendServerError(error);
  }
  
}

export async function getComments(handler: RequestHandler) {
  try {
    const comments: any = await commentService.getCommets();
    const cmds = [];
    for (let data of comments) {
      const comment = data._fields[0];
      const replies: Replies[] = comment.reply_to ? constructRplies(comment.reply_to) : [];
      cmds.push({ text: comment.text, id: comment._id.low, userId: comment.userId.low, replies: replies })
    }
    return handler.sendResponse(cmds);
  } catch (error) {
    return handler.sendServerError(error);
  }
  
}

function constructRplies(replies: any[]): Replies[]{
  const rpls: Replies[] =[]
  for (let reply of replies) {
    const replies: Replies[] = reply.reply_to ? constructRplies(reply.reply_to) : [];
    rpls.push({ text: reply.text, id: reply._id.low, userId: reply.userId.low, replies: replies })
  } 
  return rpls;
}

function constructSingleComment(comment:any[]):any{
  if (!comment[0]) return  null;
  const cmd = comment[0]._fields[0].properties;
  return { userId:cmd.userId,text:cmd.text}
}