<template>
    <div class="search">
    <input type="text" v-model="input" placeholder="" style="margin-top: 35px;">
    <select name="category" id="category">
    <option value="Kategorie">Kategorie</option>
    <option value="Motoryzacja">Motoryzacja</option>
    <option value="Nieruchomości">Nieruchomości</option>
    <option value="Antyki">Antyki</option>
    <option value="Elektronika">Elektronika</option>
    <option value="Zwierzęta">Zwierzęta</option>
    <option value="Sport i Hobby">Sport i Hobby</option>
    <option value="Dla dzieci">Dla dzieci</option>
    <option value="Muzyka i edukacja">Muzyka i edukacja</option>
    </select>
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
    <button style='font-size:16px'>Szukaj</button>
    </div>
</template>
  
  <script>
  export default {
  
  }
  
  </script>
  
  <style>

.search{
    width: auto;
    height: 100px;
    text-align: center;
    background-color: #BDBDBD;
}


 </style>