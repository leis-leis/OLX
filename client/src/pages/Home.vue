<template>
  <SearchBar />
  <link
    rel="stylesheet"
    href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
    integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
    crossorigin="anonymous"
  />
  <h1>Kategorie główne</h1>
  <div class="button-container">
    <div class="row">
      <div class="col-sm">
        <button class="button"><i class="fa fa-car fa-4x"></i></button>
        <div class="text">Motoryzacja</div>
      </div>
      <div class="col-sm">
        <button class="button"><i class="fa fa-key fa-4x"></i></button>
        <div class="text">Nieruchomości</div>
      </div>
      <div class="col-sm">
        <button class="button"><i class="fa fa-briefcase fa-4x"></i></button>
        <div class="text">Antyki</div>
      </div>
      <div class="col-sm">
        <button class="button"><i class="fa fa-home fa-4x"></i></button>
        <div class="text">Dom i Ogród</div>
      </div>
      <div class="col-sm">
        <button class="button"><i class="fa fa-mobile fa-4x"></i></button>
        <div class="text">Elektronika</div>
      </div>
    </div>
  </div>
  <br />
  <div class="button-container">
    <div class="row">
      <div class="col-sm">
        <button class="button"><i class="fas fa-dog fa-4x"></i></button>
        <div class="text">Zwierzęta</div>
      </div>
      <div class="col-sm">
        <button class="button"><i class="fa fa-futbol fa-4x"></i></button>
        <div class="text">Sport i Hobby</div>
      </div>
      <div class="col-sm">
        <button class="button"><i class="fa fa-child fa-4x"></i></button>
        <div class="text">Dla dzieci</div>
      </div>
      <div class="col-sm">
        <button class="button"><i class="fa fa-music fa-4x"></i></button>
        <div class="text">Muzyka i edukacja</div>
      </div>
    </div>
  </div>
  
<div class="">
  <router-link to="/offers">Ostatnio Dodane</router-link>
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
</style>
