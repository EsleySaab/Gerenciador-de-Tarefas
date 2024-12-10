import { Request, Response } from "express"
import { z } from "zod"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"

class TasksController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      title: z.string().trim().min(3),
      description: z.string().trim().min(5),
      assigned_to: z.string(),
      team_id: z.string(),
    })

    const { title, description, assigned_to, team_id } = bodySchema.parse(
      request.body
    )

    const existUser = await prisma.user.findFirst({
      where: {
        id: assigned_to,
      },
    })

    if (!existUser) {
      throw new AppError("this user does not exist", 404)
    }

    const existTeam = await prisma.team.findFirst({
      where: {
        id: team_id,
      },
    })

    if (!existTeam) {
      throw new AppError("this team does not exist", 404)
    }

    const task = await prisma.tasks.create({
      data: {
        title,
        description,
        assignedTo: assigned_to,
        teamId: team_id,
      },

      include: {
        user: {
          select: {
            name: true,
          },
        },
        team: {
          select: {
            name: true,
          },
        },
      },
    })
    return response.status(201).json({ task })
  }

  async index(request: Request, response: Response) {
    const tasks = await prisma.tasks.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
        team: {
          select: {
            name: true,
          },
        },
      },
    })

    return response.json(tasks)
  }

  async update(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const bodySchema = z.object({
      status: z.enum(["pending", "in_progress", "completed"]),
      priority: z.enum(["high", "medium", "low"]),
    })

    const { id } = paramsSchema.parse(request.params)
    const { status, priority } = bodySchema.parse(request.body)

    await prisma.tasks.update({
      data: {
        ...(status && { status }),
        ...(priority && { priority }),
      },
      where: {
        id,
      },
    })

    return response.json("task updated successfully")
  }
}

export { TasksController }
