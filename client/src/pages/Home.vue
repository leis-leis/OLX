<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from 'vue-router'

const categories = ref("")
const mainCategory = ref("")

onMounted(async () => {
  const res = await axios.get("http://localhost:3000/api/categories/categories", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  categories.value = res.data.categories

  mainCategory.value = categories.value.filter(c => c.MainCategory == null);
  mainCategory.value.forEach(c => {
    c.SubCategory = categories.value.filter(cc => cc.MainCategory === c._id)
    //console.log(c.SubCategory)
  })
  //console.log(mainCategory.value)
});
</script>

<template>
  <SearchBar />
  <link
    rel="stylesheet"
    href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
    integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
    crossorigin="anonymous"
  />
  
  <h1>Kategorie główne</h1>
  <div>
  <router-link class="buttonsidebar" to="/offers" tag="button">Ostatnio Dodane</router-link>
</div>


  <div class="button-container">
    <div class="row">
      <div v-for="cat in mainCategory" class="col-sm">
        <button class="btn-94"><i :class="`fa ` + cat.Icon + ` fa-3x`"></i></button>
        <div class="text">{{ cat.Name }}</div>
        <ul>
          <li v-for="subCat in cat.SubCategory">{{ subCat.Name }}</li>
        </ul>
      </div>
    </div>
  </div>
  

</template>


<script>
import SearchBar from "@/components/SearchBar.vue";
export default {
  components: {
    SearchBar,
  },
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

.button {
  width: 100px;
  height: 100px;
  background-color: #3f51b5;
  color: #fff;
  border: none;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
}

.button:hover {
  background-color: #ff5722;
}

.text {
  text-align: center;
  font-family: Exo;
  font-size: px;
}

.buttonsidebar {
  width: 8%;
  margin: auto;
  display: flex;
  background-color: #3F51B5;
  color: #fff;
  border: none;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  margin-top: -30px;
  margin-bottom: 2%;
}

.buttonsidebar:hover {
  background-color: #FF5722;
}

.btn-94:before {
  border: 0 solid;
  box-sizing: border-box;
}
.btn-94 {
  -webkit-tap-highlight-color: transparent;
  background-color: #000;
  background-image: none;
  color: #fff;
}
.btn-94:disabled {
  cursor: default;
}
.btn-94:-moz-focusring {
  outline: auto;
}

.btn-94 [hidden] {
  display: none;
}
.btn-94 {
  background: #3F51B5;
  background-clip: content-box;
  border: 5px solid;
  border-radius: 50%;
  box-sizing: border-box;
  display: block;
  height: 100px;
  padding: 0;
  position: relative;
  transition: 0.2s;
  width: 100px;
}

.btn-94:hover {
  --size: 70px;
  border: 10px solid transparent;
  background-color: #FF5722;
}

.button-container ul {
    display: none;
    position: absolute;
    padding: 10px;
    z-index: 1;
  }
  
  .button-container li:hover {
    background-color: #FF5722;
  }
  
  .col-sm:hover ul {
    display: block;
  }
</style>
