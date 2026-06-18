<script lang="ts" setup>
import type { HisDischargeApi } from '#/api/his/discharge';

import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { Page } from '@vben/common-ui';

import { Card, Descriptions, DescriptionsItem, Tag } from 'ant-design-vue';

import { getDischarge } from '#/api/his/discharge';

import {
  DISCHARGE_TYPE_DICT,
  DISCHARGE_DESTINATION_DICT,
  DISCHARGE_CONDITION_DICT,
  SETTLEMENT_STATUS_DICT,
} from '../data';

const route = useRoute();
const discharge = ref<HisDischargeApi.Discharge>();

/** 获取字典标签 */
function getDictLabel(dict: { label: string; value: number }[], value?: number) {
  if (value === undefined) return '-';
  const item = dict.find((d) => d.value === value);
  return item?.label || '-';
}

/** 获取标签颜色 */
function getDischargeTypeColor(value?: number) {
  switch (value) {
    case 1: return 'green';
    case 2: return 'blue';
    case 3: return 'orange';
    case 4: return 'red';
    default: return 'default';
  }
}

function getDischargeConditionColor(value?: number) {
  switch (value) {
    case 1: return 'green';
    case 2: return 'blue';
    case 3: return 'orange';
    case 4: return 'red';
    default: return 'default';
  }
}

function getSettlementStatusColor(value?: number) {
  switch (value) {
    case 0: return 'default';
    case 1: return 'success';
    case 2: return 'error';
    default: return 'default';
  }
}

/** 加载出院详情 */
async function loadDischarge() {
  const id = route.params.id as string;
  if (id) {
    discharge.value = await getDischarge(Number(id));
  }
}

loadDischarge();
</script>

<template>
  <Page auto-content-height>
    <Card title="出院基本信息" v-if="discharge">
      <Descriptions :column="3" bordered>
        <DescriptionsItem label="出院编号">{{ discharge.dischargeNo }}</DescriptionsItem>
        <DescriptionsItem label="住院号">{{ discharge.inpatientNo }}</DescriptionsItem>
        <DescriptionsItem label="患者姓名">{{ discharge.patientName }}</DescriptionsItem>
        <DescriptionsItem label="科室">{{ discharge.deptName }}</DescriptionsItem>
        <DescriptionsItem label="病区">{{ discharge.wardName }}</DescriptionsItem>
        <DescriptionsItem label="床号">{{ discharge.bedNo || '-' }}</DescriptionsItem>
        <DescriptionsItem label="入院日期">{{ discharge.admissionDate }}</DescriptionsItem>
        <DescriptionsItem label="出院日期">{{ discharge.dischargeDate }}</DescriptionsItem>
        <DescriptionsItem label="住院天数">{{ discharge.hospitalDays }} 天</DescriptionsItem>
        <DescriptionsItem label="入院诊断" :span="3">{{ discharge.admissionDiagnosis || '-' }}</DescriptionsItem>
        <DescriptionsItem label="出院诊断" :span="3">{{ discharge.dischargeDiagnosis || '-' }}</DescriptionsItem>
        <DescriptionsItem label="诊断编码">{{ discharge.diagnosisCode || '-' }}</DescriptionsItem>
        <DescriptionsItem label="出院类型">
          <Tag :color="getDischargeTypeColor(discharge.dischargeType)">
            {{ getDictLabel(DISCHARGE_TYPE_DICT, discharge.dischargeType) }}
          </Tag>
        </DescriptionsItem>
        <DescriptionsItem label="出院去向">
          <Tag color="blue">
            {{ getDictLabel(DISCHARGE_DESTINATION_DICT, discharge.dischargeDestination) }}
          </Tag>
        </DescriptionsItem>
        <DescriptionsItem label="出院情况">
          <Tag :color="getDischargeConditionColor(discharge.dischargeCondition)">
            {{ getDictLabel(DISCHARGE_CONDITION_DICT, discharge.dischargeCondition) }}
          </Tag>
        </DescriptionsItem>
        <DescriptionsItem label="出院医生">{{ discharge.dischargeDoctorName || '-' }}</DescriptionsItem>
        <DescriptionsItem label="结算状态">
          <Tag :color="getSettlementStatusColor(discharge.settlementStatus)">
            {{ getDictLabel(SETTLEMENT_STATUS_DICT, discharge.settlementStatus) }}
          </Tag>
        </DescriptionsItem>
        <DescriptionsItem label="备注" :span="3">{{ discharge.remark || '-' }}</DescriptionsItem>
        <DescriptionsItem label="创建时间" :span="3">{{ discharge.createTime }}</DescriptionsItem>
      </Descriptions>
    </Card>
  </Page>
</template>
