<template>
  <div class="content">
    <div class="search">
      <el-input
        v-model="query.menuName"
        style="width: 200px"
        placeholder="菜单名称"
      />
      <el-button type="primary" icon="Search" @click="getList()"
        >搜索</el-button
      >
    </div>
    <div>
      <el-button type="primary" icon="Plus" round size="small" @click="add"
        >新增</el-button
      >
      <el-table
        :data="list"
        style="width: 100%; margin: 20px 0"
        row-key="menuId"
        border
        default-expand-all
        :tree-props="{ children: 'childrenList' }"
        :max-height="tableHeight"
      >
        <el-table-column prop="menuName" label="菜单名称" sortable />
        <el-table-column prop="orderNum" label="排序" sortable />
        <el-table-column prop="icon" label="图标" sortable />
        <!-- <el-table-column prop="name" label="权限标识" sortable /> -->
        <el-table-column prop="component" label="组件路径" sortable />
        <el-table-column prop="statusLabel" label="状态" sortable />
        <el-table-column prop="createTime" label="创建时间" sortable />

        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleEdit(scope.row)"
            >
              修改
            </el-button>
            <el-button
              link
              type="primary"
              size="small"
              @click="handleAdd(scope.row)"
              >新增</el-button
            >
            <el-button
              link
              type="primary"
              size="small"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      v-model="dialogVisible"
      title="添加菜单"
      width="600"
      align-center
    >
      <el-form
        :model="formData.data"
        class="demo-form-inline"
        label-width="80px"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="上级菜单">
          <el-tree-select
            v-model="formData.data.parentId"
            :data="list"
            :render-after-expand="false"
            style="width: 240px"
            node-key="menuId"
            :props="{ children: 'childrenList', label: 'menuName' }"
            check-strictly
          />
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-radio-group v-model="formData.data.menuType">
            <el-radio value="M">目录</el-radio>
            <el-radio value="C">菜单</el-radio>
            <el-radio value="F">按钮</el-radio>
          </el-radio-group></el-form-item
        >

        <el-form-item label="菜单图标">
          <el-input
            v-model="formData.data.icon"
            placeholder="输入菜单图标"
            clearable
          />
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName">
          <el-input
            v-model="formData.data.menuName"
            placeholder="输入菜单名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="显示排序" prop="orderNum">
          <el-input-number
            v-model="formData.data.orderNum"
            :min="1"
            :max="100"
            @change="handleChange"
            style="width: 240px"
          />
        </el-form-item>
        <el-form-item label="路由地址" prop="component">
          <el-input
            v-model="formData.data.component"
            placeholder="输入路由地址"
            clearable
          />
        </el-form-item>
        <el-form-item label="显示状态">
          <el-radio-group v-model="formData.data.visible">
            <el-radio value="0">显示</el-radio>
            <el-radio value="1">隐藏</el-radio>
          </el-radio-group></el-form-item
        >
        <el-form-item label="菜单状态">
          <el-radio-group v-model="formData.data.status">
            <el-radio
              :value="item.dictValue"
              v-for="(item, index) in menuStatusList"
              :key="index"
              >{{ item.dictLabel }}</el-radio
            >
          </el-radio-group></el-form-item
        >
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleComfirm()" type="primary">确定</el-button>
          <el-button @click="dialogVisible = false"> 取消 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref, inject } from "vue";
import {
  getMenuList,
  addMenu,
  deleteMenu,
  editMenu,
} from "@/api/project/system/menu.js";
import { ElMessageBox } from "element-plus";
defineOptions({
  name: "M-enu",
  isRouter: true,
});
const rules = {
  menuName: [
    {
      required: true,
      message: "请输入菜单名称",
      trigger: "change",
    },
  ],
  orderNum: [
    {
      required: true,
      message: "请输入显示排序",
      trigger: "change",
    },
  ],
  component: [
    {
      required: true,
      message: "请输入路由地址",
      trigger: "change",
    },
  ],
};
const tableHeight = inject("$com").tableHeight();
const menuStatusList = ref([]);
const query = reactive({
  menuName: "",
});
const state = ref("add");
const dialogVisible = ref(false);
class formDatas {
  parentId = "";
  menuType = "M";
  icon = "";
  menuName = "";
  orderNum = 1;
  component = "";
  status = "1";
  visible = "0";
}
const formData = reactive({
  data: new formDatas(),
});
const list = ref([]);
const getList = async () => {
  const res = await getMenuList(query);
  if (res.code === 0) {
    list.value = res.data;
  }
};
const handleDelete = async (row) => {
  ElMessageBox.confirm("确定删除所选数据?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await deleteMenu(row.menuId);
      getList();
    })
    .catch((action) => {
      console.log(action);
    });
};
const handleComfirm = async () => {
  if (state.value === "add") {
    await addMenu(formData.data);
  } else {
    await editMenu(formData.data);
  }

  dialogVisible.value = false;
  getList();
};
const handleAdd = (row) => {
  formData.data = { ...row };
  dialogVisible.value = true;
};
const add = () => {
  state.value = "add";
  formData.data = new formDatas();
  dialogVisible.value = true;
};
const handleEdit = (row) => {
  formData.data = { ...row };
  dialogVisible.value = true;
  state.value = "edit";
};
onMounted(() => {
  getList();

  inject("$com")
    .getDict("sys_normal_disable")
    .then((res) => {
      menuStatusList.value = res.data[0].list;
      // formData.data.status = res.data[0].list[0].dictValue;
    });
});
</script>

<style lang="scss" scoped>
</style>