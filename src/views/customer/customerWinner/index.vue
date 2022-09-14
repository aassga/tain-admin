<template> 
  <div class="app-container">
    <div class="table-container">
      <el-table ref="adminTable" :data="allMemberList" style="width: 100%;" v-loading="listLoading" border>
        <el-table-column label="序號" width="100" align="center">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column label="Line暱稱" width="120" align="center">
          <template slot-scope="scope">
            <a href="javascript:;"
              style="text-decoration: underline;"
              @click="handleShowMember( scope.row.memberId )">
              {{scope.row.lineName}}
            </a>
          </template>
        </el-table-column>
        <el-table-column label="中獎獎項" width="120" align="center">
          <template slot-scope="scope">{{scope.row.prizeName}}</template>
        </el-table-column>
        <el-table-column label="聯絡姓名" width="160" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="E-mail" align="center">
          <template slot-scope="scope">{{scope.row.email}}</template>
        </el-table-column>
        <el-table-column label="聯絡電話" width="120" align="center">
          <template slot-scope="scope">{{scope.row.phoneNumber}}</template>
        </el-table-column>
        <el-table-column label="聯絡地址" align="center">
          <template slot-scope="scope">{{scope.row.address}}</template>
        </el-table-column>

        <el-table-column label="中獎時間" width="150" align="center">
          <template slot-scope="scope">{{scope.row.recordTime}}</template>
        </el-table-column>

        <el-table-column label="獎品發送進度" align="center">
          <template slot-scope="scope">
            <el-input
              class="memo"
              placeholder="點擊以編輯"
              ref="ta"
              :class="{ 'onFocus': scope.row.onFocus }"
              v-model.trim="scope.row.remark"
              @focus="clickMemo( scope.$index )"
              @keyup.enter.native="keyupMemo()"
              @blur="blurMemo( scope.$index )"
              ></el-input>
              <div :id="'loading-' + scope.$index" class="lds-hourglass"></div>
          </template>
        </el-table-column>
      </el-table>
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
    <input style="height: 0px; width: 0px; border: none; font-size: 0; background-color: none; font-weight: 0; padding: 0; margin: 0;" id="unblur-target" type="text">
  </div>
</template>
<script>
  import { getPrizedList, getMember, updatePrizedRemark } from "@/api/pineapple";
  export default {
    name: 'customerWinner',
    watch: {
      "$store.state.campaign.selected": {
        handler: function( el ) {
          if ( el ) {
            this.getPrizedList();
          }
        },
        immediate: true // provides initial (not changed yet) state
      }
    },
    data() {
      return {
        total: null,
        listLoading: false,
        allMemberList: [],
        dialog: false,
        member: {
          name: '',
        },
        memberDrawRecord: null,
      }
    },
    created() {
      // this.getPrizedList();
    },
    methods: {
      getPrizedList(){
        this.listLoading = true;
        getPrizedList().then(response => {
          this.listLoading = false;
          this.allMemberList = response.data;
        });
      },
      handleShowMember( id ) {
        this.dialog = true;

        this.listLoading = true;
        getMember( id ).then(response => {
          this.listLoading = false;
          this.member = response.data;
        });

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
      keyupMemo() {
        console.log('hi');
        document.getElementById('unblur-target').focus();
      },
      blurMemo( index ) {
        // if ( !this.allMemberList[index]['remark'] ) {
        //   this.allMemberList[index].onFocus = false;
        //   let tmp = this.allMemberList[index]['remark'];
        //   this.allMemberList[index]['remark'] = ' ';
        //   this.allMemberList[index]['remark'] = tmp;
        //   return;
        // }
        document.getElementById('loading-' + index).style.display = "block";
        updatePrizedRemark( {
          "id": this.allMemberList[index]['id'],
          "remark": this.allMemberList[index]['remark'] ? this.allMemberList[index]['remark'] : ''
        } ).then(response => {
          this.$message({ type: 'success', message: '更新序号 '+ (index + 1) +' 成功！' });
          this.allMemberList[index].onFocus = false;
        }).catch((error) => {
          this.$message({ type: 'error', message: '更新序号 '+ (index + 1) +' 失敗！' });
          this.allMemberList[index].onFocus = true;
        }).then(() => {
          let tmp = this.allMemberList[index]['remark'];
          this.allMemberList[index]['remark'] = ' ';
          this.allMemberList[index]['remark'] = tmp;
          document.getElementById('loading-' + index).style.display = "none";
        });
      },
      clickMemo( index ) {
        this.allMemberList[index].onFocus = true;
        let tmp = this.allMemberList[index]['remark'];
        this.allMemberList[index]['remark'] = ' ';
        this.allMemberList[index]['remark'] = tmp;
      }
    }
  }
</script>
<style>
.pop-title {
  font-size: 18px;
  font-weight: 600;
}
.memo input {
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: pointer;
}

.memo.onFocus input {
    background-color: #fff;
    border-color: inherit;
    color: #606266;
}

.lds-hourglass {
  display: inline-block;
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
  display: none;
}
.lds-hourglass:after {
  content: " ";
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 2px;
  box-sizing: border-box;
  border: 0.6rem solid #adadad;
  border-color: #adadad transparent #adadad transparent;
  animation: lds-hourglass 1.2s infinite;
}
@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
.el-dialog--center .el-dialog__footer {
    text-align: right;
}
</style>
