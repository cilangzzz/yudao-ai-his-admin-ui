<script lang="ts" setup>
import type { HisMedicationApi } from '#/api/his/medication';

import { Form, FormItem, Input, Select, InputNumber, DatePicker } from 'ant-design-vue';

defineProps<{
  formData: HisMedicationApi.Medication;
}>();

/** 给药途径选项 */
const routeOptions = [
  { label: '口服', value: 'PO' },
  { label: '静脉注射', value: 'IV' },
  { label: '肌肉注射', value: 'IM' },
  { label: '皮下注射', value: 'SC' },
  { label: '皮内注射', value: 'ID' },
  { label: '吸入', value: 'IH' },
  { label: '舌下含服', value: 'SL' },
  { label: '直肠给药', value: 'PR' },
  { label: '外用', value: 'TOP' },
];

/** 给药状态选项 */
const statusOptions = [
  { label: '待执行', value: 0 },
  { label: '已执行', value: 1 },
  { label: '未执行', value: 2 },
];
</script>

<template>
  <Form :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
    <FormItem label="住院ID" name="admissionId" required>
      <InputNumber v-model:value="formData.admissionId" placeholder="请输入住院ID" style="width: 100%" />
    </FormItem>
    <FormItem label="患者ID" name="patientId" required>
      <InputNumber v-model:value="formData.patientId" placeholder="请输入患者ID" style="width: 100%" />
    </FormItem>
    <FormItem label="医嘱ID" name="orderId" required>
      <InputNumber v-model:value="formData.orderId" placeholder="请输入医嘱ID" style="width: 100%" />
    </FormItem>
    <FormItem label="药品ID" name="drugId" required>
      <InputNumber v-model:value="formData.drugId" placeholder="请输入药品ID" style="width: 100%" />
    </FormItem>
    <FormItem label="药品编码" name="drugCode">
      <Input v-model:value="formData.drugCode" placeholder="请输入药品编码" />
    </FormItem>
    <FormItem label="药品名称" name="drugName" required>
      <Input v-model:value="formData.drugName" placeholder="请输入药品名称" />
    </FormItem>
    <FormItem label="规格" name="spec">
      <Input v-model:value="formData.spec" placeholder="请输入规格" />
    </FormItem>
    <FormItem label="剂量" name="dosage" required>
      <Input v-model:value="formData.dosage" placeholder="请输入剂量" />
    </FormItem>
    <FormItem label="频次" name="frequency">
      <Input v-model:value="formData.frequency" placeholder="请输入频次" />
    </FormItem>
    <FormItem label="给药途径" name="route">
      <Select v-model:value="formData.route" :options="routeOptions" placeholder="请选择给药途径" allow-clear />
    </FormItem>
    <FormItem label="计划执行时间" name="scheduledTime">
      <DatePicker
        v-model:value="formData.scheduledTime"
        show-time
        style="width: 100%"
        placeholder="请选择计划执行时间"
      />
    </FormItem>
    <FormItem label="状态" name="status">
      <Select v-model:value="formData.status" :options="statusOptions" placeholder="请选择状态" allow-clear />
    </FormItem>
  </Form>
</template>
