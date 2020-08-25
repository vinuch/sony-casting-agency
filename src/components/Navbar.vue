<template>
  <div>
    <nav class="flex fixed w-full justify-between  py-4 px-4 sm:px-10 shadow-md z-40" :class="mode ? 'bg-blue-900 text-white' : 'bg-white'">
      <h1 class="font-extrabold text-2xl "><a href="/">Sony Studios</a> </h1>
      <div class="hidden sm:block">
        <input class="border rounded-l-lg py-1 px-2" type="text" name="" id="" size="40">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-r-lg">
          Search
        </button>
      </div>
      <ul class="hidden lg:flex items-center">
        <li>
          <div @click="setMode" class="cursor-pointer border rounded-full px-6 h-6 relative mt-1 mr-2">
            <span class="transition duration-500 ease-in-out " :class="mode ? ' top-0 bg-white rounded-full w-6 h-6 absolute transform -translate-x-6' : 'bg-gray-400 rounded-full w-6 h-6 absolute top-0' " ></span>
          </div>
        </li>
        <li class="px-4 font-bold ">
          <a href="/actors" class="nav-link border-b-2 border-blue-300 text-gray-600">Actors</a> 
        </li>
        <li class="px-4 font-bold">
          <a href="/movies" class="nav-link hover:text-gray-600">Movies</a> 
        </li>
        <li class="px-4 font-bold">
          <button v-if="auth.token" @click="logout" class="bg-blue-500 px-4 py-1 text-white rounded-md font-bold">
            
            <span>Logout</span>
           
          </button>
          <button v-else class="bg-blue-500 px-4 py-1 text-white rounded-md font-bold">
             <a   :href="loginLink">Login</a>
          </button>
        </li>
      </ul>
      <button @click="mobileNav = !mobileNav" class="block lg:hidden">
        <img v-if="mode" class="w-8 p-1" src="../assets/images/menu-white.svg" alt="menu icon">
        <img v-else class="w-8 p-1" src="../assets/images/menu-black.svg" alt="menu icon">
      </button>
    </nav>
    <transition name="fade">
      <div v-if="mobileNav" class="fixed w-full z-20 sm:hidden block transform translate-y-16" :class="mode ? 'bg-blue-900 text-white' : 'bg-white'">
        <ul class="py-4">
          <li class="py-2 text-left px-4">
            <div @click="setMode" class="cursor-pointer border rounded-full px-6 h-6 relative mt-1 mr-2 w-12">
              <span class="transition duration-500 ease-in-out " :class="mode ? ' top-0 bg-white rounded-full w-6 h-6 absolute transform -translate-x-6' : 'bg-gray-400 rounded-full w-6 h-6 absolute top-0' " ></span>
            </div>
          </li>
          <li class="py-2 text-left px-4">
            <a href="/actors" class="nav-link border-b-2 border-blue-300 text-gray-600">Actors</a> 
          </li>
          <li class="py-2 text-left px-4">
            <a href="/movies" class="nav-link hover:text-gray-600">Movies</a> 
          </li>
          <li class="py-2 text-left px-4">
            <button v-if="auth.token" @click="logout" class="bg-blue-500 px-4 py-1 text-white rounded-md font-bold">
              
              <span>Logout</span>
            
            </button>
            <button v-else class="bg-blue-500 px-4 py-1 text-white rounded-md font-bold">
              <a   :href="loginLink">Login</a>
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

  export default {
    data(){
      return {
        mobileNav: false,
        auth: this.$auth,
        loginLink: this.$auth.build_login_link(''),
      }
    },
    methods: {
          ...mapActions({
      setMode: 'setMode'
    }),
    // toggleDarkmode(){
    //   console.log('toggle');
    //   this.darkmode = !this.darkmode
    // }
      logout(){
        this.$auth.logout()
        window.location.href = this.$auth.build_logout_link();
      },

    },
    computed: {
      ...mapGetters([
      'mode'
    ])
    }
  }
</script>

<style scoped>

.nav-link::after {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: #90cdf4;
    transition: width .3s;
}

.nav-link:hover::after {
    width: 100%;
    transition: width .3s;
}

.fade-enter-active, .fade-leave-active {
  transition: all .3s;
}
.fade-enter, .fade-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>