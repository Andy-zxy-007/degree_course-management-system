<template>
    <div class="boxing">
      <h4>User Details</h4>
   <el-form ref="form" :model="form" label-width="150px">
    <el-row>
      <el-col :span="12"> 
        <el-form-item label="User Name">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12"> 
        <el-form-item label="Password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
    <el-col :span="12">
      <el-form-item label="Email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="Phone">
        <el-input v-model="form.phone"></el-input>
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
import { constants } from 'fs';
  export default {
    data() {
      return {
        form: {
          id:"",
          userName:"",
          password:"",
          email:"",
          phone:""
        }
     
      }
    },
    created(){
      var that = this;
      if (this.$route.query.userid) {
        const id = this.$route.query.userid;
        that.$axios
          .get(
            "/users/" + id //, {
            //headers: { Authorization: sessionStorage.getItem("auth") }
            //}
          )
          .then(function(res) {
            // console.log(res.data.data);
            that.form = res.data.data;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    methods: {
      save(){
        var that=this
        if(this.$route.query.userid){  // modify
          this.$axios.put('/users',
            //headers:{'Authorization':sessionStorage.getItem("auth")},
            {
              id: this.$route.query.userid,
              userName: that.form.userName,
              password: that.form.password,
              email: that.form.email,
              phone: that.form.phone
            }).then(function(res){
            console.log(res);
            if(res.status==200){
              that.$message({
                    message: 'Modify Success',
                    type: 'success'
                  });
              that.$router.push("/user/list")    
            }
          }).catch(function (error){
            console.log(error)
          })
          
        }else{ //add

          this.$axios.post('/users',{
              userName: that.form.userName,
              password: that.form.password,
              email: that.form.email,
              phone: that.form.phone
            // }
            // ,{headers:{
            //     'Authorization':sessionStorage.getItem("auth")
            // }
          }).then(function(res){
            console.log(res);
            if(res.status==200){
              that.$message({
                    message: 'Add Success',
                    type: 'success'
                  });
              that.$router.push("/user/list")    
            }
          }).catch(function (error){
            console.log(error)
          })
        }
        
      },
      cancel(){
        this.$router.push("/user/list") 
      }
    }
  }
</script>


<style>
 .boxing{
   padding: 0 50px;
   height: 500px;
   /* background: red; */
   margin: 0 auto;
 }
 h4{
   text-align: center;
   line-height: 80px;
 }
 .text-right{
  text-align: right;
 }
</style>
