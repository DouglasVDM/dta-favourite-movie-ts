import { useCallback, useEffect, useState } from "react";

// HELPERS
import { isPersistedState } from "../helpers";

// API
import API, { Movie, Cast, Crew } from '../API';

// TYPES
export type MovieState = Movie & {
  actors: Cast[];
  directors: Crew[];
};

export const useMovieFetch = (movieId: string) => {
  const [state, setState] = useState<MovieState>({} as MovieState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchMovie = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const movie = await API.fetchMovie(movieId);

      const credits = await API.fetchCredits(movieId);

      // GET DIRECTORS ONLY
      const directors = credits.crew.filter(
        member => member.job === 'Director'
      );

      setState({
        ...movie,
        actors: credits.cast,
        directors
      });

      setLoading(false)
    } catch (error) {
      setError(true);
    }
  }, [movieId]);

  // INITIAL RENDER
  useEffect(() => {
    const sessionState = isPersistedState(movieId.toString());

    if (sessionState) {
      setState(sessionState);
      setLoading(false);
      return;
    }

    fetchMovie();
  }, [movieId, fetchMovie]);

  // WRITE TO SESSION STORAGE
  useEffect(() => {
    sessionStorage.setItem(movieId.toString(),JSON.stringify(state))
  }, [movieId, state]);

  return { state, loading, error };
}