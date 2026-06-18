# HIS 前端组件目录结构规范

> 本文档提供 HIS 医院信息系统前端组件的正确目录结构，供前端开发参考

---

## 一、目录结构对比

### 1.1 当前错误的目录结构

```
src/views/his/
├── admission/          # ❌ 错误：直接放在 his 下
├── drug/               # ❌ 错误：直接放在 his 下
├── fee/                # ❌ 错误：直接放在 his 下
├── order/              # ❌ 错误：直接放在 his 下
├── patient/            # ❌ 错误：直接放在 his 下
├── prescription/       # ❌ 错误：直接放在 his 下
├── register/           # ❌ 错误：直接放在 his 下
└── settlement/         # ❌ 错误：直接放在 his 下
```

**问题**: 所有模块都直接放在 `his` 目录下，没有按照菜单层级组织。

### 1.2 正确的目录结构（参考 system 模块）

```
src/views/his/
├── outpatient/                     # 门诊管理
│   ├── patient/                   # 患者管理
│   │   ├── index.vue              # 列表页面
│   │   ├── data.ts                # 数据定义
│   │   ├── detail/                # 详情页面
│   │   │   └── index.vue
│   │   └── modules/               # 弹窗/表单组件
│   │       ├── form.vue           # 新增/编辑表单
│   │       └── form-schema.vue   # 表单 Schema
│   ├── appointment/               # 预约挂号
│   ├── register/                  # 挂号收费
│   ├── schedule/                  # 医生排班
│   ├── prescription/              # 处方管理
│   ├── fee/                       # 门诊收费
│   ├── dispense/                  # 门诊药房
│   ├── exam-request/              # 检查申请
│   ├── exam-item/                 # 检查项目
│   ├── payment/                   # 支付管理
│   └── refund/                    # 退费管理
├── inpatient/                      # 住院管理
│   ├── admission/                 # 入院管理
│   ├── bed/                       # 床位管理
│   ├── order/                     # 医嘱管理
│   ├── ward/                      # 病区管理
│   ├── nursing/                   # 护理记录
│   ├── preAdmission/              # 预住院管理
│   ├── discharge/                 # 出院管理
│   ├── assess/                    # 入院评估
│   └── prepayment/                # 预交金管理
├── pharmacy/                       # 药品管理
│   ├── drug/                      # 药品目录
│   ├── stock/                     # 药品库存
│   ├── inbound/                   # 入库管理
│   ├── outbound/                  # 出库管理
│   ├── inventory/                 # 盘点管理
│   ├── supplier/                  # 供应商管理
│   ├── purchase/                  # 采购计划
│   └── drug-return/               # 退药管理
├── basic/                          # 基础数据
│   ├── department/                # 科室管理
│   ├── staff/                     # 医护人员
│   ├── charge-item/               # 收费项目
│   └── ward/                      # 病区管理
├── lab/                            # 检验管理
│   ├── lab-request/               # 检验申请管理
│   ├── lab-item/                  # 检验项目字典
│   └── critical-value/            # 危急值管理
└── order-exec/                     # 医嘱执行
    ├── order/                     # 医嘱管理
    ├── medication-admin/          # 给药记录
    ├── vital-sign/                # 生命体征
    ├── nursing-record/            # 护理记录
    └── nursing-assessment/        # 护理评估
```

---

## 二、单个功能模块的标准结构

### 2.1 参考 system/user 模块

```
src/views/system/user/
├── index.vue              # 主页面（列表页）
├── data.ts                # 表格列、表单配置等数据定义
├── components/            # 可复用组件
│   ├── index.ts          # 组件导出
│   └── select-modal.vue  # 用户选择弹窗
└── modules/               # 弹窗/表单模块
    ├── form.vue          # 新增/编辑表单
    ├── assign-role-form.vue  # 分配角色表单
    ├── import-form.vue   # 导入表单
    └── reset-password-form.vue  # 重置密码表单
```

### 2.2 HIS 功能模块标准结构

```
src/views/his/outpatient/patient/
├── index.vue              # 患者列表页面
├── data.ts                # 数据定义（表格列、搜索表单、表单配置）
├── detail/                # 详情页面（可选）
│   └── index.vue
└── modules/               # 弹窗/表单模块
    ├── form.vue           # 新增/编辑患者表单
    └── form-schema.vue    # 表单 Schema（可选）
```

---

## 三、目录与菜单路径对应关系

### 3.1 路径映射表

| 菜单路径 | 前端组件目录 |
|----------|-------------|
| `/his` | `src/views/his/` |
| `/his/outpatient` | `src/views/his/outpatient/` |
| `/his/outpatient/patient` | `src/views/his/outpatient/patient/index.vue` |
| `/his/inpatient/admission` | `src/views/his/inpatient/admission/index.vue` |
| `/his/pharmacy/drug` | `src/views/his/pharmacy/drug/index.vue` |
| `/his/basic/department` | `src/views/his/basic/department/index.vue` |
| `/his/lab/lab-request` | `src/views/his/lab/lab-request/index.vue` |
| `/his/order-exec/order` | `src/views/his/order-exec/order/index.vue` |

