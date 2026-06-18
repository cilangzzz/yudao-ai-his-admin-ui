<script lang="ts" setup>
import type { HisDischargeApi } from '#/api/his/discharge';

import { Form, FormItem, Input, InputNumber, Select, DatePicker } from 'ant-design-vue';

defineProps<{
  formData: HisDischargeApi.DischargeSaveReqVO;
}>();

/** 出院类型选项 */
const dischargeTypeOptions = [
  { label: '正常出院', value: 1 },
  { label: '转院', value: 2 },
  { label: '自动出院', value: 3 },
  { label: '死亡', value: 4 },
];

/** 出院去向选项 */
const dischargeDestinationOptions = [
  { label: '回家', value: 1 },
  { label: '转院', value: 2 },
  { label: '社区卫生中心', value: 3 },
  { label: '养老院', value: 4 },
];

/** 出院情况选项 */
const dischargeConditionOptions = [
  { label: '治愈', value: 1 },
  { label: '好转', value: 2 },
  { label: '未愈', value: 3 },
  { label: '死亡', value: 4 },
];
</script>

<template>
  <Form :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
    <FormItem label="患者姓名" name="patientName" required>
      <Input v-model:value="formData.patientName" placeholder="请输入患者姓名" />
    </FormItem>
    <FormItem label="住院号" name="inpatientNo">
      <Input v-model:value="formData.inpatientNo" placeholder="请输入住院号" />
    </FormItem>
    <FormItem label="科室名称" name="deptName" required>
      <Input v-model:value="formData.deptName" placeholder="请输入科室名称" />
    </FormItem>
    <FormItem label="病区名称" name="wardName" required>
      <Input v-model:value="formData.wardName" placeholder="请输入病区名称" />
    </FormItem>
    <FormItem label="床号" name="bedNo">
      <Input v-model:value="formData.bedNo" placeholder="请输入床号" />
    </FormItem>
    <FormItem label="入院日期" name="admissionDate">
      <DatePicker v-model:value="formData.admissionDate" style="width: 100%" placeholder="请选择入院日期" />
    </FormItem>
    <FormItem label="出院日期" name="dischargeDate" required>
      <DatePicker v-model:value="formData.dischargeDate" style="width: 100%" placeholder="请选择出院日期" />
    </FormItem>
    <FormItem label="住院天数" name="hospitalDays">
      <InputNumber v-model:value="formData.hospitalDays" style="width: 100%" placeholder="请输入住院天数" :min="0" />
    </FormItem>
    <FormItem label="入院诊断" name="admissionDiagnosis">
      <Input v-model:value="formData.admissionDiagnosis" placeholder="请输入入院诊断" />
    </FormItem>
    <FormItem label="出院诊断" name="dischargeDiagnosis">
      <Input v-model:value="formData.dischargeDiagnosis" placeholder="请输入出院诊断" />
    </FormItem>
    <FormItem label="诊断编码" name="diagnosisCode">
      <Input v-model:value="formData.diagnosisCode" placeholder="请输入诊断编码" />
    </FormItem>
    <FormItem label="出院类型" name="dischargeType" required>
      <Select v-model:value="formData.dischargeType" :options="dischargeTypeOptions" placeholder="请选择出院类型" />
    </FormItem>
    <FormItem label="出院去向" name="dischargeDestination" required>
      <Select v-model:value="formData.dischargeDestination" :options="dischargeDestinationOptions" placeholder="请选择出院去向" />
    </FormItem>
    <FormItem label="出院情况" name="dischargeCondition" required>
      <Select v-model:value="formData.dischargeCondition" :options="dischargeConditionOptions" placeholder="请选择出院情况" />
    </FormItem>
    <FormItem label="出院医生" name="dischargeDoctorName">
      <Input v-model:value="formData.dischargeDoctorName" placeholder="请输入出院医生姓名" />
    </FormItem>
    <FormItem label="备注" name="remark">
      <Input.TextArea v-model:value="formData.remark" placeholder="请输入备注" :rows="3" />
    </FormItem>
  </Form>
</template>
