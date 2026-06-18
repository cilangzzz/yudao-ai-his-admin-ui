<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpRegisterApi } from '#/api/his/register';

import { useRouter } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, message, Tag } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteRegister,
  getRegisterPage,
  refundRegister,
  startVisit,
  endVisit,
} from '#/api/his/register';
import { $t } from '#/locales';

import { useGridColumns, useGridFormSchema } from './data';
import Form from './modules/form.vue';

const { push } = useRouter();

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

/** 刷新表格 */
function handleRefresh() {
  gridApi.query();
}

/** 创建挂号 */
function handleCreate() {
  formModalApi.setData(null).open();
}

/** 查看详情 */
function handleDetail(row: OpRegisterApi.Register) {
  push({ name: 'HisRegisterDetail', params: { id: row.id } });
}

/** 开始就诊 */
async function handleStartVisit(row: OpRegisterApi.Register) {
  try {
    await startVisit(row.id);
    message.success('开始就诊成功');
    handleRefresh();
  } catch {
    // error
  }
}

/** 结束就诊 */
async function handleEndVisit(row: OpRegisterApi.Register) {
  try {
    await endVisit(row.id);
    message.success('结束就诊成功');
    handleRefresh();
  } catch {
    // error
  }
}

/** 退号 */
async function handleRefund(row: OpRegisterApi.Register) {
  try {
    await refundRegister({ id: row.id, reason: '患者申请退号' });
    message.success('退号成功');
    handleRefresh();
  } catch {
    // error
  }
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
          return await getRegisterPage({
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
  } as VxeTableGridOptions<OpRegisterApi.Register>,
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
              label: $t('ui.actionTitle.create', ['挂号']),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              auth: ['his:register:create'],
              onClick: handleCreate,
            },
          ]"
        />
      </template>
      <template #registerNo="{ row }">
        <Button type="link" @click="handleDetail(row)">
          {{ row.registerNo }}
        </Button>
      </template>
      <template #status="{ row }">
        <Tag :color="row.status === 1 ? 'green' : row.status === 2 ? 'blue' : row.status === 3 ? 'default' : 'red'">
          {{ row.statusName }}
        </Tag>
      </template>
      <template #actions="{ row }">
        <TableAction
          :actions="[
            {
              label: '开始就诊',
              type: 'link',
              auth: ['his:register:visit'],
              ifShow: () => row.status === 1,
              onClick: handleStartVisit.bind(null, row),
            },
            {
              label: '结束就诊',
              type: 'link',
              auth: ['his:register:visit'],
              ifShow: () => row.status === 2,
              onClick: handleEndVisit.bind(null, row),
            },
            {
              label: '退号',
              type: 'link',
              danger: true,
              auth: ['his:register:refund'],
              ifShow: () => row.status === 1,
              popConfirm: {
                title: '确认退号?',
                confirm: handleRefund.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>