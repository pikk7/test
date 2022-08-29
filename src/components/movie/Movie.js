import { Button, Paper, Rating } from '@mui/material';
import React, { useState } from 'react';
import DetailPage from '../detailPage/DetailPage';

const Movie = ({ movie, setMovies }) => {
    const { name, releaseDate, score, genres, id, similar } = movie
    const [open, setOpen] = useState(false)

    function round(num) {
        return Math.round(num * 10) / 10;
    }


    const categories = genres.map((genre, index) => {
        if (index === genres.length - 1) {
            return <span key={genre.id}>{genre.name}</span>

        }
        return <span key={genre.id}>{genre.name}, </span>
    })

    return (
        <Paper className='movie'>
            <ul>
                <li>     <Button onClick={() => setOpen(!open)} variant="contained">
                    {name}

                </Button></li>


                <li>               Release: {new Date(releaseDate).getFullYear()}
                </li>

                <li>                <Rating precision={0.5} max={10} size="small" value={score} readOnly />
                </li>
                <li>{round(score)}/10 </li>


                <li> Categories:
                    {categories}

                </li>


                {open && <DetailPage setMovies={setMovies} name={name} similar={similar} />}
            </ul>
        </Paper>
    );
}


export default Movie;