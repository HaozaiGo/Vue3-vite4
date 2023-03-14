<template>
  <div class="nav-bar-container">
    <el-row :gutter="15">
      <el-col :xs="4" :sm="10" :md="10" :lg="10" :xl="10">
        <!-- <el-menu
          ref="elMenu"
          class="el-menu-navbar"
          mode="horizontal"
          style="position: absolute; background: transparent !important"
          menu-trigger="hover"
          default-active="0"
        >
          <el-menu-item index="1" style="width: 60px" @click="handleCollapse">
            <slot name="title">
              <span
                style="
                  color: #fff;
                  float: left;
                  font-size: 21px;
                  margin-left: -10px;
                  line-height: 43px;
                "
              >
                <img
                  src="@/assets/img/shuidian/headerLogo.png"
                  alt=""
                  style="width: 50px; vertical-align: sub"
                />
                水电综合计费监管系统
              </span>
              <i
                style="
                  font-size: 32px;
                  line-height: 47px !important;
                  margin-left: -5px;
                  display: block;
                  margin-top: -1px;
                  cursor: pointer;
                  display: none;
                "
                :class="
                  collapse ? 'iconfont iconyouhua' : 'iconfont iconzuocelan'
                "
                :title="collapse ? '展开' : '收起'"
              />
            </slot>
          </el-menu-item>
        </el-menu> -->

        <div class="topBg">
          <span style="
                          color: #fff;
                          float: left;
                          font-size: 21px;
                          margin-left: -10px;
                          line-height: 43px;
                        ">
            <img src="@/assets/img/shuidian/headerLogo.png" alt="" style="width: 50px; vertical-align: sub" />
            水电综合计费监管系统
          </span>
        </div>


      </el-col>
      <el-col :xs="16" :sm="14" :md="14" :lg="14" :xl="14" style="float: right">
        <div class="right-panel">
          <span class="auth" v-show="sysAuthStatusVO.sysAuthStatus != 1" @click="toRegister">
            <i style="font-size: 19px" class="el-icon-warning"></i>
            <span>{{ sysAuthStatusVO.message }}</span>
          </span>
          <span style="margin-right: 11px; color: #fff; cursor: pointer" @click="refreshRoute">
            <!-- <vab-icon title="重载所有路由" :pulse="pulse" :icon="['fas', 'redo']" /> -->
            <el-icon><Refresh /></el-icon>
            <span>刷新</span>
          </span>

          <div :title="'警告'" style="cursor: pointer" class="warning" @click="handleShowAlarm">
            <el-icon><Bell /></el-icon>
           
              <span style="color: #fff">告警
                <span style="color: #f56c6c">({{ windowAlarmListLength }})</span>
              </span>
           
          </div>
          <div :title="'收藏'" style="cursor: pointer;margin-left: 10px;" class="warning" @click="handleShowCollection">
            <el-icon><Memo /></el-icon>
            
              <span style="color: #fff">收藏</span>
          
          </div>
          <avatar />
          <!--  <vab-icon
            title="退出系统"
            :icon="['fas', 'sign-out-alt']"
            @click="logout"
          />-->
        </div>
      </el-col>
    </el-row>
    <!-- 最新告警框 -->
    <el-drawer title="我是标题" v-model="showAlarm" :with-header="false" style="top: 45px; z-index: 8888" size="25%">
      <div class="alarmContent">
        <div class="flex">
          <span class="alarmStaus">告警概况</span>
          <el-button type="primary" @click="editAlarm">
            <i class="iconfont iconbaojingshezhi"></i>
            告警设置
          </el-button>
          <!-- <el-button
            type="success"
            plain
            icon="iconfont iconjiechubangding"
            @click="clearAlarmStatusBatch"
          >
            批量解除
          </el-button> -->
        </div>

        <div class="flex-sb alarmRow2">
          <el-form :inline="true">
            <el-form-item style="margin-bottom: 0px">
              <el-input v-model="alarmSearch" placeholder="需要查找的设备编号" />
            </el-form-item>
            <el-form-item style="margin-bottom: 0px">
              <el-button type="primary" size="mini" icon="iconfont iconsousuo" @click="query">
                查询
              </el-button>
            </el-form-item>
          </el-form>
          <!-- <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            style="margin-right: 10px"
            @change="handleCheckAllChange"
          >
            全选
          </el-checkbox> -->
        </div>
        <!-- item -->
        <div class="boxOfItem" id="listBox">
          <div class="alarmItem" v-for="(item, index) in windowAlarmList" :key="index">
            <div class="" @click="handleLinkTo(item)">
              <div>
                <span class="alarmTag">严重</span>
                <span class="alarmTypeText">
                  {{ item.meterCatDictText }}
                  -
                  {{
                    item.collectAlarmTypeDictText || item.runAlarmTypeDictText
                  }}
                </span>
              </div>
              <div class="row2 flex">
                <el-tooltip class="item" effect="dark" :content="item.meterAddr" placement="bottom">
                  <div style="
                              flex: 1;
                              white-space: nowrap;
                              overflow: hidden;
                              text-overflow: ellipsis;
                            ">
                    仪表地址:{{ item.meterAddr }}
                  </div>
                </el-tooltip>
                <div style="flex: 1" class="online">
                  {{ item.meterCatDictText }}编码:{{ item.deviceCode }}
                </div>
              </div>
              <div class="row3 flex">
                <span style="flex: 1" class="online">仪表型号:{{ item.meterModelCode }}</span><span style="flex: 1"
                  class="online">采集器:{{ item.collectorUniqueCode }}
                  {{
                    item.commBranch ? "(" + item.commBranch + ")" : "--"
                  }}</span>
              </div>
              <div class="row4">
                <el-tooltip class="item" effect="dark" :content="item.remark" placement="bottom">
                  <span style="flex: 1">详细描述:{{ item.remark }}</span>
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>

    <!-- 上一代告警 2022-2 更新 -->
    <div class="alarmDrawer" @mouseover="mouseover" @mouseleave="mouseLeave" v-if="false">
      <div class="alarmWidth">
        <!-- v-show="showAlarm" -->
        <div class="topSetting">
          <el-button type="primary" icon="iconfont iconbaojingshezhi" @click="editAlarm">
            告警设置
          </el-button>

          <div class="rightBottom">
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" style="margin-right: 10px"
              @change="handleCheckAllChange">
              全选
            </el-checkbox>

            <el-button type="success" plain icon="iconfont iconjiechubangding" @click="clearAlarmStatusBatch">
              批量解除
            </el-button>
          </div>
        </div>

        <!-- 搜索告警类型 -->
        <div class="searchAlarm">
          <el-form :inline="true">
            <el-form-item>
              <el-input v-model="alarmSearch" placeholder="需要查找的水表编号" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" icon="iconfont iconsousuo" @click="query">
                查询
              </el-button>
            </el-form-item>
          </el-form>
        </div>

        <!-- 异常过多 -->
        <div v-if="windowAlarmList.length > 100" class="tipAlarm">
          告警数据过多，请尽快处理
        </div>
        <!-- warnList -->
        <div v-for="(item, index) in windowAlarmList" :key="index" class="text item">
          <!-- item -->
          <div class="everyItem">
            <div class="itemTop">
              <el-checkbox-group v-model="checkedAlarm" @change="handleCheckedAlarmChange">
                <el-checkbox :label="item">
                  <span class="alarmTypeText">{{
                    item.alarmTypeDictText
                  }}</span>
                </el-checkbox>
              </el-checkbox-group>
              <el-button type="success" icon="iconfont iconjiechubangding" plain @click="clearAlarmStatus(item)">
                解除
              </el-button>
            </div>
            <div>
              <p>编号：{{ item.waterMeterNumber }}</p>
              <p>名称：{{ item.waterMeterName }}</p>
              <p>时间：{{ item.happenTime }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 删除告警弹框 -->
    <ake-delete-dialog message="确认永久解除？" @delete="deleteAlarmData" :dialogDelete="dialogDelete"
      @close="dialogAlarmDataNoForever" @cancel="dialogCancel"></ake-delete-dialog>
    <!--收藏 -->
    <el-drawer title="收藏" :visible.sync="showCollection" :with-header="false" style="top: 45px" size="100px">
      <div class="collection_top">我的收藏</div>
      <div style="
                  overflow: hidden;
                  overflow-y: auto;
                  border: 1px solid rgba(214, 214, 214, 1);
                " :style="{ height: OverallHeight + 200 + 'px' }">
        <div class="collection" v-for="(item, index) in collection" @click="goLink(item)" :key="index">
          <div class="collection_div">
            <svg class="icon indexIcon">
              <use :xlink:href="item.meta.icon"></use>
            </svg>
          </div>
          <div class="collection_div1">{{ item.meta.title }}</div>
        </div>
      </div>
    </el-drawer>
    <!-- 设置告警 -->
    <el-dialog v-dialogDrag title="告警设置" :visible.sync="dialogVisible" width="25%">
      <div style="padding: 0 40px">
        <el-form>
          <el-form-item>
            <el-switch v-model="setAlarm.voiceStatus" active-text="开启语音" inactive-text="关闭语音" active-color="#13ce66" />
          </el-form-item>
          <el-form-item label="是否弹幕">
            <el-radio v-model="setAlarm.showWindowStatus" :label="1">
              是
            </el-radio>
            <el-radio v-model="setAlarm.showWindowStatus" :label="0">
              否
            </el-radio>
          </el-form-item>
          <el-form-item label="告警间隔">
            <el-select v-model="setAlarm.voiceTimeInterval" placeholder="请选择">
              <el-option v-for="item in timeOptions" :key="item.dictValue" :label="item.dictLabel"
                :value="item.dictValue" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" type="danger" icon="iconfont iconquxiao" plain>取 消</el-button>
        <el-button type="primary" icon="iconfont iconbianji" @click="handleUpLoadSetting">确 定</el-button>
      </span>
    </el-dialog>

    <audio ref="audioPlay" :src="audioSrc" />
  </div>
</template>
<script>

import { getRouterList, getFavorites } from "@/api/common/router.js";
import { Avatar } from "@/layouts/components/index.js";
import router from "@/router/index.ts";
import {
  getWindowAlarm,
  cancelOneAlarm,
  getAlarmSetting,
  getAlarmSettingTime,
  upLoadSetting,
} from "@/api/project/shuidian/alarmWatch.js";
import { getSysAuthInfo } from "@/api/project/lingshi/apiTest.js";
export default {
  name: "NavBar",
  components: {
    Avatar,

  },
  data() {
    return {
      wrapWidth: 0,
      contentWidth: 0,
      text: "",
      dialogDelete: false,
      audioSrc: "", //MP3地址
      voiceList: {}, //告警mp3
      showCollection: false,
      showAlarm: false, //警告
      checkAll: false, //警告全选
      windowAlarmList: [], //告警数据---list
      windowAlarmListLength: 0,
      alarmListIndex: 1,
      scrollList: null,
      allowScroll: true,
      checkedAlarm: [], //当前选中
      checkboxList: [],
      isIndeterminate: true,
      dialogVisible: false, //告警设置
      setAlarm: {}, //告警配置
      timeOptions: [], //时间下拉框
      alarmSearch: "", //水表编号搜索
      publicPath: process.env.BASE_URL,
      timer: "",
      textTimer: "",
      colorTheme: "mrbs-white",
      item: [],
      index: 999,
      height: 0,
      defaultOpenedsArray: [],
      activeIndex: "0",
      activeIndex1: "0",
      WindoWwidth: window.innerWidth,
      leftmenuList: [],
      rightmenuList: [],
      rightmenuList1: [],
      MyFavorite: window.localStorage.getItem("MyFavorite"),
      themeColor:
        window.localStorage.getItem("ThemeStyle") == "false" ? "#000" : "#fff",
      menuList: "",
      routerList: [],
      SystemName: window.localStorage.getItem("系统name"),
      pulse: false,
      collection: [],
      sysAuthStatusVO: {
        message: "",
        sysAuthStatus: 1,
      },
    };
  },
  computed: {
    setTime: function () {
      return this.setAlarm.voiceTimeInterval + "分钟";
    },

  },
  watch: {
    $route: {
      handler(route) { },
    },
    OverallHeight(val) { },
  },
  destroyed() {
    clearInterval(this.timer);
  },
  mounted() {
    this.getAlarmConfig();

    setTimeout(() => {
      this.getWindowAlarmList();
      setInterval(() => {
        this.getWindowAlarmList();
      }, 60000 * parseInt(this.setAlarm.voiceTimeInterval || 5));
    }, 5000);
  },
  created() {
    this.timer = setInterval(() => {
      this.colorTheme = "mrbs-white";
    }, 1000);

    // getRouterList().then((res) => {
    //   this.routerList = res.data;
    //   var num = 0;
    //   this.routerList.forEach((item) => {
    //     if (item.children != undefined && item.children.length > num) {
    //       num = item.children.length;
    //     }
    //   });
    //   this.leftmenuList = res.data[0].children;

    //   this.rightmenuList = this.leftmenuList[0].children;
    //   this.rightmenuList1 = this.leftmenuList[0];
    //   this.menuList = num;
    //   if (this.rightmenuList == undefined) {
    //     this.height = this.leftmenuList.length;
    //     return;
    //   }
    //   this.rightmenuList.forEach((item) => {
    //     if (item.children != undefined && item.children.length > this.height) {
    //       this.height = item.children.length;
    //     }
    //   });
    //   setTimeout(() => {
    //     // document.getElementsByClassName('menu-h')[0].style.backgroundColor='#424f64'
    //     document
    //       .getElementsByClassName("menu-h")[0]
    //       .getElementsByClassName("menu-h1")[0].className = "menu-h1 is-active";
    //   }, 500);
    // });
  },
  methods: {
    handleLinkTo(item) {
      // console.log(item);
      let alarmType = item.alarmType % 100;

      this.$router.push({
        path: "/HandleBusiness/gaojingchakan/alarmWatch",
        query: { meterCat: item.meterCat, alarmType: alarmType },
      });
    },
    // 系统注册
    toRegister() {
      if (
        this.sysAuthStatusVO.sysAuthStatus == 3 ||
        this.sysAuthStatusVO.sysAuthStatus == 4
      ) {
        this.$router.push({
          path: "/system/system/SystemRegistration",
        });
      }
    },
    dialogCancel() {
      this.dialogDelete = false;
    },
    goLink(item) {
      var arr = JSON.parse(window.localStorage.getItem("routes"));
      var path = "";
      var path1 = "";
      var path2 = "";
      arr.forEach((res) => {
        if (res.meta != undefined && res.meta.title == item.meta.title) {
        }
        res.children.forEach((res1) => {
          if (res1.meta != undefined && res1.meta.title == item.meta.title) {
          }
          res1.children.forEach((res2) => {
            if (res2.meta != undefined && res2.meta.title == item.meta.title) {
              path = res.path.split("/")[res.path.split("/").length - 1];
              path1 = res1.path;
              path2 = res2.path;
            }
          });
        });
      });
      this.$router.push({
        path: "/" + path + "/" + path1 + "/" + path2,
      });
    },
    getMenu(item, index) {
      this.item = [];
      this.index = 999;
      if (item.meta.title == "我的常用") {
        this.item = item;
        this.index = index;
        getFavorites().then((res) => {
          this.collection = res.data;
          let tem = [];
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
                path: "",
                redirect: "system",
              },
            ],
            component: "Layout",
            hidden: false,
            id: 199998,
            meta: { title: "我的常用", icon: "#" },
            name: res.data.length == 0 ? "" : res.data[0].name,
            path: res.data.length == 0 ? "" : res.data[0].path,
            redirect: "ilike",
          };
          tem.push(json);

          item.children = tem;
        });
      }
      setTimeout(() => {
        document.getElementsByClassName("menu-h").forEach((res) => {
          res.style.backgroundColor = "#323d4e";
          res.getElementsByClassName("menu-h1")[0].className = "menu-h1";
        });
        // document.getElementsByClassName('menu-h')[index].style.backgroundColor='#424f64'
        document
          .getElementsByClassName("menu-h")
        [index].getElementsByClassName("menu-h1")[0].className =
          "menu-h1 is-active";
        if (item.children != undefined) {
          this.leftmenuList = item.children;
          let layoutTemp = {
            children: [],
            component: "Layout",
            meta: [{ icon: "#", title: "业主资料" }],
            path: "",
          };
          for (let i = 0; i < this.leftmenuList[0].children.length; i++) {
            if (this.leftmenuList[0].children[i].component !== "Layout") {
              let temp = JSON.parse(
                JSON.stringify(this.leftmenuList[0].children[i])
              );
              this.leftmenuList[0].children[i] = JSON.parse(
                JSON.stringify(layoutTemp)
              );
              this.leftmenuList[0].children[i].children = JSON.parse(
                JSON.stringify([temp])
              );
            }
          }
          this.rightmenuList = this.leftmenuList[0].children;
          this.rightmenuList1 = this.leftmenuList[0];
          if (this.rightmenuList == undefined) {
            this.height = this.leftmenuList.length;
            return;
          }
          this.rightmenuList.forEach((item) => {
            if (
              item.children != undefined &&
              item.children.length > this.height
            ) {
              this.height = item.children.length;
            }
          });
        } else {
          this.leftmenuList = [];
          this.rightmenuList = [];
          this.rightmenuList1 = [];
        }
      }, 100);
    },
    changeMenu(rightmenuList1, item, item1) {
      if (item1 == undefined) {
        if (item.children != undefined && item.children.length > 0) {
          return;
        }
      }
      window.localStorage.setItem("系统name", rightmenuList1.meta.title);
      window.localStorage.setItem(
        "routes",
        JSON.stringify(rightmenuList1.children)
      );
      this.$store.dispatch("routes/setAllRoutes").then((res) => {
        router.addRoutes(res);
      });
      if (item1 != undefined) {
        if ("/mrbs" + item.path + "/" + item1.path != location.pathname) {
          this.$store.dispatch("tagsBar/delAllRoutes");
        }
        this.$router.push({
          path: item.path + "/" + item1.path,
        });
      } else {
        this.$router.push({
          path: item.path,
        });
      }
      this.defaultOpenedsArray = [];
    },
    handleOpen(key, keyPath) {
      if (this.index != 999) {
        this.getMenu(this.item, this.index);
      }
    },
    handleSelect(key, keyPath) {
      let layoutTemp = {
        children: [],
        component: "Layout",
        meta: [{ icon: "#", title: "业主资料" }],
        path: "",
      };
      for (let i = 0; i < this.leftmenuList[key].children.length; i++) {
        if (this.leftmenuList[key].children[i].component !== "Layout") {
          let temp = JSON.parse(
            JSON.stringify(this.leftmenuList[key].children[i])
          );
          this.leftmenuList[key].children[i] = JSON.parse(
            JSON.stringify(layoutTemp)
          );
          this.leftmenuList[key].children[i].children = JSON.parse(
            JSON.stringify([temp])
          );
        }
      }
      this.rightmenuList = this.leftmenuList[key].children;
      this.rightmenuList1 = this.leftmenuList[key];
      if (this.rightmenuList == undefined) {
        this.height = this.leftmenuList.length;
        return;
      }

      this.rightmenuList.forEach((item) => {
        if (item.children != undefined && item.children.length > this.height) {
          this.height = item.children.length;
        }
      });
    },
    goSystem() {
      this.$router.push("/System");
    },
    handleCollapse() {
      // this.$store.dispatch("settings/changeCollapse");
    },
    async refreshRoute() {
      this.$baseEventBus.$emit("reloadRouterView");
      this.pulse = true;
      setTimeout(() => {
        this.pulse = false;
      }, 1000);
    },
    handleShowAlarm() {
      this.showAlarm = !this.showAlarm;
      if (this.showAlarm == true) {
        this.query();
      }
    },
    handleShowCollection() {
      this.showCollection = !this.showCollection;
      getFavorites().then((res) => {
        this.collection = res.data;
      });
    },
    handleCloseDrawer() { },
    // 提交解除按钮
    deleteAlarmData() {
      this.checkedAlarm.forEach((item) => {
        item.isAlarm = 1;
      });
      this.cancelAlarmMethod(...this.checkedAlarm);
      this.dialogDelete = false;
    },
    dialogAlarmDataNoForever() {
      this.checkedAlarm.forEach((item) => {
        item.isAlarm = 0;
      });
      this.cancelAlarmMethod(...this.checkedAlarm);
      this.dialogDelete = false;
    },
    query() {
      this.windowAlarmList = [];
      this.alarmListIndex = 1;
      this.allowScroll = true;
      let body = {
        pageSize: 20,
        pageNum: this.alarmListIndex,
        meterCode: this.alarmSearch,
      };
      getWindowAlarm(body).then((res) => {
        this.windowAlarmList = res.data.alarmWindowTableList;
        this.listTotal = this.windowAlarmListLength;

        if (this.windowAlarmList == null) {
          this.windowAlarmList = [];
        }
        this.$nextTick(() => {
          this.scrollMethod();
        });
      });
    },
    //告警获取
    getWindowAlarmList() {
      let body = {
        pageSize: 20,
        pageNum: this.alarmListIndex,
      };
      getWindowAlarm(body).then((res) => {
        this.voiceList = res.data;

        this.windowAlarmListLength = res.data.alarmTotal;
        // this.query();
        // if (this.windowAlarmList == null) {
        //   this.windowAlarmList = [];
        // }

        let temp = [];
        let errorMsg = [];
        //水量递减
        if (this.voiceList.declineVoice) {
          temp.push(this.publicPath + "static/WaterDescendAlarm.mp3");
          errorMsg.push("水量递减告警");
        }
        //流量上限-水表-瞬时流量上限语音
        if (this.voiceList.flowUpperVoice) {
          temp.push(this.publicPath + "static/FlowUpLimitAlarm.mp3");
          errorMsg.push("水表流量上限告警");
        }
        // 热表流量上限
        if (this.voiceList.heatFlowUpperVoice) {
          temp.push(this.publicPath + "static/FlowUpLimitAlarm.mp3");
          errorMsg.push("热表流量上限告警");
        }
        // 离线
        if (this.voiceList.offLineVoice) {
          temp.push(this.publicPath + "static/MeterOfflineAlarm.mp3");
          errorMsg.push("离线告警");
        }
        // 水倒流
        if (this.voiceList.consumptionVoice) {
          temp.push(this.publicPath + "static/WaterBackflowAlarm.mp3");
          errorMsg.push("水倒流告警");
        }
        // 电池电压低
        if (this.voiceList.voltageLowerVoice) {
          temp.push(this.publicPath + "static/LowVoltageAlarm.mp3");
          errorMsg.push("电池电压低告警");
        }
        // 夜间用水
        if (this.voiceList.nightVoice) {
          temp.push(this.publicPath + "static/NightWaterAlarm.mp3");
          errorMsg.push("夜间用水告警");
        }
        // 零水量
        if (this.voiceList.zeroVoice) {
          temp.push(this.publicPath + "static/ZeroWaterAlarm.mp3");
          errorMsg.push("零水量告警");
        }
        // 突然用水
        if (this.voiceList.suddentVoice) {
          temp.push(this.publicPath + "static/SuddenWaterAlarm.mp3");
          errorMsg.push("突然用水告警");
        }
        // 压力上限
        if (this.voiceList.pressUpperVoice) {
          temp.push(this.publicPath + "static/PressureUpLimitAlarm.mp3");
          errorMsg.push("压力上限告警");
        }
        // 压力下限
        if (this.voiceList.pressLowerVoice) {
          temp.push(this.publicPath + "static/PressureDownLimitAlarm.mp3");
          errorMsg.push("压力下限告警");
        }
        // 时钟异动
        if (this.voiceList.timeBackVoice) {
          temp.push(this.publicPath + "static/ClockChangeAlarm.mp3");
          errorMsg.push("时钟异动告警");
        }
        // 读数回退
        if (this.voiceList.dataBackVoice) {
          temp.push(this.publicPath + "static/DataBackAlarm.mp3");
          errorMsg.push("读数回退告警");
        }
        //其他数据异常
        if (this.voiceList.othersVoice) {
          temp.push(this.publicPath + "static/OtherAlarm.mp3");
          errorMsg.push("其他数据异常告警");
        }
        //电池电量低
        if (this.voiceList.powerLowerVoice) {
          temp.push(this.publicPath + "static/LowBatteryAlarm.mp3");
          errorMsg.push("电池电量低告警");
        }
        //流量计空管
        if (this.voiceList.emptyPipeVoice) {
          temp.push(this.publicPath + "static/MeterBlankPipeAlarm.mp3");
          errorMsg.push("流量计空管告警");
        }
        // 无抄表数据
        if (this.voiceList.noDataVoice) {
          temp.push(this.publicPath + "static/NoDataAlarm.mp3");
          errorMsg.push("无抄表数据告警");
        }
        // 热表-热功率上限
        if (this.voiceList.thermalPowerUpperVoice) {
          temp.push(this.publicPath + "static/powerUpperAlarm.mp3");
          errorMsg.push("热功率上限告警");
        }

        if (temp.length && this.setAlarm.voiceStatus) {
          var audio = this.$refs.audioPlay;
          var play = () => {
            let src = temp.splice(0, 1);
            audio.src = src;
            audio.play();
            ended();
          };
          //是否播放完毕
          var ended = () => {
            audio.onended = () => {
              if (temp.length) {
                play();
              }
            };
          };
          play();
        }
        if (errorMsg.length && Boolean(this.setAlarm.showWindowStatus)) {
          let that = this;
          for (let i = 0; i < errorMsg.length; i++) {
            const element = errorMsg[i];
            setTimeout(() => {
              that.$notify({
                title: "告警",
                message: element,
                type: "warning",
                position: "bottom-right",
                duration: 2000,
              });
            }, i * 2500);
          }
        }
      });
    },
    // 下拉加载
    async joinList() {
      let body = {
        pageSize: 20,
        pageNum: this.alarmListIndex,
        meterCode: this.alarmSearch,
      };

      const res = await getWindowAlarm(body);
      this.windowAlarmList = this.windowAlarmList.concat(
        res.data.alarmWindowTableList
      );
    },
    // 监听滚动条
    scrollMethod() {
      this.$nextTick(() => {
        this.scrollList = document.getElementById("listBox");
        // console.log("scrollList", this.scrollList);

        this.scrollList.addEventListener("scroll", () => {
          let scrollTop = this.scrollList.scrollTop;
          let scrollHeight = this.scrollList.scrollHeight;
          let scrollObjHeight = scrollHeight - scrollTop;
          if (scrollObjHeight <= 1200 && this.allowScroll) {
            if (
              Number(this.listTotal) === Number(this.windowAlarmList.length)
            ) {
              // console.log("已经是最后数据了");
              this.allowScroll = true;

              return;
            }
            setTimeout(() => {
              this.scrollList.scrollTop = scrollTop - 200;
              this.alarmListIndex += 1;

              this.joinList();

              console.log("下拉加载");
              this.allowScroll = true;
            }, 800);

            this.allowScroll = false;
          }
        });
      });
    },
    //获取当前告警设置
    getAlarmConfig() {
      getAlarmSetting().then((res) => {
        if (res.data === null) {
          this.setAlarm = {
            voiceStatus: 0,
            showWindowStatus: 0,
            voiceTimeInterval: "5分钟",
          };
        } else {
          this.setAlarm = res.data;
          this.setAlarm.voiceStatus = Boolean(this.setAlarm.voiceStatus);
          this.setAlarm.voiceTimeInterval = this.setTime;
        }
      });
      getAlarmSettingTime().then((res) => {
        this.timeOptions = res.data;
      });
    },
    //告警全选
    handleCheckAllChange(val) {
      this.checkedAlarm = val ? this.windowAlarmList : [];
      this.isIndeterminate = false;
    },
    //批量告警取消
    clearAlarmStatusBatch() {
      this.dialogDelete = true;
      // this.cancelAlarmMethod(...this.checkedAlarm);
    },
    //告警设置
    editAlarm() {
      this.dialogVisible = true;
    },
    //单个解除
    clearAlarmStatus(item) {
      this.cancelAlarmMethod(item);
      this.$store.dispatch("alarm/increment");
    },
    //解除告警
    cancelAlarmMethod(...body) {
      cancelOneAlarm(body).then((res) => {
        res.code === 0
          ? this.$baseMessage(res.msg, "success")
          : this.$baseMessage(res.msg, "error");
        this.getWindowAlarmList();
      });
    },
    // 多选grop
    handleCheckedAlarmChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.windowAlarmList.length;
    },
    //上传设置
    handleUpLoadSetting() {
      this.setAlarm.voiceTimeInterval = parseInt(
        this.setAlarm.voiceTimeInterval
      );
      this.setAlarm.voiceStatus = this.setAlarm.voiceStatus + 0;
      // if(this.setAlarm.voiceStatus ===null){
      //   this.setAlarm.voiceStatus = 0;
      // }
      // if(this.setAlarm.showWindowStatus ===null){
      //   this.setAlarm.showWindowStatus = 0;
      // }
      // if(this.setAlarm.voiceTimeInterval ===null){
      //   this.setAlarm.voiceTimeInterval = 0;
      // }
      upLoadSetting(this.setAlarm).then((res) => {
        res.code === 0
          ? this.$baseMessage(res.msg, "success")
          : this.$baseMessage(res.msg, "error");
        this.getAlarmConfig(); //重新刷新获取配置

        this.getWindowAlarmList();
        this.dialogVisible = false;
      });
    },
  },
};
</script>
<style lang="scss" >
.auth {
  color: red;
  cursor: pointer;
  margin-right: 12px;
  animation: blink 2s linear infinite;
  -webkit-animation: blink 2s linear infinite;
  -moz-animation: blink 2s linear infinite;
  -ms-animation: blink 2s linear infinite;
  -o-animation: blink 2s linear infinite;
}

