<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { ref } from "vue";

const name = ref("");
const surname = ref("");
const email = ref("");
const mobile = ref("");
const joindate = ref("");
const lastonline = ref("");
const avatar = ref("");
var url ='';

onMounted(async () => {
  const res = await axios.get("http://localhost:3000/api/users/userpanel", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  name.value = res.data.user.Name;
  surname.value = res.data.user.Surname;
  email.value = res.data.user.Email;
  mobile.value = res.data.user.Phone;
  joindate.value = res.data.user.JoinDate;
  lastonline.value = res.data.user.LastOnline;
  avatar.value = res.data.user.Avatar
  url = avatar.value;
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
    <br>
    <br>
        <router-link class="buttonsidebar" to="/useraddoffer" tag="button">Dodaj ogłoszenie</router-link>
  </div>
</div>
  <div>
    <div class="row">
      <div class="card mx-auto p-0">
        <div class="card-header text-white">
          <h1>TWOJE KONTO</h1>
        </div>
        <div class="form card-body">
          <img
            :src="'/src/assets/uploads/'+ url"
            class="avatar"
            alt="Twój avatar"
          />
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Imie: {{ name }}</li>
            <li class="list-group-item">Nazwisko: {{ surname }}</li>
            <li class="list-group-item">Email: {{ email }}</li>
            <li class="list-group-item">Nr telefonu: {{ mobile }}</li>
            <li class="list-group-item">Data rejestracji: {{ joindate }}</li>
            <li class="list-group-item">Ostatnio Online: {{ lastonline }}</li>
          </ul>
          <br>
          <router-link to="/usermodify" class="card-button tor">
            EDYTUJ
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.mx-auto {
    margin-top: 50px;
    margin-bottom: 50px;
}

.card {
    width: 50%;
    border: 2px solid #303F9F;
}

.form {
    height: auto;
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    font-family: Exo;
    background-color: #C5CAE9;
}

.card-header{
    background-color: #303F9F;
}
.avatar{
  display: flex;
              flex-grow: 1;
              align-items: center;
              justify-content: center;
              text-align: center;
              max-width: 5.5em;
}

.buttonsidebar{
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
  
</style>
