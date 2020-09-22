const API_KEY = "132141258f42ddb33936b4c35c486aec";
const API_BASE = 'https://api.themoviedb.org/3/';

const basicFetch = async (endUrl) => {
    const req1 = await fetch(`${API_BASE}${endUrl}language=pt-BR&api_key=${API_KEY}`);
    const json1 = await req1.json();

    const req2 = await fetch(`${API_BASE}${endUrl}language=pt-BR&api_key=${API_KEY}&page=2`);
    const json2 = await req2.json();

    const req3 = await fetch(`${API_BASE}${endUrl}language=pt-BR&api_key=${API_KEY}&page=3`);
    const json3 = await req3.json();

    const jsonCompleted = {
        ...json1,
        ...json2,
        ...json3
    }
    
    return jsonCompleted;
}

export default {
    getHomeList: async () => {
        return [
            {
                slug : 'originals',
                title : 'Originais do Netflix',
                items : await basicFetch(`discover/tv?with_network=213&`)
            },
            {
                slug : 'trending',
                title : 'Recomendados para Você',
                items : await basicFetch(`trending/all/week?`)
            },
            {
                slug : 'toprated',
                title : 'Em Alta',
                items : await basicFetch(`movie/top_rated?`)
            },
            {
                slug : 'action',
                title : 'Ação',
                items : await basicFetch(`discover/movie?with_genres=28&`)
            },
            {
                slug : 'comedy',
                title : 'Comédia',
                items : await basicFetch(`discover/movie?with_genres=35&`)
            },
            {
                slug : 'horror',
                title : 'Terror',
                items : await basicFetch(`discover/movie?with_genres=27&`)
            },
            {
                slug : 'romance',
                title : 'Romance',
                items : await basicFetch(`discover/movie?with_genres=10749&`)
            },
            {
                slug : 'Documentary',
                title : 'Documentários',
                items : await basicFetch(`discover/movie?with_genres=99&`)
            }
        ];
    },
    getMovieInfo: async (movieId, type) => {
        let info = {};

        if (movieId) {
            
            switch(type){
                case 'movie':
                    info = await basicFetch(`movie/${movieId}?`);
                break;
                case 'tv':
                    info = await basicFetch(`tv/${movieId}?`);
                break;
                default:
                    info = null;
                break
            }

        }

        return info;
    }
}