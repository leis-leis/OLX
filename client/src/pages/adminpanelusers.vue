<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import UserSearchBar from "../components/UserSearchBar.vue";

const router = useRouter();
const route = useRoute();

const users = ref("");
const sortBy = ref("");



onMounted(async () => {
  const res = await axios.get(
    "http://localhost:3000/api/users/adminpanelusers",
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  users.value = res.data.users;
});
async function onpost(User) {
  var checked = document.getElementById(User._id).checked;
  const res = await axios.post(
    "http://localhost:3000/api/users/adminpanelusers",
    { blokt: checked, id: User._id },
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  // console.log(User._id);
  // console.log(User.Blocked);
  // console.log(checked);
  if (res.data.msg == "success") {
    if (checked) {
      alert("Użytkownik " + User.Name + " został zablokowany");
    } else {
      alert("Użytkownik " + User.Name + " został odblokowany");
    }
  } else {
    alert("Coś się popsuło");
  }
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
    <div style="display: flex; flex-direction: column" class="offcanvas-body">
      <router-link class="buttonsidebar" to="/adminpanel" tag="button"
        >Kategorie</router-link
      >
      <router-link class="buttonsidebar" to="/adminpanelusers" tag="button"
        >Users</router-link
      >
    </div>
  </div>
  <h1>Users</h1>

  <UserSearchBar />

  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Surname</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Admin</th>
          <th scope="col">IsBlocked?</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="User in users">
          <td scope="row">{{ User.Name }}</td>
          <td>{{ User.Surname }}</td>
          <td>{{ User.Email }}</td>
          <td>{{ User.Phone }}</td>
          <td id="admin">{{ User.IsAdmin }}</td>
          <td id="11">
            <input
              v-if="!User.IsAdmin"
              :checked="User.Blocked"
              type="checkbox"
              :id="User._id"
              @click="onpost(User)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

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

.buttonsidebar {
  margin-top: 20px;
  width: 100px;
  height: 50px;
  background-color: #3f51b5;
  color: #fff;
  border: none;
  font-size: 16px;
  cursor: pointer;
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

.but {
  width: auto;
  height: 100px;
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
</style>
