<script>

</script>

<template>
     
<body>
    <br>
    <br>
    <br>
    <div class="form">
        
		<div class="buttonsy">
			<label for="chbox" class="login btn">ZALOGUJ SIE</label>
			<label for="chbox" class="SignUp btn">ZAREJESTRUJ SIE</label>
		</div>

		<input type="checkbox" id="chbox">	
		<div class="layer"></div>
		<div class="layer2"></div>
		<div class="login_form">
			<br><input type="text" placeholder="Email"><br>
			<input type="password" placeholder="Hasło"><br>
            <button class="submit" >CAPTHA</button><br>
            <button class="submit" onclick="MAIN()">GOTOWE</button><br>
			<button class="submit">ZAPOMNIALEM HASŁA</button>
		</div>
		<div class="SignUp_form">
			<br><input type="text" placeholder="Login"><br>
			<input type="password" placeholder="Password"><br>
			<input type="text" placeholder="Name"><br>
            <input type="text" placeholder="Surname"><br>
            <input type="email" placeholder="Email"><br>
			<input type="password" placeholder="Phone"><br>
            <button class="submit" >CAPTHA</button><br>
			<button class="submit" onclick="MAIN1()">GOTOWE</button>
		</div>
	</div>
</body>
</template>

<style scoped>
.form{
        margin-left: 520px;
        height: auto;
        width: 400px;
        padding: 0px 0px 25px 0px;
        border: 2px solid #303F9F;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        font-family: Exo;
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

        .submit{
          width: 175px;
          border: none;
          font-family:  EXO;
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
      
</style>
