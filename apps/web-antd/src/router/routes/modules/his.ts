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
      // ==================== 门诊管理详情页 ====================
      {
        path: 'outpatient/patient/detail/:id',
        name: 'HisPatientDetail',
        meta: {
          title: '患者详情',
          activePath: '/his/outpatient/patient',
        },
        component: () => import('#/views/his/outpatient/patient/detail/index.vue'),
      },
      {
        path: 'outpatient/register/detail/:id',
        name: 'HisRegisterDetail',
        meta: {
          title: '挂号详情',
          activePath: '/his/outpatient/register',
        },
        component: () => import('#/views/his/outpatient/register/detail/index.vue'),
      },
      {
        path: 'outpatient/prescription/detail/:id',
        name: 'HisPrescriptionDetail',
        meta: {
          title: '处方详情',
          activePath: '/his/outpatient/prescription',
        },
        component: () => import('#/views/his/outpatient/prescription/detail/index.vue'),
      },
      {
        path: 'outpatient/fee/detail/:id',
        name: 'HisFeeDetail',
        meta: {
          title: '门诊费用详情',
          activePath: '/his/outpatient/fee',
        },
        component: () => import('#/views/his/outpatient/fee/detail/index.vue'),
      },
      // ==================== 住院管理详情页 ====================
      {
        path: 'inpatient/admission/detail/:id',
        name: 'HisAdmissionDetail',
        meta: {
          title: '入院详情',
          activePath: '/his/inpatient/admission',
        },
        component: () => import('#/views/his/inpatient/admission/detail/index.vue'),
      },
      {
        path: 'inpatient/discharge/detail/:id',
        name: 'HisDischargeDetail',
        meta: {
          title: '出院详情',
          activePath: '/his/inpatient/discharge',
        },
        component: () => import('#/views/his/inpatient/discharge/detail/index.vue'),
      },
      {
        path: 'inpatient/settlement/detail/:id',
        name: 'HisSettlementDetail',
        meta: {
          title: '住院结算详情',
          activePath: '/his/inpatient/settlement',
        },
        component: () => import('#/views/his/inpatient/settlement/detail/index.vue'),
      },
      {
        path: 'inpatient/order/detail/:id',
        name: 'HisOrderDetail',
        meta: {
          title: '医嘱详情',
          activePath: '/his/inpatient/order',
        },
        component: () => import('#/views/his/inpatient/order/detail/index.vue'),
      },
      // ==================== 药品管理详情页 ====================
      {
        path: 'pharmacy/drug/detail/:id',
        name: 'HisDrugDetail',
        meta: {
          title: '药品详情',
          activePath: '/his/pharmacy/drug',
        },
        component: () => import('#/views/his/pharmacy/drug/detail/index.vue'),
      },
      // ==================== 医嘱执行详情页 ====================
      {
        path: 'order-exec/medication-admin/detail/:id',
        name: 'HisMedicationAdminDetail',
        meta: {
          title: '给药记录详情',
          activePath: '/his/order-exec/medication-admin',
        },
        component: () => import('#/views/his/order-exec/medication-admin/detail/index.vue'),
      },
    ],
  },
];

export default routes;
