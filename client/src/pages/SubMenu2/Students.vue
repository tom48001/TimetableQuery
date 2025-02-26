<template>
    <div>
      <h1>學生列表</h1>
      <ul>
        <li v-for="student in students" :key="student.student_id">
          <strong>{{ student.student_name }}</strong> ({{ student.class_id }})  
          <br>
          選修科目: {{ student.elective_subject_1 }}, {{ student.elective_subject_2 }}, {{ student.elective_subject_3 }}
          <br>
          <button @click="nominateStudent(student.student_id)">提名學生</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        students: []
      };
    },
    async created() {
      try {
        // Fetch students from Node.js API
        const response = await axios.get('http://localhost:3000/api/students');
        this.students = response.data;
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    },
    methods: {
      async nominateStudent(student_id) {
        try {
          await axios.post('http://localhost:3000/api/nominate', { student_id });
          alert('學生已成功提名！');
        } catch (error) {
          console.error('提名失敗:', error);
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
  </style>
  