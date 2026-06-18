<script lang="ts" setup>
import type { HisMedicationApi } from '#/api/his/medication';

import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { Page } from '@vben/common-ui';

import { Card, Descriptions, DescriptionsItem, Tag } from 'ant-design-vue';

import { getMedication } from '#/api/his/medication';

const route = useRoute();
const medication = ref<HisMedicationApi.Medication>();

/** 给药状态字典 */
const STATUS_DICT: Record<number, { label: string; color: string }> = {
  0: { label: '待执行', color: 'orange' },
  1: { label: '已执行', color: 'green' },
  2: { label: '未执行', color: 'red' },
};

/** 给药途径字典 */
const ROUTE_DICT: Record<string, string> = {
  PO: '口服',
  IV: '静脉注射',
  IM: '肌肉注射',
  SC: '皮下注射',
  ID: '皮内注射',
  IH: '吸入',
  SL: '舌下含服',
  PR: '直肠给药',
  TOP: '外用',
};

/** 加载给药详情 */
async function loadMedication() {
  const id = route.params.id as string;
  if (id) {
    medication.value = await getMedication(Number(id));
  }
}

loadMedication();
</script>

<template>
  <Page auto-content-height>
    <Card title="给药记录详情">
      <Descriptions :column="3" bordered v-if="medication">
        <DescriptionsItem label="给药编号">{{ medication.adminNo }}</DescriptionsItem>
        <DescriptionsItem label="医嘱编号">{{ medication.orderNo }}</DescriptionsItem>
        <DescriptionsItem label="状态">
          <Tag :color="STATUS_DICT[medication.status]?.color || 'default'">
            {{ STATUS_DICT[medication.status]?.label || '-' }}
          </Tag>
        </DescriptionsItem>
        <DescriptionsItem label="患者姓名">{{ medication.patientName }}</DescriptionsItem>
        <DescriptionsItem label="住院号">{{ medication.inpatientNo }}</DescriptionsItem>
        <DescriptionsItem label="药品名称">{{ medication.drugName }}</DescriptionsItem>
        <DescriptionsItem label="药品编码">{{ medication.drugCode }}</DescriptionsItem>
        <DescriptionsItem label="规格">{{ medication.spec }}</DescriptionsItem>
        <DescriptionsItem label="剂量">{{ medication.dosage }}</DescriptionsItem>
        <DescriptionsItem label="频次">{{ medication.frequency }}</DescriptionsItem>
        <DescriptionsItem label="给药途径">
          {{ ROUTE_DICT[medication.route] || medication.route || '-' }}
        </DescriptionsItem>
        <DescriptionsItem label="计划执行时间">{{ medication.scheduledTime }}</DescriptionsItem>
        <DescriptionsItem label="执行护士">{{ medication.nurseName || '-' }}</DescriptionsItem>
        <DescriptionsItem label="执行时间">{{ medication.executeTime || '-' }}</DescriptionsItem>
        <DescriptionsItem label="未执行原因类型">
          {{ medication.notExecutedReasonType || '-' }}
        </DescriptionsItem>
        <DescriptionsItem label="未执行原因" :span="2">
          {{ medication.notExecutedReason || '-' }}
        </DescriptionsItem>
        <DescriptionsItem label="创建时间" :span="3">{{ medication.createTime }}</DescriptionsItem>
      </Descriptions>
    </Card>
  </Page>
</template>
