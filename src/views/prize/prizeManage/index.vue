<template>
   
  <div class="app-container">
    
    <el-card class="operate-container" shadow="never">
      
      <el-button style="float:right; position: relative; z-index: 10;" type="primary" v-if="!editMode" @click="updateAllData()" size="small">更 新</el-button>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form ref="form">
            <el-form-item label="活動開關:">
              <el-radio-group v-model="allActInfo.enable" :disabled="!editMode">
                <el-radio :label="true">開啟</el-radio>
                <el-radio :label="false">關閉</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <el-form ref="form" :disabled="!editMode">
            <el-form-item label="開始時間">
              <el-date-picker type="datetime" v-model="allActInfo.startTime" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-form ref="form" :disabled="!editMode">
            <el-form-item label="結束時間">
              <el-date-picker type="datetime" v-model="allActInfo.endTime" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>

    <!-- <br>
    <div v-if="editMode">
      <el-button
        style="float:right;"
        type="primary"
        @click="handleUpdateAct()"
        size="small"
        >
        保 存
      </el-button>
    </div>
    <br><br> -->

    <div class="table-container">
      <el-table
        ref="adminTable"
        :data="allPrizeList"
        style="width: 100%"
        v-loading="listLoading"
        border
      >

        <el-table-column label="操作" width="60" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       :disabled="!editMode"
                       @click="handleDeletePrize(scope.$index)">
            刪除
            </el-button>
          </template>
        </el-table-column>

        <el-table-column label="獎項" width="180" align="center">
          <template slot-scope="scope">
            <el-input :disabled="!editMode" v-model="scope.row.title"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="圖片（需確認有圖片）" width="180" align="center">
          <template slot-scope="scope">
            <el-input :disabled="!editMode" v-model="scope.row.picUrl"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="是否有獎品" width="120" align="center">
          <template slot-scope="scope">
            <el-switch
              :disabled="!scope.row.new"
              :active-value="false"
              :inactive-value="true"
              v-model="scope.row.isNoPrize"
            >
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="活動總數上限" align="center">
          <template slot-scope="scope">
            <el-input :disabled="!editMode" v-model="scope.row.total"></el-input>
            <!-- <el-input v-model="scope.row.total" :disabled="true"></el-input> -->
          </template>
        </el-table-column>

        <el-table-column label="單日總數上限" align="center">
          <template slot-scope="scope">
            <el-input :disabled="!editMode" v-model="scope.row.dayLimit"></el-input>
          </template>
        </el-table-column>

        <el-table-column :label="'中獎幾率 '+this.percentage+'%'" align="center">
          <template slot-scope="scope">
            <el-input :disabled="!editMode" v-model="scope.row.weight" placeholder="請輸入內容">
              <template slot="append">%</template>
            </el-input>
          </template>
        </el-table-column>

        <el-table-column label="活動剩餘總數" align="center">
          <template slot-scope="scope">
            <el-input :disabled="!editMode" v-model="scope.row.leftCount"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="當日剩餘總數" align="center">
          <template slot-scope="scope">
            <el-input :disabled="!editMode" v-model="scope.row.dayLeftCount"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="累積送出數量" align="center">
          <template :disabled="!editMode" slot-scope="scope">{{ scope.row.outCount }}</template>
        </el-table-column>
      </el-table>
    </div>

    <div class="table-container">
      <el-row :gutter="10">
        <el-col :span="10"
          ><el-alert title="數量設置為 -1 時，代表為無上限。" type="error"></el-alert
        ></el-col>
      </el-row>
    </div>

    <div class="pagination-container" style="float:left" v-if="editMode">
      <el-button type="primary" @click="handleAddPrize()" size="small">新 增</el-button>
    </div>

    <div class="pagination-container">
      <el-button v-if="!editMode" @click="editMode = true" type="primary" size="small">編 輯</el-button>
      <el-button v-if="editMode" @click="updateCancel()" size="small">取 消</el-button>
      <el-button v-if="editMode" type="primary" @click="handleUpdate()" size="small">保 存</el-button>
    </div>



    <br><br><br><br><br><br><br><br><br><br>
  </div>
</template>
<script>
import { getPrizeList, getActInfo, updatePrizeAll, updateAct, deletePrize } from "@/api/pineapple";

function add(num1, num2) {
  const num1Digits = (num1.toString().split('.')[1] || '').length;
  const num2Digits = (num2.toString().split('.')[1] || '').length;
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
  return (num1 * baseNum + num2 * baseNum) / baseNum;
}

export default {
  name: "prizeManage",
  watch: {
    "$store.state.campaign.selected": {
      handler: function( el ) {
        if ( el ) {
          this.getActInfo(); // 取得活動配置
          this.getPrizeList(); // 取得獎項配置
        }
      },
      immediate: true // provides initial (not changed yet) state
    }
  },
  data() {
    return {
      listLoading: false,
      editMode: false,
      allActInfo: [],
      allPrizeList: [],
    };
  },
  computed: {
    percentage() {
      let percentage = 0;
      this.allPrizeList.forEach(function( el ) {
        percentage = add( percentage, el.weight );
      });
      return percentage;
    },
  },
  created() {
    // this.getActInfo(); // 取得活動配置
    // this.getPrizeList(); // 取得獎項配置
  },
  methods: {
    updateAllData() {
        this.getPrizeList(); // 取得獎項配置
        this.$message({
          type: 'info',
          message: '已更新累積送出數量！'
        });
    },
    updateCancel() {
      this.editMode = false;
      this.getPrizeList(); // 取得獎項配置
    },
    // 取得活動配置
    getActInfo() {
      this.listLoading = true;
      getActInfo().then((response) => {
        this.listLoading = false;
        this.allActInfo = response.data;
      });
    },
    // 全部更新
    handleUpdate() {
      this.$confirm('是否要更新?', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if ( this.percentage !== 100 ) {
          this.$message({
            type: 'error',
            message: '中獎幾率有誤，請重新分配！'
          });
          return;
        }

        let validationCount = 0;
        this.allPrizeList.forEach(function( el ) {
          if ( el.weight.toString().indexOf('.') > 0 ) {
            if ( el.weight.toString().substring( el.weight.toString().indexOf('.') + 1 ).length > 4 ) {
              validationCount ++;              
            }
          }
        });
        if ( validationCount > 0 ) {
          this.$message({
            type: 'error',
            message: '小數不得超過四位！'
          });
          return;
        }

        updatePrizeAll(this.allPrizeList).then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.editMode = false;
          this.getPrizeList();
        });

        updateAct( this.allActInfo.id, this.allActInfo).then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.editMode = false;
          this.getActInfo();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改'
        });
      });
    },
    // 取得獎項配置
    getPrizeList() {
      this.listLoading = true;
      getPrizeList().then((response) => {
        this.listLoading = false;
        this.allPrizeList = response.data;
      });
    },
    // 刪除獎項
    handleDeletePrize( index ) {
      // this.deleteItemId.push( index );
      this.allPrizeList.splice( index, 1 );
    },
    // 新增獎項
    handleAddPrize() {
      this.allPrizeList.push(JSON.parse( '{"title":"","total":0,"leftCount":0,"dayLimit":0,"dayLeftCount":0,"weight":0,"picUrl":"","isNoPrize":false,"detail":"", "new": "true"}' ));
    },
  },
};


</script>
<style>
input {
  text-align: center;
}
</style>
