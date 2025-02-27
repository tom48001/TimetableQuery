import Vue from "vue";
import Router from "vue-router";
import EditTeacher from "@/pages/Submenu3.vue";
import Home from "@/pages/Home.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/editTeacher",
      name: "editTeacher",
      component: EditTeacher,
      meta: { requiresAdmin: true }, // 需要管理員權限
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: { requiresAuth: true }, // 需要登入
    },
  ],
});

// 🔥 **全局守衛：檢查是否為管理員**
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user")); // 取得用戶資訊

  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    if (!user || user.role !== "manager") {
      alert("⚠️ 你沒有權限進入此頁面！");
      return next("/home"); // 非管理員導向首頁
    }
  }

  next();
});

export default router;
  