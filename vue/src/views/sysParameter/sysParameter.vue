<template>
  <div class="sysParameter">
    <!-- 搜索框 -->
    <div class="sysParameter-top">
      <!-- 输入框 -->
      <el-button icon="el-icon-plus" @click="addAll" type="success" size="small">添加新值</el-button>

      <el-form :model="paginateParams" label-width="100px" class="demo-ruleForm">
        <el-form-item label="状态选项">
          <el-select v-model="paginateParams.state" placeholder="状态选项">
            <el-option label="全部" value="0"></el-option>
            <el-option label="上架" value="1"></el-option>
            <el-option label="下架" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="sys-input">
        <el-input v-model="paginateParams.searchValue" placeholder="请输入系统key或者系统值" clearable></el-input>
        <el-button @click="onSearch" type="warning" size="medium" class="el-icon-search">搜索</el-button>
      </div>
    </div>
    <!-- 配置列表 -->
    <div class="list">
      <!-- :data 绑定值 -->
      <el-table :data="paginate.list" style="width: 100%">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="sys_name" label="名字"></el-table-column>
        <el-table-column prop="parent_id" label="父级ID"></el-table-column>
        <el-table-column prop="order_num" label="序号"></el-table-column>
        <el-table-column prop="sys_value" label="系统值"></el-table-column>
        <el-table-column prop="sys_key" label="系统key"></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
        <el-table-column prop="remark" label="管理员备注"></el-table-column>
        <!-- <template slot-scope="scope">
            <span v-if="scope.row.remark!=''">{{scope.row.remark}}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>-->
        <el-table-column prop="state" label="状态" width="100px">
          <template slot-scope="scope">
            <span>{{scope.row.state == 1 ? "已上架" : "已下架" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="editData(scope.$index)"
              type="primary"
              icon="el-icon-edit"
              size="small"
            ></el-button>
            <el-button @click="add(scope.$index)" type="success" icon="el-icon-plus" size="small"></el-button>

            <el-button
              v-if="scope.row.state == 1"
              @click="handleDelete(scope.$index,2)"
              type="danger"
              title="下架"
              size="small"
            >下架</el-button>
            <el-button
              v-if="scope.row.state == 2"
              @click="handleDelete(scope.$index,1)"
              type="info"
              title="上架"
              size="small"
            >上架</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 全局添加 -->
    <el-dialog
      title="添加新纪录"
      :visible.sync="addAlldialogVisible"
      width="30%"
      :close-on-click-modal="false"
      :show-close="false"
      center
    >
      <el-form :model="add_data">
        <el-form-item label="名字" :label-width="formLabelWidth">
          <el-input v-model="add_data['m.sys_name']" placeholder="请输入名字" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="父ID:" :label-width="formLabelWidth">
          <el-input v-model="add_data['m.parent_id']" placeholder="请输入父级ID(选填)" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="系统key：" :label-width="formLabelWidth">
          <el-input v-model="add_data['m.sys_key']" placeholder="请输入系统key" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="系统值：" :label-width="formLabelWidth">
          <el-input v-model="add_data['m.sys_value']" placeholder="请输入系统值" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="序号：" :label-width="formLabelWidth">
          <el-input v-model="add_data['m.order_num']" placeholder="请输入序号(选填)" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注：" :label-width="formLabelWidth">
          <el-input v-model="add_data['m.remark']" placeholder="请输入备注" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button :disabled="btnChangeEnable" type="primary" @click="sureAddAll">确 定</el-button>
        <el-button @click="notAddAll">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 编辑弹框 -->
    <el-dialog
      title="编辑"
      width="40%"
      :visible.sync="editdialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      center
    >
      <div class="edit-maindiv">
        <div style="font-size:16px">
          您正在编辑
          <span style="font-size:18px;font-weight:bold">{{edit_data.sysName}}</span>的信息
        </div>
        <el-form label-width="100px">
          <el-form-item label="名字：">
            <el-input v-model="edit_data['m.sys_name']" placeholder="请输入名字"></el-input>
          </el-form-item>
          <el-form-item label="系统key：">
            <el-input v-model="edit_data['m.sys_key']" placeholder="请输入系统key"></el-input>
          </el-form-item>
          <el-form-item label="系统值：">
            <el-input v-model="edit_data['m.sys_value']" placeholder="请输入系统值"></el-input>
          </el-form-item>
          <el-form-item label="序号：">
            <el-input v-model="edit_data['m.ordernum']" placeholder="请输入序号(选填)"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="edit_data['m.remark']" placeholder="请输入备注"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sureEdit">确 定</el-button>
        <el-button @click="notEdit">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 添加子集 -->
    <el-dialog
      title="添加子集"
      :visible.sync="adddialogVisible"
      width="30%"
      :close-on-click-modal="false"
      :show-close="false"
      center
    >
      <div class="edit-maindiv">
        <div style="font-size:16px">
          您正在添加
          <span style="font-size:18px;font-weight:bold">{{edit_value}}</span>的子集
        </div>
        <el-form label-width="120px">
          <el-form-item label="名字：">
            <el-input v-model="add_data['m.sys_name']" placeholder="请输入名字"></el-input>
          </el-form-item>
          <el-form-item label="系统key：">
            <el-input v-model="add_data['m.sys_key']" placeholder="请输入系统key"></el-input>
          </el-form-item>
          <el-form-item label="系统值：">
            <el-input v-model="add_data['m.sys_value']" placeholder="请输入系统值"></el-input>
          </el-form-item>
          <el-form-item label="序号：">
            <el-input v-model="add_data['m.order_num']" placeholder="请输入序号(选填)"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="add_data['m.remark']" placeholder="请输入备注"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button :disabled="btnChangeEnable" type="primary" @click="sureAdd">确 定 吗</el-button>
        <el-button @click="notAdd">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 删除弹框 -->
    <el-dialog
      class="delInDict"
      title="提示"
      :visible.sync="deletedialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="20%"
      center
    >
      <div v-if="Onstate==1" style="text-align:center">
        <b>是否将{{updownname}}上架</b>
      </div>
      <div v-else style="text-align:center">
        <b>是否将{{updownname}}下架</b>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deletedialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="page"
      :current-page="paginate.pageNumber"
      :page-sizes="[3, 5, 7, 9]"
      :page-size="paginate.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="paginate.totalRow"
    ></el-pagination>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'sysParameter',
  data() {
    return {
      noNAN: 0,
      noNAN1: 0,
      //按钮默认可以点击
      btnChangeEnable: false,
      //初始化添加修改弹框为隐藏
      editdialogVisible: false,
      adddialogVisible: false,
      deletedialogVisible: false,
      addAlldialogVisible: false,
      edit_value: '', //添加子集时候用到
      Onstate: '', //储存状态  上架或者下架
      paginate: {},
      paginateParams: {
        page: 1, //当前页码
        pageSize: 5, //每页显示数
        searchValue: '',
        state: '' //下拉选择
      },
      tempIndex: 0,
      //用于修改的值
      edit_data: {
        'm.sys_name': '',
        'm.parent_id': '',
        'm.sys_key': '',
        'm.sys_value': '',
        'm.order_num': '',
        'm.remark': ''
      },
      //添加的对象
      add_data: {},
      //上架下架所需参数
      updown: {},
      //上下架确定框上的名字
      updownname: '',
      seach: {},
      //页码数据
      currentPageNum: 1,
      formLabelWidth: '90px'
    }
  },

  methods: {
    // 搜索功能
    onSearch() {
      this.paginateParams.page = 1
      this.getlist()
    },
    // 全局添加   点击左上角添加按钮
    addAll() {
      this.add_data = {}
      this.addAlldialogVisible = true
    },
    //确认添加
    sureAddAll() {
      //将按钮禁用
      if (this.publiverify() === 'success') {
        this.btnChangeEnable = true

        this.$PostAPI(this.$PostUrl.adminsysDictAdd, this.add_data).then(
          res => {
            if (res.statusCode == 200) {
              this.addAlldialogVisible = false
              this.$message.success(res.message)
              this.paginate.list.unshift(res.data)
              this.btnChangeEnable = false
            } else {
              this.$message.error(res.message)
              this.btnChangeEnable = false
            }
          }
        )
      } else {
        this.$set((this.add_data, {}))
      }
    },
    //全局添加的取消添加
    notAddAll() {
      this.addAlldialogVisible = false
      this.noNAN1 = 0
      this.noNAN = 0
      this.add_data = {}
      this.btnChangeEnable = false
    },

    //表格取消添加
    notAdd() {
      this.add_data = {}
      this.noNAN1 = 0
      this.adddialogVisible = false
      this.btnChangeEnable = false
    },
    // 编辑确认
    sureEdit() {
      this.edit_data['m.state'] = 1

      this.$PostAPI(this.$PostUrl.adminsysDictUpdate, this.edit_data).then(
        res => {
          console.log(res)
          if (res.statusCode == 200) {
            this.$message.success(res.message)
            this.editdialogVisible = false
            //将数据重新赋值

            this.paginate.list[this.tempIndex].sys_name = this.edit_data[
              'm.sys_name'
            ]
            this.paginate.list[this.tempIndex].sys_key = this.edit_data[
              'm.sys_key'
            ]
            this.paginate.list[this.tempIndex].sys_value = this.edit_data[
              'm.sys_value'
            ]
            this.paginate.list[this.tempIndex].order_num = this.edit_data[
              'm.order_num'
            ]
            this.paginate.list[this.tempIndex].remark = this.edit_data[
              'm.remark'
            ]
          } else {
            this.$message.error(res.message)
          }
        }
      )
    },
    //点击取消编辑
    notEdit() {
      this.editdialogVisible = false
      //由于视图数据改变 但是没有重新渲染 使用$set可以重新赋值
      this.$set((this.edit_data, {}))
    },
    // 切换每一页
    handleCurrentChange(val) {
      this.currentPageNum = val
      this.paginateParams.page = val
      this.getlist()
    },
    //每页显示数
    handleSizeChange(val) {
      //console.log(val)
      // //val为传过来选择的每页几个数
      this.paginateParams.pageSize = val
      this.currentPageNum = 1
      this.paginateParams.page = 1
      this.getlist()
    },

    //获取所有系统参数
    getlist() {
      //console.log(this.paginateParams) //接受搜索分页数据
      this.$PostAPI(this.$PostUrl.adminsysDictPage, this.paginateParams).then(
        res => {
          console.log(res)
          this.paginate = res.data.paginate
          //console.log(this.paginate)
        }
      )
    },
    //点击编辑时获取该条数据 index为传来的id
    editData(index) {
      this.editdialogVisible = true
      this.tempIndex = index
      this.edit_data['m.id'] = this.paginate.list[index].id
      this.edit_data['m.sys_name'] = this.paginate.list[index].sys_name
      this.edit_data['m.sys_key'] = this.paginate.list[index].sys_key
      this.edit_data['m.sys_value'] = this.paginate.list[index].sys_value
      this.edit_data['m.order_num'] = this.paginate.list[index].order_num
      this.edit_data['m.remark'] = this.paginate.list[index].remark
      //console.log(this.edit_data)
    },

    //表格里面点击添加
    add(index) {
      //父级id
      this.add_data.parent_id = index
      this.noNAN = 0 //输入非数值时判断
      this.adddialogVisible = true
    },
    // 局部添加
    sureAdd() {
      if (this.publiverify() === 'success') {
        this.btnChangeEnable = true

        this.$PostAPI(this.$PostUrl.adminsysDictAdd, this.add_data).then(
          res => {
            if (res.statusCode == 200) {
              this.$message.success(res.message)
              this.paginate.list.unshift(res.data)
              this.adddialogVisible = false
              this.btnChangeEnable = false
            } else {
              this.$message.error(res.message)
            }
          }
        )
      }
    },

    //局部添加和全局添加公共验证函数
    publiverify() {
      if (!this.add_data['m.sys_key'] || this.add_data['m.sys_key'] == '') {
        this.$message({
          message: '系统key不能为空',
          type: 'warning'
        })
      } else if (
        !this.add_data['m.sys_name'] ||
        this.add_data['m.sys_name'] == ''
      ) {
        this.$message({
          message: '系统name不能为空',
          type: 'warning'
        })
      } else if (
        !this.add_data['m.sys_value'] ||
        this.add_data['m.sys_value'] == ''
      ) {
        this.$message({
          message: '系统value不能为空',
          type: 'warning'
        })
      } else {
        return 'success'
      }
    },
    //点击上架下架
    handleDelete(index, state) {
      console.log(index, state)
      this.updownname = this.paginate.list[index].sys_key
      if (state == 1) {
        this.Onstate = state
        this.tempIndex = index //修改的id
        this.deletedialogVisible = true
      } else if (state == 2) {
        this.Onstate = state
        this.tempIndex = index
        this.deletedialogVisible = true
        this.tempIndex = index
      }
    },

    // 确认上架与下架
    deleteRow() {
      this.updown['m.id'] = this.paginate.list[this.tempIndex].id
      this.updown['m.state'] = this.Onstate
      this.$PostAPI(this.$PostUrl.adminsysDictUpdate, this.updown).then(res => {
        if (this.Onstate == 2) {
          if (res.statusCode == 200) {
            this.$message.success('下架成功')
            this.paginate.list[this.tempIndex].state = 2
            this.deletedialogVisible = false //关闭删除提示模态框
          }
        } else {
          if (res.statusCode == 200) {
            this.$message.success('上架成功')
            this.paginate.list[this.tempIndex].state = 1
            this.deletedialogVisible = false
          }
        }
      })
    }
  },

  components: {},
  mounted() {
    this.getlist()
  }
}
</script>




<style scoped src=''>
.fill-in {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.fill-in div {
  margin-top: 10px;
}
.edit-maindiv {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.sysParameter {
  /* border: 1px solid blue; */
  background-color: white;
  min-height: 100%;
  padding-top: 40px;
}

/* 配置参数输入框 */
.sys-input .el-input {
  width: 220px;
  margin-right: 20px;
}

.sys-input {
  position: absolute;
  right: 20px;

  padding: 30px;
}

/* 搜索框*/
.sysParameter-top {
  margin-left: 20px;
  display: flex;
  align-items: center;
  padding-bottom: 30px;
}
</style>
<style>
.el-input__inner::-webkit-input-placeholder {
  color: #c6c6c6;
}
.sys-input .el-input__inner {
  border-radius: 20px;
  padding-right: 16px;
}

.el-table .cell {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: normal;
  word-break: break-all;
  line-height: 23px;
}
.delInDict .el-dialog__body {
  min-height: 0px;
}

.demo-ruleForm {
  position: absolute;
  left: 1206px;
  top: 141px;
}
.page {
  position: fixed;
  left: 1385px;
  top: 800px;
}
</style>
