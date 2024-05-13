<template>
  <div class="login-container">
    <el-row style="position: fixed; width: 100%; height: 100%; z-index: 2">
      <el-col :span="24" class="login-right" style="">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          auto-complete="off"
          class="login-form"
          label-position="top"
        >
          <div style="margin-bottom: 30px" class="flex">
            <!-- Logo -->
            <div
              style="
                color: #fff;
                font-size: 25px;
                font-weight: 900;
                line-height: 40px;
                width: 400px;
              "
            >
              <img
                style="width: 60px; vertical-align: middle; margin-right: 12px"
                src="@/assets/img/login_images/KTJ_Logo.png"
                alt=""
              />
              腾蛟后台管理系统
            </div>
          </div>
          <el-form-item prop="username" label="账号">
            <el-input
              style="width: 400px"
              v-model.trim="loginForm.username"
              @blur="changeUsername"
              v-focus
              auto-complete="off"
              placeholder="请输入用户名"
              tabindex="1"
              type="text"
            />
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input
              style="width: 400px"
              :key="passwordType"
              ref="password"
              v-model.trim="loginForm.password"
              :type="passwordType"
              auto-complete="off"
              placeholder="请输入密码"
              tabindex="2"
              @keyup.enter.native="handleLogin"
            />
          </el-form-item>

          <el-form-item>
            <el-button class="login-btn" type="primary" @click="handleLogin">
              <el-icon :size="20" color="#fff">
                <Right />
              </el-icon>
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="my-outbox" ref="wrap">
      <div class="my-inbox" ref="content">
        <div class="my-list">
          {{ text }}
        </div>
        <div class="my-list">
          客服电话:400-678-1126，佛山魁腾蛟科技有限公司 版权所有。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router/index.ts";
