<script setup>
import { useUserStore } from "../stores/user";
import {ref} from "vue";
import router from "@/router";
import Captcha from "../components/Captcha.vue";


const userStore = useUserStore();

const username = ref("");
const password = ref("");

const login = () => {
  userStore.login(username.value, password.value);
  router.push('/')
};
</script>



<template>
  <div>
    <div class="row">
      <div class="card mx-auto p-0">
        <div class="card-header text-white">
          <h1>LOGOWANIE</h1>
        </div>
        <div class="form card-body">
          <form @submit.prevent="loginUser">
            <div class="form-group">
              <label for="username">Login</label>
              <input
                id="username"
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
            <br />
            <Captcha />
            <router-link to="/"  class="btn btn-primary" @click="login">
              ZALOGUJ
            </router-link>
            <br>
            <br>
            <router-link to="/login" class="card-link tor"
              >Zapomniałeś hasła?
            </router-link>
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
    width: 100px;
    background-color: #757575;
    margin-left: 50px;
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

      .buttonsy{
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: space-around;
        height: 50px;
        float: left;
  
      }

      .buttonsy .btn{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        width: 100%;
        cursor: pointer;
      }

      #chbox:checked ~ .SignUp_form{
        display: flex;
      }
      
      #chbox:checked ~ .login_form{
        display: none;
      }
      
      #chbox:checked + .layer{
        left: 50%;
      }
      #chbox:checked ~ .layer2{
        left: 50%;
      }
      #chbox{
        display: none;
      }

      .layer{
        content: '';
        height: 50px;
        width: 50%;
        background-color: transparent;
        float: right;
        position: absolute;
        left: 0px;
        top: 0px;
      }
      .layer2{
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

      .form .login_form{
          display: flex;
          flex-direction: column;
        }
      
        .form .login_form input{
          border: none;
          font-family: EXO;
          border-bottom: 1px solid black;
          outline: none;
          padding: 5px;
        }
      
        .tag{
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

        .form .SignUp_form{
        display: none;
        flex-direction: column;
      }
      
      .form .SignUp_form input{
        border: none;
        border-bottom: 1px solid black;
        outline: none;
        padding: 5px;
        margin: 0px;
      }

      .checkbox{
        float: right;
        width: 30px;
        height: 30px;
      }

      .tor{
        margin-left: 15%;
        margin-top: 30%;
        float: center;
      }
      
</style>