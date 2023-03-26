<script>
import { useReCaptcha } from 'vue-recaptcha-v3'

export default {
  setup() {
    const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()

    const recaptcha = async () => {
      await recaptchaLoaded()
      const token = await executeRecaptcha('login')
      console.log({ token })
    }

    return {
      recaptcha
    }
  },
}
</script>

<template>
    <button class="submit" @click="recaptcha">CAPTHA</button><br /><br />
  </template>

  <style>
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
  </style>
  
