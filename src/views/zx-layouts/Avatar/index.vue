<template>
  <div class="avatarddddd">
    <div
      :title="'个人信息'"
      style="
        margin-top: 9px;
        margin-right: 10px;
        float: left;
        cursor: pointer;
        display: flex;
        align-items: center;
      "
      @click="showMyInfo"
    >
    <el-icon color="#fff"><User /></el-icon>
      <span style="color: #fff">账号</span>
    </div>
    <div
      :title="'退出'"
      style="
        margin-top: 9px;
        margin-right: 10px;
        float: left;
        display: flex;
        cursor: pointer;
        align-items: center;
      "
      @click="logout"
    >
    <el-icon color="#fff"><SwitchButton /></el-icon>
      <span style="color: #fff">退出</span>
    </div>

    <!-- 个人信息管理 -->
    <el-drawer
      title="个人信息管理"
      :visible.sync="myInfoDialog"
      :with-header="false"
      style="top: 45px"
      size="400px"
    >
      <div class="collection_top">个人信息管理</div>
      <div
        style="
          overflow: hidden;
          overflow-y: auto;
          border: 1px solid rgba(214, 214, 214, 1);
        "
        :style="{ height: OverallHeight + 200 + 'px' }"
      >
        <el-container style="margin-top: 0px">
          <el-aside width="80px"
            >
            <!-- <img
              style="
                width: 60px;
                height: 60px;
                margin-left: 10px;
                margin-top: 10px;
              "
              src="@/assets/owner.png"
          /> -->
        </el-aside>
          <el-main>
            <div class="titleInfo" v-if="myInfoDialog">
              <div>账号：{{ infoData.userName || "无" }}</div>
              <div>名称：{{ infoData.nickName || "无" }}</div>
              <div>部门：{{ infoData.dept.deptName || "无" }}</div>
              <div v-if="infoData.roles.length > 0">
                角色：{{ infoData.roles[0].roleName }}
              </div>
              <div v-if="infoData.roles < 1">角色：无</div>
            </div>
          </el-main>
        </el-container>
        <!-- <div style="width:80px;float: left;"><img style="width:60px;height:60px" src='@/assets/owner.png'/></div> -->
        <div class="editInfo">
          <div>
            <el-form
              ref="form"
              :model="infoData"
              :rules="userRules"
              label-width="80px"
            >
              <el-form-item label="手机号">
                <el-input v-model="infoData.phonenumber"></el-input>
              </el-form-item>
              <el-form-item label="邮件">
                <el-input v-model="infoData.email"></el-input>
              </el-form-item>
              <el-form-item label="证件类型">
                <el-select
                  v-model="infoData.cardType"
                  style="width: 220px"
                  clearable
                  placeholder="请选择证件类型"
                >
                  <el-option
                    v-for="item in userDialogForm.idTypeList"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="证件号码">
                <el-input v-model="infoData.cardNumber"></el-input>
              </el-form-item>
            </el-form>
            <div style="text-align: center">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="updateUser('form')"
                >保存</el-button
              >
              <el-button
                type="danger"
                icon="iconfont iconbianji"
                @click="resetPasswdFormVisible = true"
                plain
                >修改密码</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </el-drawer>

    <!-- 重置密码 -->
    <el-dialog
      v-dialogDrag
      title="修改密码"
      width="500px"
      :visible.sync="resetPasswdFormVisible"
      :modal="false"
    >
      <el-form
        :model="resetPasswdForm"
        :rules="resetPasswdRules"
        ref="resetPasswdRules"
        :inline="true"
      >
        <el-form-item
          label="重置密码"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input
            placeholder="默认888888"
            show-password
            clearable
            v-model="resetPasswdForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          icon="iconfont iconbianji"
          @click="changePass('resetPasswdRules')"
          >确 定</el-button
        >
        <el-button
          type="danger"
          plain
          icon="iconfont iconquxiao"
          @click="resetPasswdFormVisible = false"
          >取 消</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth.js";
