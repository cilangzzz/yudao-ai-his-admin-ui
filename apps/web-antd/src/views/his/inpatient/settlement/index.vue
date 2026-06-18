<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { HisSettlementApi } from '#/api/his/settlement';

import { Page, useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  cancelSettlement,
  confirmSettlement,
  deleteSettlement,
  getSettlementPage,
} from '#/api/his/settlement';
import { $t } from '#/locales';

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

/** 创建结算单 */
function handleCreate() {
  formModalApi.setData(null).open();
}

/** 编辑结算单 */
function handleEdit(row: HisSettlementApi.Settlement) {
  formModalApi.setData(row).open();
}

/** 删除结算单 */
async function handleDelete(row: HisSettlementApi.Settlement) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.settlementNo]),
    duration: 0,
  });
  try {
    await deleteSettlement(row.id);
    message.success($t('ui.actionMessage.deleteSuccess', [row.settlementNo]));
    handleRefresh();
  } finally {
    hideLoading();
  }
}

/** 结算确认 */
async function handleConfirm(row: HisSettlementApi.Settlement) {
  if (row.settlementStatus !== 0) {
    message.warning('只有待结算状态的结算单可以进行结算确认');
    return;
  }
  // 简单示例：使用现金支付方式确认
  const hideLoading = message.loading({
    content: '正在确认结算...',
    duration: 0,
  });
  try {
    await confirmSettlement(row.id, 1); // 1: 现金支付
    message.success('结算确认成功');
    handleRefresh();
  } finally {
    hideLoading();
  }
}

/** 作废结算单 */
async function handleCancel(row: HisSettlementApi.Settlement) {
  if (row.settlementStatus !== 0) {
    message.warning('只有待结算状态的结算单可以作废');
    return;
  }
  const hideLoading = message.loading({
    content: '正在作废结算单...',
    duration: 0,
  });
  try {
    await cancelSettlement(row.id);
    message.success('结算单已作废');
    handleRefresh();
  } finally {
    hideLoading();
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
          return await getSettlementPage({
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
  } as VxeTableGridOptions<HisSettlementApi.Settlement>,
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
              label: $t('ui.actionTitle.create', ['结算单']),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              auth: ['his:settlement:create'],
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
              auth: ['his:settlement:update'],
              ifShow: row.settlementStatus === 0,
              onClick: handleEdit.bind(null, row),
            },
            {
              label: '确认',
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['his:settlement:confirm'],
              ifShow: row.settlementStatus === 0,
              onClick: handleConfirm.bind(null, row),
            },
            {
              label: '作废',
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['his:settlement:cancel'],
              ifShow: row.settlementStatus === 0,
              popConfirm: {
                title: '确定要作废该结算单吗？',
                confirm: handleCancel.bind(null, row),
              },
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['his:settlement:delete'],
              ifShow: row.settlementStatus === 0,
              popConfirm: {
                title: $t('ui.actionMessage.deleteConfirm', [row.settlementNo]),
                confirm: handleDelete.bind(null, row),
              },
            },
            {
              label: '详情',
              type: 'link',
              icon: ACTION_ICON.VIEW,
              auth: ['his:settlement:query'],
              onClick: () => {},
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>