<template>
  <div>
    <div class="l_top">
      <el-row>
        <el-button type="primary" @click="newItem" style="margin-top:20px;margin-left:50px">New</el-button>
      </el-row>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData3"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="Subject/Catalogue" width="400">
        <template slot-scope="scope">{{ scope.row[1].codeValue }} / {{ scope.row[0].catalogue }}</template>
      </el-table-column>
      <el-table-column label="Course name">
        <template slot-scope="scope">{{ scope.row[0].courseName }}</template>
      </el-table-column>
      <el-table-column label="Actions" width="200">
        <template slot-scope="scope" >
          <el-button size="mini" @click="editItem(scope.$index, scope.row[0])">Edit</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row[0])">Delete</el-button>
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
  </div>
</template>

<script>
import vueFilter  from '../../utils/filter.js';
export default {
  data() {
    return {
      page: 1,
      size: 15,
      totalElements: 1,
      tableData3: [
        {

        },
        {

        }
      ]
    };
  },

  methods: {
    // New
    newItem() {
      this.$router.push("/course/detail");
    },

    // Edit
    editItem(index, row) {
      this.$router.push({
        path: "/course/detail",
        query: { id: row.courseId }
      });
    },

    // List;
    list() {
      var that = this;
      this.$get("/courses", {
          params: {
            size: that.size,
            page: that.page
          } 
        })
        .then(function(res) {
          that.tableData3 = res.data.content;
          that.page = res.data.pageable.pageNumber + 1;
          that.totalElements = res.data.totalElements;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.list();
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

    // Delete
    handleDelete(index, row) {
      const id = row.courseId;
      var that = this;
      console.log("id=" + id);
      that.$axios
        .delete(
          "/courses/" + id 
        )
        .then(function(res) {
          if (res.status == 200) {
            that.list();
            that.$message({
              message: "Delete Success",
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
</style>
