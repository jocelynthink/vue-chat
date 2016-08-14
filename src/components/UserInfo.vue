<template>
    <div class="user-info">
        <!-- 未登录 -->
        <ul class="login-no" v-if="!loginname">
            <li class="login" @click="goEnter"><a >登录</a></li>
        </ul>
        <!-- 已登录 -->
        <div class="login-yes" v-if="loginname" @click="goUser">
            <div class="avertar"><img v-if="avatar_url" :src="avatar_url"></div>
            <div class="info">
                <p v-if="loginname" v-text="loginname"></p>
            </div>
        </div>
    </div>
</template>
<script type="es6">
    export default {
        replace:true,
        data () {
            return {
                loginname: localStorage.loginname || "",
                avatar_url: localStorage.avatar_url || ""
            }
        },
        methods:{
            goEnter (){
                var link = '/login?redirect='+ encodeURIComponent(this.$route.path);
                this.$route.router.go(link);
            },
            goUser (){
                this.$route.router.go({name:'user',params:{loginname:localStorage.loginname}});
            }
        }
    }
</script>

<style>
.user-info {
    padding: 30px;
    font-size: 30px;
    color: #313131;
}
.user-info li {
    list-style-type: none;
}
</style>
