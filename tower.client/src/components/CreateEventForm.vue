<template>
    <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Create Event</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <!-- SECTION form -->
        <form @submit.prevent="createEvent()">
            <div class="modal-body">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="Event Name"
                        v-model="editable.name">
                    <label for="floatingInput">Event Title</label>
                </div>
                <div class="form-floating">
                    <input type="text" class="form-control" id="floatingPassword" placeholder="Cover Image"
                        v-model="editable.coverImg">
                    <label for="floatingPassword">Cover Image</label>
                </div>
                <div>
                    <select name="category" id="category" v-model="editable.category">
                        <option value="concert">Cats</option>
                        <option value="convention">Pugs</option>
                        <option value="sport">Games</option>
                        <option value="digital">Books</option>
                        
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Create Album</button>
            </div>
        </form>

    </div>
</template>



<script>
import { ref } from 'vue';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { towerEventsService } from '../services/TowerEventsService.js';
import { Modal } from 'bootstrap';
import { useRouter } from 'vue-router';
export default {
    setup() {
        const editable = ref({})
        const router = useRouter()
        return {
            editable,

            async createEvent() {
                try {
                    // logger.log('creating event')
                    const formData = editable.value //NOTE: dig into and grab the VALUE of the object
                    const newEvent = await towerEventsService.createEvent(formData)
                    Modal.getOrCreateInstance('#createEvent').hide()
                    editable.value = {} // reset the form
                    router.push({ name: 'EventDetails', params: { id: newEvent.id } }) // push to the new event's page
                } catch (error) {
                    logger.error(error)
                    Pop.toast(error.message, 'error')
                }
            }
        };
    },
};
</script>

<style></style>