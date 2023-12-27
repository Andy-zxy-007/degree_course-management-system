<template>
  <div>
    <div class="l_top">
      <el-row>
        <el-button
          type="primary"
          @click="newItemOrder"
          style="margin-top:20px;margin-left:50px"
        >New</el-button>
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
      <el-table-column label="Program Code">
        <template slot-scope="scope">{{ scope.row[0].programCode }}</template>
      </el-table-column>
      <el-table-column label="Degree Name">
        <template slot-scope="scope"><a :href=scope.row[0].link>{{ scope.row[1].codeValue }} {{ scope.row[0].degreeName }}</a></template>
      </el-table-column>
      <el-table-column label="Actions" width="200px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row[0])">Edit</el-button>
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
      totalElements: 0,
      tableData3: [
        {
          degreeId: "",
          degreeName: "",
          link: "",
          degreeLevel: ""
        }
      ],
      multipleSelection: [],
      dialogFormVisibleseach:false,
    };
  },

  methods: {
    newItemOrder() {
      this.$router.push("/degree/detail");
    },
    //列表查询;
    list() {
      var that = this;
      that.$get("/degrees", {
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

    handleEdit(index, row) {
      this.$router.push({
        path: "/degree/detail",
        query: { id: row.degreeId }
      });
    },
    handleDelete(index, row) {
      const id = row.degreeId;
      var that = this;
      that.$axios
        .delete(
          "/degrees/" + id 
        )
        .then(function(res) {
          
          if (res.status == 200) {
            that.list();
            that.$message({
              message: "Delete Sucess",
              type: "success"
            });
          }
          
        });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.list();
    },
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
