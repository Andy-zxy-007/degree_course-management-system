<template>
  <div class="boxing">
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark"><h4>Degree</h4></div></el-col>
    </el-row>
    <el-form ref="form" :model="form" label-width="150px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="Program Code">
            <el-input v-model="form.programCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="Degree Name">
            <el-input v-model="form.degreeName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Degree Level">
            <el-select placeholder="Degree Level" v-model="form.degreeLevel">
              <el-option
                v-for="item in degreeLevel"
                  :key = "item.id"
                  :label = "item.codeValue"
                  :value = "item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="Link">
            <el-input v-model="form.link"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="text-right">
          <el-form-item>
            <el-button type="primary" @click="save">Save</el-button>
            <el-button @click="cancel">Cancel</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- <div>
      
      <el-row>
        <el-col :span="24"><div class="grid-content bg-purple-dark"><h4>Degree</h4></div></el-col>
      </el-row>
      <el-table
        :data="Course"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column label="Course Area" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.mid }}</template>
        </el-table-column>
        <el-table-column prop="name" label="Course Catalogue"></el-table-column>
        <el-table-column prop="sex" label="Course name"></el-table-column>
        <el-table-column label="Actions">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
      </el-table>
      
      <el-pagination
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-size="size"
      layout="total, prev, pager, next, jumper"
      :total="totalElements"
    ></el-pagination> 
      <el-row class="text-right">
        <el-col :span="24">
            <el-button @click="addCourse">Add Course</el-button>
        </el-col>
      </el-row>
    </div> -->

    <el-dialog title="" :visible.sync="dialogFormVisibleseach">
      
    <el-form ref="form" :model="course" label-width="150px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="Course Catalogue">
            <el-input v-model="course.catalogue"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Course type ">
            <el-input v-model="course.type"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item>
            <el-button type="primary" @click="save">Save</el-button>
            <el-button @click="cancel">Cancel</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
      
    </el-dialog>
  </div>  
</template>



<script>
import qs from 'qs';
import vueFilter  from '../../utils/filter.js';
import { constants } from 'fs';
export default {
  data() {
    return {
      dialogFormVisibleseach: false,
      page: 1,
      size : 10,
      totalElements: 1,
      members: [],
      degreeLevel:[],
      form: {
        degreeName: "",
        degreeLeval: "",
        degreeLevalDesc: "",
        link:""
      },
      course: {
        catalogue: "",
        type: ""
      }
    };
  },
  created() {
    this.initDegreeLevel();

    var that = this;
    if (this.$route.query.id) {
      const id = this.$route.query.id;
      that.$axios
        .get(
          "/degrees/" + id //, {
          //headers: { Authorization: sessionStorage.getItem("auth") }
          //}
        )
        .then(function(res) {
          console.log(res.data.data);
          that.form = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  methods: {
    initDegreeLevel(){
      var that = this;
      this.$axios.get("/optioncodes/type",{
        params: {
          type: 'degree type'
        }
      }).then(function(res){
        console.log(res.data)
        that.degreeLevel = res.data.data
      })
    },


    list(){
      this.dialogFormVisibleseach = true;
      var that = this;
      this.$get("/members", {
          params: {
            page: this.page,
            size: this.size
          } 
        })
        .then(function(res) {
          console.log(res);
          that.members = res.data.content;
          that.totalElements = res.data.totalElements;
          that.page = res.pageable.pageNumber + 1;          
        })
        .catch(function(error) {});
    },
    handleCurrentChange(val){
      this.multipleSelection = val;
      this.list();
    },
    //   保存
    save() {
      var that = this;
      if (this.$route.query.id) {
        this.$axios
          .put("/degrees", {
            degreeId: this.$route.query.id,
            programCode: that.form.programCode,
            degreeName: that.form.degreeName,
            degreeLevel: that.form.degreeLevel,
            link: that.form.link,
          })
          .then(function(res) {
            console.log(res);
            if (res.status == 200) {
              that.$message({
                message: "Save Sucess",
                type: "success"
              });
              that.$router.push("/degree/list");
            } else {
              that.$message({
                message: res.data.msg,
                type: "success"
              });
            }
          });
      } else {
        this.$axios
          .post(
            "/degrees",
            {
              programCode: that.form.programCode,
              degreeName: that.form.degreeName,
              degreeLevel: that.form.degreeLevel,
              link: that.form.link,
            } 
          )
          .then(function(res) {
            console.log(res);
            if (res.status == 200) {
              that.$message({
                message: "Add Success",
                type: "success"
              });
              that.$router.push("/degree/list");
            } else {
              that.$message({
                message: res.data.msg,
                type: "success"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },

    addCourse(){
      this.dialogFormVisibleseach = true;
    },

    vnFocus(){
      this.list();
    },
    cancel(){
      this.$router.push("/degree/list");
    }
  }
};
</script>
<style>
  .boxing {
    height: 500px;
    margin: 0 auto;
  }
  h4 {
    text-align: center;
    line-height: 50px;
  }
  .el-col {
    padding: 0 20px;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .bg-purple-dark {
    background: #ebeef2;;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .text-right {
    text-align: right;
  }

</style>
