import { CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';

const DetailPage = ({ name }) => {
    const [snippet, setSnippet] = useState('')
    const [loading, setLoading] = useState(true)
    const wikiLink = "https://en.wikipedia.org/wiki/" + name
    const imdbLink = "http://www.imdb.com/find?q=" + name


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
                    console.log(response.query.search[0])
                    setSnippet(response.query.search[0].snippet)
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

            <div dangerouslySetInnerHTML={{ __html: snippet }}>

            </div>
            <div>
                <a target="blank" href={wikiLink} >Wikipedia</a>

            </div>
            <a target="blank" href={imdbLink}>IMDB</a>

        </>
    );
}


export default DetailPage;