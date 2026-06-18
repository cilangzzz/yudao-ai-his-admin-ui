<script lang="ts" setup>
import type { HisOrderApi } from '#/api/his/order';

import { ref, watch } from 'vue';

import { Card, Descriptions, DescriptionsItem, Form, FormItem, Input, Radio, RadioGroup, Tag, Textarea } from 'ant-design-vue';

import { getOrder } from '#/api/his/order';

import { getOrderStatusColor, getOrderStatusLabel, orderCategoryOptions, orderTypeOptions } from '../data';

type ModalMode = 'detail' | 'audit' | 'execute' | 'stop' | 'cancel';

const props = defineProps<{
  mode: ModalMode;
  orderId: number;
  auditFormData: {
    auditResult: number;
    auditRemark: string;
  };
  executeFormData: {
    executeRemark: string;
  };
  stopFormData: {
    stopReason: string;
  };
  cancelFormData: {
    cancelReason: string;
  };
}>();

const orderDetail = ref<HisOrderApi.Order>();

/** 加载医嘱详情 */
async function loadOrderDetail() {
  if (props.orderId) {
    orderDetail.value = await getOrder(props.orderId);
  }
}

watch(
  () => props.orderId,
  () => {
    loadOrderDetail();
  },
  { immediate: true }
);

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

/** 审核结果选项 */
const auditResultOptions = [
  { label: '通过', value: 1 },
  { label: '驳回', value: 0 },
];
</script>

<template>
  <div>
    <!-- 医嘱基本信息 -->
    <Card title="医嘱信息" size="small" style="margin-bottom: 16px" v-if="orderDetail">
      <Descriptions :column="2" size="small">
        <DescriptionsItem label="医嘱编号">{{ orderDetail.orderNo }}</DescriptionsItem>
        <DescriptionsItem label="患者姓名">{{ orderDetail.patientName }}</DescriptionsItem>
        <DescriptionsItem label="医嘱类型">
          <Tag :color="orderDetail.orderType === 1 ? 'blue' : 'green'">
            {{ getTypeLabel(orderDetail.orderType) }}
          </Tag>
        </DescriptionsItem>
        <DescriptionsItem label="状态">
          <Tag :color="getOrderStatusColor(orderDetail.status)">
            {{ getOrderStatusLabel(orderDetail.status) }}
          </Tag>
        </DescriptionsItem>
        <DescriptionsItem label="医嘱内容" :span="2">{{ orderDetail.orderContent }}</DescriptionsItem>
        <DescriptionsItem label="开嘱医生">{{ orderDetail.doctorName }}</DescriptionsItem>
        <DescriptionsItem label="开始时间">{{ orderDetail.startDate }}</DescriptionsItem>
      </Descriptions>
    </Card>

    <!-- 详情模式：显示完整信息 -->
    <template v-if="mode === 'detail' && orderDetail">
      <Card title="详细信息" size="small">
        <Descriptions :column="2" size="small" bordered>
          <DescriptionsItem label="住院号">{{ orderDetail.inpatientNo }}</DescriptionsItem>
          <DescriptionsItem label="医嘱分类">{{ getCategoryLabel(orderDetail.orderCategory) }}</DescriptionsItem>
          <DescriptionsItem label="审核医生">{{ orderDetail.auditDoctorName || '-' }}</DescriptionsItem>
          <DescriptionsItem label="审核时间">{{ orderDetail.auditTime || '-' }}</DescriptionsItem>
          <DescriptionsItem label="执行护士">{{ orderDetail.nurseName || '-' }}</DescriptionsItem>
          <DescriptionsItem label="结束时间">{{ orderDetail.endDate || '-' }}</DescriptionsItem>
          <DescriptionsItem label="停止医生">{{ orderDetail.stopDoctorName || '-' }}</DescriptionsItem>
          <DescriptionsItem label="停止时间">{{ orderDetail.stopTime || '-' }}</DescriptionsItem>
          <DescriptionsItem label="作废原因" :span="2" v-if="orderDetail.cancelReason">
            {{ orderDetail.cancelReason }}
          </DescriptionsItem>
          <DescriptionsItem label="创建时间" :span="2">{{ orderDetail.createTime }}</DescriptionsItem>
        </Descriptions>
      </Card>
    </template>

    <!-- 审核模式 -->
    <template v-if="mode === 'audit'">
      <Card title="审核操作" size="small">
        <Form :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <FormItem label="审核结果" name="auditResult" required>
            <RadioGroup v-model:value="auditFormData.auditResult">
              <Radio v-for="item in auditResultOptions" :key="item.value" :value="item.value">
                {{ item.label }}
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="审核备注" name="auditRemark">
            <Textarea
              v-model:value="auditFormData.auditRemark"
              placeholder="请输入审核备注"
              :rows="3"
            />
          </FormItem>
        </Form>
      </Card>
    </template>

    <!-- 执行模式 -->
    <template v-if="mode === 'execute'">
      <Card title="执行操作" size="small">
        <Form :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <FormItem label="执行备注" name="executeRemark">
            <Textarea
              v-model:value="executeFormData.executeRemark"
              placeholder="请输入执行备注"
              :rows="3"
            />
          </FormItem>
        </Form>
      </Card>
    </template>

    <!-- 停止模式 -->
    <template v-if="mode === 'stop'">
      <Card title="停止操作" size="small">
        <Form :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <FormItem label="停止原因" name="stopReason">
            <Textarea
              v-model:value="stopFormData.stopReason"
              placeholder="请输入停止原因"
              :rows="3"
            />
          </FormItem>
        </Form>
      </Card>
    </template>

    <!-- 作废模式 -->
    <template v-if="mode === 'cancel'">
      <Card title="作废操作" size="small">
        <Form :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
          <FormItem label="作废原因" name="cancelReason" required>
            <Textarea
              v-model:value="cancelFormData.cancelReason"
              placeholder="请输入作废原因"
              :rows="3"
            />
          </FormItem>
        </Form>
      </Card>
    </template>
  </div>
</template>
