<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>篩選搜索</span>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="pageParams" size="small" label-width="140px">
          <el-form-item label="輸入搜索：">
            <el-input v-model="pageParams.keyword" class="input-width" placeholder="Line暱稱 / E-mail" clearable></el-input>
          </el-form-item>
          <el-button
            type="primary"
            @click="handleSearchList()"
            size="small">
            查詢搜索
          </el-button>
        </el-form>
      </div>
    </el-card>
    <div class="table-container">
      <el-table ref="adminTable" :data="allMemberList.list" style="width: 100%;" v-loading="listLoading" border>
        <el-table-column label="序號" width="140" align="center">
          <template slot-scope="scope">{{(scope.$index + 1) + (pageParams.pageNum - 1) * 10}}</template>
        </el-table-column>
        <el-table-column label="Line暱稱" align="center">
          <template slot-scope="scope">
            <a href="javascript:;"
              style="text-decoration: underline;"
              @click="handleShowMember( scope.row.id )">
              {{scope.row.name}}
            </a>
          </template>
        </el-table-column>
        <el-table-column label="E-mail" align="center">
          <template slot-scope="scope">{{scope.row.email}}</template>
        </el-table-column>
        <el-table-column label="註冊時間" align="center">
          <template slot-scope="scope">{{scope.row.createTime}}</template>
        </el-table-column>
        <el-table-column label="剩餘抽獎次數" width="140" align="center">
          <template slot-scope="scope">{{scope.row.drawTimesBalance}}</template>
        </el-table-column>
        <el-table-column label="中獎次數" width="140" align="center">
          <template slot-scope="scope">{{scope.row.prizeTimes}}</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20]"
        :total="allMemberList.total">
      </el-pagination>
    </div>


    <el-dialog
      title="會員詳細資料"
      style="padding-bottom: 6vh; margin-top: -6vh;"
      :visible.sync="dialog"
      :show-close="true"
      :center="true"
      width="90%">
      <div class="table-container">

        <el-card class="operate-container" shadow="never">
            <span class="pop-title">帳號資料</span>
            <br>
            <el-row :gutter="20">
              <el-col :span="4">
                <div class="un-handle-item">
                  <span class="font-medium">Line暱稱：</span>
                  <span>{{member.name}}</span>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="un-handle-item">
                  <span class="font-medium">E-mail：</span>
                  <span>{{member.email}}</span>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="un-handle-item">
                  <span class="font-medium">註冊時間：</span>
                  <span>{{member.createTime}}</span>
                </div>
              </el-col>
            </el-row>
        </el-card>

        <el-card class="operate-container" shadow="never">
            <span class="pop-title">個人統計</span>
            <br>
            <el-row :gutter="20">
              <el-col :span="3">
                <div class="un-handle-item">
                  <span class="font-medium">抽獎次數：</span>
                  <span>{{member.drawTimesDone}}</span>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="un-handle-item">
                  <span class="font-medium">中獎次數：</span>
                  <span>{{member.prizeTimes}}</span>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="un-handle-item">
                  <span class="font-medium">剩餘抽獎次數：</span>
                  <span>{{member.drawTimesBalance}}</span>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="un-handle-item">
                  <span class="font-medium">分享次數：</span>
                  <span>{{member.shareTimes}}</span>
                </div>
              </el-col>
            </el-row>
        </el-card>

        <br>
        <span class="pop-title">抽獎記錄</span>
        <el-table ref="adminTable" :data="memberDrawRecord" style="width: 100%;" v-loading="listLoading" border>
          <el-table-column label="序號" width="140" align="center">
            <template slot-scope="scope">{{scope.$index + 1}}</template>
          </el-table-column>
          <el-table-column label="抽獎時間" align="center">
            <template slot-scope="scope">{{scope.row.recordTime}}</template>
          </el-table-column>
          <el-table-column label="抽獎獎項" align="center">
            <template slot-scope="scope">{{scope.row.prizeName}}</template>
          </el-table-column>
          <el-table-column label="聯絡姓名" align="center">
            <template slot-scope="scope">{{scope.row.name?scope.row.name:'-'}}</template>
          </el-table-column>
          <el-table-column label="E-mail" align="center">
            <template slot-scope="scope">{{scope.row.email?scope.row.email:'-'}}</template>
          </el-table-column>
          <el-table-column label="聯絡電話" align="center">
            <template slot-scope="scope">{{scope.row.phoneNumber?scope.row.phoneNumber:'-'}}</template>
          </el-table-column>
          <el-table-column label="聯絡地址" align="center">
            <template slot-scope="scope">{{scope.row.address?scope.row.address:'-'}}</template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button  @click="dialog = false" type="primary" size="small">確 定</el-button>
      </span>
    </el-dialog>



  </div>
</template>
<script>
  import { getMemberList, getPrizedList } from "@/api/pineapple";
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    keyword: null
  };
  const defaultAdmin = {
    id: null,
    username: null,
    password: null,
    nickName: null,
    email: null,
    note: null,
    status: 1
  };
  export default {
    name: 'customerData',
    watch: {
      "$store.state.campaign.selected": {
        handler: function( el ) {
          if ( el ) {
            this.getMemberList();
          }
        },
        immediate: true // provides initial (not changed yet) state
      }
    },
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        total: null,
        listLoading: false,
        allMemberList: [],
        pageParams: {
          "keyword": null,
          "pageNum": "1",
          "pageSize": "10"
        },
        dialog: false,
        member: {
          name: '',
        },
        memberDrawRecord: null,
      }
    },
    created() {
      // this.getMemberList();
    },
    methods: {
      handleSearchList() {
        if ( this.pageParams.keyword === '' ) {
          this.pageParams.keyword = null
        }
        this.getMemberList();
      },
      handleSizeChange(val) {
        this.pageParams.pageNum = 1;
        this.pageParams.pageSize = val;
        this.getMemberList();
      },
      handleCurrentChange(val) {
        this.pageParams.pageNum = val;
        this.getMemberList();
      },
      getMemberList(){
        this.listLoading = true;
        getMemberList( this.pageParams ).then(response => {
          this.listLoading = false;
          this.allMemberList = response.data;
        });
      },
      handleShowMember( id ) {
        this.dialog = true;

        this.member = this.allMemberList.list.filter(x => x.id === id)[0];

        let popParameters = {
          memberId: id,
          needNoPrize: 'yes'
        }
        this.listLoading = true;
        getPrizedList( popParameters ).then(response => {
          this.listLoading = false;
          this.memberDrawRecord = response.data;
        });
      },
    }
  }
</script>
<style>
.pop-title {
  font-size: 18px;
  font-weight: 600;
}
.el-dialog--center .el-dialog__footer {
    text-align: right;
}
</style>


