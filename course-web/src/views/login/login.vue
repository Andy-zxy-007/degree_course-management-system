<template>
  <div id="bg">
    <div id="hint">
      <!-- tips -->
      <p>Failed</p>
    </div>

  <el-container>
    <el-header>
      <el-row>
        <el-col :span=6 ><a>Curriculum Helper</a>  <a style="padding-left:10px;cursor: pointer; " @click="showLink()">Uni Links</a>
          <div v-show="showLinks" class="unilinks" >
            <ul>
              <li><a :href="'https://www.adelaide.edu.au/course-outlines'" target="_blank">Course Outlines</a></li>
              <li><a :href="'https://set.adelaide.edu.au'" target="_blank">Faculty of Set</a></li>
              <li><a :href="'https://www.adelaide.edu.au'" target="_blank">Offical Website of UNI Adelaide</a></li>
            </ul>
          </div>
        </el-col>
        
        <el-col :span=6 :offset="12">
          <el-button>Theme Change</el-button>
          <el-button @click="toLogin">Log In</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row><h1>Make your coordination easier</h1></el-row>
      <el-row><h4>Browse degree structure and course relationships with just one click.</h4></el-row>
      <el-row style="padding: 10px 0">
        <el-col :span="16" :offset="8">
          <el-form>
            <el-form-item>
              <el-row class="classarea">
                <el-col :span="8" class="keyvalue">
                  <el-input v-model="keyword" placeholder="Course Name or Course Number"></el-input>
                </el-col>
                <el-col :span="4" class="selectvalue">
                  <el-select v-model="select" placeholder="Degrees">
                    <el-option label="Degrees" value="Degrees"></el-option>
                    <el-option label="Courses" value="Courses"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="4" class="searchbutton">
                  <el-button type="primary" icon="el-icon-search" plain  @click="search">Search</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <img src="/static/image/20240131224436.png">
      </el-row>

      <el-row class="doublesearch">
        <el-col :span=6 :offset=9 >
          <span><el-button type="primary" @click="searchDegree">Degree</el-button></span><span><el-button type="primary" @click="searchCourse">Course</el-button></span>
        </el-col>
      </el-row>
      <div v-if="showDegree" class="search_result">
        <el-row>

        </el-row>
        <el-table
          :data="degree"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column label="Program Code" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row[0].programCode }}</template>
          </el-table-column>
          <el-table-column label="Degree name" show-overflow-tooltip>
            <template slot-scope="scope"><a  style="cursor: pointer; "  @click="search_degreecourse(scope.row[0].degreeId,scope.row[1].codeValue + ' ' + scope.row[0].degreeName )">{{scope.row[1].codeValue }} {{scope.row[0].degreeName }}</a></template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="degreehandleCurrentChange"
          :current-page="degreepage"
          :page-size="degreesize"
          layout="total, prev, pager, next, jumper"
          :total="degreetotalElements"
        ></el-pagination>
      </div>

      <div v-show="showCourse" class="search_result">
        <el-tabs v-model="activeName" type="card" @tab-click="tabClick" class="tabs">
          <el-tab-pane label="Core Courses" name="Core">

            <el-table
              :data="course"
              tooltip-effect="dark"
              style="width: 100%"
            >
              <el-table-column label="Subject | Catalogue" show-overflow-tooltip width="250px">
                <template slot-scope="scope">{{ scope.row[3].codeValue }} | {{ scope.row[1].catalogue }}</template>
              </el-table-column>
              <el-table-column label="Course name" show-overflow-tooltip width="500px">
                <template slot-scope="scope"><a :href="scope.row[0].link" target="_blank">{{ scope.row[1].courseName }}</a></template>
              </el-table-column>
              <el-table-column label="Unit Value" show-overflow-tooltip width="100px">
                <template slot-scope="scope">{{ scope.row[0].units }}</template>
              </el-table-column>
              <el-table-column label="Pre-Requisite" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row[5].preRequisiteIncompatibleDescription }}</template>
              </el-table-column>
              <el-table-column label="Incompatible" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row[6].preRequisiteIncompatibleDescription }}</template>
              </el-table-column>
            </el-table>
            <el-pagination
              @current-change="coursehandleCurrentChange"
              :current-page="coursepage"
              :page-size="coursesize"
              layout="total, prev, pager, next, jumper"
              :total="coursetotalElements"
            ></el-pagination>
          </el-tab-pane>
          <el-tab-pane label="Elective" name="Elective">
            <el-table
              :data="course"
              tooltip-effect="dark"
              style="width: 100%"
            >
              <el-table-column label="Subject | Catalogue" show-overflow-tooltip width="250px">
                <template slot-scope="scope">{{ scope.row[3].codeValue }} | {{ scope.row[1].catalogue }}</template>
              </el-table-column>
              <el-table-column label="Course name" show-overflow-tooltip width="500px">
                <template slot-scope="scope"><a :href="scope.row[0].link" target="_blank">{{ scope.row[1].courseName }}</a></template>
              </el-table-column>
              <el-table-column label="Unit Value" show-overflow-tooltip width="100px">
                <template slot-scope="scope">{{ scope.row[0].units }}</template>
              </el-table-column>
              <el-table-column label="Pre-Requisite" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row[5].preRequisiteIncompatibleDescription }}</template>
              </el-table-column>
              <el-table-column label="Incompatible" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row[6].preRequisiteIncompatibleDescription }}</template>
              </el-table-column>
            </el-table>
            <el-pagination
              @current-change="coursehandleCurrentChange"
              :current-page="coursepage"
              :page-size="coursesize"
              layout="total, prev, pager, next, jumper"
              :total="coursetotalElements"
            ></el-pagination>
          </el-tab-pane>
        </el-tabs>

      </div>

      <el-dialog v-draggable title="" :visible.sync="dialogDegreeCourseVisible">
        <el-row>
          <el-col>
            <h4>{{degreeName}}</h4>
          </el-col>
        </el-row>
        <el-tabs v-model="activeCourseName" type="card" @tab-click="tabCourseClick" class="tabs">
          <el-tab-pane label="Core Courses" name="Core">
            <el-table
          :data="datas"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column label="Subject|Catalogue" show-overflow-tooltip width="250px">
            <template slot-scope="scope">{{ scope.row[3].codeValue }} | {{ scope.row[0].catalogue }}</template>
          </el-table-column>
          <el-table-column label="Course name" show-overflow-tooltip>
            <template slot-scope="scope"><a :href="scope.row[1].link" target="_blank">{{ scope.row[0].courseName }}</a></template>
          </el-table-column>
          <!-- <el-table-column label="type" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row[4].codeValue }}</template>
          </el-table-column> -->
          <el-table-column label="Unit Value" show-overflow-tooltip width="100px">
            <template slot-scope="scope">{{ scope.row[1].units }}</template>
          </el-table-column>
          <el-table-column label="Pre-Requisite" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row[5].preRequisiteIncompatibleDescription }}</template>
          </el-table-column>
          <el-table-column label="Incompatible" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row[6].preRequisiteIncompatibleDescription }}</template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="datashandleCurrentChange"
          :current-page="dataspage"
          :page-size="datassize"
          layout="total, prev, pager, next, jumper"
          :total="datastotalElements"
        ></el-pagination>
          </el-tab-pane>
          <el-tab-pane label="Elective" name="Elective">
            <el-table
          :data="datas"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column label="Subject|Catalogue" show-overflow-tooltip width="250px">
            <template slot-scope="scope">{{ scope.row[3].codeValue }} | {{ scope.row[0].catalogue }}</template>
          </el-table-column>
          <el-table-column label="Course name" show-overflow-tooltip>
            <template slot-scope="scope"><a :href="scope.row[1].link" target="_blank">{{ scope.row[0].courseName }}</a></template>
          </el-table-column>
          <!-- <el-table-column label="type" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row[4].codeValue }}</template>
          </el-table-column> -->
          <el-table-column label="Unit Value" show-overflow-tooltip width="100px">
              <template slot-scope="scope">{{ scope.row[1].units }}</template>
            </el-table-column>
          <el-table-column label="Pre-Requisite" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row[5].preRequisiteIncompatibleDescription }}</template>
          </el-table-column>
          <el-table-column label="Incompatible" show-overflow-tooltip>
            <template slot-scope="scope">{{ scope.row[6].preRequisiteIncompatibleDescription }}</template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="datashandleCurrentChange"
          :current-page="dataspage"
          :page-size="datassize"
          layout="total, prev, pager, next, jumper"
          :total="datastotalElements"
        ></el-pagination>
          </el-tab-pane>
        </el-tabs>
        
      </el-dialog>

    </el-main>
    
    <el-footer>© 2023 Company, Inc</el-footer>
  </el-container>

    <el-dialog class="login-dialog" title="" :visible.sync="dialogLogin">
      <div id="login_wrap">
        <div id="login">
          <!-- 登录注册切换动画 -->
          <div id="status">
            <i style="top: 0">Login</i>
            <!-- <i style="top: 35px">Sign</i>
            <i style="right: 5px">Log In</i>-->
          </div>
          <span>
            <form action="post">
              <p class="form">
                <input type="text" id="user" placeholder="username" v-model="username" />
              </p>
              <p class="form">
                <input type="password" id="passwd" placeholder="password" v-model="password" />
              </p>
              <p class="form confirm">
                <input type="password" id="confirm-passwd" placeholder="confirm password" />
              </p>
              <input type="button" value="Log in" class="btn" @click="login" />
              <!-- <input type="button" value="Sign in" class="btn" onclick='signin()' id="btn"> -->
            </form>
          </span>
        </div>

        <div id="login_img">
          <!-- 图片绘制框 -->
          <span class="circle">
            <span></span>
            <span></span>
          </span>
          <span class="star">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span class="fly_star">
            <span></span>
            <span></span>
          </span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import degreeResult from './component/degree-result.vue'
