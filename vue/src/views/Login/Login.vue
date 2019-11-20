<template >
  <div class="login-container">
    <div id="root">
      <div style="width: 100%; height: 937px;">
        <div class="container___28Rdf">
          <div class style="padding: 0;margin: 0;text-align: center;width: 100%;">
            <div style="display: inline-block;width: 250px;height: 70px;">
              <img
                src="../../../public/Image/gl_logo.png"
                style="display: inline-block;width: 250px;height: 70px;"
              />
            </div>
            <div
              class
              style="width: 100%;font-size: 13px;color: #a8a8a8;text-align: center;margin-top: 10px;"
            >合作伙伴系统V1.1</div>
          </div>
          <div v-if="islogin">
            <div class="main___apn1V" style="margin-top: 30px;">
              <form class="ant-form ant-form-horizontal login_form">
                <div class="ant-tabs ant-tabs-top tabs___1BMQr ant-tabs-line ant-tabs-no-animation">
                  <div role="tablist" class="ant-tabs-bar" tabindex="0">
                    <div class="ant-tabs-nav-container">
                      <span
                        unselectable="unselectable"
                        class="ant-tabs-tab-prev ant-tabs-tab-btn-disabled"
                      >
                        <span class="ant-tabs-tab-prev-icon"></span>
                      </span>
                      <span
                        unselectable="unselectable"
                        class="ant-tabs-tab-next ant-tabs-tab-btn-disabled"
                      >
                        <span class="ant-tabs-tab-next-icon"></span>
                      </span>
                      <div class="ant-tabs-nav-wrap">
                        <div class="ant-tabs-nav-scroll">
                          <div class="ant-tabs-nav ant-tabs-nav-animated">
                            <div
                              class="ant-tabs-ink-bar ant-tabs-ink-bar-no-animated"
                              style="display: block; transform: translate3d(0px, 0px, 0px); width: 136px;"
                            ></div>
                            <div
                              role="tab"
                              aria-disabled="false"
                              aria-selected="true"
                              class="ant-tabs-tab-active ant-tabs-tab"
                            >用户登录</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="ant-tabs-content ant-tabs-content-no-animated">
                    <div
                      role="tabpanel"
                      aria-hidden="false"
                      class="ant-tabs-tabpane ant-tabs-tabpane-active"
                    ></div>
                    <div
                      role="tabpanel"
                      aria-hidden="true"
                      class="ant-tabs-tabpane ant-tabs-tabpane-inactive"
                    ></div>
                  </div>
                </div>
                <div class="ant-row ant-form-item">
                  <div class="ant-form-item-control-wrapper">
                    <div class="ant-form-item-control">
                      <span class="ant-input-affix-wrapper">
                        <span class="ant-input-prefix">
                          <img
                            src="../../../public/Image/uname.png"
                            style="width: 15px;height: 15px;"
                          />
                        </span>
                        <input
                          type="text"
                          maxlength="11"
                          placeholder="请输入账号"
                          name="username"
                          id="name"
                          v-model="user['phone']"
                          class="ant-input ant-input-lg"
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <span></span>
                <div class="ant-row ant-form-item">
                  <div class="ant-form-item-control-wrapper">
                    <div class="ant-form-item-control">
                      <span class="ant-input-affix-wrapper">
                        <span class="ant-input-prefix">
                          <img
                            src="../../../public/Image/password.png"
                            style="width: 15px;height: 15px;"
                          />
                        </span>
                        <input
                          type="password"
                          placeholder="请输入密码"
                          v-model="user['psw']"
                          name="password"
                          id="password"
                          class="ant-input ant-input-lg"
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <div class="ant-row ant-form-item additional___34x0f">
                  <div class="ant-form-item-control-wrapper">
                    <div class="ant-form-item-control">
                      <button
                        type="submit"
                        @click.prevent="submit"
                        class="ant-btn submit___1vlqb ant-btn-primary ant-btn-lg"
                      >
                        <span>登录</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div class="forget" v-on:click="forgetpwd">忘记密码</div>
            </div>
          </div>
          <div v-else>
            <div class="main___apn1V" style="margin-top: 30px;">
              <form class="ant-form ant-form-horizontal login_form">
                <div class="ant-tabs ant-tabs-top tabs___1BMQr ant-tabs-line ant-tabs-no-animation">
                  <div role="tablist" class="ant-tabs-bar" tabindex="0">
                    <div class="ant-tabs-nav-container">
                      <span
                        unselectable="unselectable"
                        class="ant-tabs-tab-prev ant-tabs-tab-btn-disabled"
                      >
                        <span class="ant-tabs-tab-prev-icon"></span>
                      </span>
                      <span
                        unselectable="unselectable"
                        class="ant-tabs-tab-next ant-tabs-tab-btn-disabled"
                      >
                        <span class="ant-tabs-tab-next-icon"></span>
                      </span>
                      <div class="ant-tabs-nav-wrap">
                        <div class="ant-tabs-nav-scroll">
                          <div class="ant-tabs-nav ant-tabs-nav-animated">
                            <div
                              class="ant-tabs-ink-bar ant-tabs-ink-bar-no-animated"
                              style="display: block; transform: translate3d(0px, 0px, 0px); width: 136px;"
                            ></div>
                            <div
                              role="tab"
                              aria-disabled="false"
                              aria-selected="true"
                              class="ant-tabs-tab-active ant-tabs-tab"
                            >找回密码</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="ant-tabs-content ant-tabs-content-no-animated">
                    <div
                      role="tabpanel"
                      aria-hidden="false"
                      class="ant-tabs-tabpane ant-tabs-tabpane-active"
                    ></div>
                    <div
                      role="tabpanel"
                      aria-hidden="true"
                      class="ant-tabs-tabpane ant-tabs-tabpane-inactive"
                    ></div>
                  </div>
                </div>
                <div class="ant-row ant-form-item">
                  <div class="ant-form-item-control-wrapper">
                    <div class="ant-form-item-control">
                      <span class="ant-input-affix-wrapper">
                        <span class="ant-input-prefix">
                          <img
                            src="../../../public/Image/uname.png"
                            style="width: 15px;height: 15px;"
                          />
                        </span>
                        <input
                          type="text"
                          placeholder="请输入账号"
                          name="username"
                          id="name"
                          v-model="user['phone']"
                          class="ant-input ant-input-lg"
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <span></span>
                <div class="ant-row ant-form-item">
                  <div class="ant-form-item-control-wrapper">
                    <div class="ant-form-item-control">
                      <span class="ant-input-affix-wrapper">
                        <span class="ant-input-prefix">
                          <img
                            src="../../../public/Image/password.png"
                            style="width: 15px;height: 15px;"
                          />
                        </span>
                        <input
                          type="password"
                          placeholder="请输入密码"
                          v-model="user['psw']"
                          name="password"
                          id="password"
                          class="ant-input ant-input-lg"
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <div class="ant-row ant-form-item additional___34x0f">
                  <div class="ant-form-item-control-wrapper">
                    <div class="ant-form-item-control">
                      <button
                        type="submit"
                        @click.prevent="submit"
                        class="ant-btn submit___1vlqb ant-btn-primary ant-btn-lg"
                      >
                        <span>登录</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div class="forget" v-on:click="forgetpwd">去登陆</div>
            </div>
          </div>
        </div>

        <div
          class="partner_bottom"
          style="position: absolute;width: 100%;text-align:center;bottom: 10px;"
        >© 2013-2019 广州极联智能科技有限公司版权所有</div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../../router'

