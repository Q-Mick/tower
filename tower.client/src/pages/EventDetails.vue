<template>
    <!-- header -->
    <!-- <section class="row"> -->
    <div class="col-12">

        <h1 class="text-light thin-text m-0">Event Details</h1>
    </div>
    <!-- </section> -->

    <!-- detailsCard - need a blurred img background or glass pane blur-->
    <section class="p-4">
        <div class="row text-light">

            <!-- TODO image of active event -->
            <div class="row event-glass elevation-5" style="padding-top: 0;">
                <div class="text-end">
                    <!-- TODO OPEN EDIT EVENT MODAL -->
                    <button style="border: none;" class="m-0 text-light fs-2 bg-transparent mt-0"
                        v-if="isCreator">...</button>
                </div>

                <div class="col-4">
                    <img class="event-img" :src="activeEvent?.coverImg" alt="">
                </div>
                <!-- TODO event data -->
                <section class="col-8">

                    <div class="d-flex justify-content-between">
                        <p class="m-0 fs-5 ">{{ activeEvent?.name }}</p>
                        <p class="m-0 pt-1 thin-text ">{{ activeEvent?.startDate }}</p>
                    </div>

                    <div class=" d-flex justify-content-between">
                        <p class="m-0 fw-bold text-decoration-underline">{{ activeEvent?.location }}</p>
                        <p class="m-0 thin-text">{{ activeEvent?.startTime }}</p>
                    </div>

                    <div class="col-12">
                        <p class="thin-text" style="min-height: 14rem">{{ activeEvent?.description }}</p>
                    </div>

                    <div class="d-flex justify-content-between bottoms">
                        <!-- <div class="d-flex justify-content-between"> -->
                        <p class="text-decoration-underline">{{ activeEvent?.capacity - activeEvent?.ticketCount }} Tickets
                            remaining</p>
                        <button @click="createTicket()" class="btn btn-warning"
                            style="background-color: #FFD464;margin-bottom: 5px; height: 2.5rem;">Attend</button>
                        <!-- </div> -->
                    </div>

                </section>
            </div>

            <section class="row elevated-5 bg-glass p-2 rounded"
                style="min-height: 4rem;position: relative; margin-top: 2rem;">
                <p class="" style="position: absolute; left: 15px; top: -32px;">Attendees</p>

                <div class="avatar-container" v-for="t in tickets" :key="t.id">
                    <img :src="t?.profile?.picture" class="" alt="">
                </div>


            </section>


            <!-- comment component here -->
            <section class="row elevated-5 justify-content-center">
                <div class="col-10">


                    <div class="">
                        <p class="m-0 mt-4">What People are saying</p>
                    </div>
                    <div class="row bg-glass">
                        <div class="col-12">

                            <section class="card-body elevated-5">
                                <!-- <div class="row"> -->
                                <div class="text-end">
                                    <p class="m-0 teal">Join the conversation</p>
                                </div>



                                <form @submit.prevent="createComment()">

                                    <textarea v-model="postData" class="text-area input-comment"></textarea>
                                    <div class="text-end">
                                        <button type="submit" class="mb-1 transparent-button">Post comment</button>
                                    </div>
                                </form>


                                <div v-for="c in comments" :key="c.id" class="d-flex m-1 p-1">
                                    <div class="avatar-container">
                                        <img :src="c?.creator.picture" alt="">
                                    </div>
                                    <div class="elevation-5 text-dark bg-white rounded mx-1" style="width: 90%;">
                                        <p class="my-0 mx-1 fw-bold">{{ c?.creator.name }}</p>
                                        <p class="my-0 mx-1 thin-text">{{ c.body }}</p>
                                    </div>
                                </div>


                                <!-- <div class="d-flex elevation-5 m-1 p-1">
                                    <img :src="account.picture" alt="">
                                        <div class="card-body">
                                            <p>User Name</p>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, quos!</p>
                                        </div>
                                    </div> -->


                                <!-- </div> -->
                            </section>
                        </div>
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
import { useRoute } from 'vue-router'
import { towerEventsService } from '../services/TowerEventsService.js';
export default {
    setup() {
        const postData = ref('')
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
        async function getCommentsById() {
            try {
                const eventId = route.params.id
                await towerEventsService.getCommentsById(eventId)
            } catch (error) {
                logger.log(error);
            }
        }
        async function getMyTickets() {
            try {
                await towerEventsService.getMyTickets()
            } catch (error) {
                logger.log(error);
            }
        }
        async function createTicket() {
            try {
                const newTicket = { eventId: activeEvent.eventId, accountId: account.id }
                AppState.myTickets = await getMyTickets()
                const foundTicket = AppState.myTickets.find(ticket => ticket.eventId === newTicket.eventId);
                if (foundTicket) {
                    Pop.toast("You already have a ticket for this event")
                    return
                } else {
                    await towerEventsService.createTicket(newTicket)
                }
            } catch (error) {
                logger.log(error);
            }
        }
        onMounted(() => {

            getEventById()
            getEventTicketsById()
            getCommentsById()
            // isCreator()
        })
        return {
            postData,
            async createComment(){
                try {
                    const trimmedComment = postData.value.trim();
                    if (trimmedSearch.length == 0) {
            Pop.toast("Comments must contain a body")
            return
          }
            await towerEventsService.createComment(postData)
                } catch (error) {
                    logger.log(error);
                }
            },
            async createTicket() {
                try {
                    const newTicket = { eventId: activeEvent.eventId, accountId: account.id }
                    AppState.myTickets = await getMyTickets()
                    const foundTicket = AppState.myTickets.find(ticket => ticket.eventId === newTicket.eventId);
                    if (foundTicket) {
                        Pop.toast("You already have a ticket for this event")
                        return
                    } else {
                        const eventId = route.params.id
                        await towerEventsService.createTicket(newTicket)
                    }
                } catch (error) {
                    logger.log(error);
                }
            },
            myTickets: computed(() => AppState.myTickets),
            account: computed(() => AppState.account),
            tickets: computed(() => AppState.tickets),
            comments: computed(() => AppState.comments),
            activeEvent: computed(() => AppState.activeEvent),
            isCreator: computed(() => AppState.activeEvent?.creatorId == AppState.account?.id),


        }
    }
}
</script>


<style lang="scss" scoped>
.teal {
    color: #79E7AB;
}

.input-comment {
    width: 100%;
    min-height: 5rem;
}

.event-img {
    position: absolute;
    aspect-ratio: 1/1;
    min-height: 20rem;
    max-height: 65vh;
    width: 30%;
    // height: 90%;
    top: 10px;
    left: 10px;
    object-fit: cover;
    object-position: center;
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
    width: 75px;
    position: relative;
    height: 75px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #000;
}

.avatar-container img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    object-fit: cover;
    display: inline;
}

.attendee-img {
    display: inline;
    object-fit: fill;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    border: solid 2px black;
}

.event-glass {
    border: solid rgb(150, 213, 255);
    position: relative;
    background: rgba(36, 109, 142, 0.6);
    // border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(6.3px);
    -webkit-backdrop-filter: blur(6.3px);
    border: 1px solid rgba(9, 15, 249, 0.3);
    padding-left: 0px;
    min-height: 20rem;
}

.thin-text {
    font-weight: 300;

}

.transparent-button {
    background-color: rgb(58, 145, 160);
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.8s, color 0.3s;
    width: 8rem;
    height: 2rem;
}

.transparent-button:hover {
    background-color: #79E7AB;
    color: black;
}
</style>