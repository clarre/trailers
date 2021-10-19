import axios from "axios"
import { CustomError } from "../common/custom-error"

export const VIAPLAY_URL = "https://content.viaplay.se/pc-se/film/"
export const TMDB_FIND_MOVIE_URL = "https://api.themoviedb.org/3/find/"

export const TMDB_SUFFIX = "&external_source=imdb_id"

export const TMDB_MOVIE_URL = "https://api.themoviedb.org/3/movie/"

export const YOUTUBE_LINK = "https://www.youtube.com/watch?v="

const findIMDBId = (data: any) => {
  // eslint-disable-next-line no-underscore-dangle
  return data._embedded["viaplay:blocks"][0]._embedded["viaplay:product"]
    .content.imdb.id
}

export const findIMDBMovie = async (movie: string) => {
  try {
    const response: any = await axios.get(`${VIAPLAY_URL}${movie}`)

    const imdbId = findIMDBId(response.data)

    if (!imdbId) {
      throw new Error()
    }

    return imdbId
  } catch (error) {
    throw new CustomError("Couldn't fetch IMDB id for movie from VIAPLAY api")
  }
}

const findTMDBId = (data: any) => {
  return data.movie_results[0].id
}

export const findTMDBMovie = async (imdbId: string) => {
  try {
    const response: any = await axios.get(
      `${TMDB_FIND_MOVIE_URL}${imdbId}?api_key=${process.env.TMDb_token}${TMDB_SUFFIX}`
    )

    const tmdbId = findTMDBId(response.data)

    if (!tmdbId) {
      throw new Error()
    }

    return tmdbId
  } catch (error) {
    throw new CustomError("Couldn't find themoviedb movie")
  }
}

const findYoutubeTrailerId = (data: any) => {
  if (!data.results) {
    return null
  }

  return data.results.filter((video: any) => {
    return (
      video.site.toLowerCase() === "youtube" &&
      video.type.toLowerCase() === "trailer"
    )
  })
}

export const findTMDBMovieYoutubeTrailer = async (tmdbId: string) => {
  try {
    const response: any = await axios.get(
      `${TMDB_MOVIE_URL}${tmdbId}/videos?api_key=${process.env.TMDb_token}`
    )

    const youtubeTrailerIds: Array<any> = findYoutubeTrailerId(response.data)

    if (!youtubeTrailerIds || youtubeTrailerIds.length === 0) {
      throw new Error()
    }

    const youtubeTrailer = youtubeTrailerIds[0]

    if (!youtubeTrailer.key) {
      throw new Error()
    }

    const result = {
      trailerLink: `${YOUTUBE_LINK}${youtubeTrailer.key}`,
    }

    return result
  } catch (error) {
    throw new CustomError("Couldn't find youtube trailer for movie")
  }
}

export const trailerLink = async (movie: string) => {
  const imdbId = await findIMDBMovie(movie)
  const tmdbId = await findTMDBMovie(imdbId)
  const youtubeTrailer = await findTMDBMovieYoutubeTrailer(tmdbId)

  return youtubeTrailer
}
