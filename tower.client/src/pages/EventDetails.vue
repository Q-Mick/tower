<template>

    <!-- header -->
    <section class="row">
        <div class="col-12">

            <h1>Event Details</h1>
        </div>
    </section>
    <!-- detailsCard - need a blurred img background or glass pane blur-->
<section class="bg-glass">
<div class="row">
    <div class="col-12 d-flex text-end">
        <!-- TODO need v-if to show edit button here if my event -->
        <button>...</button>
    </div>
    <!-- TODO image of active event -->
    <div class="col-4">
        <img class="img-fluid" src="https://img.freepik.com/free-vector/silhouette-party-audience_1048-9714.jpg?w=2000" alt="">
    </div>
<!-- TODO event data -->
    <section class="col-8">
        <div class="row">
            <div class="col-12 d-flex justify-content-between">
                <p class="m-0">Event Title</p>
                <p class="m-0">Event Date</p>
            </div>
            <div class="row">
            <div class="col-12 d-flex justify-content-between">
                <p class="m-0">Event location</p>
                <p class="m-0">Event Start Time</p>
            </div>
            <div class="row">
                <div class="col-12">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora optio, totam consequuntur quisquam, neque reprehenderit facilis corporis sint, non vitae doloremque nam dolorem exercitationem suscipit quam dolorum vero? Libero ipsa dignissimos unde velit modi quos consequuntur aperiam, sint quaerat vitae?</p>
                </div>
                <div class="row">
                    <div class="col-12 d-flex justify-content-between">
                        <p>tickets left</p>
                        <button class="btn btn-warning">Attend</button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="row">
        <div class="col-12">
            <p>See who is attending</p>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="card-body elevated-5">
                    People Attending here
                </div>
            </div>

        </div>
    </section>

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
export default {
    setup(){
        return {}
    }
}
</script>


<style lang="scss" scoped>
.out-of-focus {
  filter: blur(5px); /* Adjust the blur amount as desired */
}
.bg-glass{
  background: rgba(15, 15, 15, 0.354);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.1px);
  -webkit-backdrop-filter: blur(8.1px);
  border: 1px solid rgba(15, 15, 15, 0.26);
//   height: 18dvh;
}

</style>