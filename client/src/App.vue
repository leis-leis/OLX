<template>
  <NavBar/>
  <RouterView/>
</template>

<script scoped>
import NavBar from "@/components/NavBar.vue";
export default {
  components: {
    NavBar
  },
methods: {
    handleClick() {
      this.$router.push('/login-page');
    }
  }
}

</script>

<style>
</style>

<!-- <style scoped>


.logo {
  display: block;
  margin: 0 auto 2rem;
}

.loginicon {
  padding: 15px;
  margin-left:1020px;
  margin-top:-160px;
}

@media (min-width: 1024px) {
  header {
  padding: 20px;
  text-align: center;
  background: #303F9F;
  color: white;
}

h1 {
  padding: 60px;
  margin: 0;
  text-align: center;
  background: #C5CAE9;
  color: white;
}

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

.container {
  position: relative;
}

.container button {
  position: absolute;
  bottom: 20%;
  right: 0;
  font-size: 20px;
  transform: translate(0, -50%);
  padding: 10px 20px;
  background-color: #ffffff00;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style> -->