export default {
  name: "App",
  data() {
    return {
      activeName:"Core",
      activeCourseName:"Core",
      dialogLogin: false,
      dialogDegreeCourseVisible:false,
      degreepage: 1,
      degreesize: 15,
      degreetotalElements: 0,
      coursepage: 1,
      coursesize: 15,
      coursetotalElements: 0,
      dataspage: 1,
      datassize: 15,
      datastotalElements: 0,
      showLinks: false,
      showDegree: false,
      showCourse: false,
      degreeId:"",
      degreeName:"",
      username: "",
      password: "",
      keyword: "",
      select: "",
      degree: [
       
      ],
      course:[
        {
          courseName:"",
          catalogue:""
        }
      ],
      datas:[]
    };
  },

  methods: {
    showLink(){
      if(this.showLinks == false){
        this.showLinks = true
      }else {
        this.showLinks = false
      }
    },
    login() {
      var that=this;
      this.$axios
        .get("/users/token", {params:{
          username: that.username,
          password: that.password}
        })
        .then(function(response) {
          if (response.data.state == "0000") {
            that.$message({
              message: "Login Success",
              type: "success"
            });
            sessionStorage.setItem("auth", response.data.data);
            that.$router.push("/degree/list");
          } else {
            that.$message.error(response.data.data);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    toLogin(){
      this.dialogLogin = true;
    },

    searchDegree(){
      this.select = 'Degrees'
      var that = this;
        this.course = []
        this.showDegree = true
        this.showCourse = false
        this.$axios.get("/degrees/search",{params:{
          keyvalue: that.keyword,
          page: that.degreepage,
          size: that.degreesize
        }}).then(function(res){
            that.degree = res.data.data.content;
            that.degreepage = res.data.data.pageable.pageNumber + 1;
            that.degreetotalElements = res.data.data.totalElements;
        }).catch(function(error) {
            console.log(error);
          });
    },

    searchCourse(){
      this.select = 'Courses'
      var that = this;
        this.degree = []
        this.showDegree = false
        this.showCourse = true
        this.$axios.get("/degreecourses/search",{params:{
        keyvalue: that.keyword,
        type: that.activeName,
        page: that.coursepage,
        size: that.coursesize
      }}).then(function(res){
          that.course = res.data.data.content;
          that.coursepage = res.data.data.pageable.pageNumber + 1;
          that.coursetotalElements = res.data.data.totalElements;
      }).catch(function(error) {
          console.log(error);
        });
    },  

    search(){
      var that = this;
      if(that.select == 'Courses'){
        this.degree = []
        this.showDegree = false
        this.showCourse = true
        this.$axios.get("/degreecourses/search",{params:{
        keyvalue: that.keyword,
        type: that.activeName,
        page: that.coursepage,
        size: that.coursesize
      }}).then(function(res){
          that.course = res.data.data.content;
          that.coursepage = res.data.data.pageable.pageNumber + 1;
          that.coursetotalElements = res.data.data.totalElements;
      }).catch(function(error) {
          console.log(error);
        });
      }else {
        this.course = []
        this.showDegree = true
        this.showCourse = false
        this.$axios.get("/degrees/search",{params:{
          keyvalue: that.keyword,
          page: that.degreepage,
          size: that.degreesize
        }}).then(function(res){
            that.degree = res.data.data.content;
            that.degreepage = res.data.data.pageable.pageNumber + 1;
            that.degreetotalElements = res.data.data.totalElements;
        }).catch(function(error) {
            console.log(error);
          });
      }
    },

    search_degreecourse(degreeid, degreeName){
      this.degreeId = degreeid
      this.degreeName = degreeName
      this.searchDegreeCourse();
    },

    searchDegreeCourse(){
      var that = this;
      this.dialogDegreeCourseVisible = true
      this.$axios.get("/courses/degree",{params:{
          degreeId: that.degreeId,
          type: that.activeCourseName,
          page: that.dataspage,
          size: that.datassize
        }}).then(function(res){
            that.datas = res.data.data.content;
            that.dataspage = res.data.data.pageable.pageNumber + 1;
            that.datastotalElements = res.data.data.totalElements;
        }).catch(function(error) {
            console.log(error);
          });
    },

    tabClick(tab, event){
        this.search();
    },

    tabCourseClick(tab, event){
        this.searchDegreeCourse();
    },



    degreehandleCurrentChange(val) {
      this.degreepage = val;
      this.search();
    },
    coursehandleCurrentChange(val) {
      this.coursepage = val;
      this.search();
    },
    datashandleCurrentChange(val) {
      this.dataspage = val;
      this.search_degreecourse(this.degreeId,this.degreeName);
    },
  },
  mounted(){
    this.search();
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  height: 100vh;
  width: 100%;
  background-color: rgb(142, 143, 250);
}

  .el-header, .el-footer {
    background-color: rgb(13, 202, 240) ;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    background-color:rgb(142, 143, 250);
    color: #333;
    text-align: center;
  }

  .el-main h1 {
    line-height: 60px;
    font-size: 56px;
  }

  .el-main h4 {
    line-height: 60px;
    font-size: 20px;
  }

  .el-container {
    margin-bottom: 40px;
  }

  .search_result {
    width: 90%;
    margin: auto;
  }

  .unilinks {
    background-color: white;
    padding: 10px;
    position: absolute;
    margin-left: 210px;
    z-index: 100;
    margin-top: -10px;
    box-shadow: 5px 5px 5px;
    border-radius: 5px;
  }

  .unilinks ul {
    list-style: none;
    text-align: left;
  }

  .unilinks ul li {
    line-height: 30px;
  }
  .unilinks ul li a{
    text-decoration: none;
    color: black;
  }
input:focus {
  outline: none;
}
.form input {
  width: 300px;
  height: 30px;
  font-size: 18px;
  background: none;
  border: none;
  border-bottom: 1px solid #fff;
  color: #fff;
  margin-bottom: 20px;
}
.form input::placeholder {
  color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
  font-family: "neo";
}
.confirm {
  height: 0;
  overflow: hidden;
  transition: 0.25s;
}
.btn {
  width: 140px;
  height: 40px;
  border: 1px solid #fff;
  background: none;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  margin-top: 25px;
  font-family: "neo";
  transition: 0.25s;
}

.keyvalue .el-input__inner {
  height: 60px;
  line-height: 60px;
  border-radius: 15px 0 0 15px;
  font-size: 20px;
}

.selectvalue .el-input__inner {
  height: 60px;
  line-height: 60px;
  border-radius: 0 15px 15px 0;
  font-size: 20px;
}

.search_btn {
  width: 140px;
  height: 40px;
}

.searchbutton .el-button{
    height: 60px;
    font-size: 20px;
    border-radius: 10px;
}
.el-dialog__body {
  padding: 0 20px 30px 20px;
}

.doublesearch {
  margin-bottom: 20px;
}

.doublesearch span {
  padding: 0 20px;
}

.el-pagination{
  padding: 10px 0;
}

.btn:hover {
  background: rgba(255, 255, 255, 0.25);
}

.login-dialog .el-dialog__header {
  padding: 0;
}

.login-dialog .el-dialog__body {
  padding: 0;
}

.tabs  {
  background-color: white;
}

#login_wrap {
  width: 980px;
  min-height: 500px;
  border-radius: 10px;
  font-family: "neo";
  overflow: hidden;
  box-shadow: 0px 0px 120px rgba(0, 0, 0, 0.25);
  position: fixed;
}
#login {
  width: 50%;
  height: 100%;
  min-height: 500px;
  background: linear-gradient(45deg, #9a444e, #e06267);
  position: relative;
  float: right;
}
#login #status {
  width: 100px;
  height: 50px;
  margin: 80px auto;
  color: #fff;
  font-size: 30px;
  font-weight: 600;
  position: relative;
  overflow: hidden;
}
#login #status i {
  font-style: normal;
  /* position: absolute; */
  transition: 0.5s;
  width: 100px;
}
#login span {
  text-align: center;
  position: absolute;
  left: 50%;
  margin-left: -150px;
  top: 55%;
  margin-top: -100px;
}
#login span a {
  text-decoration: none;
  color: #fff;
  display: block;
  margin-top: 80px;
  font-size: 18px;
}
#bg {
  /* background: linear-gradient(45deg, #211136, #bf5853); */
  background-color: #B3C0D1;
  height: 100%;
  width: 100%;
}
/*绘图*/
#login_img {
  width: 50%;
  min-height: 500px;
  background: linear-gradient(45deg, #221334, #6c3049);
  float: left;
  position: relative;
}
#login_img span {
  position: absolute;
  display: block;
}
#login_img .circle {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(45deg, #df5555, #ef907a);
  top: 100px;
  left: 50%;
  margin-left: -100px;
  overflow: hidden;
}
#login_img .circle span {
  width: 150px;
  height: 40px;
  border-radius: 50px;
  position: absolute;
}
#login_img .circle span:nth-child(1) {
  top: 30px;
  left: -38px;
  background: #c55c59;
}
#login_img .circle span:nth-child(2) {
  bottom: 20px;
  right: -35px;
  background: #934555;
}
#login_img .star span {
  background: radial-gradient(#fff 10%, #fff 20%, rgba(72, 34, 64, 0));
  border-radius: 50%;
  box-shadow: 0 0 7px #fff;
}
#login_img .star span:nth-child(1) {
  width: 15px;
  height: 15px;
  top: 50px;
  left: 30px;
}
#login_img .star span:nth-child(2) {
  width: 10px;
  height: 10px;
  left: 360px;
  top: 80px;
}
#login_img .star span:nth-child(3) {
  width: 5px;
  height: 5px;
  top: 400px;
  left: 80px;
}
#login_img .star span:nth-child(4) {
  width: 8px;
  height: 8px;
  top: 240px;
  left: 60px;
}
#login_img .star span:nth-child(5) {
  width: 4px;
  height: 4px;
  top: 20px;
  left: 200px;
}
#login_img .star span:nth-child(6) {
  width: 4px;
  height: 4px;
  top: 460px;
  left: 410px;
}
#login_img .star span:nth-child(7) {
  width: 6px;
  height: 6px;
  top: 250px;
  left: 350px;
}
#login_img .fly_star span {
  width: 90px;
  height: 3px;
  background: -webkit-linear-gradient(
    left,
    rgba(255, 255, 255, 0.67),
    rgba(255, 255, 255, 0)
  );
  background: -o-linear-gradient(
    left,
    rgba(255, 255, 255, 0.67),
    rgba(255, 255, 255, 0)
  );
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.67),
    rgba(255, 255, 255, 0)
  );
  transform: rotate(-45deg);
}
#login_img .fly_star span:nth-child(1) {
  top: 60px;
  left: 80px;
}
#login_img .fly_star span:nth-child(2) {
  top: 210px;
  left: 332px;
  opacity: 0.6;
}
#login_img p {
  text-align: center;
  color: #af4b55;
  font-weight: 600;
  margin-top: 365px;
  font-size: 25px;
}

#login_img p i:nth-last-child(1) {
  margin-right: 0;
}
/*提示*/
#hint {
  width: 100%;
  line-height: 100px;
  background: linear-gradient(-90deg, #9b494d, #bf5853);
  text-align: center;
  font-size: 25px;
  color: #fff;
  box-shadow: 0 0 20px #733544;
  display: none;
  opacity: 0;
  transition: 0.5s;
  position: absolute;
  top: 0;
  z-index: 999;
}
/* 响应式 */
@media screen and (max-width: 1000px) {
  #login_img {
    display: none;
  }
  #login_wrap {
    width: 490px;
    margin-right: -245px;
  }
  #login {
    width: 100%;
  }
}
@media screen and (max-width: 560px) {
  #login_wrap {
    width: 330px;
    margin-right: -165px;
  }
  #login span {
    margin-left: -125px;
  }
  .form input {
    width: 250px;
  }
  .btn {
    width: 113px;
  }
}
@media screen and (max-width: 345px) {
  #login_wrap {
    width: 290px;
    margin-right: -145px;
  }
}
</style>