export default {
  data() {
    return {
      user: {
        phone: '',
        psw: ''
      },
      islogin: 'true',
      datas: {}
    }
  },
  methods: {
    submit() {
      if (!this.user.phone || !this.user.psw) {
        this.$alert('<strong>请输入账号或者密码</strong>', {
          dangerouslyUseHTMLString: true
        })
      } else {
        this.$PostAPI(this.$PostUrl.pickerlogin, this.user).then(res => {
          if (res.statusCode == 200) {
            //调用检验登录状态
            this.check()
            this.$message.success(res.message)
            //localStorage 一个类似cookie存值 这里为设置值
            localStorage.setItem('userInfo', JSON.stringify(res.data))
          } else {
            this.$message.error('账号或者密码错误')
          }
        })
      }
    },
    //检验登录状态
    check() {
      this.$PostAPI(this.$PostUrl.logincheck).then(ress => {
        if (ress.statusCode == 200) {
          //进主页
          router.push('/')
        } else if (ress.statusCode == 5001) {
          //重定向登录
        } else if (ress.statusCode == 5002) {
          //重定向到修改密码
        }
      })
    },
    forgetpwd() {
      this.islogin = !this.islogin
    }
  }
}
</script>

<style scoped>
.login-container {
  background-image: url('../../../public/Image/login_bg.png');
  -moz-background-size: 100% 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-color: #f0f3f7;
}
.login_form {
  margin: 0;
  /*padding: 30px;*/
  /*border: 1px solid #c0c0c0;*/
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  width: 380px;
  /*background-color: #FFFFFF;*/
  /*box-shadow: 10px 10px 5px 1px #a3a3a3;*/
}
.forget {
  float: right;
  color: #108de9;
}
</style>