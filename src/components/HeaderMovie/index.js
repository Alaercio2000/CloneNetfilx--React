import React from 'react';
import './style.css';

export default ({ item }) => {

    const date = new Date(item.first_air_date);

    let genres = [];
    for(const genre of item.genres){
        genres.push(genre.name);
    }

    const relevance = String(item.vote_average).replace('.', '');

    const limitText = (text) => {
        let limit = text;
        if (limit.length > 150) {
            console.log('teste');
            limit = text.substr(0, 150) + '...';
        }

        return limit;
    }
    
    return(
        <section className="header" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className="header--vertical">
                <div className="header--horizontal">
                    <div className="header--name">
                        {item.original_name}
                    </div>
                    <div className="header--info">
                        <div className="header--relevance">
                            {relevance}%relevância
                        </div>
                        <div className="header--year">
                            {date.getFullYear()}
                        </div>
                        <div className="header--seasons">
                            {item.number_of_seasons} temporada{item.number_of_seasons > 1 && 's'}
                        </div>
                    </div>
                    <div className="header--description">
                        <span title={item.overview}>{limitText(item.overview)}</span>
                    </div>
                    <div className="header--areaButtons">
                        <button className="header--watchButton">
                            ▶ Assistir
                        </button>

                        <button className="header--myListButton">
                            + Minha Lista
                        </button>
                    </div>
                    <div className="header--genres">
                        <strong>Gêneros: </strong>
                        {genres.join(', ')}
                    </div>
                </div>
            </div>
        </section>
    );
}