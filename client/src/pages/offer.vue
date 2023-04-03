<script setup>
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import { onMounted } from "vue";
import { useUserStore } from "../stores/user";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

const route = useRoute();

const userStore = useUserStore();

const offer = ref("");
const offerer = ref("");

onMounted(async () => {
  const res = await axios.get(
    "http://localhost:3000/api/offers/offer/" + route.params.id,
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  offer.value = res.data.offer;
  offerer.value = res.data.offerer;
  // do zmiany kozioł canot see that shit
  const x = document.querySelector(".vueperslides__parallax-wrapper");
  x.style.paddingBottom = "100%";
});
</script>

<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />
  <button
    class="btn-primar"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasScrolling"
    aria-controls="offcanvasScrolling"
  >
    <i class="fa fa-bars"></i>
  </button>

  <div
    class="offcanvas offcanvas-start"
    style="background-color: #3f51b5; color: #fff; width: 200px"
    data-bs-scroll="true"
    data-bs-backdrop="false"
    tabindex="-1"
    id="offcanvasScrolling"
    aria-labelledby="offcanvasScrollingLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasScrollingLabel">
        Sidebar panel
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <router-link class="buttonsidebar" to="/userpanel" tag="button"
        >Twoje konto</router-link
      >
      <br />
      <br />
      <router-link class="buttonsidebar" to="/useroffer" tag="button"
        >Twoje ogłoszenia</router-link
      >
      <br />
      <br />
      <router-link class="buttonsidebar" to="/useraddoffer" tag="button"
        >Dodaj ogłoszenie</router-link
      >
    </div>
  </div>
  <div class="border">
    <!-- https://antoniandre.github.io/vueper-slides/?ref=madewithvuejs.com#examples -->
    <vueper-slides class="vueperslides__inner">
      <vueper-slide
        v-for="photo in offer.Photos"
        :image="'/src/assets/uploads/' + photo"
      >
      </vueper-slide>
    </vueper-slides>
  </div>
  <div class="panel">
    <div class="panelelements">
      <div>
        <h3>{{ offer.Name }}</h3>
      </div>
    </div>
    <p class="cena">{{ offer.Price }}</p>
    <br />
  </div>
  <div class="panel">
    <p class="p">Opis: {{ offer.Description }}</p>
    <div class="data">
      Wystawił {{ offerer.Name }}
      <br />
      Data wystawienia ogłoszenia{{ offer.Date }}
    </div>
  </div>
</template>
<style scoped>
.panel {
  margin: auto;
  display: relative;
  margin-top: 10px;
  width: 90%;
  height: 90%;
  background-color: #3f51b5;
  border-radius: 10px;
}

.panelelements {
  width: inherit;
  height: inherit;
  display: flex;
  align-items: center;
  flex-direction: row;
}

.cena {
  margin-left: 20px;
  padding: 10px;
  height: 90%;
  width: 20%;
  background-color: #bdbdbd;
  display: flex;
  font-family: Exo;
  font-size: 36px;
  color: #212121;
}

.panelik {
  margin: auto;
  display: relative;
  margin-top: 10px;
  width: 90%;
  height: 120px;
  background-color: #3f51b5;
  border-radius: 10px;
}

.paneladd {
  margin: auto;
  display: relative;
  margin-top: 10px;
  width: 30%;
  height: 120px;
  background-color: #3f51b5;
  border-radius: 10px;
}

.title {
  padding: 10px;
  color: #fff;
  font-size: 24px;
  font-family: Exo;
}

.form {
  padding: 10px;
  height: auto;
  width: auto;
  display: flex;
  align-items: center;
  position: relative;
  font-family: Exo;
}

.form-control {
  width: 400px;
}

.form-control:focus {
  color: var(--bs-body-color);
  background-color: var(--bs-form-control-bg);
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 0.25rem #ff5722;
}

.button {
  margin-top: 35px;
  margin-left: 65px;
  height: 50%;
  width: 70%;
  background-color: #c5cae9;
  color: #000000;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
}

.buttonsidebar {
  padding: 10px;
  margin-top: 20px;
  width: 100px;
  height: 50px;
  background-color: #3f51b5;
  color: #fff;
  border: none;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
}

.buttonsidebar:hover {
  background-color: #ff5722;
}

h3 {
  margin-top: 20px;
  margin-left: 20px;
  float: center;
  display: flex;
  text-align: center;
  font-family: Exo;
  color: #fff;
  font-size: 30px;
}

.p {
  padding: 10px;
  font-size: 24px;
  color: #fff;
  font-family: Exo;
}

.data {
  float: right;
  background-color: #3f51b5;
}

.border {
  margin: auto;
  display: relative;
  border-radius: 10px;
  height: 300px;
  width: 300px;
}
</style>
