<script lang="ts" setup>
import type { HisPatientApi } from '#/api/his/patient';

import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { Page } from '@vben/common-ui';

import { Card, Descriptions, DescriptionsItem, Tag } from 'ant-design-vue';

import { getPatient } from '#/api/his/patient';

const route = useRoute();
const patient = ref<HisPatientApi.Patient>();

/** 性别字典 */
const GENDER_DICT: Record<number, string> = {
  1: '男',
  2: '女',
};

/** 婚姻状态字典 */
const MARRIAGE_STATUS_DICT: Record<number, string> = {
  1: '未婚',
  2: '已婚',
  3: '离异',
  4: '丧偶',
};

/** 加载患者详情 */
async function loadPatient() {
  const id = route.params.id as string;
  if (id) {
    patient.value = await getPatient(Number(id));
  }
}

loadPatient();
</script>

<template>
  <Page auto-content-height>
    <Card title="患者基本信息">
      <Descriptions :column="3" bordered v-if="patient">
        <DescriptionsItem label="患者编号">{{ patient.patientNo }}</DescriptionsItem>
        <DescriptionsItem label="姓名">{{ patient.name }}</DescriptionsItem>
        <DescriptionsItem label="身份证号">{{ patient.idCardNo }}</DescriptionsItem>
        <DescriptionsItem label="性别">
          <Tag :color="patient.gender === 1 ? 'blue' : 'pink'">
            {{ GENDER_DICT[patient.gender] || '-' }}
          </Tag>
        </DescriptionsItem>
        <DescriptionsItem label="年龄">{{ patient.age }} 岁</DescriptionsItem>
        <DescriptionsItem label="出生日期">{{ patient.birthday }}</DescriptionsItem>
        <DescriptionsItem label="联系电话">{{ patient.phone }}</DescriptionsItem>
        <DescriptionsItem label="血型">{{ patient.bloodType || '-' }}</DescriptionsItem>
        <DescriptionsItem label="婚姻状态">
          {{ MARRIAGE_STATUS_DICT[patient.marriageStatus] || '-' }}
        </DescriptionsItem>
        <DescriptionsItem label="职业">{{ patient.occupation || '-' }}</DescriptionsItem>
        <DescriptionsItem label="民族">{{ patient.nation || '-' }}</DescriptionsItem>
        <DescriptionsItem label="籍贯">{{ patient.nativePlace || '-' }}</DescriptionsItem>
        <DescriptionsItem label="家庭住址" :span="3">{{ patient.address || '-' }}</DescriptionsItem>
        <DescriptionsItem label="紧急联系人">{{ patient.emergencyContact || '-' }}</DescriptionsItem>
        <DescriptionsItem label="紧急联系电话" :span="2">{{ patient.emergencyPhone || '-' }}</DescriptionsItem>
        <DescriptionsItem label="创建时间" :span="3">{{ patient.createTime }}</DescriptionsItem>
      </Descriptions>
    </Card>
  </Page>
</template>
