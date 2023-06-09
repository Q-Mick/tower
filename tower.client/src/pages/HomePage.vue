<template>
  <div class="row">
    <div class="col-12">
      <h1 class="mx-5 text-white">Tower</h1>
    </div>

    <div class="row justify-content-center">
      <div class="col-11">
        <div class="d-flex justify-content-center banner-container">
          <img class="" src="../assets/img/banner.jpg" alt="">
        </div>
      </div>
    </div>

    <section class="row justify-content-center">
      <div class="col-12 col-md-10 mt-2" style="width: 90%;">
        <div class="elevation-5 my-2 p-3 rounded d-flex justify-content-around filter-bar">
          <button @click="filterBy = ''" class="btn btn-outline-light w-25">All</button>
          <button @click="filterBy = 'concert'" class="btn btn-outline-light w-25">Concert</button>
          <button @click="filterBy = 'convention'" class="btn btn-outline-light w-25">Convention</button>
          <button @click="filterBy = 'sport'" class="btn btn-outline-light w-25">Sport</button>
          <button @click="filterBy = 'digital'" class="btn btn-outline-light w-25">Digital</button>
        </div>
      </div>
    </section>
    <section class="row px-5">
      <div class="col-md-3 my-2 p-3" v-for="e in events" :key="e.id">
        <!-- STUB album card template -->
        <EventCard :event="e" />
      </div>
    </section>

  </div>
</template>

<script>
import { logger } from "../utils/Logger.js"
import { onMounted, ref, computed } from "vue"
import { Account } from "../models/Account.js"
import Pop from "../utils/Pop.js";
import { towerEventsService } from '../services/TowerEventsService.js';
import { AppState } from "../AppState.js";
export default {
  setup() {
    const filterBy = ref('')

    onMounted(() => getTowerEvents())

    async function getTowerEvents() {
      try {
        await towerEventsService.getTowerEvents()

      } catch (error) {
        logger.log(error.message)
      }

    }
    return {
      filterBy,
      account: computed(() => AppState.account),
      events: computed(() => {
        if (filterBy.value == "") {
          return AppState.events
        } else {
          return AppState.events.filter(e => e.type == filterBy.value)
        }
      }),

    }
  }
}
</script>

<style scoped lang="scss">
body {
  background-color: #CCCCCC;
}

.post-card {
  color: white;
  background: linear-gradient(1turn, #121218, rgba(18, 18, 24, 0));
  // outline: solid linear-gradient(210deg,rgba(0,255,85,.6),#70f7ff 10%,#76b6fe 60%,#000 80%);
  // box-shadow: 0 0 0 2px rgba(0, 255, 85, .6), 0 0 0 4px #70f7ff, 0 0 0 6px #76b6fe, 0 0 0 8px #000;
  // margin: 0.25rem;
  border-radius: 0.25rem;
  padding: 0.5rem;
  // transition: transform 0.3s ease;
}

.filter-bar {
  background: linear-gradient(1turn, #121218, rgba(18, 18, 24, 0));
  // background: #474C61;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  width: auto;
// border: 1px solid black;
  button{
    margin-left: 2px;
  }
}

// .filter-row {
//   background-color: #CCCCCC;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//   height: 40px;
//   // padding: 10px;
//   margin-top: 5px;
//   width: 100%;
// }

// .filter-row p {

// }

// .filter-row p:hover,
// .filter-row p:focus {
//   color: #008080;
//   // border-bottom: 2px solid #008080;
// }

.banner-container {
  // position: relative;
  width: 100%;
  height: 100%;
  /* Adjust the height as needed,*/
  overflow: hidden;
  // overflow-y: scroll;
  // max-height: 50vh
}
.scroller{
  overflow-y: scroll;
  max-height: 100vh
}

.banner-container img {
  // position: absolute;
  width: 100%;
  max-height: 100%;
  object-fit: cover;
  // object-position: 0px -328px;
  border: solid 1px blue;
}

.avatar-container {
  width: 100px;
  position: relative;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #000;


}

.avatar-container img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
