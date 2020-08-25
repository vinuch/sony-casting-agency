<template>
  <div class="bg-gray-100 sm:w-3/12 py-6 px-8 border cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-4 hover:shadow-xl hover:scale-105">
    <div class="text-left mb-2">
      <label class="font-semibold " for="image">Cover Image URL</label>
      <input type="text"  name="Image" class="rounded border w-full py-2 mt-2 text-gray-500 px-2" v-model="new_movie.image"/>
    </div>
    <div class="text-left mb-2">
      <label class="font-semibold " for="name">Movie Title</label>
      <input type="text" name="name" class="rounded border w-full py-2 mt-2 text-gray-500 px-2" v-model="new_movie.title"/>
    </div>
    <div class="text-left mb-2">
      <label class="font-semibold " for="attributes">Movie Genres</label>
      <input type="text" placeholder="romance, comedy ..." name="attributes" class="rounded border w-full py-2 mt-2 text-gray-500 px-2" v-model="new_movie.genres"/>
    </div>
    <div class="text-left mb-2">
      <label class="font-semibold " for="attributes">Movies Release_date</label>
      <input type="text" placeholder="DD-MM-YYYY" name="gender" class="rounded border w-full py-2 mt-2 text-gray-500 px-2" v-model="new_movie.release_date">
        
    </div>
      

    <div class="text-left mb-2">
      <label class="font-semibold " for="bio">Movies Description</label>
      <textarea placeholder="brief description of movie" maxlength = "300" type="text" name="bio" class="rounded border w-full py-2 mt-2 h-32 text-gray-500 px-2" v-model="new_movie.description"></textarea>
    </div>
     <div class="flex justify-center mt-6 ">
      <button @click="createMovieMethod(new_movie); setCreating" class="mx-4 py-1 rounded-md px-4 bg-blue-500 text-white">
        Create
      </button>
        <button @click="setCreating" class="mx-4 py-1 rounded-md px-4 bg-red-500 text-white">
          Cancel
        </button>
      </div>
   
  </div>
</template>

<script>
import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        new_movie: {
          title : '',
          description : '',
          genres : '',
          image : '',
          release_date : '',
        }
      }

    },
    methods: {
      setCreating(){
        this.$emit('close')
      },
      ...mapActions({
        createMovie: 'createMovie',
      }),
      createMovieMethod(new_movie) {
        
        this.createMovie(new_movie)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>