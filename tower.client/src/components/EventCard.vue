
<template>
    <router-link :to="{ name: 'EventDetails', params: { id: event.id } }">
        <div class="banner-container rounded elevation-5">
            <img class="rounded-top" :src="event?.coverImg" :alt="event?.title">
        
        </div>
    </router-link>

</template>


<script>
import { TowerEvent } from '../models/TowerEvent.js';

export default {
    props: {
        event: { type: TowerEvent, required: true } // NOTE: when binding data to this component....it will reference the name of the prop
    },
    setup(props){
        return {}
    }
}
</script>


<style lang="scss" scoped>
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
</style>