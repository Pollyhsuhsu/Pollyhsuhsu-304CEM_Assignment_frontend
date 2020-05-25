import Home from '@/components/Home'
import Login from '@/view/login'
import Main from '@/components/Main.vue'
import Register from '@/view/register'
import Profile from '@/view/Profile'
import ListUsers from '@/view/ListUsers'
import ViewUser from '@/view/ViewUser'
import AddUser from '@/view/AddUser'
import ListDepartments from '@/view/ListDepartments'
import AddDepartment from '@/view/AddDepartment'
import EditDepartment from '@/view/EditDepartment'
import AddCourse from '@/view/AddCourse'
import ListCourses from '@/view/ListCourses'
import EditCourse from '@/view/EditCourse'
import ListProgram from '@/view/ListProgram'
import AddProgram from '@/view/AddProgram'
import EditProgram from '@/view/EditProgram'
import AddClass from '@/view/AddClass'
import EditClass from '@/view/EditClass'
import ListClass from '@/view/ListClass'
import ListAttendance from '@/view/ListAttendance'
import SetAttendance from '@/view/SetAttendance'
import SetAttendance2 from '@/view/SetAttendance2'
import SetAttendance3 from '@/view/SetAttendance3'
import Schedule from '@/view/Schedule'

let routes = [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      hidden: true
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      hidden: true
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      leaf: true,
      roles: ["Admin","teacher"],
      iconCls: 'el-icon-s-home',//图标样式class
      children: [
        { path: '/main', component: Main, name: 'message.Home'},
      ]
    },
    {
      path: '/',
      name: 'message.User',
      component: Home,
      roles: ["Admin"],
      iconCls: 'el-icon-user',//图标样式class
      children: [
        { path: '/listUsers', component: ListUsers, name: 'message.listUser' },
        { path: '/addUser', component: AddUser, name: 'message.addUser'},
        { path: '/viewUser', component: ViewUser, name: 'View User',hidden: true}
      ]
    },
    {
      path: '/',
      name: 'message.User',
      component: Home,
      roles: ["teacher"],
      iconCls: 'el-icon-user',//图标样式class
      children: [
        { path: '/listUsers', component: ListUsers, name: 'message.listUser' },
        { path: '/viewUser', component: ViewUser, name: 'View User',hidden: true}
      ]
    },
    {
      path: '/profile',
      component: Home,
      roles: ["Admin","teacher"],
      redirect: '/profile/index',
      hidden: true,
      children: [
        {
          path: 'index',
          component: () => import('@/view/profile/index'),
          name: 'message.Profile',
          meta: { title: 'Profile', icon: 'user', noCache: true }
        }
      ]
    },
    {
      path: '/setting',
      component: Home,
      roles: ["Admin","teacher"],
      redirect: '/setting/index',
      hidden: true,
      children: [
        {
          path: 'index',
          component: () => import('@/view/setting/index'),
          name: 'message.setting',
          meta: { title: 'Setting', icon: 'user', noCache: true }
        }
      ]
    },
    {
      path: '/',
      component: Home,
      name: 'message.Department',
      iconCls: 'el-icon-office-building',
      roles: ["Admin"],
      children: [
        { path: '/listDepartments', component: ListDepartments, name: 'message.listDepartment' },
        { path: '/addDepartment', component: AddDepartment, name: 'message.addDepartment' },
        { path: '/editDepartment', component: EditDepartment, name: 'Edit Department', hidden:true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: 'message.Department',
      iconCls: 'el-icon-office-building',
      roles: ["teacher"],
      children: [
        { path: '/listDepartments', component: ListDepartments, name: 'message.listDepartment' },
        { path: '/editDepartment', component: EditDepartment, name: 'Edit Department', hidden:true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: 'message.Course',
      iconCls: 'el-icon-folder-opened',
      roles: ["Admin"],
      children: [
        { path: '/listCourses', component: ListCourses, name: 'message.listCourse' },
        { path: '/addCourse', component: AddCourse, name: 'message.addCourse'},
        { path: '/editCourse', component: EditCourse, name: 'Edit Course', hidden:true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: 'message.Course',
      iconCls: 'el-icon-folder-opened',
      roles: ["teacher"],
      children: [
        { path: '/listCourses', component: ListCourses, name: 'message.listCourse' },
        { path: '/editCourse', component: EditCourse, name: 'Edit Course', hidden:true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: 'message.Program',
      roles: ["Admin"],
      iconCls: 'el-icon-s-platform',
      children: [
        { path: '/listProgram', component: ListProgram, name: 'message.listProgram' },
        { path: '/addProgram', component: AddProgram, name: 'message.addProgram' },
        { path: '/editProgram', component: EditProgram, name: 'Edit Program', hidden:true },
      ]
    },
    {
      path: '/',
      component: Home,
      name: 'message.Class',
      roles: ["Admin"],
      iconCls: 'el-icon-reading',
      children: [
        { path: '/listClass', component: ListClass, name: 'message.listClass' },
        { path: '/addClass', component: AddClass, name: 'message.addClass' },
        { path: '/editClass', component: EditClass, name: 'Edit Class', hidden:true  },
      ]
    },
    {
      path: '/',
      component: Home,
      name: 'message.Class',
      roles: ["teacher"],
      iconCls: 'el-icon-reading',
      children: [
        { path: '/listClass', component: ListClass, name: 'message.listClass'},
        { path: '/editClass', component: EditClass, name: 'Edit Class', hidden:true  },
      ]
    },
    {
      path: '/',
      component: Home,
      name: 'message.Attendance',
      roles: ["Admin","teacher"],
      iconCls: 'el-icon-edit',
      children: [
        { path: '/listAttendance', component: ListAttendance, name: 'message.listAttendance'},
        { path: '/schedule', component: Schedule, name: 'Schedule' , hidden:true },
        { path: '/setAttendance', component: SetAttendance, name: 'Set Attendance', hidden:true   },
        { path: '/setAttendance2', component: SetAttendance2, name: 'Set Attendance2', hidden:true   },
        { path: '/setAttendance3', component: SetAttendance3, name: 'Set Attendance3', hidden:true   },
      ]
    },
    
  ]
  export default routes