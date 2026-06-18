# CLAUDE.md - YUDAO-AI-HIS 前端开发规范

> 本文件为 Claude Code 工作流模式提供 HIS 前端项目开发规范索引和使用指南。

---

## 项目概述

基于 yudao-ui-admin-vben 的 HIS（医院信息系统）前端项目，通过 Skill 文档体系实现标准化代码生成。

**技术栈**: Vue 3.5+ / TypeScript 5.9+ / Vite 8.0+ / Pinia 3.0+ / Ant Design Vue 4.x / VxeTable 4.x / Tailwind CSS 4.x

**架构类型**: Monorepo (pnpm + Turborepo)

---

## Skills 使用场景索引

| 场景 | 适用情况 | 文档路径 | 一句话描述 |
|-----|---------|---------|-----------|
| **核心组件开发** | 使用 @core 组件库 | [skills/modules/core/skill-core.yaml](skills/modules/core/skill-core.yaml) | 无头组件模式、BEM命名、表单/弹窗API |
| **效应层开发** | 使用 effects 模块 | [skills/modules/effects/skill-effects.yaml](skills/modules/effects/skill-effects.yaml) | access权限、request请求、hooks、layouts |
| **应用层开发** | web-antd 应用开发 | [skills/modules/app-antd/skill-app-antd.yaml](skills/modules/app-antd/skill-app-antd.yaml) | 路由、API、页面组件、适配器 |

---

## HIS 业务模块文档索引

### 业务需求文档 (docs/his/)

HIS 系统包含 3 大业务模块，每个模块包含 PRD、API接口、业务规则等文档。

| 模块编号 | 模块名称 | 文档路径 | API接口数量 | 前端状态 |
|----------|----------|---------|-------------|----------|
| M01 | 门诊管理 | [docs/his/M01-门诊管理/](docs/his/M01-门诊管理/README.md) | 47+ | 部分完成 |
| M02 | 住院管理 | [docs/his/M02-住院管理/](docs/his/M02-住院管理/README.md) | 40+ | 部分完成 |
| M06 | 药品管理 | [docs/his/M06-药品管理/](docs/his/M06-药品管理/README.md) | 11+ | API完成 |

### 全局文档

- [HIS系统-产品需求文档(PRD)](docs/his/00-全局文档/HIS系统-产品需求文档(PRD).md)
- [HIS系统-业务规则文档](docs/his/00-全局文档/HIS系统-业务规则文档.md)
- [HIS系统-模块划分文档](docs/his/00-全局文档/HIS系统-模块划分文档.md)
- [HIS系统-验收标准](docs/his/00-全局文档/HIS系统-验收标准.md)

---

## 开发工作流索引

本项目的核心开发流程通过 Claude Code 工作流自动化执行。

### 推荐工作流使用顺序

```
第一次使用:
┌─────────────────────────────────────────────────────────────────┐
│  1. /his-doc-sync --source all    → 同步最新文档                  │
│  2. /his-progress-check           → 检查当前进度                  │
│  3. /his-development-loop         → 循环生成代码                  │
└─────────────────────────────────────────────────────────────────┘

日常开发:
┌─────────────────────────────────────────────────────────────────┐
│  1. /his-progress-check           → 检查进度                     │
│  2. /his-development-loop         → 补充缺失代码                  │
│  3. /his-error-fix                → 修复TypeScript错误           │
└─────────────────────────────────────────────────────────────────┘
```

### 工作流详细说明

| 工作流 | 用途 | 触发命令 |
|--------|------|----------|
| **进度检查** | 扫描文档和代码，生成进度报告 | `/his-progress-check` |
| **循环开发** | 自动检查并循环生成缺失代码 | `/his-development-loop` |
| **批量开发** | 批量处理多个模块开发 | `/his-batch-development` |
| **单模块开发** | 开发单个 HIS 模块 | `/his-module-development --moduleId M01` |
| **文档同步** | 从后端项目同步最新文档 | `/his-doc-sync --source all` |
| **错误修复** | 检查并修复 TypeScript 错误 | `/his-error-fix` |

---

## 代码生成规范

### API 层规范

**目标路径**: `apps/web-antd/src/api/his/{module}/index.ts`

