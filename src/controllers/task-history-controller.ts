import { Request, Response } from "express"
import { z } from "zod"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"

class TaskHistoryController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      task_id: z.string().uuid(),
      changed_by: z.string().uuid(),
      old_status: z.enum(["pending", "in_progress", "completed"]),
      new_status: z.enum(["pending", "in_progress", "completed"]),
    })

    const { task_id, changed_by, old_status, new_status } = bodySchema.parse(
      request.body
    )

    const existTask = await prisma.tasks.findFirst({
      where: {
        id: task_id,
      },
    })

    if (!existTask) {
      throw new AppError("this task does not exist", 404)
    }

    const existUser = await prisma.user.findFirst({
      where: {
        id: changed_by,
      },
    })

    if (!existUser) {
      throw new AppError("this user does not exist", 404)
    }

    const tasksLogs = await prisma.taskHistory.create({
      data: {
        taskId: task_id,
        changedBy: changed_by,
        oldStatus: old_status,
        newStatus: new_status,
      },

      include: {
        task: {
          select: {
            title: true,
          },
        },
        changed: {
          select: {
            name: true,
          },
        },
      },
    })

    return response.json({ tasksLogs })
  }
}

export { TaskHistoryController }
