<template>
  <header class="head">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="getCollapse">
      <i class="el-icon-menu"></i>
    </div>

    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">{{$route.name}}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <!-- <div class="company"></div> -->
    <div class="top-nav">
      <!-- <el-dialog class="qrcodestyle" :close-on-click-modal="false" :show-close="false" :visible.sync="addCode" width="20%" center>
                <span>
                    <div style="text-align:center"> <img style="width:200px;height:200px" :src="messager.qrcode"></div>
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button style="margin-top:30px;width:200px" type="danger" @click="closeAdd">关闭</el-button>
                </span>
      </el-dialog>-->
      <!-- 是否删除用户 -->
      <!-- <el-dialog class="deleteStyle" title="删除用户" :visible.sync="newsUser.deleteUser" width="20%"  center>
                <div style="text-align:center">
                <span>
                    删除该用户后，该用户将不再接收系统通知
                </span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="newsUser.deleteUser= false">取消</el-button>
                     <el-button type="danger" @click="sureDelete" :loading="newsUser.isloading2">确认</el-button>
                </span>
      </el-dialog>-->
      <!-- ↑↑↑消息管家专区 -->

      <!--退出or设置-->
      <template>
        <!-- <div
          v-if="userInfo.agent_level>0||userInfo.sys_role==1"
          style="font-size:18px;"
        >邀请码:{{userInfo.invite_code}}</div>-->
        <div style="font-size:18px;">{{userInfo.nick_name}}</div>
        <el-dropdown placement="bottom" @command="handleCommand">
          <span style="font-size:22px" class="el-dropdown-link">
            {{userInfo.picker_name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="0">退出登陆</el-dropdown-item>
            <el-dropdown-item command="1">修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </div>
    <!-- 修改密码弹窗 -->
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="25%">
      <el-form ref="form" :model="form" label-width="95px">
        <el-form-item label="旧密码">
          <el-input maxlength="20" size="mini" v-model="form['old_psw']" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input
            maxlength="20"
            size="mini"
            v-model="form['psw']"
            placeholder="请输入新密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input
            maxlength="20"
            size="mini"
            v-model="form['psw2']"
            placeholder="请再次输入新密码"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changPsw()">确 定</el-button>
      </span>
    </el-dialog>
  </header>
</template>
<script>
import router from '../../router'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Head',
  data() {
    return {
      userInfo: '',
      addCode: false,
      newsSteward: false,
      dialogVisible: false,
      mid: '',
      form: {
        old_psw: '',
        psw: '',
        psw2: ''
      },
      // 消息管家数据
      open_id: '',
      messager: {
        qrcode: ''
      },
      newsUser: {
        deleteUser: false,
        userList: [],
        added: '',
        isloading: false,
        isloading2: false
      }
    }
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo')) //获取网页缓存数据
    this.getMid()
  },

  computed: {
    // picker_name: function() {
    //     var userInfo = localStorage.getItem("userInfo");
    //     return typeof userInfo == "string"
    //         ? JSON.parse(userInfo).picker_name
    //         : userInfo.picker_name;
    // },
    ...mapState({
      companyValue: state => state.companyValue
    })
  },
  methods: {
    getMid() {
      var mid = localStorage.getItem('userInfo')
      this.mid = typeof mid == 'string' ? JSON.parse(mid).id : mid.id
      // console.error(this.mid)
    },
    handleCommand(e) {
      console.log(e)
      // console.log(123);
      if (e == 0) {
        this.$PostAPI(this.$PostUrl.pickerloginOut).then(res => {
          if (res.statusCode == 200) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.$router.push('/')
          }
        })
      } else {
        this.dialogVisible = true
        this.form = {}
      }
    },
    andleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    ...mapActions(['getCollapse', 'getCompanyValue']), //简写
    changeLangEvent() {
      console.log(this.$i18n)
      console.log(1111)
      // this.baseLan()
      if (this.language == 'EN') {
        localStorage.setItem('locale', 'zh')
        this.$i18n.locale = localStorage.getItem('locale')
        this.$message({
          message: '切换为中文！',
          type: 'success'
        })
        localStorage.setItem('lang', 'ZH')
        this.language = 'ZH'
        location.reload()
      } else if (this.language == 'ZH') {
        localStorage.setItem('locale', 'en')
        this.$i18n.locale = localStorage.getItem('locale')
        this.$message({
          message: 'Switch to English!',
          type: 'success'
        })
        localStorage.setItem('lang', 'EN')
        this.language = 'EN'
        location.reload()
      }
    },
    changPsw() {
      console.log('点击了更改密码')
      this.$PostAPI(this.$PostUrl.pickerupdatePsw, this.form).then(res => {
        if (res.statusCode == 200) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.$router.push('/')
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }
}
</script>
<style scoped>
.lan {
  display: inline-block;
  cursor: pointer;
  width: 22px;
  height: 22px;
  font-size: 12px;
  line-height: 22px;
  text-align: center;
  background: #fff;
  border-radius: 50%;
  color: #24292e;
}
.massagestyle {
  min-height: 600px;
  max-height: 600px;
  overflow: hidden;
  overflow-y: auto;
}
</style>
