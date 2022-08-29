import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Movie from '../movie/Movie';
import CircularProgress from '@mui/material/CircularProgress';

const SearchForm = () => {
  const [movie, setMovie] = useState(null)
  const [movies, setMovies] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = (event) => {
    event.preventDefault()
    setLoading(true)
    fetch('https://tmdb.sandbox.zoosh.ie/dev/grphql', {
      method: 'POST',

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        query: `{
                    searchMovies(query: "${movie}") {
                      id
                      name
                      releaseDate
                      score
                      genres {
                        name
                        id
                      }
                      similar{
                        id
                        name
                        releaseDate
                        score
                        genres {
                          name
                          id
                        }   
                      }
                    }
                  }
                  `
      })
    })
      .then(res => res.json())
      .then(res => {
        setMovies(res?.data?.searchMovies || [])
      })
      .then(() => setLoading(false))
  }



  return (
    <>
      <form className="header"
        onSubmit={handleSearch}>
        <TextField variant="outlined" sx={{ margin: '10px' }} onChange={e => setMovie(e.target.value)} />

        <Button variant='contained' type='submit' >Search</Button>
      </form>


      {loading && <CircularProgress />}
      <div className='container'>
        {movies && !loading && movies.map(movie => <Movie setMovies={setMovies} key={movie.id} movie={movie} />)}
        {movies && movies.length === 0 &&
          <div>Sorry, We didn't find this movie.</div>
        }
      </div>
    </>
  );
}


export default SearchForm;