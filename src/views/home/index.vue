<template>
  <div class="app-container">

    <el-card class="filter-container" shadow="never">
      <!-- <el-button style="float:right; position: relative; z-index: 10;" @click="getHomeCount()" type="primary" size="small">更 新</el-button> -->
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form ref="form">
            <el-form-item label="開始">
              <el-date-picker type="date" v-model="allActInfo.startTime" value-format="yyyy-MM-dd"> </el-date-picker>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="5">
          <el-form ref="form">
            <el-form-item label="結束">
              <el-date-picker type="date" v-model="allActInfo.endTime" value-format="yyyy-MM-dd"> </el-date-picker>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="2">
          <el-form ref="form">
            <el-form-item label="">
              <el-button type="primary" @click="getHomeCount()" size="small">查 詢</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>

    <div class="total-layout">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="total-frame">
            <img src="@/assets/images/user.png" class="total-icon">
            <div class="total-title">活動總人數</div>
            <div class="total-value">{{HomeData.totalMember}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="total-frame">
            <img src="@/assets/images/share.png" class="total-icon">
            <div class="total-title">總分享次數</div>
            <div class="total-value">{{HomeData.totalShare}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="total-frame">
            <img src="@/assets/images/lottery.png" class="total-icon">
            <div class="total-title">總抽獎次數</div>
            <div class="total-value">{{HomeData.totalDraw}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
    
    <div class="un-handle-layout">
      <div class="layout-title">中獎數據</div>
      <div class="un-handle-content">
        <el-row :gutter="20">
          <el-col :span="12" v-for="item in HomeData.prizeCount" :key="item.prizeId">
            <div class="un-handle-item">
              <span class="font-medium">{{ item.prizeName }}</span>
              <span style="float: right" class="color-danger">{{ item.drawCount }}({{ item.probability }})</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="overview-layout">
      <el-row :gutter="20">

        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">單日有效分享分析 （ {{ singleDayAni }} ）</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="8" class="color-danger overview-item-value">{{ HomeData.yesterdayShare }}</el-col>
                <el-col :span="8" class="color-danger overview-item-value">{{ HomeData.todayShare }}</el-col>
                <el-col :span="8" class="color-danger overview-item-value">{{ HomeData.todayShareGrowRate }}</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="8" class="overview-item-title">前日有效分享</el-col>
                <el-col :span="8" class="overview-item-title">當日有效分享</el-col>
                <el-col :span="8" class="overview-item-title">有效分享成長率</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">單日新增人數分析 （ {{ singleDayAni }} ）</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="8" class="color-danger overview-item-value">{{ HomeData.yesterdayMember }}</el-col>
                <el-col :span="8" class="color-danger overview-item-value">{{ HomeData.todayMember }}</el-col>
                <el-col :span="8" class="color-danger overview-item-value">{{ HomeData.todayMemberGrowRate }}</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="8" class="overview-item-title">前日新增人數</el-col>
                <el-col :span="8" class="overview-item-title">當日新增人數</el-col>
                <el-col :span="8" class="overview-item-title">新增人數成長率</el-col>
              </el-row>
            </div>
          </div>
        </el-col>

      </el-row>
    </div>

  </div>
</template>

<script>
  import { getHomeCount, getActInfo } from "@/api/pineapple";
  export default {
    name: 'home',
    watch: {
      "$store.state.campaign.selected": {
        handler: function( el ) {
          if ( el ) {
            this.getActInfo();
          }
        },
        immediate: true // provides initial (not changed yet) state
      }
    },
    data() {
      return {
        singleDayAni: '-',
        allActInfo: {
          "startTime": null,
          "endTime": null,
        },
        HomeData: {
          todayMember: '-',
          todayMemberGrowRate: '-',
          todayShare: '-',
          todayShareGrowRate: '-',
          totalDraw: '-',
          totalMember: '-',
          totalShare: '-',
          yesterdayMember: '-',
          yesterdayShare: '-'
        },
      }
    },
    created(){
      // this.getActInfo();
    },
    mounted() {
      var d1 = new Date(); 
      var d2 = new Date(d1); 
      d2.setMonth(d2.getMonth()-1); 
      d2.setDate(d2.getDate()-1); 

      // this.allActInfo.startTime = this.formatDate( d2 );
      this.allActInfo.endTime = this.formatDate( d1 );
    },
    methods:{
      // 取得活動配置
      getActInfo() {
        this.listLoading = true;
        getActInfo().then((response) => {
          this.listLoading = false;
          this.allActInfo.startTime = response.data.startTime.substring(0, 10);
          this.allActInfo.endTime = response.data.endTime.substring(0, 10);
          this.getHomeCount();
        });
      },
      getHomeCount() {

        if ( this.allActInfo.startTime > this.allActInfo.endTime ) {
          this.$message({
            type: 'error',
            message: '結束日期應大於開始日期！'
          });
          return;
        }

        this.listLoading = true;
        getHomeCount( this.allActInfo ).then(response => {
          this.listLoading = false;
          this.HomeData = response.data;
          this.singleDayAni = this.allActInfo.endTime;
        });
      },
      formatDate(date) {
          var d = new Date(date),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();

          if (month.length < 2) 
              month = '0' + month;
          if (day.length < 2) 
              day = '0' + day;

          return [year, month, day].join('-');
      }
    }
  }
</script>

<style scoped>
  .app-container {
    margin-top: 40px;
    margin-left: 120px;
    margin-right: 120px;
  }

  .address-layout {
  }

  .total-layout {
    margin-top: 20px;
  }

  .total-frame {
    border: 1px solid #DCDFE6;
    padding: 20px;
    height: 100px;
  }

  .total-icon {
    color: #409EFF;
    width: 60px;
    height: 60px;
  }

  .total-title {
    position: relative;
    font-size: 16px;
    color: #909399;
    left: 70px;
    top: -50px;
  }

  .total-value {
    position: relative;
    font-size: 18px;
    color: #606266;
    left: 70px;
    top: -40px;
  }

  .un-handle-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }

  .layout-title {
    color: #606266;
    padding: 15px 20px;
    background: #F2F6FC;
    font-weight: bold;
  }

  .un-handle-content {
    padding: 20px 40px;
  }

  .un-handle-item {
    border-bottom: 1px solid #EBEEF5;
    padding: 10px;
  }

  .overview-layout {
    margin-top: 20px;
  }

  .overview-item-value {
    font-size: 24px;
    text-align: center;
  }

  .overview-item-title {
    margin-top: 10px;
    text-align: center;
  }

  .out-border {
    border: 1px solid #DCDFE6;
  }

  .statistics-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }
  .mine-layout {
    position: absolute;
    right: 140px;
    top: 107px;
    width: 250px;
    height: 235px;
  }
  .address-content{
    padding: 20px;
    font-size: 18px
  }
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: auto;
}
</style>

