import { Request, Response } from "express"

class SessionsController {
  create(request: Request, response: Response) {
    return response.json({ message: "OK!" })
  }
}

export { SessionsController }