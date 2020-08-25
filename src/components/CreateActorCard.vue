<template>
  <div class="bg-gray-100 sm:w-3/12 py-6 px-8 border cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-4 hover:shadow-xl hover:scale-105">
    <div class="text-left mb-2">
      <label class="font-semibold " for="image">Image URL</label>
      <input type="text" name="Image" class="rounded border w-full py-2 mt-2 text-gray-500 px-2" v-model="new_actor.image"/>
    </div>
    <div class="text-left mb-2">
      <label class="font-semibold " for="name">Actors Name</label>
      <input type="text" name="name" class="rounded border w-full py-2 mt-2 text-gray-500 px-2" v-model="new_actor.name"/>
    </div>
    <div class="text-left mb-2">
      <label class="font-semibold " for="age">Actors Age</label>
      <input type="number" name="age" class="rounded border w-full py-2 mt-2 text-gray-500 px-2" v-model="new_actor.age"/>
    </div>
    <div class="text-left mb-2">
      <label class="font-semibold " for="attributes">Actors attributes</label>
      <input type="text" name="attributes" class="rounded border w-full py-2 mt-2 text-gray-500 px-2" v-model="new_actor.attributes"/>
    </div>
    <div class="text-left mb-2">
      <label class="font-semibold " for="attributes">Actors Gender</label>
      <select name="gender" class="rounded border w-full py-2 mt-2 text-gray-500 px-2" v-model="new_actor.gender">
        <option value="">Choose Gender</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
      </select>
    </div>
      

    <div class="text-left mb-2">
      <label class="font-semibold " for="bio">Actors Bio</label>
      <textarea type="text" name="bio" class="rounded border w-full py-2 mt-2 h-32 text-gray-500 px-2" v-model="new_actor.bio"></textarea>
    </div>
     <div class="flex justify-center mt-6 ">
      <button @click="createActorMethod(new_actor); setCreating()" class="mx-4 py-1 rounded-md px-4 bg-blue-500 text-white">
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
        new_actor: {
          attributes : '',
          name : '',
          age : 0,
          gender : '',
          bio : '',
          image : '',
        }
      }

    },
    methods: {
      setCreating(){
        this.$emit('close')
      },
      ...mapActions({
        updateActor: 'updateActor',
        createActor: 'createActor',
      }),
      createActorMethod(new_actor) {
        
        this.createActor(new_actor)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>