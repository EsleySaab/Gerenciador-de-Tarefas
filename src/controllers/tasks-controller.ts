import { Request, Response } from "express"
import { z } from "zod"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"

class TasksController {
  async create(request: Request, response: Response) {
    return response.status(201).json({ message: "OK!" })
  }
}

export { TasksController }
