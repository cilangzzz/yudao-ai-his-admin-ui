<script lang="ts" setup>
import type { OpRegisterApi } from '#/api/his/register';

import { Form, FormItem, Input, Select, DatePicker, InputNumber } from 'ant-design-vue';

defineProps<{
  formData: OpRegisterApi.RegisterSaveReqVO;
}>();

/** 挂号类型选项 */
const registerTypeOptions = [
  { label: '普通', value: 1 },
  { label: '专家', value: 2 },
  { label: '急诊', value: 3 },
];

/** 时间段选项 */
const timeSlotOptions = [
  { label: '上午', value: 'AM' },
  { label: '下午', value: 'PM' },
];
</script>

<template>
  <Form :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
    <FormItem label="患者ID" name="patientId" required>
      <InputNumber v-model:value="formData.patientId" style="width: 100%" placeholder="请输入患者ID" />
    </FormItem>
    <FormItem label="科室ID" name="deptId" required>
      <InputNumber v-model:value="formData.deptId" style="width: 100%" placeholder="请输入科室ID" />
    </FormItem>
    <FormItem label="医生ID" name="doctorId" required>
      <InputNumber v-model:value="formData.doctorId" style="width: 100%" placeholder="请输入医生ID" />
    </FormItem>
    <FormItem label="排班ID" name="scheduleId" required>
      <InputNumber v-model:value="formData.scheduleId" style="width: 100%" placeholder="请输入排班ID" />
    </FormItem>
    <FormItem label="挂号类型" name="registerType" required>
      <Select v-model:value="formData.registerType" :options="registerTypeOptions" placeholder="请选择挂号类型" />
    </FormItem>
    <FormItem label="就诊日期" name="visitDate" required>
      <DatePicker v-model:value="formData.visitDate" style="width: 100%" placeholder="请选择就诊日期" />
    </FormItem>
    <FormItem label="时间段" name="timeSlot">
      <Select v-model:value="formData.timeSlot" :options="timeSlotOptions" placeholder="请选择时间段" />
    </FormItem>
    <FormItem label="挂号费" name="fee">
      <InputNumber v-model:value="formData.fee" style="width: 100%" :min="0" :precision="2" placeholder="请输入挂号费" />
    </FormItem>
    <FormItem label="备注" name="remark">
      <Input v-model:value="formData.remark" placeholder="请输入备注" />
    </FormItem>
  </Form>
</template>