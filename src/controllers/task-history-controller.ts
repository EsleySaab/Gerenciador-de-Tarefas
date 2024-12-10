import { Request, Response } from "express"
import { z } from "zod"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"

class TaskHistoryController {
  async create(request: Request, response: Response) {
    return response.json({ message: "OK!" })
  }
}

export { TaskHistoryController }
