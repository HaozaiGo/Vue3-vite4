<template>
  <div class="content">
    <div class="search">
      <el-input
        v-model="query.deptName"
        style="width: 200px"
        placeholder="部门名称"
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
        row-key="deptId"
        border
        default-expand-all
        :tree-props="{ children: 'children' }"
        :max-height="tableHeight"
      >
        <el-table-column prop="deptName" label="部门名称" sortable />
        <el-table-column prop="orderNum" label="排序" sortable />
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
      width="620"
      align-center
    >
      <el-form
        :model="formData.data"
        class="demo-form-inline"
        label-width="80px"
        :rules="rules"
        ref="formRef"
        :inline="true"
      >
        <el-form-item label="上级部门" prop="parentId">
          <el-tree-select
            v-model="formData.data.parentId"
            :data="list"
            :render-after-expand="false"
            style="width: 280px"
            node-key="deptId"
            :props="{ children: 'children', label: 'deptName' }"
            check-strictly
          />
        </el-form-item>
        <el-form-item label="部门名称" prop="deptName">
          <el-input
            v-model="formData.data.deptName"
            placeholder="输入部门名称"
            clearable
        /></el-form-item>

        <el-form-item label="显示排序" prop="orderNum">
          <el-input-number
            v-model="formData.data.orderNum"
            :min="1"
            :max="100"
            @change="handleChange"
            style="width: 168px"
          />
        </el-form-item>
        <el-form-item label="负责人" prop="leader">
          <el-input
            v-model="formData.data.leader"
            placeholder="输入负责人"
            clearable
          />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input
            v-model="formData.data.phone"
            placeholder="输入联系电话"
            clearable
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="formData.data.email"
            placeholder="输入邮箱"
            clearable
          />
        </el-form-item>

        <el-form-item label="部门状态">
          <el-radio-group v-model="formData.data.status">
            <el-radio
              :value="item.dictValue"
              v-for="(item, index) in menuDeptList"
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
  getDeptList,
  addDept,
  deleteDept,
  editDept,
} from "@/api/project/system/dept.js";
import { ElMessageBox } from "element-plus";
defineOptions({
  name: "D-ept",
  isRouter: true,
});
const rules = {
  parentId: [
    {
      required: true,
      message: "请选择上级部门",
      trigger: "change",
    },
  ],
  deptName: [
    {
      required: true,
      message: "请输入部门名称",
      trigger: "change",
    },
  ],
  orderNum: [
    {
      required: true,
      message: "请选择显示顺序",
      trigger: "change",
    },
  ],
};
const tableHeight = inject("$com").tableHeight();
const menuDeptList = ref([]);
const query = reactive({
  deptName: "",
});
const state = ref("add");
const dialogVisible = ref(false);
class formDatas {
  parentId = "";
  deptName = "";
  orderNum = 1;
  leader = "";
  phone = "";
  email = "";
  status = "1";
}
const formData = reactive({
  data: new formDatas(),
});
const list = ref([]);
const getList = async () => {
  const res = await getDeptList(query);
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
      await deleteDept(row.deptId);
      getList();
    })
    .catch((action) => {
      console.log(action);
    });
};
const handleComfirm = async () => {
  if (state.value === "add") {
    await addDept(formData.data);
  } else {
    await editDept(formData.data);
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
      menuDeptList.value = res.data[0].list;
    });
});
</script>

<style lang="scss" scoped>
</style>