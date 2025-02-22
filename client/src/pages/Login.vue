<template>
  <div class="login">
    <h1>聖公會聖馬利亞堂莫慶堯中學<br>行政管理系統</h1>
    <form>
      <div class="form-group">
        <label for="account">帳號</label>
        <input type="text" id="account" name="account" placeholder="請輸入帳號">
      </div>
      <div class="form-group">
        <label for="password">密碼</label>
        <input type="password" id="password" name="password" placeholder="請輸入密碼">
      </div>
      <button class="login" type="submit">登入</button>
    </form>
  </div>
</template>

<script>

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
