<template>
  <div class="login">
    <h1>聖公會聖馬利亞堂莫慶堯中學<br>行政管理系統</h1>

    <!-- 手動帳號密碼登入 -->
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="account">帳號</label>
        <input type="text" id="account" v-model="account" placeholder="請輸入帳號">
      </div>
      <div class="form-group">
        <label for="password">密碼</label>
        <input type="password" id="password" v-model="password" placeholder="請輸入密碼">
      </div>
      <button class="login" type="submit">登入</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:3000/api/login', {
          email: this.email,
          password: this.password
        });

        if (response.data.success) {
          alert('登入成功');
          localStorage.setItem('user', JSON.stringify(response.data.user));
          this.$router.push('/home');
        } else {
          alert('登入失敗: ' + response.data.error);
        }
      } catch (error) {
        console.error('登入錯誤:', error);
        alert('登入失敗，請檢查帳號密碼');
      }
    }
  }
};
</script>
<style>
h1 {
  text-align: center;
  margin-top: 50px;
}

.form-group {
  text-align: center;
}

.login {
  text-align: center;
  margin-top: 50px;
}
</style>
