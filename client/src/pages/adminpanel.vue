<script setup>
import { main } from "@popperjs/core";
import axios from "axios";
import { onMounted } from "vue";
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import Time from "@/components/Time.vue";

const userStore = useUserStore();

const nameCat = ref("");
const mainCat = ref("");
const categories = ref([]);
const catToDelete = ref("");
const mainCategory = ref([]);
const subCategory = ref([]);
const subCatID = ref("");

onMounted(async () => {
  const res = await axios.get(
    "http://localhost:3000/api/categories/adminpanel",
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  categories.value = res.data.categories;
  //console.log(categories.value);
  mainCategory.value = categories.value.filter(c => c.MainCategory == null);
  mainCategory.value.forEach(c => {
    c.SubCategory = categories.value.filter(cc => cc.MainCategory === c._id)
    //console.log(c.SubCategory)
  })
});


const handleHange = (event) => {
  subCategory.value = mainCategory.value.find(c => c._id === event.target.value).SubCategory
  console.log(subCategory.value)
}

function onpost() {
  const posto = axios.post(
    "http://localhost:3000/api/categories/categoryadd",
    {
      Name: nameCat.value,
      MainCategory: mainCat.value,
    },
    {
      headers: {
        Authorization: userStore.token,
      },
    }
  );
}

function del() {
  const posto = axios.post(
    "http://localhost:3000/api/categories/categorydel",
    {
      Id: subCategory.value,

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
    <div style="display: flex; flex-direction: column" class="offcanvas-body">
      <router-link class="buttonsidebar" to="/adminpanel" tag="button">Kategorie</router-link>
      <router-link class="buttonsidebar" to="/adminpanelusers" tag="button">Użytkownicy</router-link>
    </div>
  </div>
  <div class="row">
    <div class="card mx-auto p-0" style="height: 475px">
      <div class="card-header text-white" style="align-content: center;">
        <h1 style="height: fit-content; width: fit-content; margin: auto;">Admin Panel</h1>
      </div>
      <div class="kategorieadd">
        Dodaj Kategorie
        <input type="text" v-model="nameCat" placeholder="" />
      </div>
      <div class="podkategorieadd">
        Wybierz kategorię
        <select v-model="mainCat" name="SubcategoryTo" id="category">
          <option value="0">Jest kategorią główną</option>
          <template v-for="category in categories">
            <option v-if="category.MainCategory == null" :value="category._id">
              {{ category.Name }}
            </option>
          </template>
        </select>
        <br />
        <button class="button" @click="onpost">Zapisz</button>
      </div>
      <br />
      <div class="kategoriedel">
        Usuń Kategorie
        <select @change="handleHange($event)" name="mainCat" id="mainCategory">
          <option  v-for="cat in mainCategory" :key="cat._id" :value="cat._id">
            {{ cat.Name }}
          </option>
        </select>
        <select name="subCat" id="subCategory" v-model="SubCatID">
          <option value="-1">Kategorię główną</option>
          <option  v-for="cat in subCategory" :key="cat._id" :value="cat._id">
            {{ cat.Name }}
          </option>
        </select>
        <br />
        <button class="button" @click="del">Usuń</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style scoped>
h1 {
  padding: 50px;
  text-align: center;
  font-family: Exo;
}

.button-container {
  display: flex;
  justify-content: space-evenly;
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

.button {
  margin-top: 20px;
  width: 100px;
  height: 50px;
  background-color: #3f51b5;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
}

.button:hover {
  background-color: #ff5722;
}

.buttonsidebar:hover {
  background-color: #ff5722;
}

.kategorieadd {
  margin-top: 20px;
  height: 50px;
  width: auto;
  text-align: center;
  font-family: Exo;
}

.podkategorieadd {
  width: auto;
  text-align: center;
  font-family: Exo;
}

.kategoriedel {
  width: auto;
  height: 50px;
  text-align: center;
  font-family: Exo;
}

.podkategoriedel {
  width: auto;
  text-align: center;
  font-family: Exo;
}

.btn-primar {
  width: 60px;
  height: 100px;
  background-color: #303f9f;
  color: #fff;
  border: none;
}

.card {
  width: 50%;
  border: 2px solid #303f9f;
  background-color: #c5cae9;
}

.mx-auto {
  margin-top: 50px;
  margin-bottom: 50px;
}

.card-header {
  background-color: #303f9f;
}
</style>
