import { Request, Response } from "express"

class TeamsController {
  create(request: Request, response: Response) {
    return response.json({ message: "OK!" })
  }
}

export { TeamsController }