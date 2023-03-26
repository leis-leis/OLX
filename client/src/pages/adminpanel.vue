<script setup>
import { main } from "@popperjs/core";
import axios from "axios";
import { onMounted } from "vue";
import { ref } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

const nameCat = ref("");
const mainCat = ref("");
const categories = ref("");
const catToDelete = ref("");

onMounted(async () => {
  const res = await axios.get("http://localhost:3000/api/categories/adminpanel", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  categories.value = res.data.categories
  
});

function onpost() {
const posto = axios.post(
"http://localhost:3000/api/categories/categoryadd",
{
  Name: nameCat.value,
  MainCategory: mainCat.value
},
{
  headers: {
    Authorization: userStore.token,
  },
});
}

function del() {
const posto = axios.post(
"http://localhost:3000/api/categories/categorydel",
{
  Id: catToDelete.value,
},
{
  headers: {
    Authorization: userStore.token,
  },
});
}

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
    <router-link class="buttonsidebar" to="/adminpanel" tag="button">Kategorie</router-link>
    <br>
    <br>
    <router-link class="buttonsidebar" to="/adminpanelusers" tag="button">Użytkownicy</router-link>
  </div>
</div>
    <h1>ADMIN PANEL</h1>
    <div class="kategorieadd">
    Dodaj Kategorie
    <input type="text" v-model="nameCat" placeholder="">
    </div>
    <div class="podkategorieadd">
    Jest podkategorią do
    <select v-model="mainCat" name="SubcategoryTo" id="category">
    <option value="-1">Jest kategorią główną</option>
    <template v-for="category in categories">
      <option v-if="category.MainCategory == null" :value="category._id">{{ category.Name }}</option>
    </template>
    
    </select>
    <br>
    <button class="button" @click="onpost">Zapisz</button>
    </div>
    <br>
    <div class="kategoriedel">
    Usuń Kategorie
    <select v-model="catToDelete" name="category" id="category">
    <option v-for="category in categories" :value="category._id">{{ category.Name }}</option>
    </select>
    <br>
    <button class="button" @click="del">Usuń</button>
    </div>

  </template>
    
  <script>
  export default {
    components: {
    }
  }
  
  </script>
    
  <style>
  

  h1 {
    padding: 50px;
    text-align: center;
    font-family: Exo;
  }
  
  .button-container {
    display: flex;
    justify-content: space-evenly;
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
  
  .button {
    margin-top: 20px;
    width: 100px;
    height: 50px;
    background-color: #3F51B5;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  }
  
  
  .button:hover {
    background-color: #FF5722;
  }

  .buttonsidebar:hover {
    background-color: #FF5722;
  }

  .kategorieadd{
    height: 50px;
    width: auto;
    text-align: center;
    font-family: Exo;
}

.podkategorieadd{
    width: auto;
    text-align: center;
    font-family: Exo;
}

.kategoriedel{
    width: auto;
    height: 50px;
    text-align: center;
    font-family: Exo;
}

.podkategoriedel{
    width: auto;
    text-align: center;
    font-family: Exo;
}

   .btn-primar{
    width: 60px;
    height: 100px;
    background-color: #303F9F;
    color: #fff;
    border: none;
}
  </style>