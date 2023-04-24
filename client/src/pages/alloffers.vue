<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { ref } from "vue";
import { useRouter, useRoute } from 'vue-router'
import Time from "@/components/Time.vue";

const router = useRouter();
const route = useRoute();

const offers = ref("");

onMounted(async () => {
    const res = await axios.get("http://localhost:3000/api/offers/offers", {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    });
    offers.value = res.data.offers
    
});



</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
  <button class="btn-primar" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling"
    aria-controls="offcanvasScrolling" style="float: right;">
    <i class="fa fa-bars"></i>
  </button>

  <div class="offcanvas offcanvas-end" style="background-color: #3f51b5; color: #fff;" data-bs-scroll="true"
    data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
    <div class="offcanvas-header" style="display: flex; flex-direction: column;">
      <h5 class="offcanvas-title" id="offcanvasScrollingLabel">
        {{ email }}
      </h5>
      <Time />
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <router-link class="buttonsidebar" to="/userpanel" tag="button">Twoje konto</router-link>
      <br>
      <br>
      <router-link class="buttonsidebar" to="/useroffer" tag="button">Twoje ogłoszenia</router-link>
      <br>
      <br>
      <router-link class="buttonsidebar" to="/useraddoffer" tag="button">Dodaj ogłoszenie</router-link>
    </div>
  </div>
  <h1>WSZYSTKIE OGŁOSZENIA</h1>
  <select class="select" v-model="sortBy" @change="sort()" name="" id="">
    <option value="priceDesc">Od Najdroższych</option>
    <option value="priceAsc">Od Najtańszych</option>
    <option value="dateAsc">Od Najstarszych</option>
    <option value="dateDesc">Od Najnowszych</option>
  </select>
  <div style="display: flex; justify-content: center; padding: 15px;">
  <div>
    <label for="minPrice">Min Price:</label>
    <input id="minPrice"  type="number" min="0">
    
    <label for="maxPrice">Max Price:</label>
    <input id="maxPrice"  type="number" min="0">
    
    <button v-on:click="applyFilter">Apply</button>
  </div>
</div>
  <div class="button-container">
  </div>
    <router-link class="panel" v-for="offer in offers" :to="{name: `offer`, params: {id: offer._id }}">
    <div class="panelelements">
      <div>
        <img class="foto" :src="'/src/assets/uploads/' + offer.Photos[0]" alt="zdjecie">
      </div>
      <div>
        <h3>{{ offer.Name }}</h3>
        
        <p class="p">{{ offer.Description }}</p>
      </div>
      <div>
        <p class="cena">{{ offer.Price }} zł</p>
        <p style="color: #fff;">{{ offer.Date.substring(0,10) }}, {{ offer.Date.substring(11,19) }}
        
        </p>
      </div>
      </div>
    </router-link>

    
</template>

<style scoped>

.button-container {
  display: relative;
  justify-content: space-evenly;
}

h1 {
  padding: 20px;
  text-align: center;
  font-family: Exo;
}

h3 {
  float: center;
  display: flex;
  text-align: center;
  font-family: Exo;
  color: #fff;
}

.cena {
  margin-left: auto;
  background-color: #BDBDBD;
  display: flex;
  padding: 10px;
  text-align: center;
  font-family: Exo;
  font-size: 36px;
  color: #212121;
}

.buttonik {
  text-align: center;
  padding: auto;
  background-color: #3F51B5;
  color: #fff;
  float: right;
  font-size: 24px;
  width: 250px;
  height: 40px;
  cursor: pointer;
  font-family: Exo;
  text-decoration: none;
}

.buttonik:hover {
  background-color: #FF5722;
}

.panel {
  margin: auto;
  display: block;
  margin-top: 30px;
  width: 90%;
  height: 200px;
  background-color: #3F51B5;
  border: none;
  border-radius: 10px;
  text-decoration: none;
}

.panel:hover{
  background-color: #303F9F;
}

.panelelements {
  width: inherit;
  height: inherit;
  justify-content: space-between;
  display: flex;
  align-items: center;
  flex-direction: row;
}

.foto {
  padding: 10px;
  height: 200px;
  width: 200px;
}

.p {
  color: #fff;
  font-family: Exo;
}

.buttonsidebar {
  padding: 10px;
  margin-top: 20px;
  width: 100px;
  height: 50px;
  background-color: #3F51B5;
  color: #fff;
  border: none;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
}

.buttonsidebar:hover {
  background-color: #FF5722;
}

.buttoniks {
  background-color: #BDBDBD;
  padding: 10px;
  width: auto;
  height: auto;
  color: #212121;
  cursor: pointer;
  font-family: Exo;
  text-decoration: none;
}

.select {
  display: flex;
  margin: auto;
}

</style>