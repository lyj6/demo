<template>
  <div id="sidebar-left">
    <el-menu
      :router="true"
      :default-active="$route.path"
      :collapse="collapse"
      class="el-menu-vertical-demo"
      background-color="#24292e"
      text-color="#fff"
      active-text-color="#1bb1de"
      :unique-opened="true"
    >
      <template v-for="route in sidebarInfo">
        <el-submenu v-if="route.children" :index="route.path" :key="route.path">
          <template slot="title">
            <i style="padding-right:5px;font-size:16px" class="icon iconfont" :class="route.icon">
              <span style="margin-left:10px;font-size:14px;line-height:14px">{{ route.name }}</span>
            </i>
          </template>
          <el-menu-item-group>
            <el-menu-item
              style="font-size:14px"
              class="icon iconfont"
              :class="child.icon"
              v-for="child in route.children"
              :index="route.path + '/' + child.path"
              :key="route.path + '/' + child.path"
            >{{ child.name }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item class="sidebar-icon" :index="route.path" :key="route.path" v-else>
          <template>
            <i class="icon iconfont" :class="route.icon"></i>
            <span style="font-size:14px;line-height:16px" slot="title">
              <span style="margin-left:5px">{{route.name}}</span>
            </span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'sidebar',
  data() {
    return {
      indexPath: [], //保存点击过的页面路由信息
      sidebarInfo: [
        {
          path: 'sysParameter',
          name: '系统dict',

          icon: 'iconxitong'
        },
        {
          path: 'cate',
          name: '产品分类',
          icon: 'icontixian'
        },
        {
          path: '/home/TrafficManagement',
          name: '流量主管理',
          icon: 'iconliuliangzhu'
        },
        {
          path: '/home/PublicArticles',
          name: '文章发布',
          icon: 'iconxiewenzhang'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      collapse: state => state.collapse
    })
  },
  methods: {
    isManager() {
      //判断是否是管理员，是的话显示系统dict

      var userInfo = JSON.parse(localStorage.getItem('userInfo'))
      //console.log('是否是管理员阿', userInfo)
      // if (userInfo.sys_role == 1) {
      //   //    this.sidebarInfo.splice(6,4);
      //   return
      // }
      // if (userInfo.sys_role == 0) {
      //   if (userInfo.agent_level == 0) {
      //     this.sidebarInfo.splice(0, 6)
      //     return
      //   } else if (userInfo.agent_level == 1 || userInfo.agent_level == 2) {
      //     this.sidebarInfo.splice(0, 6)
      //     this.sidebarInfo.splice(3, 1)
      //   }
      // }
    }
  },
  mounted() {
    this.isManager()
  }
}
</script>
<style scoped>
</style>
