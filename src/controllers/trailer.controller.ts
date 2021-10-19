import { Request, Response, NextFunction } from "express"
import * as trailerService from "../services/trailer.service"

export const getTrailer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { movie } = req.params

  try {
    const link = await trailerService.trailerLink(movie)
    res.status(200).json(link)
  } catch (error) {
    next(error)
  }
}
