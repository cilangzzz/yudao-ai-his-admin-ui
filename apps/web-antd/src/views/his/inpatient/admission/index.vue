<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { HisAdmissionApi } from '#/api/his/admission';

import { useRouter } from 'vue-router';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, message, Tag } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteAdmission,
  getAdmissionPage,
  applyDischarge,
  confirmDischarge,
} from '#/api/his/admission';
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

/** 创建入院 */
function handleCreate() {
  formModalApi.setData(null).open();
}

/** 查看详情 */
function handleDetail(row: HisAdmissionApi.Admission) {
  push({ name: 'HisAdmissionDetail', params: { id: row.id } });
}

/** 申请出院 */
async function handleApplyDischarge(row: HisAdmissionApi.Admission) {
  try {
    await applyDischarge(row.id);
    message.success('申请出院成功');
    handleRefresh();
  } catch {
    // error
  }
}

/** 确认出院 */
async function handleConfirmDischarge(row: HisAdmissionApi.Admission) {
  try {
    await confirmDischarge(row.id);
    message.success('确认出院成功');
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
          return await getAdmissionPage({
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
  } as VxeTableGridOptions<HisAdmissionApi.Admission>,
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
              label: $t('ui.actionTitle.create', ['入院登记']),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              auth: ['his:admission:create'],
              onClick: handleCreate,
            },
          ]"
        />
      </template>
      <template #admissionNo="{ row }">
        <Button type="link" @click="handleDetail(row)">
          {{ row.admissionNo }}
        </Button>
      </template>
      <template #admissionStatus="{ row }">
        <Tag :color="row.admissionStatus === 1 ? 'green' : row.admissionStatus === 2 ? 'orange' : 'default'">
          {{ row.admissionStatusName }}
        </Tag>
      </template>
      <template #actions="{ row }">
        <TableAction
          :actions="[
            {
              label: '申请出院',
              type: 'link',
              auth: ['his:admission:discharge'],
              ifShow: () => row.admissionStatus === 1,
              onClick: handleApplyDischarge.bind(null, row),
            },
            {
              label: '确认出院',
              type: 'link',
              auth: ['his:admission:discharge'],
              ifShow: () => row.admissionStatus === 2,
              popConfirm: {
                title: '确认出院?',
                confirm: handleConfirmDischarge.bind(null, row),
              },
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['his:admission:delete'],
              ifShow: () => row.admissionStatus === 0,
              popConfirm: {
                title: $t('ui.actionMessage.deleteConfirm', [row.patientName]),
                confirm: deleteAdmission.bind(null, row.id),
              },
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>