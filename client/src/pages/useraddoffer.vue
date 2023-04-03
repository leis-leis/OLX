<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useUserStore } from "../stores/user";
import { useFileStore } from "../stores/files";
import Time from "@/components/Time.vue";

const fileStore = useFileStore();
const userStore = useUserStore();

const nameOffer = ref("");
const priceOffer = ref("");
const descriptionOffer = ref("");
const photosOffer = ref("");
const categoryOffer = ref("");
const addressOffer = ref("");

const categories = ref([]);

const mainCategory = ref([]);
const subCategory = ref([]);
const SubCatID = ref("");

onMounted(async () => {
  const res = await axios.get("http://localhost:3000/api/offers/offeradd", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  categories.value = res.data.categories;
  //console.log(categories.value);
  mainCategory.value = categories.value.filter((c) => c.MainCategory == null);
  mainCategory.value.forEach((c) => {
    c.SubCategory = categories.value.filter((cc) => cc.MainCategory === c._id);
    //console.log(c.SubCategory)
  });
});

const handleHange = (event) => {
  subCategory.value = mainCategory.value.find(
    (c) => c._id === event.target.value
  ).SubCategory;
  console.log(subCategory.value);
};

function onpost() {
  const files = fileStore.files;
  console.log(files[0]);
  const formData = new FormData();
  formData.append("Name", nameOffer.value);
  formData.append("Price", priceOffer.value);
  formData.append("Description", descriptionOffer.value);
  formData.append("Cat", SubCatID.value);
  files.forEach((file) => {
    formData.append("Files", file);
  });

  formData.forEach((val, key, formData) => {
    console.log(key + ": " + val);
  });

  const posto = axios.post(
    "http://localhost:3000/api/offers/offeradd",
    formData,
    {
      headers: {
        Authorization: userStore.token,
      },
    }
  );
}
</script>
<script>
import Dropfile from "@/components/Dropfile.vue";
export default {
  components: {
    Dropfile,
  },
};
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
    style="background-color: #3f51b5; color: #fff; width: 20vh"
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

  <h1>Dodaj Ogłoszenie</h1>
  <div class="panel">
    <div class="title">Tytuł ogłoszenia</div>
    <div class="form card-body">
      <form>
        <div class="form-group">
          <input
            id="name"
            type="text"
            enterkeyhint="next"
            placeholder="np. Smartfon Iphone 11 na gwarancji"
            name="Name"
            v-model="nameOffer"
            class="form-control"
          />
        </div>
        <br />
        <div class="form-group">
          <input
            id="name"
            type="number"
            placeholder="CENA"
            enterkeyhint="next"
            name="Name"
            v-model="priceOffer"
            class="form-control"
          />
        </div>
      </form>
    </div>
  </div>
  <div class="panelik">
    <div class="title">
      <div>
        Kategoria
        <select @change="handleHange($event)" name="mainCat" id="mainCategory">
          <option v-for="cat in mainCategory" :key="cat._id" :value="cat._id">
            {{ cat.Name }}
          </option>
        </select>
        <select name="subCat" id="subCategory" v-model="SubCatID">
          <option v-for="cat in subCategory" :key="cat._id" :value="cat._id">
            {{ cat.Name }}
          </option>
        </select>
        <br />
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
    <div class="title">Opis</div>
    <textarea
      v-model="descriptionOffer"
      class="form-control"
      style="margin-left: 10px; resize: none"
      id="exampleFormControlTextarea1"
      rows="5"
    ></textarea>
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
        v-model="address"
        class="form-control"
        style="margin-left: 10px"
      />
    </div>
  </div>

  <div class="panel">
    <div class="title">Dane Kontaktowe</div>
    <div class="form card-body">
      <form>
        <div class="form-group">
          <input
            id="name"
            type="email"
            enterkeyhint="next"
            placeholder="Adres E-mail"
            name="email"
            v-model="email"
            class="form-control"
          />
        </div>
        <br />
        <div class="form-group">
          <input
            id="name"
            type="tel"
            enterkeyhint="next"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
            placeholder="Nr telefonu"
            name="tel"
            v-model="tel"
            class="form-control"
          />
        </div>
      </form>
    </div>
  </div>
  <div class="paneladd">
    <button class="button" @click="onpost">Dodaj Ogłoszenie</button>
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
