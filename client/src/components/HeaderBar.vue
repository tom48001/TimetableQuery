<template>
  <header class="header">
    <h1>聖公會聖馬利亞堂莫慶堯中學 行政管理系統</h1>
    <hr />
        用戶資料
    <hr />
    <div class="menu">
      <!-- 選單1 (Hover) -->
      <span
          class="main-menu"
          @mouseover="switchMenu('SubMenu1', $event)"
          @mouseout="hideMenu($event)"
      >
          時間表應用
          <span style="font-size: 9px;">&#9660;</span>
          <ul id="SubMenu1" class="sub-menu" style="display: none;">
          <li><a href="" target="_blank">老師上課與空堂時間表</a></li>
          <li><a href="" target="_blank">觀課選堂</a></li>
          <li><a href="" target="_blank">調課搜尋</a></li>
          <li><a href="" target="_blank">空堂老師 / 課堂總表</a></li>
          <li><a href="" target="_blank">各班上課時間表</a></li>
          <li><a href="" target="_blank">各房間上課時間表</a></li>
          <li><a href="" target="_blank">高中選修名單</a></li>
          <li><a href="" target="_blank">學生上課時間表</a></li>
          </ul>
      </span>

      <!-- 選單2 (Hover) -->
      <span
          class="main-menu"
          @mouseover="switchMenu('SubMenu2', $event)"
          @mouseout="hideMenu($event)"
      >
          提名學生
          <span style="font-size: 9px;">&#9660;</span>
          <ul id="SubMenu2" class="sub-menu" style="display: none;">
              <li><a href="" target="_blank">最佳學習態度提名</a></li>
              <li><a href="" target="_blank">最佳學習態度結果</a></li>
              <li><a href="" target="_blank">提名</a></li>
              <li><a href="" target="_blank">結果</a></li>
              <li><a href="" target="_blank">提名</a></li>
              <li><a href="" target="_blank">結果</a></li>
              <li><a href="" target="_blank">提名</a></li>
              <li><a href="" target="_blank">結果</a></li>
          </ul>
      </span>
    </div>
  </header>
</template>
<script>
export default {
  name: 'HeaderBar',
  data () {
    return {
      visibleMenu: ''
    };
  },
  methods: {
    switchMenu (subMenuId, event) {
      // 取得對應的 <ul> 元素
      const subMenuEl = this.$el.querySelector(`#${subMenuId}`);
      if (!subMenuEl) return;
      // 如果目前是隱藏狀態，則顯示子選單
      if (subMenuEl.style.display === 'none') {
        // 讓子選單的最小寬度與主選單相同 (僅為了美觀)
        subMenuEl.style.minWidth = `${event.currentTarget.clientWidth}px`;
        subMenuEl.style.display = 'block';
        // 先隱藏之前的子選單
        this.hideMenu();
        // 記錄目前顯示的子選單
        this.visibleMenu = subMenuId;
      } else {
        // 隱藏子選單
        if (event.type !== 'mouseover' || this.visibleMenu !== subMenuId) {
          subMenuEl.style.display = 'none';
          this.visibleMenu = '';
        }
      }
    },
    hideMenu () {
      // 如果有記錄的子選單，就把它隱藏
      if (this.visibleMenu) {
        const oldMenuEl = this.$el.querySelector(`#${this.visibleMenu}`);
        if (oldMenuEl) {
          oldMenuEl.style.display = 'none';
        }
      }
      this.visibleMenu = '';
    }
  }
};
</script>
<style scoped>
  /* 主標題樣式 */
  h1 {
    color: #000;
  }
  .menu{
    display: flex;
    justify-content: center;
    background-color: #666;
  }
  /* 主選單樣式 */
  .main-menu {
    color: #fff;
    background-color: #666;
    padding: 5px;
    margin: 0;
    cursor: pointer;
    display: inline-block;
  }
  .main-menu:hover {
    background-color: #333;
  }
  /* 下拉清單樣式 */
  .sub-menu {
    color: #00f;
    background-color: #ccc;
    margin: 5px -5px;
    padding: 0;
    list-style-type: none;
    position: absolute;
    display: none; /* 預設隱藏 */
  }
  .sub-menu li {
    padding: 3px 5px;
    text-align: left;
  }
  .sub-menu li:hover {
    color: #fff;
    background-color: #00f;
  }
  .sub-menu a {
    text-align: left;
    display: block;
    text-decoration: none;
    color: #00f;
  }
  .sub-menu a:hover {
    color: #fff;
    background-color: #00f;
    text-decoration: none;
  }
</style>
