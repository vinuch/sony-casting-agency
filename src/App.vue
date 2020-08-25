<template>
  <div id="app" class=" min-h-screen" :class="mode ? 'bg-black' : 'bg-gray-200'">
    <Navbar/>
    <router-view :darkmode="mode"/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { mapGetters } from 'vuex'
 
export default {
  components: {
    Navbar
  },
  data(){
    return {
    }
  },
  methods: {
  },
  computed: {
    ...mapGetters([
      'mode'
    ])
  },
  mounted(){
    // this.$auth.load_jwts();
    this.$auth.check_token_fragment()
    // console.log(this.$auth.token);

  },
  created(){
    this.$auth.load_jwts();
    // console.log(this.$auth.token);
    this.$auth.check_token_fragment()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