import { isPassword, getCodeImg } from "@/utils/validate";
import { getToken, removeToken } from "@/utils/auth.js";
import { getRouterList, getFavorites } from "@/api/common/router.js";
import { login } from "@/api/common/user.js";
import { baseSettings } from "@/stores/counter";
export default {
  name: "Login",
  directives: {
    focus: {
      inserted(el) {
        el.querySelector("input").focus();
      },
    },
  },
  data() {
    const validateUserName = (rule, value, callback) => {
      if ("" == value) {
        callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!isPassword(value)) {
        callback(new Error("密码不能少于6位"));
      } else {
        callback();
      }
    };
    return {
      store: baseSettings(),
      wrapWidth: 0,
      contentWidth: 0,
      text: "",
      width: "",
      codeUrl: "",
      title: this.$baseTitle,
      loginForm: {
        username: process.env.NODE_ENV === "development" ? "ktj" : "",
        password: process.env.NODE_ENV === "development" ? "admin123" : "",
        code: "",
        uuid: "",
        client_id: "web",
        client_secret: 123456,
        grant_type: "password",
        scope: "server",
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            validator: validateUserName,
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: validatePassword,
          },
        ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = (route.query && route.query.redirect) || "/";
      },
      immediate: true,
    },
  },
  created() {
    this.width = window.innerWidth;
  },
  mounted() {
    const that = this;
    // window.onresize = () => {
    //   return (() => {
    //     //这里写要操作的函数
    //     that.width = window.innerWidth;
    //   })();
    // };
    removeToken();
  },
  methods: {
    changeUsername() {
      // this.getCode();
    },
    getCode() {
      getCodeImg(this.loginForm.username).then((res) => {
        if (res.img == undefined) {
          this.codeUrl = "";
          return;
        }
        this.codeUrl = "data:image/gif;base64," + res.img;
        this.loginForm.uuid = res.uuid;
      });
    },
    // 显示密码
    showPwd() {
      this.passwordType === "password"
        ? (this.passwordType = "")
        : (this.passwordType = "password");
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    }, // 获取我的收藏
    getFavorites() {
      getFavorites().then((res) => {
        let tem = [];
        for (let i = 0; i < res.data.length; i++) {
          let json = {
            alwaysShow: true,
            children: [
              {
                alwaysShow: true,
                children: res.data,
                component: "Layout",
                hidden: false,
                id: 998,
                meta: { title: "我的常用", icon: "iconxitongguanli" },
                name: "/userm",
                path: "/",
                redirect: "system",
              },
            ],
            component: "Layout",
            hidden: false,
            id: 199998,
            meta: { title: res.data[i].meta.title, icon: "#" },
            name: res.data[i].name,
            path: res.data[i].path,
            redirect: "ilike",
          };
          tem.push(json);
        }
        let data = tem;
        this.routerList[this.routerList.length - 1]["children"] = tem;
      });
    },

    handleLogin() {
      // if (process.env.NODE_ENV === "development") {
      //   setTimeout(() => {
      //     this.$router.push("/index");
      //   }, 300);
      // }

      window.localStorage.setItem("username", this.loginForm.username);
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          const res = await login(this.loginForm);
          // 登录success
          if (res.code === 0) {
            window.localStorage.setItem("token", res.data);
          } else {
            this.loginForm.code = "";
            this.$message.error(res.msg);
          }
          getRouterList().then((res) => {
            if (res.code === 0) {
              const route = res.data;
              // children.forEach((item) => {
              //   item.children.forEach((item1) => {
              //     item1.component = "EmptyLayout";
              //   });
              // });
              console.log(route);
              this.store.setRoute(route);
              window.localStorage.setItem("routes", JSON.stringify(route));
              setTimeout(() => {
                this.$router.push("/index");
              }, 300);
            }
          });

          this.loading = false;
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
:deep(.el-form-item__label) {
  color: #fff;
}
:deep(.el-input) {
  --el-input-focus-border-color: rgb(233, 145, 23);
}
.input_sty {
  width: 400px;
  display: block;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-transition-delay: 99999s;
  -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
}
</style>
<style lang="scss" scoped>
.title-img {
  left: 5%;
  position: absolute;
  z-index: 2;
  top: 30%;
  margin-top: -106px;
}

.title-img img {
  width: 150px;
  margin-bottom: 50px;
}

.title-img .title-tips2::after {
  content: "";
  width: 30px;
  height: 7px;
  position: absolute;
  left: 0;
  margin-top: -30px;
  background: linear-gradient(
    90deg,
    #5e9ce4 0%,
    #3a74b7 0%,
    #2c7cc9 52%,
    #3496e6 100%
  );
}

.login-container {
  height: 100vh;
  width: 100vw;
  background: #000;
  background: url("@/assets/img/login_images/back.jpg");
  background-size: 100% 100%;

  background-repeat: no-repeat;

  .title {
    height: 50px;
    font-size: 25px;
    font-weight: 500;
    color: #fff;
  }

  .title-top {
    height: 10px;
    font-size: 18px;
    font-weight: 500;
    color: #ffffff;
    // position: absolute;
    // margin-top: -25px;
    display: block;
    line-height: 10px;
  }

  .login-code {
    position: absolute;
    left: 67%;
    width: 33%;
    top: 0;
  }

  .login-code-img {
    width: 100%;
    height: 45px;
  }

  .title-tips {
    font-size: 4vh;
    font-weight: 900;
    color: #fff;
    letter-spacing: 1vh;
  }

  .title-tips2 {
    font-family: "YouSheBiaoTiHei";
    font-weight: 500 !important;
    font-size: 30px !important;
  }

  .title-tips1 {
    height: 35px;
    margin-top: 10px;
    font-size: 25px;
    font-weight: 900;
    color: #3c81d9;
    margin-bottom: 10px;
  }

  .login-btn {
    cursor: pointer;
    margin-left: 175px;
    display: inherit;
    width: 50px;
    margin-top: 10px;
    height: 50px;
    border-radius: 30px;
    border: 1px solid rgba(0, 145, 255, 1);
    background: linear-gradient(135deg, #32c5ff 0%, #0091ff 100%) !important;
    color: #fff !important;

    &:hover {
      opacity: 0.9;
      border: 1px solid rgba(0, 145, 255, 1) !important;
      background: #ffffff00 !important;
      color: rgba(0, 145, 255, 1) !important;
    }
  }

  .login-form {
    position: fixed;
    left: 15%;
    width: 600px;
    top: 48%;
    margin-top: -248px;
    z-index: 2;
    // background: #fff;
    text-align: center;
    padding: 1% 2%;
    border-radius: 5px;
    // box-shadow: 0px -1px 35px 2px #427696;

    .forget-password {
      width: 100%;
      margin-top: 40px;
      text-align: left;

      \ .forget-pass {
        width: 129px;
        height: 19px;
        font-size: 20px;
        font-weight: 400;
        color: rgba(92, 102, 240, 1);
      }
    }
  }

  .tips {
    margin-bottom: 10px;
    font-size: $base-font-size-default;
    color: $base-color-white;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      margin: 0 auto 40px auto;
      font-size: 34px;
      font-weight: bold;
      color: $base-color-blue;
      text-align: center;
    }
  }

  .svg-container {
    // position: absolute;
    z-index: 999;
    font-size: 16px;
    color: #d7dee3;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 35px;
    height: 45px;
    // border-right: 1px solid #000;
    // border-left: 3px solid #0091FF;
    text-align: center;
    padding-top: 6px;
  }

  .show-pwd {
    position: absolute;
    top: 7px;
    margin-left: -30px;
    font-size: 16px;
    color: $base-font-color;
    cursor: pointer;
    user-select: none;
    right: 0;
    padding-right: 15px;
  }

  :deep(.el-form-item) {
    padding-right: 0;
    margin: 20px 2%;
    color: #454545;
    border-radius: 5px;
    float: left;
  }

  :deep(.el-form-item__content) {
    line-height: $base-input-height;
  }

  :deep(.el-form-item__error) {
    position: absolute;
    top: 100%;
    left: 18px;
    font-size: $base-font-size-small;
    line-height: 18px;
    color: $base-color-red;
  }

  input {
    height: 45px;
    padding-left: 45px;
    font-size: $base-font-size-default;
    line-height: 45px;
    color: #323d4e !important;
    background: #fff;
    border: 0;
    caret-color: #323d4e;
    border-radius: 20px;
  }
}

* {
  margin: 0;
  padding: 0;
  border: 0;
}

html,
body {
  margin: 0;
}

@-webkit-keyframes STAR-MOVE {
  from {
    background-position: 0% 0%;
  }

  to {
    background-position: 800px 0%;
  }
}

@keyframes STAR-MOVE {
  from {
    background-position: 0% 0%;
  }

  to {
    background-position: 800px 0%;
  }
}

.wall {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.login-right {
  height: 100%;
}

.line {
  width: 60%;
  height: 2px;
  margin-top: 3px;
  margin-left: 20%;
  text-align: center;
  background: linear-gradient(
    244deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 131, 242, 0.5) 40%,
    #fff 50%,
    rgba(0, 131, 242, 0.5) 60%,
    rgba(0, 131, 242, 0) 100%
  );
  box-shadow: 0 10px 55px 2px rgb(0 131 242 / 25%);
}

.my-outbox {
  // line-height: 43px;
  position: fixed;
  bottom: 30px;
  left: 10%;
  height: 43px;
  text-align: center;

  .my-inbox {
    // white-space: nowrap;
    position: absolute;
    font-size: 0;

    .my-list {
      display: inline-block;
      // height: 43px;
      line-height: 28px;
      color: #fff;
      font-size: 14px;
      font-weight: normal;
      min-width: 500px;
    }
  }
}
</style>

