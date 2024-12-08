import express from "express"
import "express-async-errors"

import { routes } from "./routes"
import { errorHandling } from "./middlewares/error-handling"
import { ensureAuthenticated } from "./middlewares/ensure-authenticated"

const app = express()

app.use(express.json())

app.use(routes)

app.use(errorHandling)

export { app }
