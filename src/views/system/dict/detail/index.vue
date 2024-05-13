<template>
  <div class="content">
    <div class="search">
      <el-input
        v-model="query.dictType"
        style="width: 200px"
        placeholder="字典名称"
      />
      <el-input
        v-model="query.dictLabel"
        style="width: 200px"
        placeholder="字典标签"
      />
      <el-button type="primary" icon="Search" @click="getList">搜索</el-button>
    </div>

    <div>
      <el-button type="primary" icon="Plus" round size="small" @click="add"
        >新增</el-button
      >
      <el-button
        type="success"
        icon="EditPen"
        round
        size="small"
        @click="
          edit(multipleSelection.length === 1 ? multipleSelection[0] : '')
        "
        :disabled="multipleSelection.length != 1"
        >修改</el-button
      >
      <el-button
        type="danger"
        icon="Delete"
        round
        size="small"
        :disabled="multipleSelection.length === 0"
        @click="deleteUser"
        >删除</el-button
      >
      <el-table
        :data="tableData.row"
        style="width: 100%; margin: 10px 0"
        row-key="id"
        border
        default-expand-all
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="45" />
        <el-table-column prop="dictCode" label="字典编码" sortable />
        <el-table-column prop="dictLabel" label="字典标签" sortable />
        <el-table-column prop="dictValue" label="字典键值" sortable>
        </el-table-column>
        <el-table-column prop="dictSort" label="字典排序" sortable />
        <el-table-column prop="statusLabel" label="状态" sortable />
        <el-table-column prop="remark" label="备注" sortable />
        <el-table-column prop="createTime" label="创建时间" sortable />
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="edit(scope.row)"
            >
              修改
            </el-button>
            <el-button
              link
              type="primary"
              size="small"
              @click="deleteUser(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="tableData.total"
        style="float: right"
        @current-change="changePageSize"
      />
    </div>

    <el-dialog
      v-model="dialogVisible"
      :title="state === 'add' ? '添加字典数据' : '编辑字典数据'"
      width="700"
      align-center
    >
      <el-form
        :inline="true"
        :model="formData.data"
        class="demo-form-inline"
        label-width="80px"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="字典类型" prop="dictType">
          <el-input
            disabled
            v-model="formData.data.dictType"
            placeholder="输入字典类型"
          />
        </el-form-item>
        <el-form-item label="数据标签" prop="dictLabel">
          <el-input
            v-model="formData.data.dictLabel"
            placeholder="输入数据标签"
            clearable
          />
        </el-form-item>
        <el-form-item label="数据键值" prop="dictValue">
          <el-input
            v-model="formData.data.dictValue"
            placeholder="输入数据键值"
            clearable
          />
        </el-form-item>
        <el-form-item label="样式属性" prop="cssClass">
          <el-input
            v-model="formData.data.cssClass"
            placeholder="输入样式属性"
            clearable
          />
        </el-form-item>
        <el-form-item label="显示排序" prop="dictSort">
          <el-input-number
            v-model="formData.data.dictSort"
            :min="1"
            :max="100"
            @change="handleChange"
            style="width: 200px"
          />
        </el-form-item>

        <el-form-item label="回显样式" prop="dictType">
          <!-- <el-input
            v-model="formData.data.listClass"
            placeholder="输入样式属性"
            clearable
          /> -->
          <el-select
            v-model="formData.data.listClass"
            placeholder="Select"
            style="width: 200px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="formData.data.status">
            <el-radio
              :value="item.dictValue"
              v-for="(item, index) in statusList"
              :key="index"
              >{{ item.dictLabel }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            style="width: 500px"
            type="textarea"
            :rows="4"
            v-model="formData.data.remark"
            placeholder="输入字典类型"
            clearable
          />
        </el-form-item>
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
import { reactive, onMounted, ref, toRefs, inject } from "vue";
import {
  getDictInsideList,
  addDictInside,
  deleteDictInside,
  editDictInside,
} from "@/api/project/system/dict.js";
import { ElMessageBox, ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";

defineOptions({
  name: "Dict-Detail",
  isRouter: true,
});
const options = [
  { label: "默认（default-黑色）", value: "default" },
  { label: "主要（primary-蓝色）", value: "primary" },
  { label: "成功（success-绿色）", value: "success" },
  { label: "警告（warning-黄色）", value: "warning" },
  { label: "危险（danger-红色）", value: "danger" },
  { label: "信息（info-灰色）", value: "info" },
];
const route = useRoute();
const multipleSelection = ref([]);
const statusList = ref([]);
const query = reactive({
  dictName: "",
  phonenumber: "",
  pageNum: 1,
});
class Data {
  cssClass = "";
  listClass = "";
  dictLabel = "";
  dictSort = "1";
  dictType = "";
  dictValue = "";
  status = "1";
  remark = "";
}
const handleClick = (e) => {
  console.log(e);
};
let formData = reactive({
  data: new Data(),
});
const formRef = ref(null);
const rules = {
  dictLabel: [
    {
      required: true,
      message: "请输入数据标签",
      trigger: "change",
    },
  ],
  dictValue: [
    {
      required: true,
      message: "请输入数据键值",
      trigger: "change",
    },
  ],
  dictSort: [
    {
      required: true,
      message: "请输入显示排序",
      trigger: "change",
    },
  ],
};
const dialogVisible = ref(false);
const state = ref("add");
const tableData = ref({
  row: [],
  total: 0,
});
const dictType = ref("");
const changePageSize = (e) => {
  // console.log(e);
  query.pageNum = e;
  getList(dictType.value);
};
const add = () => {
  formData = reactive({ data: new Data() });
  formData.data.dictType = dictType.value;
  state.value = "add";
  dialogVisible.value = true;
};
// 编辑
const edit = (item) => {
  formData.data = { ...item };
  state.value = "edit";
  dialogVisible.value = true;
};
// 删除
const deleteUser = async (item) => {
  ElMessageBox.confirm("确定删除所选数据?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      if (multipleSelection.value.length >= 1) {
        const dictIds = multipleSelection.value.map((x) => x.dictCode);
        const res = await deleteDictInside(dictIds.toString());
        getList();
      } else {
        const res = await deleteDictInside(item.dictCode);
        if (res.code === 0) {
          getList();
        }
      }
    })
    .catch((action) => {
      console.log(action);
    });
};
//checkbox
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};
const handleComfirm = () => {
  if (!formRef.value) return;
  formRef.value.validate(async (valid) => {
    if (valid) {
      if (state.value === "add") {
        await addDictInside(formData.data);
      } else {
        await editDictInside(formData.data);
      }
      getList();
      dialogVisible.value = false;
    } else {
      ElMessage({
        type: "error",
        message: "新增失败！",
      });
      return false;
    }
  });
};
const getList = async () => {
  const body = Object.assign(query, { dictType: dictType.value });
  const res = await getDictInsideList(body);
  if (res.code === 0) {
    tableData.value.row = res.rows;
    tableData.value.total = res.total;
  }
};

onMounted(async () => {
  dictType.value = route.query.dictType;
  getList();
  inject("$com")
    .getDict("sys_normal_disable")
    .then((res) => {
      statusList.value = res.data[0].list;
    });
});
</script>

<style lang="scss" scoped>
.demo-form-inline .el-input {
  --el-input-width: 200px;
}

.demo-form-inline .el-select {
  --el-select-width: 200px;
}
</style>