**代码模板**:
```typescript
import type { PageParam, PageResult } from '@vben/request';
import { requestClient } from '#/api/request';

export namespace HisXxxApi {
  /** 实体类型 */
  export interface Xxx {
    id: number;
    name: string;
    // ... 其他字段
  }

  /** 保存请求类型 */
  export interface XxxSaveReqVO {
    id?: number;
    name: string;
  }

  /** 分页查询参数 */
  export interface XxxPageReqVO extends PageParam {
    name?: string;
  }
}

/** 查询分页列表 */
export function getXxxPage(params: HisXxxApi.XxxPageReqVO) {
  return requestClient.get<PageResult<HisXxxApi.Xxx>>('/his/xxx/page', { params });
}

/** 查询详情 */
export function getXxx(id: number) {
  return requestClient.get<HisXxxApi.Xxx>(`/his/xxx/get?id=${id}`);
}

/** 新增 */
export function createXxx(data: HisXxxApi.XxxSaveReqVO) {
  return requestClient.post('/his/xxx/create', data);
}

/** 修改 */
export function updateXxx(data: HisXxxApi.XxxSaveReqVO) {
  return requestClient.put('/his/xxx/update', data);
}

/** 删除 */
export function deleteXxx(id: number) {
  return requestClient.delete(`/his/xxx/delete?id=${id}`);
}
```

### 页面组件规范

**目标路径**: `apps/web-antd/src/views/his/{module}/`

**标准结构**:
```
views/his/{module}/
├── index.vue           # 列表页
├── data.ts             # 表格列配置、表单Schema
├── detail/
│   └── index.vue       # 详情页
└── modules/
    ├── form.vue         # 表单弹窗
    └── form-schema.vue  # 表单Schema（可选）
```

**列表页模板**:
```vue
<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { HisXxxApi } from '#/api/his/xxx';

import { Page, useVbenModal } from '@vben/common-ui';
import { message } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteXxx, getXxxPage } from '#/api/his/xxx';
import { $t } from '#/locales';

import { useGridColumns, useGridFormSchema } from './data';
import Form from './modules/form.vue';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

function handleRefresh() {
  gridApi.query();
}

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useGridFormSchema(),
  },
  gridOptions: {
    columns: useGridColumns(),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getXxxPage({
            pageNo: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    rowConfig: {
      keyField: 'id',
      isHover: true,
    },
    toolbarConfig: {
      refresh: true,
      search: true,
    },
  } as VxeTableGridOptions<HisXxxApi.Xxx>,
});
</script>

<template>
  <Page auto-content-height>
    <FormModal @success="handleRefresh" />
    <Grid>
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: $t('ui.actionTitle.create', ['XXX']),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              auth: ['his:xxx:create'],
              onClick: handleCreate,
            },
          ]"
        />
      </template>
      <template #actions="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('common.edit'),
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['his:xxx:update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['his:xxx:delete'],
              popConfirm: {
                title: $t('ui.actionMessage.deleteConfirm', [row.name]),
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>
```

### 路由配置规范

**目标路径**: `apps/web-antd/src/router/routes/modules/his.ts`

```typescript
import type { AppRouteRecordRaw } from '#/router/types';

const his: AppRouteRecordRaw = {
  path: '/his',
  name: 'His',
  component: () => import('#/layouts/default.vue'),
  meta: {
    title: 'HIS系统',
    icon: 'ep:hospital',
    order: 100,
  },
  children: [
    {
      path: 'patient',
      name: 'HisPatient',
      component: () => import('#/views/his/patient/index.vue'),
      meta: {
        title: '患者管理',
        icon: 'ep:user',
        authority: ['his:patient:query'],
      },
    },
    // ... 更多路由
  ],
};

export default his;
```

---

## 命名规范速查

### 文件命名

| 类型 | 命名规则 | 示例 |
|------|---------|------|
| API 文件 | 小写连字符 | `patient/index.ts` |
| 页面文件 | 小写连字符 | `patient/index.vue` |
| 组件文件 | PascalCase | `PatientForm.vue` |
| 组合式函数 | use前缀 | `usePatientForm.ts` |

### TypeScript 命名

| 类型 | 命名规则 | 示例 |
|------|---------|------|
| 命名空间 | `His{Module}Api` | `HisPatientApi` |
| 实体类型 | 大驼峰 | `Patient` |
| 保存请求 | `{Entity}SaveReqVO` | `PatientSaveReqVO` |
| 分页请求 | `{Entity}PageReqVO` | `PatientPageReqVO` |

### 权限标识

格式: `{模块}:{功能}:{操作}`

| 模块 | 功能 | 权限示例 |
|------|------|---------|
| 患者管理 | 增删改查 | `his:patient:create/update/delete/query` |
| 挂号管理 | 就诊操作 | `his:register:visit` |
| 处方管理 | 审核 | `his:prescription:audit` |

---

## HIS 业务字典

### 性别字典 (sys_user_sex)

| 值 | 名称 |
|----|------|
| 1 | 男 |
| 2 | 女 |

### 挂号状态 (his_register_status)

| 值 | 名称 |
|----|------|
| 1 | 已挂号 |
| 2 | 就诊中 |
| 3 | 已就诊 |
| 4 | 已退号 |

