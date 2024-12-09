import { Request, Response } from "express"
import { z } from "zod"
import { prisma } from "@/database/prisma"

class TeamsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(4),
      description: z.string().min(4),
    })

    const { name, description } = bodySchema.parse(request.body)

    await prisma.team.create({
      data: {
        name,
        description,
      },
    })
    return response.status(201).json()
  }

  async index(request: Request, response: Response) {
    const teams = await prisma.team.findMany()

    return response.json(teams)
  }

  async remove(request: Request, response: Response) {
    try {
      const { id } = request.params

      const deletedTeam = await prisma.team.delete({ where: { id } })

      return response.json({ message: "Team deleted sucessfully" })
    } catch (error) {
      return response.status(400).json("Team not found or could not be deleted")
    }
  }
}

export { TeamsController }
