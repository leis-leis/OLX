<script setup>
import { useUserStore } from "../stores/user";
import {ref} from "vue";
const userStore = useUserStore();

const username = ref("");
const name = ref("");
const surname = ref("");
const email = ref("");
const mobile = ref("");
const password = ref("");
const confirm_password = ref("");

const register = () => {
  userStore.register(
    username.value,
    password.value,
    confirm_password.value,
    name.value,
    surname.value,
    email.value,
    mobile.value
  );
  router.push('/')
};
</script>

<template>
  <div>
    <div class="row">
      <div class="card mx-auto p-0">
        <div class="card-header text-white">
          <h1>REJESTRACJA</h1>
        </div>
        <div class="form card-body">
          <form @submit.prevent="registerUser">
            <div class="form-group">
              <label for="login">Login</label>
              <input
                id="login"
                type="text"
                placeholder="Login"
                name="Login"
                v-model="username"
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
              <label for="confirm_password">Powtórz hasło</label>
              <input
                type="password"
                class="form-control"
                placeholder="Powtórz hasło"
                name="PassConfirm"
                id="confirm_password"
                v-model="confirm_password"
              />
            </div>
            <div class="form-group">
              <label for="name">Imię</label>
              <input
                id="name"
                type="text"
                placeholder="Imię"
                name="Name"
                v-model="name"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="surname">Nazwisko</label>
              <input
                id="surname"
                type="text"
                placeholder="Nazwisko"
                name="Surname"
                v-model="surname"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                id="email"
                type="text"
                placeholder="Email"
                name="Email"
                v-model="email"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="phone">Numer telefonu</label>
              <input
                id="phone"
                type="text"
                placeholder="Numer telefonu"
                name="Phone"
                v-model="mobile"
                class="form-control"
              />
            </div>
            <br />
            <button class="submit">CAPTHA</button><br /><br />
            <router-link to="/"  class="btn btn-primary" @click="register">
              ZAREJESTRUJ
            </router-link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <br>
            <br>
            <router-link to="/login" class="card-link tor"
              >Masz już konto?</router-link
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.card-header{
    background-color: #303F9F;
}

.btn-primary{
    background-color: #757575;
    margin-left: 40px;
}

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

.form-group {
padding: 3px;
}

.buttonsy {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    height: 50px;
    float: left;

}

.buttonsy .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    width: 220px;
    cursor: pointer;
}

#chbox:checked~.SignUp_form {
    display: flex;
}

#chbox:checked~.login_form {
    display: none;
}

#chbox:checked+.layer {
    left: 50%;
}

#chbox:checked~.layer2 {
    left: 50%;
}

#chbox {
    display: none;
}

.layer {
    content: '';
    height: 50px;
    width: 50%;
    background-color: transparent;
    float: right;
    position: absolute;
    left: 0px;
    top: 0px;
}

.layer2 {
    content: '';
    height: 50px;
    z-index: -1;
    width: 50%;
    background-color: #303F9F;
    float: right;
    position: absolute;
    left: 0px;
    top: 0px;
}

.form .login_form {
    display: flex;
    flex-direction: column;
}

.form .login_form input {
    border: none;
    font-family: EXO;
    border-bottom: 1px solid black;
    outline: none;
    padding: 5px;
}

.tag {
    text-align: center;
    font-size: 20px;
    margin: 7px 0px 7px 0px;
}

.submit {
    width: 210px;
    border: none;
    font-family: EXO;
    padding: 7px;
    border-radius: 5px;
    background-color: #BDBDBD;
    outline: none;
    cursor: pointer;
}

.form .SignUp_form {
    display: none;
    flex-direction: column;
}

.form .SignUp_form input {
    border: none;
    border-bottom: 1px solid black;
    outline: none;
    padding: 5px;
    margin: 0px;
}

.checkbox {
    float: right;
    width: 30px;
    height: 30px;
}
.tor{
        margin-left: 20%;
        margin-top: 15%;
        float: center;
      }

.row {
    background: #C5CAE9;
}
    
</style>
