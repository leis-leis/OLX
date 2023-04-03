<template>
    <div class="time">
        <time class="time__date">{{ data.date }}</time>
        <time class="time__hour">{{ data.time}}</time>
    </div>
    </template>
    <script  setup>
    import { 
        reactive, 
        onMounted,
    } from 'vue';
    
    const data = reactive({
        date: '',
        time: ''
    });
    
    
    // const today = new Date();
    const getCurrentTime = () => {
      const today = new Date();
        const hours = today.getHours();
        const minutes = today.getMinutes();
        const seconds = today.getSeconds();
    
        const zeroPadding = (num) => {
            if (num < 10) {
                return `0${num}`
            } else {
                return num;
            }
        };
        //   console.log(data.time, `${zeroPadding(hours)}:${zeroPadding(minutes)}:${zeroPadding(seconds)}`)
        data.time = `${zeroPadding(hours)}:${zeroPadding(minutes)}:${zeroPadding(seconds)}`;
    }
    
    onMounted(() => {
        setInterval(getCurrentTime, 1000);
    });
    </script>