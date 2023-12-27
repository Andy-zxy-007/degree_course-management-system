<template>
  <div class="box">
    <div class="left">
      <el-row class="tac">
        <el-col :span="24" style="height:100%">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            @select="select"
            @router="a"
            style="height:100vh"
          >
            <h1>Degree Course</h1>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>Degree & Course </span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/course/list">course</el-menu-item>
                <el-menu-item index="/degree/list">degree</el-menu-item>
                <el-menu-item index="/study_plan/">study_plan</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">users</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/user/list">users</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </div>

    <div class="right">
      <div class="r_top">
        <el-row class="app_name">
          <el-col :span="8">
            Degree Course Management
          </el-col>

          <el-col :span="6" :offset="10" class="top_tools"><span><a :href="'http://192.168.56.3:7787'">Homepage</a></span><span><i class="el-icon-location"></i><a href="#" @click="logout()">Logout</a></span></el-col>
        </el-row>
      </div>

      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      a: true
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    select(index, indexPath) {
      console.log(indexPath);
      this.$router.push(indexPath[1]);
    },

    logout(){
      this.$router.push("/")
    }

  }
};
</script>


<style>
* {
  padding: 0;
  margin: 0%;
}
.left {
  width: 240px;
  height: 100vh;
}
h1 {
  text-align: center;
  line-height: 80px;
}

.box {
  display: flex;
}
.right {
  width: 300px;
  flex-grow: 2;
  height: 100vh;
}
.r_top {
  height: 80px;
  width: 100%;
  border-bottom: solid 1px #cccccc;
  background: #ffffff;
  box-sizing: border-box;
}
.r_top .app_name {
  line-height: 80px;
  margin-left: 40px;
  font-size: 30px;
  font-weight: bold;
  color: cornflowerblue;
}

.top_tools {
  text-align: right;
}

.top_tools span {
  padding: 0 15px
}
</style>
