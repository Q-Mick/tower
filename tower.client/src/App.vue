<template>
  <!-- <header>
    <Navbar />
  </header> -->
  <main style="background-color: #2A2D3A;">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-md-11 scroller">
          <router-view />

        </div>

        <div class="col-1 side-bar">
          <button @click="login()" v-if="!user.isAuthenticated" class="btn btn-dark m-1" style="width: 90%;">Login</button>
          <button @click="logout()" v-else="" class="btn btn-dark m-1" style="width: 90%;">Logout</button>
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

.side-bar{
  background-image: linear-gradient(180deg, #474C61 0%, rgba(71, 76, 97, 0) 100%);
  max-height: 100vh;
  overflow-y: hidden;

}
.scroller{
  overflow-y: scroll;
  max-height: 100vh
}
</style>
