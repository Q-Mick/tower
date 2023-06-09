<template>
  <!-- <header>
    <Navbar />
  </header> -->
  <main style="background-color: #2A2D3A;">
    <div class="container-fluid">
      <div class="row">
        <div class="col-11 col-md-11 scroller">
          <router-view />

        </div>

        <div class="col-1 side-bar">
          <router-link :to="{ name: 'Home' }" class="btn text-success lighten-30 selectable text-uppercase">
            Home
          </router-link>
          <div class="avatar-container" style="margin-left: 10px;" v-if="user.isAuthenticated">
            <img :src="user.picture" alt="" >
          </div>
          <router-link v-if="user.isAuthenticated" :to="{ name: 'Account' }" style="height: 2rem;">
            <button class="transparent-button m-1 rounded" style="width: 6rem;">Account</button>
          </router-link>
          <button @click="login()" v-if="!user.isAuthenticated" class="transparent-button rounded m-1">Login</button>
          <button @click="logout()" v-else="" class="transparent-button m-1 rounded">Logout</button>

          
          
          <button  v-if="user.isAuthenticated" class="transparent-button m-1 rounded" data-bs-toggle="modal" data-bs-target="#createEvent">Create Event</button>
        </div>

      </div>
    </div>
  </main>
  <Modal id="createEvent">
    <CreateEventForm />
  </Modal>
</template>

<script>

import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import { AuthService } from "./services/AuthService.js"

export default {
  setup() {
    return {
      
      appState: computed(() => AppState),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";


:root{
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
.avatar-container {
    width: 75px;
    position: relative;
    height: 75px;
    border-radius: 10px;
    overflow: hidden;
    border: 2px solid #000;
}

.avatar-container img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    // object-fit: cover;
    display: inline;
}
.side-bar{
  background-image: linear-gradient(180deg, #474C61 0%, rgba(71, 76, 97, 0) 100%);
  max-height: 100vh;
  overflow:hidden

}
.scroller{
  overflow-y: scroll;
  max-height: 100vh

}
.navbar-btn {
  background-color: gray;
  border: 2px solid black;
  color: #000000;
  // padding: 1px 15px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 5px;
  display: block;
  width: 6vw;

}

.navbar-btn:hover {
  background-color: black;
  color: white;
}
.transparent-button {
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  width: 6vw;
}

.transparent-button:hover {
  background-color: #79E7AB;
  color: black;
}
</style>
