import express from "express"
import { getTrailer } from "./controllers/trailer.controller"

const router = express.Router()

/**
 * Trailer Controller
 */
router.get("/api/:movie", getTrailer)

export default router
