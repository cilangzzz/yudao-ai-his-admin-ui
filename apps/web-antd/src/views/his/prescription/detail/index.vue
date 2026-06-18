<script lang="ts" setup>
import type { OpPrescriptionApi } from '#/api/his/prescription';

import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { Page } from '@vben/common-ui';

import { Card, Descriptions, DescriptionsItem, Tag, Table } from 'ant-design-vue';

import { getPrescription } from '#/api/his/prescription';

const route = useRoute();
const prescription = ref<OpPrescriptionApi.Prescription>();

/** 处方状态字典 */
const STATUS_DICT: Record<number, { label: string; color: string }> = {
  1: { label: '待审核', color: 'orange' },
  2: { label: '已审核', color: 'green' },
  3: { label: '已调配', color: 'blue' },
  4: { label: '已发药', color: 'default' },
  5: { label: '已作废', color: 'red' },
  6: { label: '已退回', color: 'orange' },
  7: { label: '已退药', color: 'red' },
};

/** 处方类型字典 */
const PRESCRIPTION_TYPE_DICT: Record<number, string> = {
  1: '西药处方',
  2: '中成药处方',
  3: '中草药处方',
};

/** 加载处方详情 */
async function loadPrescription() {
  const id = route.params.id as string;
  if (id) {
    prescription.value = await getPrescription(Number(id));
  }
}

loadPrescription();
</script>

<template>
  <Page auto-content-height>
    <Card title="处方基本信息" v-if="prescription">
      <Descriptions :column="3" bordered>
        <DescriptionsItem label="处方编号">{{ prescription.prescriptionNo }}</DescriptionsItem>
        <DescriptionsItem label="患者姓名">{{ prescription.patientName }}</DescriptionsItem>
        <DescriptionsItem label="身份证号">{{ prescription.idCardNo }}</DescriptionsItem>
        <DescriptionsItem label="性别">
          <Tag :color="prescription.gender === 1 ? 'blue' : 'pink'">
            {{ prescription.gender === 1 ? '男' : '女' }}
          </Tag>
        </DescriptionsItem>
        <DescriptionsItem label="年龄">{{ prescription.age }} 岁</DescriptionsItem>
        <DescriptionsItem label="联系电话">{{ prescription.phone }}</DescriptionsItem>
        <DescriptionsItem label="科室">{{ prescription.deptName }}</DescriptionsItem>
        <DescriptionsItem label="医生">{{ prescription.doctorName }}</DescriptionsItem>
        <DescriptionsItem label="处方类型">{{ PRESCRIPTION_TYPE_DICT[prescription.prescriptionType] || '-' }}</DescriptionsItem>
        <DescriptionsItem label="诊断" :span="2">{{ prescription.diagnosis }}</DescriptionsItem>
        <DescriptionsItem label="状态">
          <Tag :color="STATUS_DICT[prescription.status]?.color">
            {{ STATUS_DICT[prescription.status]?.label || '-' }}
          </Tag>
        </DescriptionsItem>
        <DescriptionsItem label="总金额">¥{{ prescription.totalAmount }}</DescriptionsItem>
        <DescriptionsItem label="创建时间" :span="2">{{ prescription.createTime }}</DescriptionsItem>
        <DescriptionsItem label="备注" :span="3">{{ prescription.remark || '-' }}</DescriptionsItem>
      </Descriptions>
    </Card>

    <Card title="处方明细" style="margin-top: 16px" v-if="prescription?.items?.length">
      <Table
        :dataSource="prescription.items"
        :columns="[
          { title: '药品编码', dataIndex: 'drugCode', key: 'drugCode' },
          { title: '药品名称', dataIndex: 'drugName', key: 'drugName' },
          { title: '规格', dataIndex: 'spec', key: 'spec' },
          { title: '数量', dataIndex: 'quantity', key: 'quantity' },
          { title: '单位', dataIndex: 'unit', key: 'unit' },
          { title: '剂量', dataIndex: 'dosage', key: 'dosage' },
          { title: '频次', dataIndex: 'frequency', key: 'frequency' },
          { title: '用法', dataIndex: 'usageMethod', key: 'usageMethod' },
          { title: '天数', dataIndex: 'days', key: 'days' },
          { title: '单价', dataIndex: 'unitPrice', key: 'unitPrice', customRender: ({ text }) => `¥${text}` },
          { title: '金额', dataIndex: 'totalAmount', key: 'totalAmount', customRender: ({ text }) => `¥${text}` },
          { title: '皮试', dataIndex: 'skinTestRequired', key: 'skinTestRequired', customRender: ({ text }) => text === 1 ? '需要' : '不需要' },
        ]"
        :rowKey="record => record.id"
        :pagination="false"
        size="small"
      />
    </Card>
  </Page>
</template>