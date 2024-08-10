import { Router } from "express";

import {
  deleteForm,
  getForm,
  postForm,
  updateForm,
} from "../controllers/formController.js";

export const formRouter = Router();

formRouter.route("/getAllByUserId/:userId").get(getForm);

formRouter.route("/").post(postForm);

formRouter.route("/:id").put(updateForm);

formRouter.route("/:id").delete(deleteForm);
