<template>
  <div class="content">
    <div class="search">
      <el-input
        v-model="query.dictName"
        style="width: 200px"
        placeholder="字典名称"
      />
      <el-input
        v-model="query.dictType"
        style="width: 200px"
        placeholder="字典类型"
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
      <el-button
        type="warning"
        icon="RefreshRight"
        round
        size="small"
        @click="handleClearCache"
        >刷新缓存</el-button
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
        <el-table-column prop="dictId" label="字典编号" sortable />
        <el-table-column prop="dictName" label="字典名称" sortable />
        <el-table-column label="字典类型" sortable>
          <template #default="scope">
            <a @click="handleClick(scope.row)">{{ scope.row.dictType }}</a>
          </template>
        </el-table-column>

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
      :title="state === 'add' ? '添加字典类型' : '编辑字典类型'"
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
        <el-form-item label="字典名称" prop="dictName">
          <el-input
            v-model="formData.data.dictName"
            placeholder="输入字典名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="字典类型" prop="dictType">
          <el-input
            v-model="formData.data.dictType"
            placeholder="输入字典类型"
            clearable
          />
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
  getDictList,
  addDict,
  deleteDict,
  editDict,
  refreshCache,
} from "@/api/project/system/dict.js";
import { ElMessageBox, ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();
defineOptions({
  name: "D-ict",
  isRouter: true,
});
const multipleSelection = ref([]);
const statusList = ref([]);
const query = reactive({
  dictName: "",
  phonenumber: "",
  pageNum: 1,
});
class Data {
  dictName = "";
  dictType = "";
  status = "1";
  remark = "";
}
const handleClearCache = () => {
  ElMessageBox.confirm("确定清空缓存?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await refreshCache();
    })
    .catch((action) => {
      console.log(action);
    });
};
const handleClick = (e) => {
  router.push({
    path: `/system/dict/detail`,
    query: { dictType: e.dictType },
  });
};
let formData = reactive({
  data: new Data(),
});
const formRef = ref(null);
const rules = {
  dictName: [
    {
      required: true,
      message: "请输入字典名称",
      trigger: "change",
    },
  ],
  dictType: [
    {
      required: true,
      message: "请输入字典类型",
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
const changePageSize = (e) => {
  // console.log(e);
  query.pageNum = e;
  getList();
};
const add = () => {
  formData = reactive({ data: new Data() });
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
        const dictIds = multipleSelection.value.map((x) => x.dictId);
        const res = await deleteDict(dictIds.toString());
        getList();
      } else {
        const res = await deleteDict(item.dictId);
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
        await addDict(formData.data);
      } else {
        await editDict(formData.data);
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
  const res = await getDictList(query);
  if (res.code === 0) {
    tableData.value.row = res.rows;
    tableData.value.total = res.total;
  }
};

onMounted(async () => {
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