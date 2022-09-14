<template> 
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>發貨列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="deliverOrderTable"
                style="width: 100%;"
                :data="list" border>
        <el-table-column label="訂單編號" width="180" align="center">
          <template slot-scope="scope">{{scope.row.orderSn}}</template>
        </el-table-column>
        <el-table-column label="收貨人" width="180" align="center">
          <template slot-scope="scope">{{scope.row.receiverName}}</template>
        </el-table-column>
        <el-table-column label="手机號碼" width="160" align="center">
          <template slot-scope="scope">{{scope.row.receiverPhone}}</template>
        </el-table-column>
        <el-table-column label="邮政編碼" width="160" align="center">
          <template slot-scope="scope">{{scope.row.receiverPostCode}}</template>
        </el-table-column>
        <el-table-column label="收貨地址" align="center">
          <template slot-scope="scope">{{scope.row.address}}</template>
        </el-table-column>
        <el-table-column label="配送方式" width="160" align="center">
          <template slot-scope="scope">
            <el-select placeholder="請選擇物流公司"
                       v-model="scope.row.deliveryCompany"
                       size="small">
              <el-option v-for="item in companyOptions"
                         :key="item"
                         :label="item"
                         :value="item">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="物流單號" width="180" align="center">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.deliverySn"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 15px;text-align: center">
        <el-button @click="cancel">取消</el-button>
        <el-button @click="confirm" type="primary">確定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import {deliveryOrder} from '@/api/order'
  const defaultLogisticsCompanies=["顺丰快递","圆通快递","中通快递","韵达快递"];
  export default {
    name: 'deliverOrderList',
    data() {
      return {
        list:[],
        companyOptions:defaultLogisticsCompanies
      }
    },
    created(){
      this.list= this.$route.query.list;
      //当list不為數組時转换為數組
      if(this.list instanceof Array===false){
        this.list=[];
      }
    },
    methods:{
      cancel(){
        this.$router.back();
      },
      confirm(){
        this.$confirm('是否要進行發貨操作?', '提示', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deliveryOrder(this.list).then(response=>{
            this.$router.back();
            this.$message({
              type: 'success',
              message: '發貨成功!'
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消發貨'
          });
        });
      }
    }
  }
</script>
<style></style>


