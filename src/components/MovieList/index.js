import React, { useState } from 'react';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';

import './style.css';

export default ({title, items}) => {

    const [ scrollMovie, setScrollMovie ] = useState(0);
    const [ leftArrow, setLeftArrow ] = useState(false);

    const handleLeftArrow = () => {
        let scroll = scrollMovie + Math.round(window.innerWidth / 2);
        if(scroll > 0){
            scroll = 0;
        }
        setScrollMovie(scroll);
    }
    
    const handleRightArrow = () => {
        let scroll = scrollMovie - Math.round(window.innerWidth / 2);
        const widthList = items.results.length * 225;
        if ((window.innerWidth -widthList) > scroll) {
            scroll = (window.innerWidth - widthList) - 80;
        }
        setScrollMovie(scroll);

        setLeftArrow(true);
    }

    return (
        <div className="movieList">
            <h2>{title}</h2>

            <div className="movieList--left" onClick={handleLeftArrow} style={leftArrow ? {display : "flex"} : {display : "none"}}>
                <NavigateBefore style={{fontSize: "50px"}} />
            </div>

            <div className="movieList--right" onClick={handleRightArrow}>
                <NavigateNext style={{fontSize: "50px"}} />
            </div>

            <div className="movieList--listarea">
                <div className="movieList--list" style={{ 
                    marginLeft: scrollMovie,
                    width: items.results.length * 225
                }}>

                    {items.results.length > 0 && items.results.map((item, key) => (
                        <div key={key} className="movieList--item">
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                        </div>
                    ))}
                    
                </div>
            </div>
        </div>
    );
}