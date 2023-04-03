<script setup>
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

const logout = () => {
  userStore.logout();
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #303F9F;">
    <router-link class="navbarbrand" to="/">Aktunio</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto">
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
            ><Label>WYLOGUJ</Label></a>
        </li>
        <li class="nav-item" v-if="userStore.isLoggedIn">
          <a class="nav-link" href="/adminpanel"
            ><Label>Admin panel</Label></a>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style>

</style>
