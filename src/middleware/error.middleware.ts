import { Request, Response, NextFunction } from "express"
import { CustomError } from "../common/custom-error"

const errorHandler = (
  error: TypeError | CustomError,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  let customError = error

  if (!(error instanceof CustomError)) {
    customError = new CustomError("Something went wrong")
  }

  response.status((customError as CustomError).status).send(customError)
}

export default errorHandler
