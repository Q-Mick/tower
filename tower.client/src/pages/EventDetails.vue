<template>
    <!-- header -->
    <!-- <section class="row"> -->
    <div class="col-12">

        <h1 class="text-light">Event Details</h1>
    </div>
    <!-- </section> -->

    <!-- detailsCard - need a blurred img background or glass pane blur-->
    <section class="">
        <div class="row text-light">
            <div class="col-12 d-flex justify-content-end">
                <!-- TODO OPEN EDIT EVENT MODAL -->
                <button v-if="isCreator">...</button>
            </div>
            <!-- TODO image of active event -->
            <div class="row bg-glass p-4">

                <div class="col-4">
                    <img class="event-img" :src="activeEvent?.coverImg" alt="">
                </div>
                <!-- TODO event data -->
                <section class="col-8">

                    <div class="d-flex justify-content-between">
                        <p class="m-0">{{ activeEvent?.name }}</p>
                        <p class="m-0">{{ activeEvent?.startDate }}</p>
                    </div>

                    <div class=" d-flex justify-content-between">
                        <p class="m-0">{{ activeEvent?.location }}</p>
                        <p class="m-0">{{ activeEvent?.startTime }}</p>
                    </div>

                    <div class="col-12">
                        <p>{{ activeEvent?.description }}</p>
                    </div>

                    <div class="d-flex justify-content-between">
                        <p>{{ activeEvent?.capacity - activeEvent?.ticketCount }}</p>
                        <button class="btn btn-warning">Attend</button>
                    </div>

                </section>
            </div>

            <section class="d-flex elevated-5 bg-glass p-2 ">
                <!-- <div class=""  v-for="t in tickets" :key="t.id"> -->
                <img v-for="t in tickets" :key="t.id" :src="t?.profile?.picture" class="attendee-img" alt="">
                <!-- </div> -->

            </section>

            <!-- <div class="row">
                    <div class="col-12">
                        <div class="card-body elevated-5">
                            Attendess
                        </div>
                    </div>

                </div> -->

            <!-- comment component here -->
            <section class="row">
                <div class="col-12">
                    <p>What People are saying</p>
                </div>
                <div class="row">
                    <div class="col-12">

                        <section class="card-body elevated-5">
                            <div class="row">
                                <div class="col-12 flex-end">
                                    <p>Join the conversation</p>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="text-area"></div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-12 d-flex flex-end">
                                        <button>Post comment</button>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-12">
                                        <i class="mdi mdi-cat"></i>
                                        <div class="card-body">
                                            <p>User Name</p>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, quos!</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>
                    </div>
                </div>
            </section>

        </div>
    </section>
</template>


<script>
import { ref, computed, onMounted } from "vue";
import Pop from "../utils/Pop.js";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { Account } from "../models/Account.js";
import { useRoute } from 'vue-router'
import { towerEventsService } from '../services/TowerEventsService.js';
export default {
    setup() {
        const route = useRoute()

        async function getEventById() {
            try {
                const eventId = route.params.id
                await towerEventsService.getEventById(eventId)
            } catch (error) {
                logger.log(error);
            }
        }
        async function getEventTicketsById() {
            try {
                const eventId = route.params.id
                await towerEventsService.getEventTicketsById(eventId)
            } catch (error) {
                logger.log(error);
            }
        }
        onMounted(() => {
            getEventById()
            getEventTicketsById()
            // isCreator()
        })
        return {
            account: computed(() => AppState.account),
            tickets: computed(() => AppState.tickets),
            activeEvent: computed(() => AppState.activeEvent),
            isCreator: computed(() => AppState.activeEvent?.creatorId == AppState.account?.id)
        }
    }
}
</script>


<style lang="scss" scoped>
.event-img {
    min-height: 45vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.out-of-focus {
    filter: blur(5px);
    /* Adjust the blur amount as desired */
}

.bg-glass {
    background: rgba(15, 15, 15, 0.354);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8.1px);
    -webkit-backdrop-filter: blur(8.1px);
    border: 1px solid rgba(15, 15, 15, 0.26);
    //   height: 18dvh;
}

.scroller {
    //   overflow-y: scroll;
    max-height: 100vh
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

.attendee-img {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    border: solid 2px black;
}
</style>