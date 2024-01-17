<template>
  <div class="login">
    <h2>登录</h2>
    <form @submit.prevent="submitForm">
      <div class="input-group">
        <label for="username">用户名</label>
        <input id="username" type="text" v-model="username" />
      </div>

      <div class="input-group">
        <label for="password">密码</label>
        <input id="password" type="password" v-model="password" />
      </div>

      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script lang="ts">
import router from "@/router"
import axios from "axios"
import { defineComponent, ref } from "vue"

import { jwtDecode } from "jwt-decode"

export default defineComponent({
  setup() {
    const token = localStorage.getItem("token")
    console.log("token", token)

    if (!token) {
      console.log("no token")
    } else {
      const decodedToken: any = jwtDecode(token as string)
      console.log("decodedToken", decodedToken)
      const currentTime = Date.now().valueOf() / 1000
      if (decodedToken.exp < currentTime) {
        console.log("token expired")
        localStorage.removeItem("token")
      } else {
        console.log("token not expired")
        router.push("/league-table")
      }
    }

    const username = ref("")
    const password = ref("")

    const submitForm = async () => {
      console.log(username.value, password.value)

      try {
        const res = await axios.post("http://localhost:8081/login", {
          username: username.value,
          password: password.value,
        })
        console.log(res)
        console.log("token:", res.data.token)

        localStorage.setItem("token", res.data.token)

        // 跳转到首页
        window.location.href = "/league-table"

        // 设置请求头
        axios.defaults.headers.common["Authorization"] = res.data.token
      } catch (error) {
        console.log(error)
      }
    }

    return {
      username,
      password,
      submitForm,
    }
  },
})
</script>

<style scoped>
.login {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
