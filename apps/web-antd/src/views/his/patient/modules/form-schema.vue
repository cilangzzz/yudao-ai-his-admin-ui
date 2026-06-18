<script lang="ts" setup>
import type { HisPatientApi } from '#/api/his/patient';

import { Form, FormItem, Input, Select, DatePicker } from 'ant-design-vue';

defineProps<{
  formData: HisPatientApi.PatientSaveReqVO;
}>();

/** 性别选项 */
const genderOptions = [
  { label: '男', value: 1 },
  { label: '女', value: 2 },
];

/** 血型选项 */
const bloodTypeOptions = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'AB', value: 'AB' },
  { label: 'O', value: 'O' },
];

/** 婚姻状态选项 */
const marriageStatusOptions = [
  { label: '未婚', value: 1 },
  { label: '已婚', value: 2 },
  { label: '离异', value: 3 },
  { label: '丧偶', value: 4 },
];
</script>

<template>
  <Form :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
    <FormItem label="姓名" name="name" required>
      <Input v-model:value="formData.name" placeholder="请输入姓名" />
    </FormItem>
    <FormItem label="身份证号" name="idCardNo" required>
      <Input v-model:value="formData.idCardNo" placeholder="请输入身份证号" />
    </FormItem>
    <FormItem label="性别" name="gender" required>
      <Select v-model:value="formData.gender" :options="genderOptions" placeholder="请选择性别" />
    </FormItem>
    <FormItem label="出生日期" name="birthday">
      <DatePicker v-model:value="formData.birthday" style="width: 100%" placeholder="请选择出生日期" />
    </FormItem>
    <FormItem label="联系电话" name="phone">
      <Input v-model:value="formData.phone" placeholder="请输入联系电话" />
    </FormItem>
    <FormItem label="家庭住址" name="address">
      <Input v-model:value="formData.address" placeholder="请输入家庭住址" />
    </FormItem>
    <FormItem label="紧急联系人" name="emergencyContact">
      <Input v-model:value="formData.emergencyContact" placeholder="请输入紧急联系人" />
    </FormItem>
    <FormItem label="紧急联系电话" name="emergencyPhone">
      <Input v-model:value="formData.emergencyPhone" placeholder="请输入紧急联系电话" />
    </FormItem>
    <FormItem label="血型" name="bloodType">
      <Select v-model:value="formData.bloodType" :options="bloodTypeOptions" placeholder="请选择血型" allow-clear />
    </FormItem>
    <FormItem label="婚姻状态" name="marriageStatus">
      <Select v-model:value="formData.marriageStatus" :options="marriageStatusOptions" placeholder="请选择婚姻状态" allow-clear />
    </FormItem>
    <FormItem label="职业" name="occupation">
      <Input v-model:value="formData.occupation" placeholder="请输入职业" />
    </FormItem>
    <FormItem label="民族" name="nation">
      <Input v-model:value="formData.nation" placeholder="请输入民族" />
    </FormItem>
    <FormItem label="籍贯" name="nativePlace">
      <Input v-model:value="formData.nativePlace" placeholder="请输入籍贯" />
    </FormItem>
  </Form>
</template>