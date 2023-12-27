<template>
    <div>
        <el-row>
          <el-col>
            <h4>{{degreeName}}</h4>
          </el-col>
        </el-row>
        <el-table :data="datas" tooltip-effect="dark" style="width: 100%">
            <el-table-column label="Subject|Catalogue" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row[3].codeValue }} | {{ scope.row[0].catalogue }}</template>
            </el-table-column>
            <el-table-column label="Course name" show-overflow-tooltip>
                <template slot-scope="scope"><a :href="scope.row[1].link" target="_blank">{{ scope.row[0].courseName }}</a></template>
            </el-table-column>
            <el-table-column label="type" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row[4].codeValue }}</template>
            </el-table-column>
        </el-table>

        <el-pagination @current-change="datashandleCurrentChange"
          :current-page="dataspage"
          :page-size="datassize"
          layout="total, prev, pager, next, jumper"
          :total="datastotalElements">

        </el-pagination>
    </div>
</template>