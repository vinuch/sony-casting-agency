<template>
  <div class="bg-gray-100 mb-8 sm:w-3/12 py-10 px-6 cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-4 hover:shadow-xl hover:scale-105">
    <div class="text-left mb-2">
      <label class="font-semibold " for="image">Image URL</label>
      <input type="text" name="Image" class="rounded border w-full py-2 mt-2 text-gray-500 px-2"  v-model="updated_actor.image">
    </div>
    <div class="text-left mb-2">
      <label class="font-semibold " for="name">Actors Name</label>
      <input type="text" name="name" class="rounded border w-full py-2 mt-2 text-gray-500 px-2" v-model="updated_actor.name">
    </div>
    <div class="text-left mb-2">
      <label class="font-semibold " for="bio">Actors Bio</label>
      <textarea type="text" name="bio" class="rounded border w-full py-2 mt-2 h-32 text-gray-500 px-2" v-model="updated_actor.bio"></textarea>
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
    props: ['actor'],
    data() {
      return {
        updated_actor: {
          attributes : this.actor.attributes,
          name : this.actor.name,
          id : this.actor.id,
          age : this.actor.age,
          gender : this.actor.gender,
          bio : this.actor.bio,
          image : this.actor.image,
        }
      }

    },
    methods: {
      onclick(){
        this.updateActor(this.updated_actor);
        this.setEditing()
      },
      setEditing(){
          this.$emit('close')
        },
        ...mapActions({
        updateActor: 'updateActor'
      })
      }
    }
</script>

<style lang="scss" scoped>

</style>