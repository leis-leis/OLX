<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter, useRoute } from 'vue-router'

const searchParam = ref("");

</script>

<template>
  <div class="container mt-5">
<div class="row">
    <div class="col-lg-12 card-margin">
        <div class="card search-form">
            <div class="card-body p-0">
                <form id="search-form">
                    <div class="row">
                        <div class="col-12">
                            <div class="row no-gutters">
                                <div class="col-lg-8 col-md-6 col-sm-12 p-0">
                                    <input type="text" v-model="searchParam" placeholder="Search..." class="form-control" id="search" name="search">
                                </div>
                                <div class="col-lg-1  p-0">
                                  <router-link class="btn btn-base" :to="{name: `adminpanelusers`, params: {searchParam: searchParam }}" tag="button">Szukaj</router-link>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>

                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</div>
    

</template>
    
  <style>

.search{
    width: auto;
    height: 100px;
    text-align: center;
    background-color: #BDBDBD;
}

.buttoniks {
  background-color: #3F51B5;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
  font-family: Exo;
  text-decoration: none;
  border-radius: 5px;
}

.buttoniks:hover {
  background-color: #FF5722;
}



 </style>