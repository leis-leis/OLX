<script setup>
import axios from "axios";
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref } from "vue";
import { useUserStore } from "../stores/user";
import Time from "@/components/Time.vue";

const userStore = useUserStore();

const route = useRoute();

const title = ref("");
const desc = ref("");

function onpost() {
  const posto = axios.post(
    "http://localhost:3000/api/reports/report/" + route.params.id,
    {
      Title: title.value,
      Desc: desc.value, 
    },
    {
      headers: {
        Authorization: userStore.token,
      },
    }
  );
}
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
    style="float: right"
  >
    <i class="fa fa-bars"></i>
  </button>

  <div
    class="offcanvas offcanvas-end"
    style="background-color: #3f51b5; color: #fff;"
    data-bs-scroll="true"
    data-bs-backdrop="false"
    tabindex="-1"
    id="offcanvasScrolling"
    aria-labelledby="offcanvasScrollingLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasScrollingLabel">
        {{ email }}
      </h5>
      <Time />
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

  <h1>Zgłoś ogłoszenie</h1>
  <div class="panel">
    <div class="title">Tytuł zgłoszenia</div>
    <div class="form card-body">
      <form>
        <div class="form-group">
          <input
            id="title"
            type="text"
            enterkeyhint="next"
            placeholder="np. Oszustwo, sprzedawanie zdjęcia przedmiotu"
            name="Title"
            v-model="title"
            class="form-control"
          />
        </div>
      </form>
    </div>
  </div>
  <div class="panel">
    <div class="title">Opis</div>
    <textarea
      v-model="desc"
      class="form-control"
      style="margin-left: 10px; resize: none"
      id="exampleFormControlTextarea1"
      rows="5"
    ></textarea>
  </div>

  <div class="paneladd">
    <button class="button" @click="onpost">Zgłoś</button>
  </div>
</template>

<style scoped>
.panel {
  margin: auto;
  display: relative;
  margin-top: 10px;
  width: 90%;
  height: 210px;
  background-color: #3f51b5;
  border-radius: 10px;
}

.panelik {
  margin: auto;
  display: relative;
  margin-top: 10px;
  width: 90%;
  height: fit-content;
  background-color: #3f51b5;
  border-radius: 10px;
  padding-bottom: 20px;
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
.dropfile {
  margin-left: 10px;
}
</style>
