<template>
  <div class="login">
    <h1>行政管理系統</h1>

    <!--  手動登入 -->
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">帳號</label>
        <input v-model="email" type="text" id="email" placeholder="請輸入帳號">
      </div>
      <div>
        <label for="password">密碼</label>
        <input v-model="password" type="password" id="password" placeholder="請輸入密碼">
      </div>
      <button type="submit">登入</button>
    </form>

    <!--  Google One Tap 登入 -->
    <div id="g_id_onload"
         data-client_id="925458478394-0f4n5ahjeq6qqciipgpjh9i2irr61uam.apps.googleusercontent.com"
         data-login_uri="http://localhost:3000/api/google-login"
         data-auto_prompt="false">
    </div>

    <div class="g_id_signin"
         data-type="standard"
         data-size="large"
         data-theme="outline"
         data-text="sign_in_with"
         data-shape="rectangular"
         data-logo_alignment="left">
    </div>
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
        console.log('登入成功:', response.data);
        if (response.data.user) {
          let cleanedUser = {
            ...response.data.user,
            role: response.data.user.role ? response.data.user.role.trim().toLowerCase() : 'teacher'
          };
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(cleanedUser)); // 確保存入完整的用戶資訊
          console.log('儲存前的用戶資料:', cleanedUser);
          console.log('localStorage 儲存的 user:', JSON.parse(localStorage.getItem('user')));
          this.$router.push('/home');
        } else {
          alert('登入失敗，無法獲取用戶資訊');
        }
      } catch (error) {
        console.error('登入失敗:', error);
        alert('登入失敗，請檢查帳號密碼！');
      }
    }
  }
};
</script>

<style>
.google-login {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  width: 250px;
  margin: auto;
}
.google-login img {
  width: 20px;
  margin-right: 10px;
}

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
