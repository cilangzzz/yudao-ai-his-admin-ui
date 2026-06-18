<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { OpPrescriptionApi } from '#/api/his/prescription';

import { Page, useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import { deletePrescription, getPrescriptionPage } from '#/api/his/prescription';
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

/** 创建处方 */
function handleCreate() {
  formModalApi.setData(null).open();
}

/** 编辑处方 */
function handleEdit(row: OpPrescriptionApi.Prescription) {
  formModalApi.setData(row).open();
}

/** 删除处方 */
async function handleDelete(row: OpPrescriptionApi.Prescription) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.prescriptionNo]),
    duration: 0,
  });
  try {
    await deletePrescription(row.id);
    message.success($t('ui.actionMessage.deleteSuccess', [row.prescriptionNo]));
    handleRefresh();
  } finally {
    hideLoading();
  }
}

/** 查看详情 */
function handleDetail(row: OpPrescriptionApi.Prescription) {
  // 跳转到详情页面
  window.open(`/his/prescription/detail/${row.id}`, '_blank');
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
          return await getPrescriptionPage({
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
  } as VxeTableGridOptions<OpPrescriptionApi.Prescription>,
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
              label: $t('ui.actionTitle.create', ['处方']),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              auth: ['his:prescription:create'],
              onClick: handleCreate,
            },
          ]"
        />
      </template>
      <template #actions="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('common.detail'),
              type: 'link',
              icon: ACTION_ICON.VIEW,
              onClick: handleDetail.bind(null, row),
            },
            {
              label: $t('common.edit'),
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['his:prescription:update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['his:prescription:delete'],
              popConfirm: {
                title: $t('ui.actionMessage.deleteConfirm', [row.prescriptionNo]),
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>