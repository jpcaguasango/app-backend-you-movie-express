const boom = require('@hapi/boom');
const { useMyFetch } = require('../common/useMyFetch');
const msgErrorDefault =
  'We cannot perform the search at this time, it is possible that one of the criteria is wrong or there is a temporary failure.';

class MovieService {
  mapperObject(movie) {
    return {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      popularity: movie.popularity,
      image: movie.poster_path,
      date: movie.release_date,
      average: movie.vote_average,
      voteCount: movie.vote_count,
      genders: movie.genres,
      productionCompanies: movie.production_companies.map((company) => ({
        name: company.name,
        country: company.origin_country,
      })),
    };
  }

  mapperArray(movies) {
    return movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      popularity: movie.popularity,
      image: movie.poster_path,
      date: movie.release_date,
      average: movie.vote_average,
      voteCount: movie.vote_count,
    }));
  }

  async findAll(page) {
    try {
      const { data } = await useMyFetch(
        'GET',
        `/3/discover/movie?page=${page}`
      );
      data.results = this.mapperArray(data.results);
      return {
        data,
        statusCode: 200,
      };
    } catch (error) {
      const { output } = boom.badRequest(msgErrorDefault);
      return output.payload;
    }
  }

  async findQuery(title, page) {
    try {
      const { data } = await useMyFetch(
        'GET',
        `/3/search/movie?query=${title}&page=${page}`
      );
      data.results = this.mapperArray(data.results);
      return {
        data,
        statusCode: 200,
      };
    } catch (error) {
      const { output } = boom.badRequest(msgErrorDefault);
      return output.payload;
    }
  }

  async findOne(id) {
    try {
      const { data } = await useMyFetch('GET', `/3/movie/${id}`);
      return {
        data: this.mapperObject(data),
        statusCode: 200,
      };
    } catch (error) {
      const { output } = boom.badRequest(msgErrorDefault);
      return output.payload;
    }
  }
}

module.exports = MovieService;
