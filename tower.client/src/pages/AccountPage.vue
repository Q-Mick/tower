<template>
  <div class="row justify-content-center">
    <div class="col-8">

      <div class="card-body mx-1">
        
        <div class="post-card elevation-5 mt-3" v-if="account">
          
          <!-- <div class="banner-container">
              <img class="" :src="account?.coverImg" :alt="account.name">
            </div> -->
      
            <div class="row">
              <div class="col-12" >
                <div class="avatar-container" >
                  <img class :src="account.picture" :alt="account.name">
                  
                </div>
                
                <p v-if="account.graduated" class="m-0 pt-0 mx-1 p-1">{{ account.class }} alumni</p>
                <h5 class="pt-0 mx-1 p-1">{{ account.name }}</h5>
                <p class="mb-1 mx-1 p-1">{{ account.bio }}</p>
              </div>
              <div class="text-end">
                <button class="edit-btn fs-6">Account Details</button>
              </div>
              
            </div>
          </div>
          
        </div>



    </div>
  </div>
  <div class="row">
    <div class="card-body">


      <div class="post-card elevation-5 mt-3 m-1 p-1">

        <form class="" @submit.prevent="handleSubmit">
          <div v-if="account.id" class="card-body">

            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Name:</span>
              <input name="name" class="input-text form-control" placeholder="Name" type="text" required
                v-model="editable.name">
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text">Bio:</span>
              <textarea v-model="editable.bio" class="text-area form-control" aria-label="With textarea"></textarea>
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Profile Pic:</span>
              <input name="picture" class="input-text form-control" placeholder="Profile Picture" type="url" required
                v-model="editable.picture">
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Profile Banner:</span>
              <input name="cover-img" class="input-text form-control" placeholder="Cover image" type="url" required
                v-model="editable.coverImg">
            </div>      
            <div class="text-end">
              <button class="edit-btn m-2 fs-6" type="submit">Save Account</button>
            </div>
          </div>
        </form>
      </div>

    </div>


  </div>
</template>

<script>
import { ref, watchEffect, computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { accountService } from '../services/AccountService.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {
    const editable = ref({})
    watchEffect(() => {
      editable.value = { ...AppState.account }
    })


    return {
      account: computed(() => AppState.account),
      editable,
      async handleSubmit() {
        try {
          Pop.toast('updating account')
          await accountService.editAccount(editable.value)
        } catch (error) {
          Pop.error(error, '[Editing Account]')
        }
      },
      toLink(url) {

        if (url) {
          const link = url
          window.location.href = link;
        } else {
          Pop.toast("Profile has no link shared")
        }
      },
      inEdit(){
        Pop.toast("Edit account in the form below")
      }
    }
  }
}
</script>


<style lang="scss" scoped>

input[type="checkbox"] {
  width: 20px;
  height: 20px;
  background-color: black;
  border: 2px solid white;
  outline: none;
  cursor: pointer;
}


input[type="checkbox"]:checked::before {
  
  display: block;
  width: 100%;
  height: 100%;
  font-size: 16px;
  color: black;
  outline: none;
  text-align: center;
  line-height: 20px;
}


input[type="checkbox"]:checked {
  background-color: green;
  border-color: white;
  outline: none;
}


span {
  color: rgb(235, 235, 235);
  background-color: #121218;
}

input::placeholder {
  font-size: 20px;
  color: #999;
}

.text-area {
  background-color: #121218;
  border: 1px solid #999;
  outline: none;
  padding: 5px;
  height: 5rem;
  width: 80%;
  font-size: 20px;
  color: #ffffff;
}

.text-area:focus {
  border-bottom-color: #555;
  border: none;
  outline: 1px solid black;
}

.input-text {
  border: 1px solid #999;
  outline: none;
  padding: 5px;
  background-color: #121218;
  color: #ffffff;
  // width: 60%;
  font-size: 20px;
}

.input-text:focus {
  border-bottom-color: #555;
  border: none;
  outline: 1px solid black;
}

.edit-btn {
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, .5);
  background: linear-gradient(90deg, #70f7ff, #76b6fe);
  border: 2px solid #6ac6f5;
  color: black;
  padding: 1px 15px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

.edit-btn:hover {
  background-color: #6ac6f5;
  color: #000000;
  box-shadow: inset 0 3px 5px rgba(127, 243, 160, 0.5);
}

.post-card {
  color: white;
  background: linear-gradient(1turn, #121218, rgba(18, 18, 24, 0));
  // outline: solid linear-gradient(210deg,rgba(0,255,85,.6),#70f7ff 10%,#76b6fe 60%,#000 80%);
  box-shadow: 0 0 0 2px rgba(0, 255, 85, .6), 0 0 0 4px #70f7ff, 0 0 0 6px #76b6fe, 0 0 0 8px #000;
  // margin: 0.25rem;
  border-radius: 0.25rem;
  padding: 0.5rem;
  transition: transform 0.3s ease;
}

.banner-container {
  position: relative;
  width: 100%;
  height: 12rem;
  /* Adjust the height as needed */
  overflow: hidden;
}

.banner-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;

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
}</style>