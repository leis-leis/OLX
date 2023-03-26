<script setup>
import { main } from "@popperjs/core";
import axios from "axios";
import { onMounted } from "vue";
import { ref } from "vue";
import { useUserStore } from "../stores/user";

const offers = ref("");

onMounted(async () => {
  const res = await axios.get("http://localhost:3000/api/offers/myoffers", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  offers.value = res.data.offers
  
});

</script>

<template>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <button class="btn-primar" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"><i class="fa fa-bars"></i></button>

<div class="offcanvas offcanvas-start" style="background-color: #3F51B5; color:#fff; width: 200px;" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Sidebar panel</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <router-link class="buttonsidebar" to="/userpanel" tag="button">Twoje konto</router-link>
    <br>
    <br>
    <router-link class="buttonsidebar" to="/useroffer" tag="button">Twoje ogłoszenia</router-link>
  </div>
</div>
<h1>TWOJE OGŁOSZENIA</h1>

<div v-for="offer in offers">
    <h3>{{ offer.Name }}</h3>
    <h5>{{ offer.Price }}</h5>
    <p>{{ offer.Description }}</p>
    <div v-for="image in offer.Photos">
    <img :src="'/src/assets/uploads/'+ image" alt="zdjecie">
    </div>
</div>

</template>

<style scoped>

h1 {
padding: 50px;
text-align: center;
font-family: Exo;
}


</style>