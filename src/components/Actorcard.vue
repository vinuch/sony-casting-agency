<template>

    <div v-if="!editing" class="bg-white  rounded-md mb-8 sm:w-3/12 py-10 px-6 mx-2 cursor-pointer transition duration-500 ease-in-out transform hover:-translate-y-4 hover:shadow-xl hover:scale-105">
      <div class=" mb-6">
        <img class="rounded-lg shadow-2xl w-full h-auto" :src="actor.image" :alt="'image of ' + actor.name">
      </div>
      <p class="font-bold tracking-wider text-lg mb-4 capitalize">{{actor.name}}</p>
      <p class="text-xs text-gray-600">{{actor.bio}}</p>

      <div class="flex justify-center items-end mt-6 ">
        <button :disabled="!auth.can('patch:actors') ? 'disabled' : false " @click="editing = true" class="text-xs mx-4 py-2 rounded-md px-4 text-white" :class="!auth.can('patch:actors') ? 'bg-blue-300 cursor-not-allowed': 'bg-blue-500'">
          Edit Actor
        </button>
        <button @click="deleteActorClicked" class="text-xs mx-2 py-2 rounded-md px-4  text-white" :class="!auth.can('patch:actors') ? 'bg-gray-600 cursor-not-allowed': 'bg-black'">
          Delete Actor
        </button>
      </div>
    </div>


      <EditActorCard @close="editing = !editing" v-else :actor="actor"/>




</template>

<script>
import EditActorCard from '@/components/EditActorCard.vue'
import { mapActions} from 'vuex'


  export default {
    props: ['actor'],
    components: {
      EditActorCard
    },
    data(){
      return {
        auth: this.$auth,
        editing: false
      }
    },
    methods: {
      ...mapActions({
        deleteActor: 'deleteActor'
      }),
      deleteActorClicked() {
        if(confirm('Are you sure you want to delete this actor? you cant get it back if you do')){
          this.deleteActor(this.actor.id)
        }
        
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>