<template>
  <div v-if="!creating"  class="home relative py-24 p-4 sm:px-10">
    <h1 class=" font-bold text-3xl border-b-4 border-gray-600 inline-block mb-12" :class="darkmode ? 'text-white' : 'text-black' ">ACTORS</h1>
    <!-- <button @click="login">login</button> -->
    <div v-if="isLoading" class="flex justify-center">
      <img class="align-center" src="../assets/images/load.svg" alt="">
    </div>

    <div v-else class="flex flex-wrap justify-around mb-16">
      <Actorcard v-for="actor in actors" :key="actor.name + actor.id" :actor="actor"/>
    </div>

    

    <button @click="creating = !creating" class="mx-4 py-2 rounded-md px-12 text-white" :class="!auth.can('post:actor') ? 'bg-blue-300 cursor-not-allowed': 'bg-blue-500'">
         Add Actor
    </button>
        
  </div>
  <div v-else class="absolute top-0 min-h-screen left-0 w-full">
    <div class="pt-24 flex justify-center items-center">
      <CreateActorCard  @close="creating = !creating"/>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import Actorcard from '@/components/Actorcard.vue'
import CreateActorCard from '@/components/CreateActorCard.vue'
// import EditCard from '@/components/EditCard.vue'
import { mapActions, mapGetters } from 'vuex'
// import axios from 'axios'

export default {
  name: 'Actor',
  props: ['darkmode'],
  components: {
    CreateActorCard,
    Actorcard
  },
  data(){
    return {
      creating: false,
      auth: this.$auth
    }
  },
  methods: {
    login(){
      this.$AuthAxios
        .get("/login")
        .then(function(response) {
          // handle success

          console.log(response);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
    },
    ...mapActions({
      getActors: 'getActors'
    })
  },
  computed: {
    ...mapGetters([
      'actors',
      'isLoading'
    ])
  },
  mounted() {
    this.getActors()
  },
  created() {
    this.$auth.check_token_fragment()

  }
}
</script>
