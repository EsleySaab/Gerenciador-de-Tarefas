import { Router } from "express"
import { TasksController } from "@/controllers/tasks-controller"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization"

const tasksRoutes = Router()
const tasksController = new TasksController()

tasksRoutes.use(ensureAuthenticated, verifyUserAuthorization(["admin"]))

tasksRoutes.post("/", tasksController.create)
tasksRoutes.get("/", tasksController.index)
tasksRoutes.patch("/:id", tasksController.update)

export { tasksRoutes }
