<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { HisDischargeApi } from '#/api/his/discharge';

import { Page, useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteDischarge, getDischargePage } from '#/api/his/discharge';
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

/** 创建出院记录 */
function handleCreate() {
  formModalApi.setData(null).open();
}

/** 编辑出院记录 */
function handleEdit(row: HisDischargeApi.Discharge) {
  formModalApi.setData(row).open();
}

/** 删除出院记录 */
async function handleDelete(row: HisDischargeApi.Discharge) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.dischargeNo]),
    duration: 0,
  });
  try {
    await deleteDischarge(row.id);
    message.success($t('ui.actionMessage.deleteSuccess', [row.dischargeNo]));
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
          return await getDischargePage({
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
  } as VxeTableGridOptions<HisDischargeApi.Discharge>,
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
              label: $t('ui.actionTitle.create', ['出院记录']),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              auth: ['his:discharge:create'],
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
              auth: ['his:discharge:update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: $t('common.detail'),
              type: 'link',
              icon: ACTION_ICON.VIEW,
              onClick: () => {
                // Navigate to detail page
              },
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['his:discharge:delete'],
              popConfirm: {
                title: $t('ui.actionMessage.deleteConfirm', [row.dischargeNo]),
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>
