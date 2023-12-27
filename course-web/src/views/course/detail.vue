<template>
  <div class="boxing">
    <h4>Course</h4>
    <el-form ref="form" :model="form" label-width="150px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="Subject">
            <el-select placeholder="courseArea" v-model="form.subjectArea">
              <el-option
                v-for="item in subjectArea"
                  :key = "item.id"
                  :label = "item.codeValue"
                  :value = "item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Cataologue">
            <el-input placeholder="Cataologue" v-model="form.catalogue"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Course name">
            <el-input placeholder="courseName" v-model="form.courseName"></el-input>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        courseId: 0,
        courseName: "",
        catalogue: "",
        courseArea: 0,
        status: 1
      },
      subjectArea:{

      }
    };
  },
  
  created() {
    this.initSubjectArea();

    var that = this;
    if (this.$route.query.id) {
      const id = this.$route.query.id;
      that.$axios
        .get("/courses/" + id, {
          // headers: { Authorization: sessionStorage.getItem("auth") }
        })
        .then(function(res) {
          that.form = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  methods: {
    initSubjectArea(){

      var that = this;
      this.$axios.get("/optioncodes/type",{
        params: {
          type: 'subject area'
        }
      }).then(function(res){
        console.log(res.data)
        that.subjectArea = res.data.data
      })
    },

    //  保存
    save() {
      var that = this;
      if (this.$route.query.id) {
        this.$axios
          .put(
            "/courses",
            {
              courseId: this.form.courseId,
              courseName: this.form.courseName,
              catalogue: this.form.catalogue,
              subjectArea: this.form.subjectArea,
              status: this.form.status,
            } //,
            // {
            //   headers: {
            //     Authorization: sessionStorage.getItem("auth")
            //   }
            // }
          )
          .then(function(res) {
            console.log(res);
            if (res.status == 200) {
              that.$message({
                message: "Update Sucess",
                type: "success"
              });
              that.$router.push("/course/list");
            } else {
              that.$message({
                message: res.data.msg,
                type: "Save Success"
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        console.log(this.form)
        this.$axios
          .post(
            "/courses",
            {
              courseName: this.form.courseName,
              catalogue: this.form.catalogue,
              subjectArea: this.form.subjectArea,
              status: this.form.status,
            }//,
            // {
            //   headers: {
            //     Authorization: sessionStorage.getItem("auth")
            //   }
            // }
          )
          .then(function(res) {
            console.log(res);
            if (res.status == 200) {
              that.$message({
                message: "Add Success",
                type: "success"
              });
              that.$router.push("/course/list");
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
    cancel(){
      this.$router.push('/course/list');
    }
  }
};
</script>

<style>
.boxing {
  padding: 0 50px;
  height: 500px;
  /* background: red; */
  margin: 0 auto;
}
h4 {
  text-align: center;
  line-height: 80px;
}
.el-col {
  padding: 0 20px;
}

.text-right {
  text-align: right;
}
</style>
