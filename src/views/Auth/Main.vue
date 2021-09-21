<template>
    <div class="limiter">
        <div class="container-login100">
            <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MainAuth',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }
</script>

<style scoped>
    .limiter {
        width: 100%;
        margin: 0 auto;
        background: rgb(2,0,36);
        background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(108,9,121,1) 34%, rgba(0,212,255,1) 100%);
        overflow: hidden;
    }
    .container-login100 {
        width: 100%;  
        min-height: 100vh;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding: 15px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
    .wrap-login100 {
        width: 500px;
        background: #fff;
        border-radius: 10px;
        overflow: hidden;
    }

    .p-l-55 {padding-left: 55px;}
    .p-r-55 {padding-right: 55px;}
    .p-t-65 {padding-top: 65px;}
    .p-b-54 {padding-bottom: 54px;}
</style>