<template>
    <div class="app-container">
        <el-form :inline="true" class="formHeader">
            <el-form-item label="菜单名称">
                <el-input v-model="queryParams.menuName" placeholder="请输入菜单名称" clearable size="small"
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="queryParams.status" placeholder="菜单状态" clearable size="small">
                    <el-option v-for="dict in statusOptions" :key="dict.dictValue" :label="dict.dictLabel"
                        :value="dict.dictValue" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"  @click="handleQuery">搜索</el-button>
                <el-button type="primary"  @click="handleAdd">新增</el-button>
            </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="menuList" :default-expand-all="true" row-key="menuId"
            :height="OverallHeight + 80 + 'px'" border :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
            <el-table-column prop="menuName" label="菜单名称" :show-overflow-tooltip="true" width="160"></el-table-column>
            <el-table-column prop="icon" label="图标" align="center" width="100">
                <template slot-scope="scope">
                    <!-- <svg-icon :icon-class="scope.row.icon" /> -->
                </template>
            </el-table-column>
            <el-table-column prop="orderNum" label="排序" width="60"></el-table-column>
            <el-table-column prop="perms" label="权限标识" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="component" label="组件路径" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="status" label="状态" :formatter="statusFormat" width="80"></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime">
                <template slot-scope="scope">
                    <!-- <span>{{ parseTime(scope.row.createTime) }}</span> -->
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template #default="scope">
                    <el-button size="default"  @click="handleUpdate(scope.row)">修改</el-button>
                    <el-button size="default"  @click="handleAdd(scope.$index, scope.row)">新增</el-button>
                    <el-button size="default"  @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 添加或修改菜单对话框 -->
        <el-dialog v-model="open" :title="title" width="600px">
            
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="上级菜单"></el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="菜单类型" prop="menuType">
                            <el-radio-group v-model="form.menuType">
                                <el-radio label="S">系统</el-radio>
                                <el-radio label="s">子系统</el-radio>
                                <el-radio label="M">目录</el-radio>
                                <el-radio label="C">菜单</el-radio>
                                <el-radio label="F">按钮</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item v-if="form.menuType != 'F'" label="菜单图标">
                    
                            <el-input v-model="form.icon" placeholder="点击选择图标">
                                <i slot="prefix" class="el-icon-search el-input__icon" />
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="菜单名称" prop="menuName">
                            <el-input v-model="form.menuName" placeholder="请输入菜单名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="显示排序" prop="orderNum">
                            <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item v-if="form.menuType != 'F'" label="是否外链">
                            <el-radio-group v-model="form.isFrame">
                                <el-radio label="0">是</el-radio>
                                <el-radio label="1">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item v-if="form.menuType != 'F'" label="路由地址" prop="path">
                            <el-input v-model="form.path" placeholder="请输入路由地址" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="form.menuType == 'C'">
                        <el-form-item label="组件路径" prop="component">
                            <el-input v-model="form.component" placeholder="请输入组件路径" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item v-if="form.menuType != 'M'" label="权限标识">
                            <el-input v-model="form.perms" placeholder="请权限标识" maxlength="100" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item v-if="form.menuType != 'F'" label="显示状态">
                            <el-radio-group v-model="form.visible">
                                <el-radio v-for="dict in visibleOptions" :key="dict.dictValue" :label="dict.dictValue">{{
                                    dict.dictLabel }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item v-if="form.menuType != 'F'" label="菜单状态">
                            <el-radio-group v-model="form.status">
                                <el-radio v-for="dict in statusOptions" :key="dict.dictValue" :label="dict.dictValue">{{
                                    dict.dictLabel }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <template #footer>
                <span class="dialog-footer">

                    <el-button type="primary" plain @click="submitForm">确 定</el-button>
                    <el-button type="danger" @click="cancel">取 消</el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>
  
<script>
import {
    listMenu,
    getMenu,
    delMenu,
    addMenu,
    updateMenu,
} from "@/api/common/menu.js";
import { mapState } from 'pinia';
import { useCounterStore } from '@/stores/counter';
import { handleTree, selectDictLabel } from "@/utils/ruoyi.js";

export default {
    name: "Menu",
    isRouter: true,
    data() {
        return {
            // 遮罩层
            loading: true,
            // 菜单表格树数据
            menuList: [],
            // 菜单树选项
            menuOptions: [],
            // 弹出层标题
            title: "",
            // 是否显示弹出层
            open: false,
            // 显示状态数据字典
            visibleOptions: [],
            // 菜单状态数据字典
            statusOptions: [],
            // 查询参数
            queryParams: {
                menuName: undefined,
                visible: undefined,
                remark: "meter",
            },
            // 表单参数
            form: {},
            // 表单校验
            rules: {
                menuName: [
                    { required: true, message: "菜单名称不能为空", trigger: "blur" },
                ],
                orderNum: [
                    { required: true, message: "菜单顺序不能为空", trigger: "blur" },
                ],
                path: [
                    { required: true, message: "路由地址不能为空", trigger: "blur" },
                ],
            },
        };
    },
    created() {
        this.getList();

        this.$com.getDict("sys_show_hide").then(res => {
            this.visibleOptions = res.data;

        })
        this.$com.getDict("sys_normal_disable").then(res => {
            this.statusOptions = res.data;

        })
    },
    mounted() {
    },
    methods: {
        // 选择图标
        selected(name) {
            this.form.icon = name;
        },
        /** 查询菜单列表 */
        getList() {
            this.loading = true;
            listMenu(this.queryParams).then((response) => {
                this.menuList = handleTree(response.data, "menuId");
                this.loading = false;
            });
        },
        /** 转换菜单数据结构 */
        normalizer(node) {
            if (node.children && !node.children.length) {
                delete node.children;
            }
            return {
                id: node.menuId,
                label: node.menuName,
                children: node.children,
            };
        },
        /** 查询菜单下拉树结构 */
        getTreeselect() {
            listMenu().then((response) => {
                this.menuOptions = [];
                const menu = { menuId: 0, menuName: "主类目", children: [] };
                menu.children = handleTree(response.data, "menuId");
                this.menuOptions.push(menu);
            });
        },
        // 显示状态字典翻译
        visibleFormat(row, column) {
            if (row.menuType == "F") {
                return "";
            }
            return selectDictLabel(this.visibleOptions, row.visible);
        },
        // 菜单状态字典翻译
        statusFormat(row, column) {
            if (row.menuType == "F") {
                return "";
            }
            return selectDictLabel(this.statusOptions, row.status);
        },
        // 取消按钮
        cancel() {
            this.open = false;

        },
        // 表单重置
        reset() {
            this.form = {
                menuId: undefined,
                parentId: 0,
                menuName: undefined,
                icon: undefined,
                menuType: "M",
                orderNum: undefined,
                isFrame: "1",
                visible: "0",
                status: "0",
            };

        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.getList();
        },
        /** 新增按钮操作 */
        handleAdd(index, row) {
            console.log(index, row)
            this.getTreeselect();
            // if (row != null) {
            //     this.form.parentId = row.menuId;
            //     this.form.parentIds =
            //         row.parentId == null || row.parentId == ""
            //             ? 0
            //             : row.parentId + "," + row.menuId;
            // }
            this.open = true;
            this.title = "添加菜单";
        },
        /** 修改按钮操作 */
        handleUpdate(row) {

            this.getTreeselect();

            getMenu(row.menuId).then((response) => {
                this.form = response.data;
                this.open = true;
                this.title = "修改菜单";
            });
        },
        /** 提交按钮 */
        submitForm: function () {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    this.form.remark = "MRBS";
                    if (this.form.menuId != undefined) {
                        updateMenu(this.form).then((response) => {
                            if (response.code === 200) {
                                this.$message.success("修改成功");
                                this.open = false;
                                // this.getList();
                            }
                        });
                    } else {
                        this.form.remark = "MRBS";
                        addMenu(this.form).then((response) => {
                            if (response.code === 200) {
                                this.$message.success("新增成功");
                                this.open = false;
                                this.getList();
                            }
                        });
                    }
                }
            });
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            this.$confirm(
                '是否确认删除名称为"' + row.menuName + '"的数据项?',
                "警告",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }
            )
                .then(function () {
                    return delMenu(row.menuId);
                })
                .then(() => {
                    this.getList();
                    this.msgSuccess("删除成功");
                })
                .catch(function () { });
        },
    },
    computed: {
        ...mapState(useCounterStore, ['collapse', 'OverallHeight'])

    },
};
</script>