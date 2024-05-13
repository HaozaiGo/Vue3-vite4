<template>
  <div class="content">
    <div class="search">
      <el-input
        v-model="query.roleName"
        style="width: 200px"
        placeholder="角色名称"
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
        :data="tableData"
        style="width: 100%; margin: 10px 0"
        row-key="id"
        border
        default-expand-all
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="45" />
        <el-table-column prop="roleSort" label="角色编号" sortable />
        <el-table-column prop="roleName" label="角色名称" sortable />
        <!-- <el-table-column prop="roleKey" label="权限字符" sortable /> -->
        <el-table-column label="状态" width="180">
          <template #default="scope">
            <div>
              <el-switch
                v-model="scope.row.status"
                @change="switchChange(scope.row)"
                active-value="1"
                inactive-value="0"
              />
            </div>
          </template>
        </el-table-column>
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
            <el-button
              link
              type="primary"
              size="small"
              @click="permission(scope.row)"
              >数据权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      v-model="dialogVisible"
      :title="state === 'add' ? '添加角色' : '编辑角色'"
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
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            v-model="formData.data.roleName"
            placeholder="输入角色名称"
            clearable
          />
        </el-form-item>
        <el-form-item label="角色顺序" prop="roleSort">
          <el-input-number
            v-model="formData.data.roleSort"
            :min="1"
            :max="100"
            @change="handleChange"
            style="width: 200px"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="formData.data.status">
            <el-radio value="1">正常</el-radio>
            <el-radio value="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单权限">
          <el-tree
            style="max-width: 600px"
            :data="treeData"
            node-key="menuId"
            :props="defaultProps"
            show-checkbox
            @check-change="handleCheckChange"
            :render-after-expand="false"
            ref="tree"
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

    <el-dialog
      v-model="dialogVisible_001"
      title="数据权限"
      width="600"
      align-center
    >
      <el-form :model="formData_001.data" label-width="80px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            v-model="formData_001.data.roleName"
            placeholder="输入角色名称"
            disabled
            style="width: 240px"
          />
        </el-form-item>
        <el-form-item label="权限范围" prop="roleName">
          <el-select
            v-model="formData_001.data.dataScope"
            placeholder="Select"
            style="width: 240px"
          >
            <el-option
              v-for="item in options"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="数据权限">
          <el-tree
            style="max-width: 600px"
            :data="roleDepartmentTree"
            node-key="id"
            :props="defaultProps_001"
            show-checkbox
            @check-change="handleCheckChangeDataScope"
            :render-after-expand="false"
            ref="tree_001"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleSaveDataScope()" type="primary"
            >确定</el-button
          >
          <el-button @click="dialogVisible_001 = false"> 取消 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref, getCurrentInstance } from "vue";
import {
  getRoleList,
  addRole,
  editRole,
  statusChange,
  deleteRole,
  getRoleDetail,
  getRoleDepartmentTree,
  saveDataScope,
} from "@/api/project/system/role.js";
import { getMenuList } from "@/api/project/system/menu.js";
import { ElMessageBox, ElMessage } from "element-plus";
const { proxy } = getCurrentInstance(); //3.0.11
defineOptions({
  name: "R-ole",
  isRouter: true,
});
const defaultProps = {
  children: "childrenList",
  label: "menuName",
};
const defaultProps_001 = {
  children: "children",
  label: "label",
};
const options = ref([]); //数据权限范围
const multipleSelection = ref([]);
const tree = ref();
const tree_001 = ref();
const treeData = ref([]); //菜单树
const roleDepartmentTree = ref([]); //部门树
const query = reactive({
  roleName: "",
});
let formData = reactive({
  data: {
    roleName: "",
    roleId: "",
    roleSort: 1,
    status: "1",
    menuIds: [],
  },
});
let formData_001 = reactive({
  data: {
    roleName: "",
    dataScope: "",
    deptIds: [],
  },
});
const formRef = ref(null);
const rules = {
  roleName: [
    {
      required: true,
      message: "请输入角色名称",
      trigger: "change",
    },
  ],
  roleSort: [
    {
      required: true,
      message: "请输入角色排序",
      trigger: "change",
    },
  ],
};
const dialogVisible = ref(false);
const dialogVisible_001 = ref(false);
const state = ref("add");
const tableData = ref([]);
const add = () => {
  setTimeout(() => {
    tree.value.setCheckedKeys([]);
  }, 300);
  formData = reactive({
    data: { roleName: "", roleSort: 1, status: "1", menuIds: [] },
  });
  // console.log(formData.data);
  state.value = "add";
  dialogVisible.value = true;
};
// 编辑
const edit = async (item) => {
  state.value = "edit";
  dialogVisible.value = true;
  const editItem = await getRoleDetail(item.roleId);
  if (editItem.code === 0) {
    formData.data = { ...editItem.data };
    // 这里需要等树渲染完
    setTimeout(() => {
      tree.value.setCheckedKeys(editItem.data.menuIds);
    }, 300);
  }
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
        const roleIds = multipleSelection.value.map((x) => x.roleId);
        await deleteRole(roleIds.toString());

        getList();
      } else {
        await deleteRole(item.roleId);

        getList();
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
        await addRole(formData.data);
      } else {
        await editRole(formData.data);
      }

      getList();
      dialogVisible.value = false;
    } else {
      ElMessage({
        type: "error",
        message: "操作失败！",
      });
      return false;
    }
  });
};

// 数据权限确定
const handleSaveDataScope = async () => {
  formData_001.data.deptIds = formData_001.data.deptIds.join(",");
  const res = await saveDataScope(formData_001.data);
  if (res.code === 0) {
    dialogVisible_001.value = false;
  } else {
    ElMessage({
      type: "error",
      message: res.msg,
    });
  }
};
// 开关
const switchChange = async (item) => {
  await statusChange({
    status: item.status === "1" ? 1 : 0,
    roleId: item.roleId,
  });
};

const getList = async () => {
  const res = await getRoleList(query);
  if (res.code === 0) {
    tableData.value = res.rows;
  }
};
// 获取菜单树
const getMenuTree = async () => {
  const res = await getMenuList();
  if (res.code === 0) {
    treeData.value = res.data;
  }
};
const handleCheckChange = (e) => {
  const checkedKey = tree.value.getCheckedKeys();
  formData.data.menuIds = checkedKey;
};
const handleCheckChangeDataScope = (e) => {
  const checkedKey = tree_001.value.getCheckedKeys();
  formData_001.data.deptIds = checkedKey;
};

const permission = async (item) => {
  // console.log(item);
  dialogVisible_001.value = true;
  const res = await getRoleDepartmentTree(item.roleId);
  if (res.code === 0) {
    formData_001.data = { ...item };
    roleDepartmentTree.value = res.data.treeList;
    setTimeout(() => {
      tree_001.value.setCheckedKeys(res.data.checkedKeys);
    }, 300);
  }
};

onMounted(async () => {
  getList();
  getMenuTree();
  // 数据权限分类
  proxy.$com.getDict("sys_power_limit").then((res) => {
    options.value = res.data[0].list;
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