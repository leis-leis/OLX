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
  >
    <i class="fa fa-bars"></i>
  </button>

  <div
    class="offcanvas offcanvas-start"
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
        >Użytkownicy</router-link
      >
    </div>
  </div>
  <h1>Użytkownicy</h1>

  <div class="but">
    <br />
    <button class="button">Zapisz</button>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

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
