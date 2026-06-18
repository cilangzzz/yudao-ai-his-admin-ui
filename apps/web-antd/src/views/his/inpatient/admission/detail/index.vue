<script lang="ts" setup>
import type { HisAdmissionApi } from '#/api/his/admission';

import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { Page } from '@vben/common-ui';

import { Card, Descriptions, DescriptionsItem, Tag } from 'ant-design-vue';

import { getAdmission } from '#/api/his/admission';

const route = useRoute();
const admission = ref<HisAdmissionApi.Admission>();

/** 入院状态字典 */
const STATUS_DICT: Record<number, { label: string; color: string }> = {
  0: { label: '待入院', color: 'default' },
  1: { label: '在院', color: 'green' },
  2: { label: '待出院', color: 'orange' },
  3: { label: '已出院', color: 'default' },
};

/** 入院方式字典 */
const ADMISSION_WAY_DICT: Record<number, string> = {
  1: '门诊入院',
  2: '急诊入院',
  3: '转院入院',
  4: '其他',
};

/** 入院病情字典 */
const ADMISSION_CONDITION_DICT: Record<number, string> = {
  1: '一般',
  2: '急',
  3: '危重',
};

/** 加载入院详情 */
async function loadAdmission() {
  const id = route.params.id as string;
  if (id) {
    admission.value = await getAdmission(Number(id));
  }
}

loadAdmission();
</script>

<template>
  <Page auto-content-height>
    <Card title="住院基本信息" v-if="admission">
      <Descriptions :column="3" bordered>
        <DescriptionsItem label="住院号">{{ admission.admissionNo }}</DescriptionsItem>
        <DescriptionsItem label="患者姓名">{{ admission.patientName }}</DescriptionsItem>
        <DescriptionsItem label="身份证号">{{ admission.idCardNo }}</DescriptionsItem>
        <DescriptionsItem label="性别">
          <Tag :color="admission.gender === 1 ? 'blue' : 'pink'">
            {{ admission.gender === 1 ? '男' : '女' }}
          </Tag>
        </DescriptionsItem>
        <DescriptionsItem label="年龄">{{ admission.age }} 岁</DescriptionsItem>
        <DescriptionsItem label="联系电话">{{ admission.phone }}</DescriptionsItem>
        <DescriptionsItem label="科室">{{ admission.deptName }}</DescriptionsItem>
        <DescriptionsItem label="病区">{{ admission.wardName }}</DescriptionsItem>
        <DescriptionsItem label="床号">{{ admission.bedNo }}</DescriptionsItem>
        <DescriptionsItem label="主治医生">{{ admission.doctorName }}</DescriptionsItem>
        <DescriptionsItem label="责任护士">{{ admission.nurseName || '-' }}</DescriptionsItem>
        <DescriptionsItem label="入院状态">
          <Tag :color="STATUS_DICT[admission.admissionStatus]?.color">
            {{ STATUS_DICT[admission.admissionStatus]?.label || '-' }}
          </Tag>
        </DescriptionsItem>
        <DescriptionsItem label="入院方式">{{ ADMISSION_WAY_DICT[admission.admissionWay] || '-' }}</DescriptionsItem>
        <DescriptionsItem label="入院病情">{{ ADMISSION_CONDITION_DICT[admission.admissionCondition] || '-' }}</DescriptionsItem>
        <DescriptionsItem label="住院天数">{{ admission.hospitalDays || 0 }} 天</DescriptionsItem>
        <DescriptionsItem label="入院日期">{{ admission.admissionDate }}</DescriptionsItem>
        <DescriptionsItem label="诊断" :span="2">{{ admission.diagnosis }}</DescriptionsItem>
        <DescriptionsItem label="过敏史">{{ admission.allergyHistory || '-' }}</DescriptionsItem>
        <DescriptionsItem label="预交金">¥{{ admission.depositAmount }}</DescriptionsItem>
        <DescriptionsItem label="预交金余额">¥{{ admission.depositBalance || 0 }}</DescriptionsItem>
        <DescriptionsItem label="累计费用">¥{{ admission.totalCost || 0 }}</DescriptionsItem>
        <DescriptionsItem label="创建时间" :span="3">{{ admission.createTime }}</DescriptionsItem>
      </Descriptions>
    </Card>
  </Page>
</template>