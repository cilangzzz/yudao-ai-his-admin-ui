<script lang="ts" setup>
import type { OpFeeApi } from '#/api/his/fee';

import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { Page } from '@vben/common-ui';

import { Card, Descriptions, DescriptionsItem, Table, Tag } from 'ant-design-vue';

import { getFee, getFeeItemsByFee } from '#/api/his/fee';

const route = useRoute();
const fee = ref<OpFeeApi.Fee>();
const feeItems = ref<OpFeeApi.FeeItem[]>([]);

/** 支付状态字典 */
const PAY_STATUS_DICT: Record<number, { label: string; color: string }> = {
  0: { label: '待支付', color: 'orange' },
  1: { label: '已支付', color: 'green' },
  2: { label: '已退款', color: 'red' },
};

/** 项目类型字典 */
const ITEM_TYPE_DICT: Record<number, string> = {
  1: '药品',
  2: '检查',
  3: '检验',
  4: '治疗',
  5: '材料',
};

/** 费用明细表格列 */
const itemColumns = [
  { title: '序号', width: 60, customRender: ({ index }: { index: number }) => index + 1 },
  { title: '项目编码', dataIndex: 'itemCode', width: 120 },
  { title: '项目名称', dataIndex: 'itemName', width: 150 },
  { title: '项目类型', dataIndex: 'itemType', width: 80, customRender: ({ text }: { text: number }) => ITEM_TYPE_DICT[text] || '-' },
  { title: '规格', dataIndex: 'spec', width: 100 },
  { title: '单位', dataIndex: 'unit', width: 60 },
  { title: '数量', dataIndex: 'quantity', width: 80, align: 'right' },
  { title: '单价', dataIndex: 'unitPrice', width: 100, align: 'right', customRender: ({ text }: { text: number }) => `¥${(text / 100).toFixed(2)}` },
  { title: '总金额', dataIndex: 'totalAmount', width: 100, align: 'right', customRender: ({ text }: { text: number }) => `¥${(text / 100).toFixed(2)}` },
  { title: '优惠金额', dataIndex: 'discountAmount', width: 100, align: 'right', customRender: ({ text }: { text: number }) => `¥${(text / 100).toFixed(2)}` },
  { title: '实付金额', dataIndex: 'payAmount', width: 100, align: 'right', customRender: ({ text }: { text: number }) => `¥${(text / 100).toFixed(2)}` },
  { title: '备注', dataIndex: 'remark', width: 150, ellipsis: true },
];

/** 加载费用详情 */
async function loadFee() {
  const id = route.params.id as string;
  if (id) {
    fee.value = await getFee(Number(id));
    feeItems.value = await getFeeItemsByFee(Number(id));
  }
}

loadFee();
</script>

<template>
  <Page auto-content-height>
    <Card title="费用基本信息" style="margin-bottom: 16px">
      <Descriptions :column="3" bordered v-if="fee">
        <DescriptionsItem label="费用编号">{{ fee.feeNo }}</DescriptionsItem>
        <DescriptionsItem label="患者姓名">{{ fee.patientName }}</DescriptionsItem>
        <DescriptionsItem label="科室">{{ fee.deptName }}</DescriptionsItem>
        <DescriptionsItem label="医生">{{ fee.doctorName }}</DescriptionsItem>
        <DescriptionsItem label="总金额">
          <span style="color: #1890ff; font-weight: bold">¥{{ (fee.totalAmount / 100).toFixed(2) }}</span>
        </DescriptionsItem>
        <DescriptionsItem label="优惠金额">
          <span style="color: #52c41a">¥{{ (fee.discountAmount / 100).toFixed(2) }}</span>
        </DescriptionsItem>
        <DescriptionsItem label="实付金额">
          <span style="color: #f5222d; font-weight: bold; font-size: 16px">¥{{ (fee.payAmount / 100).toFixed(2) }}</span>
        </DescriptionsItem>
        <DescriptionsItem label="支付状态">
          <Tag :color="PAY_STATUS_DICT[fee.payStatus]?.color || 'default'">
            {{ PAY_STATUS_DICT[fee.payStatus]?.label || '-' }}
          </Tag>
        </DescriptionsItem>
        <DescriptionsItem label="创建时间">{{ fee.createTime }}</DescriptionsItem>
        <DescriptionsItem label="备注" :span="3">{{ fee.remark || '-' }}</DescriptionsItem>
      </Descriptions>
    </Card>

    <Card title="费用明细">
      <Table
        :columns="itemColumns"
        :data-source="feeItems"
        :pagination="false"
        :scroll="{ x: 1400 }"
        row-key="id"
        size="middle"
      />
    </Card>
  </Page>
</template>
