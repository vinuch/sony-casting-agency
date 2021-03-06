import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"

const AuthAxios = axios.create({
  baseURL: process.env.NODE_ENV == 'development' ? 'http://127.0.0.1:5000/' : 'https://sony-casting-agency.herokuapp.com'
})

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('JWTS_LOCAL_KEY') || null,
    actors: [],
    movies: [],
    totalQuestions: 0,
    isLoading: true,
    mode: true
  },
  mutations: {
    SET_ACTORS(state, payload) {
      state.actors = payload
    },
    SET_MOVIES(state, payload) {
      state.movies = payload
    },
    SET_LOADING(state, payload) {
      state.isLoading = payload
    },
    SET_MODE(state, payload) {
      state.mode = payload
    }
  },
  actions: {
    
    async getActors({ commit}) {
      // console.log(this._vm.$auth.token);
      if(this._vm.$auth.can('get:actors')){
        commit('SET_LOADING', true)
        AuthAxios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('JWTS_LOCAL_KEY') || null
        await AuthAxios
          .get("/actors")
          .then(function(response) {
            // handle success
            commit('SET_ACTORS', response.data.actors)
            commit('SET_LOADING', false)
          })
          .catch(function(error) {
            // handle error
            commit('SET_LOADING', false)
            console.log(error);
          })
      }else{
        commit('SET_LOADING', false)
      }   
    },


    async getMovies({ commit }) {
      if(this._vm.$auth.can('get:movies')){
        commit('SET_LOADING', true)
        AuthAxios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('JWTS_LOCAL_KEY') || null
        await AuthAxios
          .get("/movies")
          .then(function(response) {
            // handle success
            commit('SET_MOVIES', response.data.movies)
            commit('SET_LOADING', false)
          })
          .catch(function(error) {
            // handle error
            commit('SET_LOADING', false)
            console.log(error);
          })
      }else{
        commit('SET_LOADING', false)
      } 
    },

    async updateActor({commit}, updated_actor){
      console.log(updated_actor,)
      if(this._vm.$auth.can('patch:actors')){
        AuthAxios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('JWTS_LOCAL_KEY') || null
        await AuthAxios
          .patch(`/actors/${updated_actor.id}`, updated_actor)
          .then(function(response) {
            // handle success
            commit('SET_ACTORS', response.data.updated)
            commit('SET_LOADING', false)
          })
          .catch(function(error) {
            // handle error
            commit('SET_LOADING', false)
            console.log(error);
          })
      }
    },

    async deleteActor({ commit, dispatch }, id){
      console.log('delete')
      if(this._vm.$auth.can('delete:actor')){
      console.log(id)
        AuthAxios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('JWTS_LOCAL_KEY') || null
        await AuthAxios
          .delete(`/actors/${id}`,)
          .then(function(response) {
            // handle success
            dispatch('getActors')
            console.log(response.data)
          })
          .catch(function(error) {
            // handle error
            commit('SET_LOADING', false)
            console.log(error);
          })
      }
    },

    async createActor({commit}, new_actor){
      console.log(new_actor,)
      if(this._vm.$auth.can('post:actor')){
        AuthAxios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('JWTS_LOCAL_KEY') || null
        await AuthAxios
          .post(`/actors`, new_actor)
          .then(function(response) {
            // handle success
            commit('SET_ACTORS', response.data.new)
            commit('SET_LOADING', false)
          })
          .catch(function(error) {
            // handle error
            commit('SET_LOADING', false)
            console.log(error);
          })
      }
    },

    async updateMovie({commit}, updated_movie){
      console.log(updated_movie,)
      if(this._vm.$auth.can('patch:movies')){
        AuthAxios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('JWTS_LOCAL_KEY') || null
        await AuthAxios
          .patch(`/movies/${updated_movie.id}`, updated_movie)
          .then(function(response) {
            // handle success
            commit('SET_MOVIES', response.data.updated)
            commit('SET_LOADING', false)
          })
          .catch(function(error) {
            // handle error
            commit('SET_LOADING', false)
            console.log(error);
          })
      }
    },

    async deleteMovie({ commit, dispatch }, id){
      console.log('delete')
      if(this._vm.$auth.can('delete:movies')){
      console.log(id)
        AuthAxios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('JWTS_LOCAL_KEY') || null
        await AuthAxios
          .delete(`/movies/${id}`,)
          .then(function(response) {
            // handle success
            dispatch('getMovies')
            console.log(response.data)
          })
          .catch(function(error) {
            // handle error
            commit('SET_LOADING', false)
            console.log(error);
          })
      }else{
        console.log('you are not authorized to delete a movie')
      }
    },

    async createMovie({commit}, new_movie){
      console.log(new_movie,)
      if(this._vm.$auth.can('post:movies')){
        AuthAxios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('JWTS_LOCAL_KEY') || null
        await AuthAxios
          .post(`/movies`, new_movie)
          .then(function(response) {
            // handle success
            commit('SET_MOVIES', response.data.movies)
            commit('SET_LOADING', false)
          })
          .catch(function(error) {
            // handle error
            commit('SET_LOADING', false)
            console.log(error);
          })
      }
    },

    setMode({commit}) {
      // console.log(state);
      if(localStorage.getItem('DARK_MODE') === 'true'){
        commit('SET_MODE', false)
        localStorage.setItem('DARK_MODE', 'false')
      }else if((localStorage.getItem('DARK_MODE') === 'false')) {
        commit('SET_MODE', true)
        localStorage.setItem('DARK_MODE', 'true')
      }else if((localStorage.getItem('DARK_MODE') === null)){
        commit('SET_MODE', false)
        localStorage.setItem('DARK_MODE', 'false')

      }
      
      
      

    }
  },
  getters: {
    actors: state => {
      return state.actors
    },
    movies: state => {
      return state.movies
    },
    token: state => {
      return state.token
    },
    isLoading: state => {
      return state.isLoading
    },
    mode: state => {
      return state.mode
    }
  },
});

export default store;