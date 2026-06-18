<script lang="ts" setup>
import type { OpRegisterApi } from '#/api/his/register';

import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { Page } from '@vben/common-ui';

import { Card, Descriptions, DescriptionsItem, Tag, Divider, Table } from 'ant-design-vue';

import { getRegister } from '#/api/his/register';

const route = useRoute();
const register = ref<OpRegisterApi.Register>();

/** 挂号状态字典 */
const STATUS_DICT: Record<number, { label: string; color: string }> = {
  1: { label: '已挂号', color: 'green' },
  2: { label: '就诊中', color: 'blue' },
  3: { label: '已就诊', color: 'default' },
  4: { label: '已退号', color: 'red' },
};

/** 挂号类型字典 */
const REGISTER_TYPE_DICT: Record<number, string> = {
  1: '普通',
  2: '专家',
  3: '急诊',
};

/** 加载挂号详情 */
async function loadRegister() {
  const id = route.params.id as string;
  if (id) {
    register.value = await getRegister(Number(id));
  }
}

loadRegister();
</script>

<template>
  <Page auto-content-height>
    <Card title="挂号基本信息" v-if="register">
      <Descriptions :column="3" bordered>
        <DescriptionsItem label="挂号单号">{{ register.registerNo }}</DescriptionsItem>
        <DescriptionsItem label="患者姓名">{{ register.patientName }}</DescriptionsItem>
        <DescriptionsItem label="身份证号">{{ register.idCardNo }}</DescriptionsItem>
        <DescriptionsItem label="性别">
          <Tag :color="register.gender === 1 ? 'blue' : 'pink'">
            {{ register.gender === 1 ? '男' : '女' }}
          </Tag>
        </DescriptionsItem>
        <DescriptionsItem label="年龄">{{ register.age }} 岁</DescriptionsItem>
        <DescriptionsItem label="联系电话">{{ register.phone }}</DescriptionsItem>
        <DescriptionsItem label="科室">{{ register.deptName }}</DescriptionsItem>
        <DescriptionsItem label="医生">{{ register.doctorName }}</DescriptionsItem>
        <DescriptionsItem label="挂号类型">{{ REGISTER_TYPE_DICT[register.registerType] || '-' }}</DescriptionsItem>
        <DescriptionsItem label="就诊日期">{{ register.visitDate }}</DescriptionsItem>
        <DescriptionsItem label="时间段">{{ register.timeSlot === 'AM' ? '上午' : '下午' }}</DescriptionsItem>
        <DescriptionsItem label="排队号">{{ register.queueNo }}</DescriptionsItem>
        <DescriptionsItem label="状态">
          <Tag :color="STATUS_DICT[register.status]?.color">
            {{ STATUS_DICT[register.status]?.label || '-' }}
          </Tag>
        </DescriptionsItem>
        <DescriptionsItem label="挂号费">¥{{ register.fee }}</DescriptionsItem>
        <DescriptionsItem label="支付状态">
          <Tag :color="register.payStatus === 1 ? 'green' : 'orange'">
            {{ register.payStatusName }}
          </Tag>
        </DescriptionsItem>
        <DescriptionsItem label="创建时间">{{ register.createTime }}</DescriptionsItem>
        <DescriptionsItem label="就诊开始时间">{{ register.visitStartTime || '-' }}</DescriptionsItem>
        <DescriptionsItem label="就诊结束时间">{{ register.visitEndTime || '-' }}</DescriptionsItem>
        <DescriptionsItem label="备注" :span="3">{{ register.remark || '-' }}</DescriptionsItem>
      </Descriptions>
    </Card>
  </Page>
</template>