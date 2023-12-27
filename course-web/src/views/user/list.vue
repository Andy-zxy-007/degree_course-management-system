<template>
  <div>
    <div class="l_top">
      <el-row>
        <!-- <el-button type="primary" @click="dialogFormVisible = true" style="margin-top:20px;margin-left:50px">增加设备</el-button> -->
        <el-button type="primary" @click="newUser" style="margin-top:20px;margin-left:50px">New</el-button>
      </el-row>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData3"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="User Name">
        <template slot-scope="scope">{{ scope.row.userName }}</template>
      </el-table-column>
      <el-table-column prop="email" label="Email" ></el-table-column>
      <el-table-column prop="phone" label="Phone" ></el-table-column>
      <el-table-column label="Actions" width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="page"
      :page-size="size"
      layout="total, prev, pager, next, jumper"
      :total="totalElements"
    ></el-pagination>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      page: 1,
      size: 15,
      totalElements: 0,
      tableData3: [
       
      ],
    };
  },

  methods: {
    list() {
      var that = this;
      that.$get("/users", {
          params: {
            size: that.size,
            page: that.page
          } 
        })
        .then(function(res) {
          console.log(res.data);
          that.tableData3 = res.data.content;
          that.page = res.data.pageable.pageNumber + 1;
          that.totalElements = res.data.totalElements;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    newUser() {
      this.$router.push("/user/detail");
    },

    handleEdit(index, row) {
      this.$router.push({
        path: "/user/detail",
        query: { userid: row.id }
      });
    },



    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    
    
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
   
    handleDelete(index, row) {
      const id = row.id;
      var that = this;
      that.$axios
        .delete(
          "/users/" + id 
        )
        .then(function(res) {
          if (res.status == 200) {
            that.$message({
              message: "删除成功",
              type: "success"
            });
          }
        });
      this.list();
    }
  },
  mounted() {
   this.list();
  }
};
</script>

<style>
.l_top {
  height: 80px;
}

.el-pagination {
  padding: 10px ;
}

</style>