### 3.2 完整映射关系

```
数据库菜单配置                          前端组件路径
────────────────────────────────────────────────────────────────────
/his                              →    src/views/his/
├── outpatient                    →    src/views/his/outpatient/
│   ├── patient                   →    src/views/his/outpatient/patient/index.vue
│   ├── appointment               →    src/views/his/outpatient/appointment/index.vue
│   ├── register                  →    src/views/his/outpatient/register/index.vue
│   ├── schedule                  →    src/views/his/outpatient/schedule/index.vue
│   ├── prescription              →    src/views/his/outpatient/prescription/index.vue
│   ├── fee                       →    src/views/his/outpatient/fee/index.vue
│   ├── dispense                  →    src/views/his/outpatient/dispense/index.vue
│   ├── exam-request              →    src/views/his/outpatient/exam-request/index.vue
│   ├── exam-item                 →    src/views/his/outpatient/exam-item/index.vue
│   ├── payment                   →    src/views/his/outpatient/payment/index.vue
│   └── refund                    →    src/views/his/outpatient/refund/index.vue
├── inpatient                     →    src/views/his/inpatient/
│   ├── admission                 →    src/views/his/inpatient/admission/index.vue
│   ├── bed                       →    src/views/his/inpatient/bed/index.vue
│   ├── order                     →    src/views/his/inpatient/order/index.vue
│   ├── ward                      →    src/views/his/inpatient/ward/index.vue
│   ├── nursing                   →    src/views/his/inpatient/nursing/index.vue
│   ├── preAdmission              →    src/views/his/inpatient/preAdmission/index.vue
│   ├── discharge                 →    src/views/his/inpatient/discharge/index.vue
│   ├── assess                    →    src/views/his/inpatient/assess/index.vue
│   └── prepayment                →    src/views/his/inpatient/prepayment/index.vue
├── pharmacy                      →    src/views/his/pharmacy/
│   ├── drug                      →    src/views/his/pharmacy/drug/index.vue
│   ├── stock                     →    src/views/his/pharmacy/stock/index.vue
│   ├── inbound                   →    src/views/his/pharmacy/inbound/index.vue
│   ├── outbound                  →    src/views/his/pharmacy/outbound/index.vue
│   ├── inventory                 →    src/views/his/pharmacy/inventory/index.vue
│   ├── supplier                  →    src/views/his/pharmacy/supplier/index.vue
│   ├── purchase                  →    src/views/his/pharmacy/purchase/index.vue
│   └── drug-return               →    src/views/his/pharmacy/drug-return/index.vue
├── basic                         →    src/views/his/basic/
│   ├── department                →    src/views/his/basic/department/index.vue
│   ├── staff                     →    src/views/his/basic/staff/index.vue
│   ├── charge-item               →    src/views/his/basic/charge-item/index.vue
│   └── ward                      →    src/views/his/basic/ward/index.vue
├── lab                           →    src/views/his/lab/
│   ├── lab-request               →    src/views/his/lab/lab-request/index.vue
│   ├── lab-item                  →    src/views/his/lab/lab-item/index.vue
│   └── critical-value           →    src/views/his/lab/critical-value/index.vue
└── order-exec                    →    src/views/his/order-exec/
    ├── order                     →    src/views/his/order-exec/order/index.vue
    ├── medication-admin          →    src/views/his/order-exec/medication-admin/index.vue
    ├── vital-sign                →    src/views/his/order-exec/vital-sign/index.vue
    ├── nursing-record            →    src/views/his/order-exec/nursing-record/index.vue
    └── nursing-assessment        →    src/views/his/order-exec/nursing-assessment/index.vue
```

---

## 四、组件命名规范

### 4.1 文件命名

| 文件类型 | 命名 | 说明 |
|----------|------|------|
| 列表页面 | `index.vue` | 主入口文件 |
| 详情页面 | `detail/index.vue` | 详情页面 |
| 数据定义 | `data.ts` | 表格列、搜索配置等 |
| 表单组件 | `modules/form.vue` | 新增/编辑表单 |
| 表单Schema | `modules/form-schema.vue` | 表单配置 |
| 弹窗组件 | `modules/xxx-modal.vue` | 弹窗组件 |
| 可复用组件 | `components/xxx.vue` | 公共组件 |

### 4.2 组件内部命名

```vue
<!-- src/views/his/outpatient/patient/index.vue -->
<script setup lang="ts">
// 页面命名规则：功能名 + Page
defineOptions({
  name: 'HisPatientPage'
})
</script>
```

