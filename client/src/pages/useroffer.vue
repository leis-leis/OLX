<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { ref } from "vue";
import Time from "@/components/Time.vue";


const offers = ref("");

async function del(offerid){
  const res = await axios.delete("http://localhost:3000/api/offers/offerdelete/" + offerid, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  console.log(res.msg)
}

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
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
  <button class="btn-primar" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling"
    aria-controls="offcanvasScrolling" style="float: right;">
    <i class="fa fa-bars"></i>
  </button>

  <div class="offcanvas offcanvas-end" style="background-color: #3f51b5; color: #fff; width: 20vh;"
    data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling"
    aria-labelledby="offcanvasScrollingLabel">
    <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasScrollingLabel" >
        {{ email }}
      </h5>
      <Time/>
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
  <h1>TWOJE OGŁOSZENIA</h1>
  <div class="button-container">
    <div class="buttonik">
      <router-link class="buttonik" to="/useraddoffer" tag="button">Dodaj ogłoszenie <i
          class="fa fa-plus fa-1x"></i></router-link>
    </div>
  </div>
    <router-link class="panel" v-for="offer in offers" :to="{name: `offer`, params: {id: offer._id }}">
    <div class="panelelements" @click="consolelog">
      <div>
        <img class="foto" :src="'/src/assets/uploads/' + offer.Photos[0]" alt="zdjecie">
      </div>
      <div>
        <h3>{{ offer.Name }}</h3>
        <p class="p">{{ offer.Description }}</p>
      </div>
      <div>
        <p class="cena">{{ offer.Price }}</p>
        <div class="buttoniks">
        <router-link class="buttoniks" :to="{name: `editoffer`, params: {id: offer._id }}" tag="button">Edytuj ogłoszenie <i
            class="fa fa-pencil fa-1x"></i></router-link>
          <router-link to="useroffer"   class="buttoniks" tag="button"><span @click="del(offer._id)">Usuń ogłoszenie <i
              class="fa fa-minus fa-1x"></i></span> </router-link>

        </div>
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
  border: none;
}


</style>