<template>
  <div class="bg-gray-100 mb-8 sm:w-3/12 py-10 px-6 cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-4 hover:shadow-xl hover:scale-105">
    <div class="text-left mb-2">
      <label class="font-semibold " for="image">Image URL</label>
      <input type="text" name="Image" class="rounded border w-full py-2 mt-2 text-gray-500 px-2"  v-model="updated_movie.image">
    </div>
    <div class="text-left mb-2">
      <label class="font-semibold " for="name">Movie Name</label>
      <input type="text" name="name" class="rounded border w-full py-2 mt-2 text-gray-500 px-2" v-model="updated_movie.title">
    </div>
    <div class="text-left mb-2">
      <label class="font-semibold " for="bio">Movie Description</label>
      <textarea type="text" name="bio" class="rounded border w-full py-2 mt-2 h-32 text-gray-500 px-2" v-model="updated_movie.description"></textarea>
    </div>
     <div class="flex justify-center mt-6 ">
      <button @click="onclick" class="mx-4 py-1 rounded-md px-4 bg-blue-300 hover:bg-blue-500 text-white">
        Save
      </button>
        <button @click="setEditing" class="mx-4 py-1 rounded-md px-4 bg-red-300 hover:bg-red-500 text-white">
          Cancel
        </button>
      </div>
   
  </div>
</template>

<script>
import { mapActions } from 'vuex'

  export default {
    props: ['movie'],
    data() {
      return {
        updated_movie: {
          genres : this.movie.genres,
          release_date : this.movie.release_date,
          description : this.movie.description,
          title : this.movie.title,
          image : this.movie.cover_image,
          id : this.movie.id,
        }
      }

    },
    methods: {
      onclick(){
        this.updateMovie(this.updated_movie);
        this.setEditing()
      },
      setEditing(){
          this.$emit('close')
        },
        ...mapActions({
        updateMovie: 'updateMovie'
      })
      }
    }
</script>

<style lang="scss" scoped>

</style>