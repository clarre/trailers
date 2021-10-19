import axios from "axios"
import { CustomError } from "../common/custom-error"

import {
  VIAPLAY_URL,
  TMDB_FIND_MOVIE_URL,
  TMDB_SUFFIX,
  TMDB_MOVIE_URL,
  YOUTUBE_LINK,
  findIMDBMovie,
  findTMDBMovie,
  findTMDBMovieYoutubeTrailer,
} from "./trailer.service"

jest.mock("axios")

describe("trailer.service", () => {
  describe("findIMDBMovie", () => {
    it("should call axios get with url and return result", async () => {
      const expected = "movieid"

      const viaplayIMDBId = {
        data: {
          _embedded: {
            "viaplay:blocks": [
              {
                _embedded: {
                  "viaplay:product": {
                    content: { imdb: { id: expected } },
                  },
                },
              },
            ],
          },
        },
      }

      ;(axios.get as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(viaplayIMDBId)
      )

      const movie = "someMovie"

      const actual = await findIMDBMovie(movie)

      expect(axios.get).toHaveBeenCalledWith(`${VIAPLAY_URL}${movie}`)
      expect(actual).toEqual(expected)
    })

    it("should throw CustomError", async () => {
      const movie = "someMovie"

      await expect(findIMDBMovie(movie)).rejects.toBeInstanceOf(CustomError)
    })
  })

  describe("findTMDBMovie", () => {
    it("should call axios get with url and return result", async () => {
      const expected = "someTMDbId"

      const response = {
        data: {
          movie_results: [{ id: expected }],
        },
      }

      ;(axios.get as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(response)
      )

      const imdbId = "someId"

      const actual = await findTMDBMovie(imdbId)

      expect(axios.get).toHaveBeenCalledWith(
        `${TMDB_FIND_MOVIE_URL}${imdbId}?api_key=${process.env.TMDb_token}${TMDB_SUFFIX}`
      )
      expect(actual).toEqual(expected)
    })

    it("should throw CustomError", async () => {
      const imdbId = "someId"

      await expect(findTMDBMovie(imdbId)).rejects.toBeInstanceOf(CustomError)
    })
  })

  describe("findTMDBMovieYoutubeTrailer", () => {
    it("should call axios get with url and return result", async () => {
      const youtubeKey = "someyoutubekey"

      const expected = {
        trailerLink: `${YOUTUBE_LINK}${youtubeKey}`,
      }

      const response = {
        data: {
          results: [{ key: youtubeKey, site: "YouTube", type: "trailer" }],
        },
      }

      ;(axios.get as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(response)
      )

      const tmdbid = "someId"

      const actual = await findTMDBMovieYoutubeTrailer(tmdbid)

      expect(axios.get).toHaveBeenCalledWith(
        `${TMDB_MOVIE_URL}${tmdbid}/videos?api_key=${process.env.TMDb_token}`
      )
      expect(actual).toEqual(expected)
    })

    it("should throw CustomError", async () => {
      const tmdbid = "someId"

      await expect(findTMDBMovieYoutubeTrailer(tmdbid)).rejects.toBeInstanceOf(
        CustomError
      )
    })
  })

  // Add test for trailerLink, mocking away the functions
  // Testing that they are called in order
})
