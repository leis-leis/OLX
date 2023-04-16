<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter, useRoute } from 'vue-router'

const searchParam = ref("");

</script>

<template>
    <div class="search">
    <input type="text" v-model="searchParam" placeholder="" style="margin-top: 35px;">
    <select name="Lokalizacja" id="lokalizacja">
    <option value="Lokalizacja">Lokalizacja</option>
    <option value="dolnoslaskie">Dolnośląskie</option>
    <option value="kujawsko-pomorskie">Kujawsko-pomorskie</option>
    <option value="lubelskie">Lubelskie</option>
    <option value="lubuskie">Lubuskie</option>
    <option value="lodzkie">Łódzkie</option>
    <option value="malopolskie">Małopolskie</option>
    <option value="mazowieckie">Mazowieckie</option>
    <option value="opolskie">Opolskie</option>
    <option value="podkarpackie">Podkarpackie</option>
    <option value="podlaskie">Podlaskie</option>
    <option value="pomorskie">Pomorskie</option>
     <option value="slaskie">Śląskie</option>
    <option value="swietokrzyskie">Świętokrzyskie</option>
    <option value="warminsko-mazurskie">Warmińsko-mazurskie</option>
    <option value="wielkopolskie">Wielkopolskie</option>
    <option value="zachodniopomorskie">Zachodniopomorskie</option>
    </select>
    <router-link class="buttoniks" :to="{name: `foundoffers`, params: {searchParam: searchParam }}" tag="button">Szukaj</router-link>
    </div>
</template>
    
  <style>

.search{
    width: auto;
    height: 100px;
    text-align: center;
    background-color: #BDBDBD;
}


 </style>