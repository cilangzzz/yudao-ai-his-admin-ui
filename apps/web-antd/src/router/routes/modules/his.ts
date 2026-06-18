import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/his',
    name: 'HisCenter',
    meta: {
      title: '医院信息系统',
      icon: 'carbon:health',
      keepAlive: true,
      hideInMenu: true,
    },
    children: [
      // 门诊管理详情页
      {
        path: 'patient/detail/:id',
        name: 'HisPatientDetail',
        meta: {
          title: '患者详情',
          activePath: '/his/patient',
        },
        component: () => import('#/views/his/patient/detail/index.vue'),
      },
      {
        path: 'register/detail/:id',
        name: 'HisRegisterDetail',
        meta: {
          title: '挂号详情',
          activePath: '/his/register',
        },
        component: () => import('#/views/his/register/detail/index.vue'),
      },
      {
        path: 'prescription/detail/:id',
        name: 'HisPrescriptionDetail',
        meta: {
          title: '处方详情',
          activePath: '/his/prescription',
        },
        component: () => import('#/views/his/prescription/detail/index.vue'),
      },
      // 住院管理详情页
      {
        path: 'admission/detail/:id',
        name: 'HisAdmissionDetail',
        meta: {
          title: '住院详情',
          activePath: '/his/admission',
        },
        component: () => import('#/views/his/admission/detail/index.vue'),
      },
      {
        path: 'settlement/detail/:id',
        name: 'HisSettlementDetail',
        meta: {
          title: '结算详情',
          activePath: '/his/settlement',
        },
        component: () => import('#/views/his/settlement/detail/index.vue'),
      },
      // 药品管理详情页
      {
        path: 'drug/detail/:id',
        name: 'HisDrugDetail',
        meta: {
          title: '药品详情',
          activePath: '/his/drug',
        },
        component: () => import('#/views/his/drug/detail/index.vue'),
      },
    ],
  },
];

export default routes;