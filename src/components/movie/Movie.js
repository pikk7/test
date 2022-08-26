import { Button } from '@mui/material';
import React, { useState } from 'react';
import DetailPage from '../detailPage/DetailPage';

const Movie = ({ movie }) => {
    const { name, releaseDate } = movie
    const [open, setOpen] = useState(false)

    return (
        <div className='movie'>
            <Button onClick={() => setOpen(!open)} variant="contained">
                <span className='title'>{name}</span>
                <div>({new Date(releaseDate).getFullYear()})</div>
            </Button>
            {open && <DetailPage name={name} />}
        </div>
    );
}


export default Movie;