import { Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';

const DetailPage = ({ name, setMovies, similar }) => {
    const [snippet, setSnippet] = useState('')
    const [loading, setLoading] = useState(true)
    const [movieDetails, setMovieDetails] = useState(null)
    const wikiLink = "https://en.wikipedia.org/wiki/" + name
    const [imdbLink, setImdbLInk] = useState("https://www.imdb.com/title/")


    const setSimilarMovies = () => {
        setMovies(similar)
    }

    useEffect(() => {
        let url = "https://en.wikipedia.org/w/api.php?origin=*";

        const params = {
            action: "query",
            list: "search",
            srsearch: name,
            format: "json",
        };

        Object.keys(params).forEach(key => { url += "&" + key + "=" + params[key]; });

        fetch(url)
            .then(response => response.json())
            .then(response => {
                if (response.query.search[0]) {
                    setSnippet(response.query.search[0].snippet)
                }

            })
            .then(() => {
                setLoading(false)
            })
            .catch(error => { console.log(error); });
    }, [name])


    useEffect(() => {
        setLoading(true)
        fetch(`http://www.omdbapi.com/?t=${name}&apikey=${process.env.REACT_APP_API_KEY}`)
            .then(response => response.json())
            .then(response => {
                if (response) {
                    setMovieDetails(response)
                    setImdbLInk("https://www.imdb.com/title/" + response.imdbID)
                }

            })
            .then(() => {
                setLoading(false)
            })
            .catch(error => { console.log(error); });
    }, [name])

    if (loading) {
        return <><CircularProgress /></>
    }

    return (
        <>
            <h1>
                {name}
            </h1>

            <ul>
                <li>
                    <div dangerouslySetInnerHTML={{ __html: snippet }}>
                    </div>
                </li>
                <li>                <a target="blank" href={wikiLink} >Wikipedia</a>
                </li>
                <li>                <a target="blank" href={imdbLink}>IMDB</a>
                </li>
                <li>                <Button onClick={setSimilarMovies} >Simmilar movies</Button>
                </li>

            </ul>


        </>
    );
}


export default DetailPage;