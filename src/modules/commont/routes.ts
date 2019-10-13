import { Express } from "express";
import * as controller from "./controller";
import { authenticate, handle } from "../common/request-handler";

export default function(app: Express) {
  app.get(
    "/comments",
    authenticate,
    handle(controller.getComments)
  );
  app.get(
    "/comments/:id",
    authenticate,
    handle(controller.getComment)
  );
  app.post(
    "/comments",
    authenticate,
    handle(controller.createComment)
  );
  app.put(
    "/comments/:id",
    authenticate,
    handle(controller.updateComment)
  );
  app.delete(
    "/comments/:id",
    authenticate,
    handle(controller.deleteComment)
  );
}