// import {
//   sysidtype,
//   listUser,
//   updateUser,
//   resetUserPwd,
//   resetPwd,
//   treeselect,
//   uploadAvatar,
// } from "@/api/common/user.js";
import { rules } from "@/utils/rules";
export default {
  name: "Avatar",
  data() {
    return {
      formLabelWidth: "80px",
      resetPasswdFormVisible: false,
      myInfoDialog: false,
      infoData: {},
      userData: {}, //获取个人信息管理
      dialogImageUrl: "",
      dialogVisible: false,
      tokenId: "",
      fileList: [],
      imageUrl: "",
      resetPasswdForm: {
        password: "888888",
      },
      // 用户弹框矫正数据
      userRules: {
        // phonenumber: rules.phoneNumber(),
        email: rules.email(),
      },
      resetPasswdRules: {
        password: rules.password(),
      },
      userDialogForm: {
        idTypeList: [],
      },
    };
  },
  computed: {
    // ...mapGetters({
    //   avatar: "user/avatar",
    //   userName: "user/userName",
    //   OverallHeight: "settings/OverallHeight",
    //   nickName: "user/nickName",
    // }),
  },
  mounted() {
    this.tokenId = getToken();
    // sysidtype().then((res) => {
    //   this.userDialogForm.idTypeList = res.data;
    // });
  },
  methods: {
    //处理证件类型num转string
    handleChangeCardType() {
      this.userDialogForm.idTypeList.forEach((item) => {
        if (this.infoData.cardType == item.dictValue) {
          this.infoData.cardType = item.dictLabel;
        }
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    personalCenter() {
      this.$router.push("/personalCenter/personalCenter");
    },
    showMyInfo() {
      getUser(localStorage.getItem("user_id")).then((res) => {
        this.userData = res;
        this.infoData = res.data;
        this.handleChangeCardType();
      });
      this.myInfoDialog = !this.myInfoDialog;
    },
    logout() {
      //location.reload(); // 为了重新实例化vue-router对象 避免bug
      window.localStorage.removeItem("token");
      this.$router.replace(`/login`);
    },
    // 上传头像
    // uploadAvatar(data) {
    //   uploadAvatar(data).then((res) => {

    //     this.$message[res.code === 200 ? "success" : "error"](res.msg);
    //   });
    // },
    // 下载头像
    // downloadAvatar(data) {
    //   this.downloadImg("/api/system/file/download/" + data).then((data) => {
    //     this.imageUrl = "data:image/gif;base64," + data;
    //   });
    // },
    changePass(formName) {
      this.$refs[formName].validate((valid) => {
        let body;
        if (valid) {
          let body = {
            userId: this.infoData.userId,
            userName: this.infoData.userName,
            password: this.resetPasswdForm.password,
          };
          resetPwd(body).then((res) => {
            if (res.code == 200) {
              this.$baseMessage(res.msg, "success");
              localStorage.clear(); //清空token
              window.location.href = "/mrbs/login";
            } else {
              this.$baseMessage(res.msg, "error");
            }
            this.resetPasswdFormVisible = false;
          });
        }
      });
    },
    // 修改用户
    updateUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          try {
            if (this.infoData.cardType.length >= 2) {
              switch (this.infoData.cardType) {
                case "身份证":
                  this.infoData.cardType = "1";
                  break;
                case "军官证":
                  this.infoData.cardType = "2";
                  break;
                case "护照":
                  this.infoData.cardType = "3";
                  break;
                case "其他证件":
                  this.infoData.cardType = "4";
                  break;
              }
            }
          } catch (err) {}

          let body = {
            userId: this.infoData.userId,
            userName: this.infoData.userName,
            cardNumber: this.infoData.cardNumber,
            cardType: this.infoData.cardType,
            roleIds: this.userData.roleIds,
            idType: this.infoData.idType,
            idNumber: this.infoData.idNumber,
            phonenumber: this.infoData.phonenumber,
            email: this.infoData.email,
          };
          updateUser(body).then((res) => {
            if (res.code === 200) {
              this.$message.success(res.msg);
              this.myInfoDialog = false;
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },
    onError(file, fileList) {},
    onSuccess(file, fileList) {
      if (file.code === 200) {
        // this.imageUrl = file.data;
        this.uploadName = file.data;
        this.downloadAvatar(file.data.fileId);
        let data = {
          userId: parseInt(localStorage.getItem("user_id")),
          userName: this.infoData.userName,
          avatar: "/system/file/download/" + file.data.fileId,
        };
        this.uploadAvatar(data);
        this.$message.success("上传成功！");
      } else {
        this.$message.error("上传失败！");
        this.fileList = [];
      }
    },
    // 上传方法
    // handleRemove(file, fileList) {
    // },
    handlePreview(file) {},
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeAvatarUpload(file, fileList) {},
  },
};
</script>
<style lang="scss" scoped>
.el-dialog {
  .el-dialog__header i {
    color: #1890ff !important;
  }
}
.collection_top {
  border-left: 1px solid rgba(214, 214, 214, 1);
  width: 100%;
  height: 25px;
  line-height: 25px;
  text-align: center;
  color: rgba(76, 116, 144, 1);
}
.collection {
  text-align: center;
  margin: 15px auto;
  cursor: pointer;
  .collection_div {
    width: 45px;
    height: 45px;
    background-color: rgba(214, 227, 249, 1);
    margin-left: 27.5px;
    border-radius: 8px;
    line-height: 25px;
    font-size: 22px;
    position: relative;
  }
  .collection_div1 {
    line-height: 25px;
    color: rgba(0, 0, 0, 1);
    text-align: center;
    width: 100px;
  }
}
.Full-screen {
  cursor: pointer;
  color: #fff;
}
.titleInfo {
  width: 100%;
  div {
    width: 50%;
    float: left;
    margin-bottom: 10px;
  }
}
.editInfo {
  margin-top: 0px;
  display: flex;
  margin-left: 40px;
  .right {
    text-align: center;
    margin-left: 8em;
  }
}
.avatarImg {
  width: 162px;
}
.avatar-dropdown {
  padding: 0;
  height: 50px;
  display: flex;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: center;

  .user-avatar {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .user-name {
    margin-left: 5px;
    position: relative;
    margin-left: 5px;
    font-weight: 600;
    cursor: pointer;
  }
}
</style>

<style lang="scss">
.avatarddddd {
  padding-bottom: 8px;
  padding-left: 10px;

}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>