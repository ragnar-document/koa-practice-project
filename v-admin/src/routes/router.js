const Layout = () => import(/* webpackChunkName: "Layout" */ "@/views/Layout.vue");
const Home = () => import(/* webpackChunkName: "Home" */ "@/views/Home.vue");
const Manager = () =>
  import(/* webpackChunkName: "Manager" */ "@/views/Manager.vue");
const ManagerAdd = () =>
  import(/* webpackChunkName: "ManagerAdd" */ "@/views/ManagerAdd.vue");
const ManagerInfo = () =>
  import(/* webpackChunkName: "ManagerInfo" */ "@/views/ManagerInfo.vue");

export default [
  {
    path: "/",
    name: "Root",
    component: Layout,
    redirect: { name: "Home" },
    meta: {
      breadcrumb: {
        title: "根目录",
        replace: "/"
      }
    },
    children: [
      {
        path: "/home",
        name: "Home",
        component: Home,
        meta: {
          nav: {
            icon: "el-icon-pie-chart",
            title: "概况"
          },
          breadcrumb: {
            title: "概况"
          }
        }
      },
      {
        path: "/Manager",
        name: "ManagerList",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            icon: "el-icon-user",
            title: "管理员"
          },
          breadcrumb: {
            title: "管理员"
          }
        },
        children: [
          {
            path: "/Manager",
            name: "Manager",
            component: Manager,
            meta: {
              nav: {
                icon: "el-icon-pie-chart",
                title: "管理员列表"
              },
              breadcrumb: {
                title: "管理员列表"
              }
            }
          },
          {
            path: "/Manager/add",
            name: "ManagerAdd",
            component: ManagerAdd,
            meta: {
              breadcrumb: {
                title: "管理员添加"
              }
            }
          },
          {
            path: "/manager/:id",
            name: "ManagerInfo",
            component: ManagerInfo,
            meta: {
              breadcrumb: {
                title: "管理员详情"
              }
            }
          }
        ]
      }
    ]
  }

];
