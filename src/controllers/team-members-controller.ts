import { Request, Response } from "express"
import { z } from "zod"
import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"

class TeamMembersController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      user_id: z.string(),
      team_id: z.string(),
    })

    const { user_id, team_id } = bodySchema.parse(request.body)

    const existingMembership = await prisma.teamMembers.findFirst({
      where: {
        userId: user_id,
      },
    })

    if (existingMembership) {
      throw new AppError("This user is already in a team")
    }

    const addMember = await prisma.teamMembers.create({
      data: {
        userId: user_id,
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

    return response.json({ addMember })
  }

  async index(request: Request, response: Response) {
    const members = await prisma.teamMembers.findMany({
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

    return response.json(members)
  }
}

export { TeamMembersController }
