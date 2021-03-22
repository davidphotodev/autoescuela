import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  // Testing Data
    {
      path: '/load',
      name: 'load',
      component: () => import('../views/Load.vue')
    },
  // Home
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
  // Tariffs
    {
      path: '/tariffs/list',
      name: 'tariffs',
      component: () => import('../views/tariffs/Tariffs.vue')
    },
  // Profile
    {
      path: '/profile/messages',
      name: 'messages',
      component: () => import('../views/profile/Messages.vue')
    },
    {
      path: '/profile/school',
      name: 'school',
      component: () => import('../views/profile/School.vue')
    },
    {
      path: '/profile/promotionalcode',
      name: 'promotionalcode',
      component: () => import('../views/profile/PromotionalCode.vue')
    },
    {
      path: '/profile/plan',
      name: 'plan',
      component: () => import('../views/profile/Plan.vue')
    },
    {
      path: '/profile/password',
      name: 'password',
      component: () => import('../views/profile/Password.vue')
    },
  // Test
      {
        path: '/test/generate',
        name: 'generate',
        component: () => import('../views/test/Generate.vue')
      },
      {
        path: '/test/predefinedtest',
        name: 'predefinedtest',
        component: () => import('../views/test/PredefinedTest.vue')
      },
      {
        path: '/test/record',
        name: 'record',
        component: () => import('../views/test/Record.vue')
      },
      {
        path: '/test/addquestion',
        name: 'addquestion',
        component: () => import('../views/test/AddQuestion.vue')
      },
      {
        path: '/test/test/:id',
        name: 'test',
        component: () => import('../views/test/Test.vue')
      },
      {
        path: '/test/result/:testId',
        name: 'testresult',
        props: true,
        component: () => import('../views/test/TestResult.vue')
      },
      {
        path: '/test/correction/:testId',
        name: 'testcorrection',
        props: true,
        component: () => import('../views/test/TestCorrection.vue')
      },

  // Admin Routes
    {
      path: '/admin/test/manage',
      name: 'managetests',
      component: () => import('../views/admin/test/Manage.vue')
    },
    {
      path: '/admin/test/create',
      name: 'createpredefinedtest',
      component: () => import('../views/admin/test/CreatePredefined.vue')
    },
    {
      path: '/admin/test/list',
      name: 'listtests',
      component: () => import('../views/admin/test/List.vue')
    },
    {
      path: '/admin/subjects',
      name: 'managesubjects',
      component: () => import('../views/admin/ManageSubjects.vue')
    },
    {
      path: '/admin/topics',
      name: 'managetopics',
      component: () => import('../views/admin/ManageTopics.vue')
    },
    {
      path: '/admin/courses',
      name: 'managecourses',
      component: () => import('../views/admin/ManageCourses.vue')
    },
    {
      path: '/admin/codes',
      name: 'managecodes',
      component: () => import('../views/admin/ManageCodes.vue')
    },
    {
      path: '/admin/suscriptions',
      name: 'managesuscriptions',
      component: () => import('../views/admin/ManageSuscriptions.vue')
    },
    {
      path: '/admin/users',
      name: 'managesusers',
      component: () => import('../views/admin/ManageUsers.vue')
    },
    {
      path: '/admin/questions',
      name: 'managequestions',
      component: () => import('../views/admin/ManageQuestions.vue')
    },
    {
      path: '/admin/questionslist',
      name: 'questionslist',
      component: () => import('../views/admin/QuestionsList.vue')
    },
    {
      path: '/admin/messages',
      name: 'managemessages',
      component: () => import('../views/admin/ManageMessages.vue') 
    },
    {
      path: '/admin/questionsclients/:userId',
      name: 'questionsclients',
      props: true,
      component: () => import('../views/admin/questions/QuestionClients.vue') 
    },
    {
      path: '/admin/officialtest/:subjectId',
      name: 'officialtest',
      props: true,
      component: () => import('../views/admin/OfficialTest.vue') 
    },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
