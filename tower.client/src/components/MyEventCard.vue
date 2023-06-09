
<template>
    <router-link :to="{ name: 'EventDetails', params: { id: event.id } }">

        <!-- <div :style="{ backgroundImage: 'url(' + event.coverImg + ')' }">
<p>test</p>
        </div> -->

        <div class="banner-container rounded elevation-5">
            <img class="rounded-top" :src="event?.coverImg" :alt="event?.title">

            <div class="glass-card">
                <p class="fw-bold my-0">{{ event.name }}</p>
                <p class="my-0">{{ event.location }}</p>
                <p class="my-0">{{ event.startDate }}</p>
                <div v-if="!event.isCanceled" class="text-end">
                    <p class="my-0"><span>{{ event.capacity - event.ticketCount }}</span> tickets left</p>
                </div>
                <div v-if="event.isCanceled" class="text-center bg-danger text-dark">
                    Event Canceled
                </div>
            </div>

        </div>
    </router-link>
</template>


<script>
import { TowerEvent } from '../models/TowerEvent.js';

export default {
    props: {
        event: { type: TowerEvent, required: true } // NOTE: when binding data to this component....it will reference the name of the prop
    },
    setup(props) {
        return {
    
        }
    }
}
</script>


<style lang="scss" scoped>
.glass-card {
    color: white;
    background: rgba(15, 15, 15, 0.354);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8.1px);
    -webkit-backdrop-filter: blur(8.1px);
    border: 1px solid rgba(15, 15, 15, 0.26);
    //   width: 100%;

    //   padding-left: 1rem;

}
.glass-card P {
    margin-left: 3px;
    margin-right: 5px;
}

.banner-container {
    position: relative;
    // left: 2rem;
    width: 100%;
    height: 20rem;
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

.glass-card {
    position: absolute;
    bottom: 0rem;
    width: 100%;
}
</style>