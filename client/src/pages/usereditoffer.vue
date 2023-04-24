<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from "../stores/user";
import { useFileStore } from "../stores/files";

const route = useRoute();

const fileStore = useFileStore();
const userStore = useUserStore();

const nameOffer = ref("");
const priceOffer = ref("");
const descriptionOffer = ref("");
const photosOffer = ref("");
const categoryOffer = ref("");
const addressOffer = ref("");

const offer = ref("")
const addresses = ref("")

const categories = ref([]);
const mainCategory = ref([]);
const subCategory = ref([]);
const SubCatID = ref("");

function onpost() {
    const words = addressOffer.value.split(', ')
    const files = fileStore.files;
    const formData = new FormData();
    formData.append("Name", nameOffer.value)
    formData.append("Price", priceOffer.value)
    formData.append("Description", descriptionOffer.value)
    formData.append("Category", categoryOffer.value)
    formData.append("City", words[0])
    formData.append("County", words[1])
    formData.append("Voivodeship", words[2])
    files.forEach((file) => {
        formData.append("Files", file);
    });
    
    //formData.forEach((val , key , formData)  => {console.log(key + ": " + val)})

    const posto = axios.post(
    "http://localhost:3000/api/offers/offeredit/" + route.params.id,
    formData,
    {
      headers: {
        Authorization: userStore.token,
      },
    }
  );
}

onMounted(async () => {
  const res = await axios.get("http://localhost:3000/api/offers/offer/"+ route.params.id, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  offer.value = res.data.offer

  categories.value = res.data.categories

  nameOffer.value = offer.value.Name
  priceOffer.value = offer.value.Price
  descriptionOffer.value = offer.value.Description
  categoryOffer.value = offer.value.Category
  //console.log(res.data.address)
  addressOffer.value = res.data.address.City + ', ' + res.data.address.County + ', ' + res.data.address.Voivodeship
  //photosOffer.value = offer.value.Photos  //tu nie wiem jak dac zdjecia 


  mainCategory.value = categories.value.filter(c => c.MainCategory == null);
  mainCategory.value.forEach(c => {
    c.SubCategory = categories.value.filter(cc => cc.MainCategory === c._id)
    //console.log(c.SubCategory)
  })
  //console.log(mainCategory.value)
});

const handleHange = (event) => {
  subCategory.value = mainCategory.value.find(c => c._id === event.target.value).SubCategory
  console.log(subCategory.value)
}

async function showAddress(){
  if(addressOffer.value.length > 2){
    const res = await axios.get("http://localhost:3000/api/offers/addresses/" + addressOffer.value, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  addresses.value = res.data.addresses;
  }
}

</script>
<script>
import Dropfile from "@/components/Dropfile.vue";
  export default {
    components: {
      Dropfile
    }
  }
</script>

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <button class="btn-primar" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling"
        aria-controls="offcanvasScrolling"><i class="fa fa-bars"></i></button>

    <div class="offcanvas offcanvas-start" style="background-color: #3F51B5; color:#fff; width: 200px;"
        data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel">
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

    <h1>Edytuj Ogłoszenie</h1>
    <div class="panel">
        <div class="title">
            Tytuł ogłoszenia
        </div>
        <div class="form card-body">
            <form>
                <div class="form-group">
                    <input id="name" type="text" placeholder="np. Smartfon Iphone 11 na gwarancji" name="Name"
                        v-model="nameOffer" class="form-control" />
                </div>
                <br>
                <div class="form-group">
                    <input id="name" type="text" placeholder="CENA" name="Name"
                        v-model="priceOffer" class="form-control" />
                </div>
            </form>
        </div>
    </div>
    <div class="panelik">
        <div class="title">
            Kategoria
            <div class="form-group">
                <!-- <select @change="handleHange($event)" name="mainCat" id="mainCategory">
          <option  v-for="cat in mainCategory" :key="cat._id" :value="cat._id">
            {{ cat.Name }}
          </option>
        </select>
        <select name="subCat" id="subCategory" v-model="SubCatID">
          <option  v-for="cat in subCategory" :key="cat._id" :value="cat._id">
            {{ cat.Name }}
          </option>
        </select> -->

        <select v-model="categoryOffer" name="" id="">
          <optgroup v-for="cat in mainCategory" v-bind:label="cat.Name">
            <option v-for="subCat in cat.SubCategory" :value="subCat._id">{{ subCat.Name }}</option>
          </optgroup>
        </select>
            </div>
        </div>
    </div>
    <div class="panelik">
        <label for="formFileMultiple" class="title">Dodaj Zdjęcia</label>
        <div class="dropfile">
        <Dropfile />
        </div>
    </div>
    <div class="panel">
        <div class="title">
            Opis
        </div>
        <textarea v-model="descriptionOffer" class="form-control" style="margin-left: 10px; resize: none;" id="exampleFormControlTextarea1"
            rows="5"></textarea>
    </div>

    <div class="panelik">
      <div class="title">Lokalizacja</div>
    <div class="form-group">
      <input
        id="name"
        type="text"
        autocomplete="address-level2"
        enterkeyhint="next"
        placeholder="Miejscowość"
        name="address-level2"
        v-model="addressOffer"
        list="addresses"
        class="form-control"
        style="margin-left: 10px"
        @keyup="showAddress"
      />
      <datalist
      id="addresses"
      >
      <option v-for="address in addresses" :value="address.City + `, ` + address.County + `, ` + address.Voivodeship"></option>
      </datalist>
    </div>
    </div>

    <div class="paneladd">
        <button class="button" @click="onpost">Edytuj Ogłoszenie</button>
        </div>

</template>

<style scoped>
.panel {
    margin: auto;
    display: relative;
    margin-top: 10px;
    width: 90%;
    height: 210px;
    background-color: #3F51B5;
    border-radius: 10px;
}

.panelik {
    margin: auto;
    display: relative;
    margin-top: 10px;
    width: 90%;
    height:fit-content;
    background-color: #3F51B5;
    border-radius: 10px;
    padding-bottom: 20px;
}

.paneladd {
    margin: auto;
    display: relative;
    margin-top: 10px;
    width: 30%;
    height: 120px;
    background-color: #3F51B5;
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
    background-color: #C5CAE9;
    color: #000000;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
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

  .buttonsidebar:hover {
    background-color: #FF5722;
  }
  .dropfile
  {
    margin-left: 10px;
  }
</style>