```vue
<!-- src/views/his/outpatient/patient/modules/form.vue -->
<script setup lang="ts">
// 表单组件命名规则：功能名 + Form
defineOptions({
  name: 'HisPatientForm'
})
</script>
```

---

## 五、迁移指南

### 5.1 需要迁移的文件

| 当前位置 | 迁移到 |
|----------|--------|
| `his/patient/` | `his/outpatient/patient/` |
| `his/register/` | `his/outpatient/register/` |
| `his/prescription/` | `his/outpatient/prescription/` |
| `his/fee/` | `his/outpatient/fee/` |
| `his/admission/` | `his/inpatient/admission/` |
| `his/settlement/` | `his/inpatient/settlement/` |
| `his/drug/` | `his/pharmacy/drug/` |
| `his/order/` | `his/inpatient/order/` 或 `his/order-exec/order/` |

### 5.2 迁移命令示例

```bash
# 创建目录结构
mkdir -p src/views/his/{outpatient,inpatient,pharmacy,basic,lab,order-exec}

# 迁移 outpatient 模块
mv src/views/his/patient src/views/his/outpatient/
mv src/views/his/register src/views/his/outpatient/
mv src/views/his/prescription src/views/his/outpatient/
mv src/views/his/fee src/views/his/outpatient/

# 迁移 inpatient 模块
mv src/views/his/admission src/views/his/inpatient/
mv src/views/his/settlement src/views/his/inpatient/

# 迁移 pharmacy 模块
mv src/views/his/drug src/views/his/pharmacy/
```

---

## 六、data.ts 文件规范

### 6.1 标准结构

```typescript
// src/views/his/outpatient/patient/data.ts

import type { VxeGridProps } from '#/adapter/vxe-table';

/** 表格列配置 */
export const columns: VxeGridProps['columns'] = [
  { type: 'seq', title: '序号', width: 50 },
  { field: 'name', title: '患者姓名', width: 120 },
  { field: 'idCard', title: '身份证号', width: 180 },
  { field: 'phone', title: '联系电话', width: 120 },
  { field: 'gender', title: '性别', width: 80, formatter: 'gender' },
  { field: 'age', title: '年龄', width: 80 },
  { field: 'createTime', title: '创建时间', width: 160, formatter: 'date' },
  { title: '操作', width: 160, slots: { default: 'action' } }
];

/** 搜索表单配置 */
export const searchFormSchema = [
  { field: 'name', label: '患者姓名', component: 'Input' },
  { field: 'phone', label: '联系电话', component: 'Input' },
  { field: 'idCard', label: '身份证号', component: 'Input' }
];

/** 新增/编辑表单配置 */
export const formSchema = [
  { field: 'name', label: '患者姓名', component: 'Input', required: true },
  { field: 'gender', label: '性别', component: 'RadioGroup', componentProps: { options: genderOptions } },
  { field: 'phone', label: '联系电话', component: 'Input', rules: 'phone' },
  { field: 'idCard', label: '身份证号', component: 'Input', rules: 'idCard' }
];
```

---

## 七、路由配置参考

### 7.1 路由文件位置

```
src/router/routes/modules/his.ts
```

### 7.2 路由配置示例

```typescript
// src/router/routes/modules/his.ts
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/his',
    name: 'HIS',
    component: () => import('#/layouts/default/index.vue'),
    redirect: '/his/outpatient/patient',
    meta: {
      title: 'HIS医院信息系统',
      icon: 'hospital'
    },
    children: [
      // 门诊管理
      {
        path: 'outpatient',
        name: 'Outpatient',
        redirect: '/his/outpatient/patient',
        meta: { title: '门诊管理' },
        children: [
          { path: 'patient', name: 'HisPatient', component: () => import('#/views/his/outpatient/patient/index.vue'), meta: { title: '患者管理' } },
          { path: 'appointment', name: 'HisAppointment', component: () => import('#/views/his/outpatient/appointment/index.vue'), meta: { title: '预约挂号' } },
          { path: 'register', name: 'HisRegister', component: () => import('#/views/his/outpatient/register/index.vue'), meta: { title: '挂号收费' } }
        ]
      },
      // 住院管理
      {
        path: 'inpatient',
        name: 'Inpatient',
        redirect: '/his/inpatient/admission',
        meta: { title: '住院管理' },
        children: [
          { path: 'admission', name: 'HisAdmission', component: () => import('#/views/his/inpatient/admission/index.vue'), meta: { title: '入院管理' } },
          { path: 'bed', name: 'HisBed', component: () => import('#/views/his/inpatient/bed/index.vue'), meta: { title: '床位管理' } }
        ]
      }
    ]
  }
];

export default routes;
```

---

*文档更新时间: 2026-06-18*
