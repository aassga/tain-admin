<template> 
  <el-dialog title="訂單跟踪"
             :visible.sync="visible"
             :before-close="handleClose"
             width="40%">
    <el-steps direction="vertical"
              :active="6"
              finish-status="success"
              space="50px">
      <el-step  v-for="item in logisticsList"
                :key="item.name"
                :title="item.name"
                :description="item.time"></el-step>
    </el-steps>
  </el-dialog>
</template>
<script>
  const defaultLogisticsList=[
    {name: '訂單已提交，等待付款',time:'2017-04-01 12:00:00 '},
    {name: '訂單付款成功',time:'2017-04-01 12:00:00 '},
    {name: '在北京市進行下級地點扫描，等待付款',time:'2017-04-01 12:00:00 '},
    {name: '在分拨中心廣东深圳公司進行卸车扫描，等待付款',time:'2017-04-01 12:00:00 '},
    {name: '在廣东深圳公司進行發出扫描',time:'2017-04-01 12:00:00 '},
    {name: '到达目的地網點廣东深圳公司，快件將很快進行派送',time:'2017-04-01 12:00:00 '},
    {name: '訂單已签收，期待再次為您服務',time:'2017-04-01 12:00:00 '}
  ];
  export default {
    name:'logisticsDialog',
    props: {
      value: Boolean
    },
    computed:{
      visible: {
        get() {
          return this.value;
        },
        set(visible){
          this.value=visible;
        }
      }
    },
    data() {
      return {
        logisticsList:Object.assign({},defaultLogisticsList)
      }
    },
    methods:{
      emitInput(val) {
        this.$emit('input', val)
      },
      handleClose(){
        this.emitInput(false);
      }
    }
  }
</script>
<style></style>


