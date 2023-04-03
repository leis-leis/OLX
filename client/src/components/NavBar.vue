<script setup>
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

const logout = () => {
  userStore.logout();
};
</script>

<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark"
    style="background-color: #303f9f;"
  >
    <div class="container-fluid" style=" float: right;" >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto">
          <li>
            <router-link class="navbarbrand" to="/">Aktunio</router-link>
          </li>
          <li class="nav-item" v-if="userStore.isLoggedIn">
            <a class="nav-link" href="/userpanel"><Label>TWOJE KONTO</Label></a>
          </li>
          <li class="nav-item" v-if="!userStore.isLoggedIn">
            <a class="nav-link" href="/register">ZAREJESTRUJ</a>
          </li>
          <li class="nav-item" v-if="!userStore.isLoggedIn">
            <a class="nav-link" href="/login"><Label>LOGOWANIE</Label></a>
          </li>
          <li class="nav-item" v-if="userStore.isLoggedIn">
            <a class="nav-link" @click="logout" href="/login"
              ><Label>WYLOGUJ</Label></a
            >
          </li>
          <li class="nav-item" v-if="userStore.isLoggedIn">
            <a class="nav-link" href="/adminpanel"
              ><Label>Admin panel</Label></a
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style></style>
