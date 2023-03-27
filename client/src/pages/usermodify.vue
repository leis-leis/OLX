<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useFileStore } from "../stores/files";

const fileStore = useFileStore();
const userStore = useUserStore();
const name = ref("");
const surname = ref("");
const password = ref("");
const confirm_password = ref("");

onMounted(async () => {
  const res = await axios.get("http://localhost:3000/api/users/userpanel", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  name.value = res.data.user.Name;
  surname.value = res.data.user.Surname;
});

function onpost() {

    const files = fileStore.files;
    console.log(files[0]);
    const formData = new FormData();
    formData.append("Name", name.value)
    formData.append("Surname", surname.value)
    formData.append("Password", password.value)
    files.forEach((file) => {
        formData.append("File", file);
    });
    
    formData.forEach((val , key , formData)  => {console.log(key + ": " + val)})

    const posto = axios.post(
    "http://localhost:3000/api/users/usermodify",
    formData,
    {
      headers: {
        Authorization: userStore.token,
      },
    }
  );
}

function check() {
  if(name.value=="" || surname.value==""){
    console.log("Podaj poprawne wartosci");
  }else
  if (password.value == confirm_password.value) {
    onpost();
  } else {
    console.log("Hasła sie nie zgadzają!");
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
  <div>
    <div class="row">
      <div class="card mx-auto p-0">
        <div class="card-header text-white">
          <router-link to="/userpanel" style="color: wheat;">Wstecz</router-link>
          <h1>EDYTUJ KONTO</h1>
        </div>
        <div class="form card-body">
          <form>
            <div class="form-group">
              <label for="username">Imie</label>
              <input
                id="name"
                type="text"
                placeholder="Name"
                name="Name"
                v-model="name"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="username">Nazwisko</label>
              <input
                id="surname"
                type="text"
                placeholder="Surname"
                name="Surname"
                v-model="surname"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="password">Hasło</label>
              <input
                type="password"
                class="form-control"
                placeholder="Hasło"
                name="Pass"
                id="password"
                v-model="password"
              />
            </div>
            <div class="form-group">
              <label for="password">Potwierdź Hasło</label>
              <input
                type="password"
                class="form-control"
                placeholder="Potwierdź Hasło"
                name="confirm_pass"
                id="confirm_password"
                v-model="confirm_password"
              />
            </div>
            <Dropfile />
            <br />
          </form>
          <button class="button" @click="check">ZAPISZ</button>
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

.button {
    width: 100px;
    height: 50px;
    background-color: #3F51B5;
    color: #fff;
    border: none;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  }

</style>
