<script lang="ts" setup>
import type { HisOrderApi } from '#/api/his/order';

import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { Page } from '@vben/common-ui';

import { Card, Descriptions, DescriptionsItem, Tag, Timeline, TimelineItem } from 'ant-design-vue';

import { getOrder, getOrderListByAdmission } from '#/api/his/order';

import { getOrderStatusColor, getOrderStatusLabel, orderCategoryOptions, orderTypeOptions } from '../data';

const route = useRoute();
const order = ref<HisOrderApi.Order>();
const orderHistory = ref<HisOrderApi.Order[]>([]);

/** 加载医嘱详情 */
async function loadOrder() {
  const id = route.params.id as string;
  if (id) {
    order.value = await getOrder(Number(id));
    // 如果有住院ID，加载历史医嘱
    if (order.value?.admissionId) {
      orderHistory.value = await getOrderListByAdmission(order.value.admissionId);
    }
  }
}

/** 获取类型标签 */
function getTypeLabel(type: number) {
  const item = orderTypeOptions.find((d) => d.value === type);
  return item?.label || '-';
}

/** 获取分类标签 */
function getCategoryLabel(category: number) {
  const item = orderCategoryOptions.find((d) => d.value === category);
  return item?.label || '-';
}

loadOrder();
</script>

<template>
  <Page auto-content-height>
    <Card title="医嘱基本信息" v-if="order">
      <Descriptions :column="3" bordered>
        <DescriptionsItem label="医嘱编号">{{ order.orderNo }}</DescriptionsItem>
        <DescriptionsItem label="患者姓名">{{ order.patientName }}</DescriptionsItem>
        <DescriptionsItem label="住院号">{{ order.inpatientNo }}</DescriptionsItem>
        <DescriptionsItem label="医嘱类型">
          <Tag :color="order.orderType === 1 ? 'blue' : 'green'">
            {{ getTypeLabel(order.orderType) }}
          </Tag>
        </DescriptionsItem>
        <DescriptionsItem label="医嘱分类">{{ getCategoryLabel(order.orderCategory) }}</DescriptionsItem>
        <DescriptionsItem label="状态">
          <Tag :color="getOrderStatusColor(order.status)">
            {{ getOrderStatusLabel(order.status) }}
          </Tag>
        </DescriptionsItem>
        <DescriptionsItem label="医嘱内容" :span="3">{{ order.orderContent }}</DescriptionsItem>
        <DescriptionsItem label="开始时间">{{ order.startDate }}</DescriptionsItem>
        <DescriptionsItem label="结束时间">{{ order.endDate || '-' }}</DescriptionsItem>
        <DescriptionsItem label="创建时间">{{ order.createTime }}</DescriptionsItem>
        <DescriptionsItem label="开嘱医生">{{ order.doctorName }}</DescriptionsItem>
        <DescriptionsItem label="审核医生">{{ order.auditDoctorName || '-' }}</DescriptionsItem>
        <DescriptionsItem label="审核时间">{{ order.auditTime || '-' }}</DescriptionsItem>
        <DescriptionsItem label="执行护士">{{ order.nurseName || '-' }}</DescriptionsItem>
        <DescriptionsItem label="停止医生">{{ order.stopDoctorName || '-' }}</DescriptionsItem>
        <DescriptionsItem label="停止时间">{{ order.stopTime || '-' }}</DescriptionsItem>
        <DescriptionsItem label="作废原因" :span="3" v-if="order.cancelReason">{{ order.cancelReason }}</DescriptionsItem>
      </Descriptions>
    </Card>

    <Card title="医嘱时间线" style="margin-top: 16px" v-if="order">
      <Timeline>
        <TimelineItem color="blue">
          <p><strong>创建医嘱</strong></p>
          <p>开嘱医生：{{ order.doctorName }}</p>
          <p>时间：{{ order.createTime }}</p>
        </TimelineItem>
        <TimelineItem color="green" v-if="order.auditTime">
          <p><strong>审核通过</strong></p>
          <p>审核医生：{{ order.auditDoctorName }}</p>
          <p>时间：{{ order.auditTime }}</p>
        </TimelineItem>
        <TimelineItem color="green" v-if="order.nurseName">
          <p><strong>开始执行</strong></p>
          <p>执行护士：{{ order.nurseName }}</p>
        </TimelineItem>
        <TimelineItem color="orange" v-if="order.stopTime">
          <p><strong>医嘱停止</strong></p>
          <p>停止医生：{{ order.stopDoctorName }}</p>
          <p>时间：{{ order.stopTime }}</p>
        </TimelineItem>
        <TimelineItem color="red" v-if="order.status === 4">
          <p><strong>医嘱作废</strong></p>
          <p>作废原因：{{ order.cancelReason || '-' }}</p>
        </TimelineItem>
      </Timeline>
    </Card>

    <Card title="同住院医嘱列表" style="margin-top: 16px" v-if="orderHistory.length > 0">
      <Descriptions :column="1" bordered>
        <DescriptionsItem v-for="item in orderHistory" :key="item.id" :label="item.orderNo">
          <Tag :color="getOrderStatusColor(item.status)" style="margin-right: 8px">
            {{ getOrderStatusLabel(item.status) }}
          </Tag>
          {{ item.orderContent }}
          <span style="color: #999; margin-left: 8px">{{ item.doctorName }} | {{ item.startDate }}</span>
        </DescriptionsItem>
      </Descriptions>
    </Card>
  </Page>
</template>
