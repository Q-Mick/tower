<template>
  <div class="row">
    <div class="col-12">
      <h1 class="mx-4">Tower</h1>
    </div>

    <div class="row justify-content-center">
      <div class="col-11">
        <div class="d-flex justify-content-center">
          <img class="banner-container" src="https://reporter.lcms.org/wp-content/uploads/2021/09/YouthLead.jpg" alt="">
        </div>
      </div>
    </div>

    <section class="row justify-content-center">
      <div class="col-10">
        <div class="filter-row d-flex justify-content-around p-3 bungee">
          <button @click="filterBy = ''" class="btn btn-outline-light w-25">All</button>
          <button @click="filterBy = 'concert'" class="btn btn-outline-light w-25">Concert</button>
          <button @click="filterBy = 'convention'" class="btn btn-outline-light w-25">Convention</button>
          <button @click="filterBy = 'sport'" class="btn btn-outline-light w-25">Sport</button>
          <button @click="filterBy = 'digital'" class="btn btn-outline-light w-25">Digital</button>
        </div>
      </div>
    </section>
    <section class="row px-5">
      <div class="col-md-3 my-3 p-4" v-for="e in events" :key="e.id">
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
        if(filterBy.value == "") {
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
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 300px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.filter-row {
  background-color: #CCCCCC;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  height: 40px;
  // padding: 10px;
  margin-top: 5px;
  width: 100%;
}

.filter-row p {
  color: #FFFFFF;
}

.filter-row p:hover,
.filter-row p:focus {
  color: #008080;
  // border-bottom: 2px solid #008080;
}

.banner-container {
  position: relative;
  // left: 2rem;
  width: 100%;
  height: 15rem;
  /* Adjust the height as needed */
  overflow: hidden;
}

.banner-container img {
  // position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: px100;


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
