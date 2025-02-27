<template>
    <div class="container">
      <h1>管理老師帳戶</h1>
      <!-- 新增老師表單 -->
      <form @submit.prevent="addTeacher">
        <input v-model="newTeacher.name" placeholder="老師姓名" required />
        <input v-model="newTeacher.email" placeholder="老師Email" required />
        <input v-model="newTeacher.password" placeholder="密碼" type="password" required />
        <button type="submit">新增老師</button>
      </form>
      <!-- 老師列表 -->
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>Email</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="teacher in teachers" :key="teacher.user_id">
            <td>{{ teacher.user_id }}</td>
            <td>{{ teacher.user_name }}</td>
            <td>{{ teacher.email }}</td>
            <td>
              <button @click="editTeacher(teacher)">編輯</button>
              <button @click="deleteTeacher(teacher.user_id)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 編輯老師彈出視窗 -->
      <div v-if="editingTeacher">
        <h2>編輯老師</h2>
        <form @submit.prevent="updateTeacher">
          <input v-model="editingTeacher.user_name" placeholder="老師姓名" required />
          <input v-model="editingTeacher.email" placeholder="老師Email" required />
          <input v-model="editingTeacher.newPassword" placeholder="新密碼" type="password" />
          <button type="submit">更新</button>
          <button @click="editingTeacher = null">取消</button>
        </form>
      </div>
    </div>
  </template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      teachers: [],
      newTeacher: { name: '', email: '', password: '' },
      editingTeacher: null
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'manager') {
      alert('未授權訪問，請使用管理員帳戶登入');
      this.$router.push('/home');
    }
  },
  methods: {
    async fetchTeachers() {
      try {
        const response = await axios.get('http://localhost:3000/api/teachers');
        this.teachers = response.data.filter(teacher => teacher.role === 'teacher'); // 確保只獲取老師
      } catch (error) {
        console.error('無法獲取老師列表', error);
      }
    },
    async addTeacher() {
      try {
        await axios.post('http://localhost:3000/api/teachers', {
          user_name: this.newTeacher.name, // 改為 user_name
          email: this.newTeacher.email,
          password: this.newTeacher.password
        });
        alert('老師新增成功！');
        this.newTeacher = { name: '', email: '', password: '' }; // 清空輸入
        this.fetchTeachers();
      } catch (error) {
        console.error('新增老師失敗', error);
      }
    },
    editTeacher(teacher) {
      this.editingTeacher = { ...teacher, newPassword: '' };
    },
    async updateTeacher() {
      try {
        const payload = {
          user_name: this.editingTeacher.user_name,
          email: this.editingTeacher.email
        };
        if (this.editingTeacher.newPassword) {
          payload.password = this.editingTeacher.newPassword; // 只有當用戶輸入新密碼才更新
        }
        await axios.put(`http://localhost:3000/api/teachers/${this.editingTeacher.user_id}`, payload);
        alert('老師更新成功！');
        this.fetchTeachers();
        this.editingTeacher = null;
      } catch (error) {
        console.error('更新老師失敗', error);
      }
    },
    async deleteTeacher(userId) { // 改成 userId
      if (confirm('確定要刪除這位老師嗎？')) {
        try {
          await axios.delete(`http://localhost:3000/api/teachers/${userId}`);
          alert('老師刪除成功！');
          this.fetchTeachers();
        } catch (error) {
          console.error('刪除老師失敗', error);
        }
      }
    }
  },
  mounted() {
    this.fetchTeachers();
  }
};
</script>
<style>
  .container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  </style>
