webpackJsonp([8],{"61L4":function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a={data:()=>({page:1,size:10,totalElements:1,tableData3:null}),methods:{handleCurrentChange(e){this.page=e,this.list()},toggleSelection(e){e?e.forEach(e=>{this.$refs.multipleTable.toggleRowSelection(e)}):this.$refs.multipleTable.clearSelection()},editMember(e,t){this.$router.push({path:"/member/detail",query:{id:t.id}})},newMember(){this.$router.push("/member/detail")},list(){var e=this;this.$get("/members",{params:{page:e.page,size:e.size}}).then(function(t){e.tableData3=t.data.content,e.page=t.data.pageable.pageNumber+1,e.totalElements=t.data.totalElements}).catch(function(e){})},handleSelectionChange(e){this.multipleSelection=e},handleDelete(e,t){var l=this;const a=t.id;this.$axios({method:"delete",url:"/members/"+a}).then(function(e){200==e.status&&l.$message({message:"删除成功",type:"success"})})},sexFormat:(e,t,l,a)=>1==e[t.property]?"男":"女"},mounted(){this.list()}},n={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[l("div",{staticClass:"l_top"},[l("el-row",[l("el-button",{staticStyle:{"margin-top":"20px","margin-left":"50px"},attrs:{type:"primary"},on:{click:e.newMember}},[e._v("添加客户")])],1)],1),e._v(" "),l("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData3,"tooltip-effect":"dark"},on:{"selection-change":e.handleSelectionChange}},[l("el-table-column",{attrs:{type:"selection","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{label:"客户编号","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.mid))]}}])}),e._v(" "),l("el-table-column",{attrs:{prop:"name",label:"客户姓名"}}),e._v(" "),l("el-table-column",{attrs:{prop:"sex",label:"客户性别",formatter:e.sexFormat}}),e._v(" "),l("el-table-column",{attrs:{prop:"mobile",label:"客户手机号","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{prop:"identify",label:"身份证号","show-overflow-tooltip":""}}),e._v(" "),l("el-table-column",{attrs:{label:"操作",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{size:"mini"},on:{click:function(l){return e.editMember(t.$index,t.row)}}},[e._v("编辑")]),e._v(" "),l("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(l){return e.handleDelete(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),l("el-pagination",{attrs:{"current-page":e.page,"page-size":e.size,layout:"total, prev, pager, next, jumper",total:e.totalElements},on:{"current-change":e.handleCurrentChange}})],1)},staticRenderFns:[]};var o=l("VU/8")(a,n,!1,function(e){l("v1NW")},null,null);t.default=o.exports},v1NW:function(e,t){}});
//# sourceMappingURL=8.98c6bb2e379e1a96d22c.js.map