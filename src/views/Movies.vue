<template>
  <div v-if="!creating" class="home h-full py-24 p-4 sm:px-10">
    <h1 class=" font-bold text-3xl border-b-4 border-gray-600 inline-block mb-12" :class="darkmode ? 'text-white' : 'text-black' ">MOVIES</h1>
    <div v-if="isLoading" class="flex justify-center">
      <img class="align-center" src="../assets/images/load.svg" alt="">
    </div>
    <div v-else class="flex flex-wrap justify-around mb-16">
      <Moviecard v-for="movie in movies" :key="movie.title + movie.id" :movie="movie" />
    </div>

    <button @click="creating = !creating" class="mx-4 py-2 rounded-md px-12 text-white" :class="!auth.can('post:movies') ? 'bg-blue-300 cursor-not-allowed': 'bg-blue-500'">
         Add Movie
    </button>
    
  </div>
   <div v-else class="absolute top-0 min-h-screen left-0 w-full">
    <div class="pt-24 flex justify-center items-center">
      <CreateMovieCard  @close="creating = !creating"/>
    </div>
    
  </div>
  
</template>

<script>
// @ is an alias to /src
import Moviecard from '@/components/Moviecard.vue'
import CreateMovieCard from '@/components/CreateMovieCard.vue'
import { mapActions, mapGetters } from 'vuex'


export default {
  name: 'Movie',
  props: ['darkmode'],
  components: {
    Moviecard,
    CreateMovieCard
  },
  data(){
    return {
      creating: false,
      auth: this.$auth
    }
  },
  methods: {
    ...mapActions({
      getMovies: 'getMovies'
    })
  },
  computed: {
    ...mapGetters([
      'movies',
      'isLoading'
    ])
  },
  mounted() {
    this.getMovies()
  }
}
</script>
