import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import HeaderMovie from './components/HeaderMovie';
import Menu from './components/Menu';
import Api from './services/api'

import './global.css';
import './App.css';

import loading from './assets/loading.gif';

export default () => {

    const [ listAll, setListAll ] = useState([]);
    const [ headerMovie, setHeaderMovie ] = useState(null);
    const [ backgroundMenu, setBackgroudMenu ] = useState(false);

    useEffect(() => {
        loadAllList();

        window.addEventListener('scroll', scroll);

        return () => window.removeEventListener('scroll', scroll);
    }, []);

    const scroll = () => {
        if (window.scrollY > 10) {
            setBackgroudMenu(true);
        }else{
            setBackgroudMenu(false);
        }
    }

    const loadAllList = async () => {
        const list = await Api.getHomeList();

        setListAll(list);

        const originals = list.filter( i => i.slug === 'originals');
        const random = Math.floor(Math.random() * (originals[0].items.results.length - 1));
        const movie = originals[0].items.results[random];
        const info = await Api.getMovieInfo(movie.id, 'tv');

        setHeaderMovie(info);
    }


    
    return (
        <div className="container">

            <Menu background={backgroundMenu} />

            {
                headerMovie &&
                <HeaderMovie item={headerMovie} />
            }

            <section className="lists">
                {
                    listAll.map((item, key) => (
                        <MovieList key={key} title={item.title} items={item.items}/>
                    ))
                }
            </section>
            
            <footer>
                Dados pego do site <a target="blank" href="https://themoviedb.org">Themoviedb.org</a>
            </footer>

            {listAll.length < 1 &&
                <div className="loading">
                    <img src={loading} alt="Carregando..."/>
                </div>
            }
        </div>
    );
}