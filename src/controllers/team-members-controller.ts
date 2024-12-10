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

    if (user_id) {
      throw new AppError("This user is already in a team")
    }

    return response.json({ addMember })
  }
}

export { TeamMembersController }