@keyframes blink {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 0.8;
  }
}

@-webkit-keyframes blink {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 0.8;
  }
}

@-moz-keyframes blink {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 0.8;
  }
}

@-ms-keyframes blink {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 0.8;
  }
}

@-o-keyframes blink {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 0.8;
  }
}

.menu-h1:hover {
  color: $base-color-default !important;
}

.menu-h1:focus {
  color: $base-color-default !important;
}

.meter-back .menu-h1 {
  color: #fff !important;
}

.mrbs-white .menu-h1 {
  color: #4e4e4e !important;
  border-bottom: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
}

.el-menu-navbar .el-menu-item i {
  color: #fff !important;
}

.el-menu-navbar .el-menu-item:hover i,
.el-menu-navbar .el-menu-item.is-active i {
  color: $base-color-white !important;
}

.el-menu-navbar .el-submenu__title:hover i {
  color: #fff !important;
}

.el-menu-navbar .el-submenu__title i {
  color: $base-color-default !important;
}

.el-menu-item {
  &:hover {
    color: $base-color-white;
    background-color: $base-menu-background-active !important;
  }

  &.is-active {
    color: $base-color-white;
    background-color: $base-menu-background-active !important;
  }
}

.nav-bar-container i.el-submenu__icon-arrow.el-icon-arrow-down {
  display: none;
}

