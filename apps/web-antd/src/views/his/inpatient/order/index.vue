<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { HisOrderApi } from '#/api/his/order';

import { Page, useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import { cancelOrder, getOrderPage, stopOrder } from '#/api/his/order';

import { useGridColumns, useGridFormSchema } from './data';
import Form from './modules/form.vue';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

/** 刷新表格 */
function handleRefresh() {
  gridApi.query();
}

/** 查看详情 */
function handleDetail(row: HisOrderApi.Order) {
  formModalApi.setData({ ...row, mode: 'detail' }).open();
}

/** 审核医嘱 */
function handleAudit(row: HisOrderApi.Order) {
  formModalApi.setData({ ...row, mode: 'audit' }).open();
}

/** 执行医嘱 */
function handleExecute(row: HisOrderApi.Order) {
  formModalApi.setData({ ...row, mode: 'execute' }).open();
}

/** 停止医嘱 */
async function handleStop(row: HisOrderApi.Order) {
  const hideLoading = message.loading({
    content: '正在停止医嘱...',
    duration: 0,
  });
  try {
    await stopOrder({
      orderId: row.id,
      stopDoctorId: row.doctorId,
      stopDoctorName: row.doctorName,
    });
    message.success('医嘱已停止');
    handleRefresh();
  } finally {
    hideLoading();
  }
}

/** 作废医嘱 */
async function handleCancel(row: HisOrderApi.Order) {
  const hideLoading = message.loading({
    content: '正在作废医嘱...',
    duration: 0,
  });
  try {
    await cancelOrder({
      orderId: row.id,
      cancelDoctorId: row.doctorId,
    });
    message.success('医嘱已作废');
    handleRefresh();
  } finally {
    hideLoading();
  }
}

/** 判断是否可以审核 */
function canAudit(row: HisOrderApi.Order) {
  return row.status === 0;
}

/** 判断是否可以执行 */
function canExecute(row: HisOrderApi.Order) {
  return row.status === 1;
}

/** 判断是否可以停止 */
function canStop(row: HisOrderApi.Order) {
  return row.status === 2;
}

/** 判断是否可以作废 */
function canCancel(row: HisOrderApi.Order) {
  return row.status === 0 || row.status === 1;
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
          return await getOrderPage({
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
  } as VxeTableGridOptions<HisOrderApi.Order>,
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
              label: '待审核医嘱',
              type: 'default',
              onClick: () => gridApi.formApi?.setValues?.({ status: 0 }),
            },
            {
              label: '执行中医嘱',
              type: 'default',
              onClick: () => gridApi.formApi?.setValues?.({ status: 2 }),
            },
          ]"
        />
      </template>
      <template #actions="{ row }">
        <TableAction
          :actions="[
            {
              label: '详情',
              type: 'link',
              icon: ACTION_ICON.VIEW,
              onClick: handleDetail.bind(null, row),
            },
            {
              label: '审核',
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['his:order:audit'],
              ifShow: canAudit(row),
              onClick: handleAudit.bind(null, row),
            },
            {
              label: '执行',
              type: 'link',
              auth: ['his:order:execute'],
              ifShow: canExecute(row),
              onClick: handleExecute.bind(null, row),
            },
            {
              label: '停止',
              type: 'link',
              danger: true,
              auth: ['his:order:stop'],
              ifShow: canStop(row),
              popConfirm: {
                title: '确认停止该医嘱吗？',
                confirm: handleStop.bind(null, row),
              },
            },
            {
              label: '作废',
              type: 'link',
              danger: true,
              auth: ['his:order:cancel'],
              ifShow: canCancel(row),
              popConfirm: {
                title: '确认作废该医嘱吗？',
                confirm: handleCancel.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>