### 挂号类型 (his_register_type)

| 值 | 名称 |
|----|------|
| 1 | 普通 |
| 2 | 专家 |
| 3 | 急诊 |

### 处方状态 (his_prescription_status)

| 值 | 名称 |
|----|------|
| 1 | 待审核 |
| 2 | 已审核 |
| 3 | 已调配 |
| 4 | 已发药 |
| 5 | 已作废 |
| 6 | 已退回 |
| 7 | 已退药 |

### 入院状态 (his_admission_status)

| 值 | 名称 |
|----|------|
| 0 | 待入院 |
| 1 | 在院 |
| 2 | 待出院 |
| 3 | 已出院 |

### 入院方式 (his_admission_way)

| 值 | 名称 |
|----|------|
| 1 | 门诊入院 |
| 2 | 急诊入院 |
| 3 | 转院入院 |
| 4 | 其他 |

### 医保类型 (his_insurance_type)

| 值 | 名称 |
|----|------|
| 1 | 城镇职工医保 |
| 2 | 城镇居民医保 |
| 3 | 新农合 |
| 4 | 自费 |

---

## 分层架构路径

```
apps/web-antd/src/
├── api/his/                    # API层
│   ├── patient/index.ts        # 患者管理API
│   ├── register/index.ts       # 挂号管理API
│   ├── prescription/index.ts   # 处方管理API
│   ├── fee/index.ts            # 门诊费用API
│   ├── admission/index.ts      # 入院管理API
│   ├── order/index.ts          # 医嘱管理API
│   ├── medication/index.ts     # 给药管理API
│   ├── settlement/index.ts     # 住院结算API
│   ├── discharge/index.ts      # 出院管理API
│   └── drug/index.ts           # 药品管理API
├── views/his/                  # 页面层
│   ├── patient/                # 患者管理页面
│   ├── register/               # 挂号管理页面
│   ├── prescription/           # 处方管理页面
│   └── ...                    # 其他模块页面
└── router/routes/modules/
    └── his.ts                  # HIS路由配置
```

---

## 自动引用机制

Skill 文档声明需要引用的规范文件，AI 自动加载对应规范：

```yaml
references:
  core:
    - skills/modules/core/skill-core.yaml      # 核心组件规范
    - skills/modules/effects/skill-effects.yaml # 效应层规范
    - skills/modules/app-antd/skill-app-antd.yaml # 应用层规范
  business:
    - docs/his/README.md                       # HIS文档索引
    - docs/his/00-全局文档/HIS系统-业务规则文档.md # 业务规则
```

**使用方式**: 在提示词中指定模块名或工作流，AI 自动加载对应规范和模块 skill。

---

## 开发进度追踪

### API 层完成情况

| 模块 | API文件 | 接口数量 | 状态 |
|------|---------|----------|------|
| 患者管理 | `api/his/patient/` | 6 | ✅ 完成 |
| 挂号管理 | `api/his/register/` | 8 | ✅ 完成 |
| 处方管理 | `api/his/prescription/` | 18 | ✅ 完成 |
| 门诊费用 | `api/his/fee/` | 13 | ✅ 完成 |
| 入院管理 | `api/his/admission/` | 15 | ✅ 完成 |
| 医嘱管理 | `api/his/order/` | 10 | ✅ 完成 |
| 给药管理 | `api/his/medication/` | 12 | ✅ 完成 |
| 住院结算 | `api/his/settlement/` | 10 | ✅ 完成 |
| 出院管理 | `api/his/discharge/` | 5 | ✅ 完成 |
| 药品管理 | `api/his/drug/` | 10 | ✅ 完成 |

### 页面组件完成情况

| 模块 | 页面路径 | 状态 |
|------|----------|------|
| 患者管理 | `views/his/patient/` | ✅ 完成 |
| 挂号管理 | `views/his/register/` | ✅ 完成 |
| 入院管理 | `views/his/admission/` | ✅ 完成 |
| 处方管理 | `views/his/prescription/` | ⏳ 待开发 |
| 门诊费用 | `views/his/fee/` | ⏳ 待开发 |
| 医嘱管理 | `views/his/order/` | ⏳ 待开发 |
| 给药管理 | `views/his/medication/` | ⏳ 待开发 |
| 住院结算 | `views/his/settlement/` | ⏳ 待开发 |
| 出院管理 | `views/his/discharge/` | ⏳ 待开发 |
| 药品管理 | `views/his/drug/` | ⏳ 待开发 |

**更新时间**: 2026-06-18

---

## 变更历史

| 版本 | 日期 | 变更内容 |
|------|------|----------|
| V1.0 | 2026-06-18 | 初始化 CLAUDE.md 文档 |

---

> **最后更新**: 2026-06-18