.mrbs-white .nav-bar-container .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  background-color: #fff0 !important;
}

.mrbs-black .nav-bar-container .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  background-color: #fff0 !important;
}

.mrbs-white .nav-bar-container li.el-submenu.is-opened div {
  background-color: #fff0 !important;
}

.mrbs-black .nav-bar-container li.el-submenu.is-opened div {
  background-color: #fff0 !important;
}

.nav-bar-container .el-menu--horizontal>.el-submenu .el-submenu__title {
  line-height: 35px;
}

.nav-bar-container.el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
.nav-bar-container .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  background-color: #a7b8be00 !important;
}

.mrbs-white .nav-bar-container .el-menu--horizontal .el-menu-item:not(.is-disabled):focus {
  background-color: #fff0 !important;
}

.mrbs-white .nav-bar-container .el-menu--horizontal .el-menu-item:not(.is-disabled):active {
  background-color: #fff0 !important;
}

.el-menu--horizontal>.el-submenu .el-submenu__title:hover {
  background-color: #a7b8be00 !important;
}
</style>
<style lang="scss" scoped>
.online {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.alarmTypeText {
  color: #0091ff;
  font-size: 15px;
}

.boxOfItem {
  overflow: scroll;
  height: 80vh;
}

.alarmItem {
  cursor: pointer;
  position: relative;
  padding: 10px 15px;
  margin-top: 10px;
  border: 1px solid #ffffff;

  .alarmTag {
    color: #ee6860;
    padding: 3px 8px;
    background-color: #fde4e3;
    border-radius: 2px;
    margin-right: 10px;
  }
}

.alarmItem:hover {
  box-shadow: 5px 5px 3px #d6d6d6;
  border: 1px solid #0091ff;
}

.groupSty {
  position: absolute;
  right: 20px;
  bottom: 50px;
}

.row2 {
  margin-top: 10px;

  color: #37455f;
}

.row3 {
  margin-top: 10px;
  color: #37455f;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.row4 {
  margin-top: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.alarmContent {
  padding: 12px;
  z-index: 9999;
}

.alarmStaus {
  font-size: 16px;
  color: #4c7490;
  width: 80%;
}

.alarmRow2 {
  padding: 10px 0px;
  border-bottom: 1px solid #d6d6d6;
}

.searchAlarm {
  margin: 5px;

  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 5px;
  }
}

.tipAlarm {
  margin: 0.5em;
  margin-top: -10px;
  color: red;
  font-size: 16px;
  text-align: center;
}

.topSetting {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.itemTop {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.everyItem {
  border-top: 1px solid #c1c1c1a6;
  margin-bottom: 10px;

  padding: 0 25px;
  padding-top: 5px;

  p {
    margin-top: 5px;
  }
}

.rightBottom {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.alarmDrawer {
  z-index: 1000;
  position: fixed;
  width: 400px;
  top: 45px;
  right: 0px;
  box-shadow: -3px 3px 10px #ccc;
}

.alarmWidth {
  padding: 15px;
  width: 100%;
  height: 450px;
  overflow-y: scroll;
  background: #fff;
}

.warning {
  color: #fff;

  // margin-right: 10px;
  float: left;
  display: flex;
  align-items: center;
}

.logoSrc {
  width: 42px;
  vertical-align: middle;
  position: relative;
  top: -1px;
  right: 5px;
  height: 18px;
}

li.el-menu-item.is-active.is-active {
  background-color: #fff0 !important;
}

.Menutitle {
  text-align: left;
  padding-top: 20px;
  padding-bottom: 10px;
  padding-left: 20px;
  cursor: pointer;
  position: relative;
  text-decoration: none;
  min-width: 150px;
}

.Menutitle_font {
  position: relative;
  width: 100%;
}

.Menutitle_font:before {
  content: "";
  position: absolute;
  left: 0;
  bottom: -5px;
  height: 2px;
  width: 100%;
  background: $base-color-default;
  transform: scale(0);
  transition: all 0.3s;
}

.Menutitle_font:hover:before {
  transform: scale(1);
}

.Worktitle {
  min-height: 47px;
  text-align: left;
  padding-top: 20px;
  padding-bottom: 10px;
  padding-left: 20px;
  color: $base-color-blue;
}

.nav-bar-container {
  
  margin-left: 0px;
  position: fixed;
  left: 0;top: 0;
  right: 0;
  height: $base-nav-bar-height;
  padding-right: $base-padding;
  // padding-left: $base-padding;
  overflow: hidden;
  user-select: none;
  background: $base-color-white;
  box-shadow: $base-box-shadow;
  z-index: 8888;

  .left-panel {
    height: $base-nav-bar-height;
    display: flex;
    align-items: center;
    justify-items: center;

    // :deep(.breadcrumb-container){

    //     margin-left: 10px;

    // }
  }

  .menu-router {
    color: #7d7b81;
    margin: 10px 0px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
  }

  .right-panel {
    height: $base-nav-bar-height;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-end;

    // :deep(svg){
    //   width: 1em;
    //     height: 1em;
    //     margin-right: 5px;
    //     font-size: $base-font-size-big;
    //     color: #fff;
    //     cursor: pointer;
    //     fill: $base-color-gray;
    // }

    // button {
    //   svg {
    //     margin-right: 0;
    //     color: #fff;
    //     cursor: pointer;
    //     fill: $base-color-white;
    //   }
    // }

    // .el-badge {
    //   margin-right: 15px;
    // }

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
</style>
<style scoped>
.el-checkbox :deep(.el-checkbox__inner) {
  border-radius: 50%;
}
</style>