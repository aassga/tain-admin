<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>

    <div class="navbarSelectCampaign">
      <el-select v-model="campaign.selectedValue" placeholder="請選擇" size="small" style="width: 80%;" @change="selectChange">
        <el-option v-for="(item, index) in campaign.campaignList" :label="item.name" :key="index" :value="item.id"></el-option>
      </el-select>
      <!-- &nbsp;&nbsp;<el-button type="primary" @click="dialog = true;" size="small">新 增</el-button> -->
    </div>

    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="avatar">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            返回首頁
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dialog
      title="新增活動"
      style="padding-bottom: 6vh; margin-top: -6vh;"
      :visible.sync="dialog"
      :show-close="true"
      :center="true"
      width="30%">
      <div class="table-container">
        <el-input v-model="campaignName" class="input-width" placeholder="活動名稱" clearable></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button  @click="createAct()" type="primary" size="small">新 增</el-button>
      </span>
    </el-dialog>
    
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { createAct } from "@/api/pineapple";

export default {
  data() {
    return {
        dialog: false,
        campaignName: ''
    }
  },
  created() {
    this.$store.commit('SET_ACTLIST');
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'campaign'
    ]),
  },
  mounted() {
    // this.createAct();
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 為了重新實例化vue-router對象 避免bug
      })
    },
    selectChange( id ) {
      this.$store.dispatch('ToggleSelected', id);
    },
    createAct() {
      if ( !this.campaignName ) {
        this.$message({
          type: 'error',
          message: '三思，名稱不得為空！'
        });
        return;
      }
      this.dialog = false;
      this.listLoading = true;
      createAct({ "name": this.campaignName }).then((response) => {
        this.listLoading = false;
        this.$store.commit('SET_ACTLIST');
        this.selectChange(this.campaign.campaignList.length + 1);
        this.campaignName = '';
      });
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
<style lang="css">
  .navbarSelectCampaign {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    min-width: 600px;
    text-align: center;
  }
  .navbarSelectCampaign input {
    font-size: 19px;
    font-weight: 600;
  }
  .navbar .el-dialog--center .el-dialog__footer {
      text-align: right;
  }
</style>

