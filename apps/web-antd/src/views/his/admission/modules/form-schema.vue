<script lang="ts" setup>
import type { HisAdmissionApi } from '#/api/his/admission';

import { Form, FormItem, Input, Select, InputNumber } from 'ant-design-vue';

defineProps<{
  formData: HisAdmissionApi.AdmissionSaveReqVO;
}>();

/** 入院方式选项 */
const admissionWayOptions = [
  { label: '门诊入院', value: 1 },
  { label: '急诊入院', value: 2 },
  { label: '转院入院', value: 3 },
  { label: '其他', value: 4 },
];

/** 入院病情选项 */
const admissionConditionOptions = [
  { label: '一般', value: 1 },
  { label: '急', value: 2 },
  { label: '危重', value: 3 },
];
</script>

<template>
  <Form :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
    <FormItem label="患者ID" name="patientId" required>
      <InputNumber v-model:value="formData.patientId" style="width: 100%" placeholder="请输入患者ID" />
    </FormItem>
    <FormItem label="患者姓名" name="patientName" required>
      <Input v-model:value="formData.patientName" placeholder="请输入患者姓名" />
    </FormItem>
    <FormItem label="身份证号" name="idCardNo" required>
      <Input v-model:value="formData.idCardNo" placeholder="请输入身份证号" />
    </FormItem>
    <FormItem label="联系电话" name="phone">
      <Input v-model:value="formData.phone" placeholder="请输入联系电话" />
    </FormItem>
    <FormItem label="科室ID" name="deptId" required>
      <InputNumber v-model:value="formData.deptId" style="width: 100%" placeholder="请输入科室ID" />
    </FormItem>
    <FormItem label="科室名称" name="deptName">
      <Input v-model:value="formData.deptName" placeholder="请输入科室名称" />
    </FormItem>
    <FormItem label="病区ID" name="wardId" required>
      <InputNumber v-model:value="formData.wardId" style="width: 100%" placeholder="请输入病区ID" />
    </FormItem>
    <FormItem label="病区名称" name="wardName">
      <Input v-model:value="formData.wardName" placeholder="请输入病区名称" />
    </FormItem>
    <FormItem label="床位ID" name="bedId" required>
      <InputNumber v-model:value="formData.bedId" style="width: 100%" placeholder="请输入床位ID" />
    </FormItem>
    <FormItem label="床号" name="bedNo">
      <Input v-model:value="formData.bedNo" placeholder="请输入床号" />
    </FormItem>
    <FormItem label="主治医生ID" name="doctorId" required>
      <InputNumber v-model:value="formData.doctorId" style="width: 100%" placeholder="请输入主治医生ID" />
    </FormItem>
    <FormItem label="主治医生" name="doctorName">
      <Input v-model:value="formData.doctorName" placeholder="请输入主治医生姓名" />
    </FormItem>
    <FormItem label="入院方式" name="admissionWay" required>
      <Select v-model:value="formData.admissionWay" :options="admissionWayOptions" placeholder="请选择入院方式" />
    </FormItem>
    <FormItem label="入院病情" name="admissionCondition" required>
      <Select v-model:value="formData.admissionCondition" :options="admissionConditionOptions" placeholder="请选择入院病情" />
    </FormItem>
    <FormItem label="诊断" name="diagnosis" required>
      <Input v-model:value="formData.diagnosis" placeholder="请输入诊断" />
    </FormItem>
    <FormItem label="预交金" name="depositAmount">
      <InputNumber v-model:value="formData.depositAmount" style="width: 100%" :min="0" :precision="2" placeholder="请输入预交金" />
    </FormItem>
    <FormItem label="过敏史" name="allergyHistory">
      <Input v-model:value="formData.allergyHistory" placeholder="请输入过敏史" />
    </FormItem>
    <FormItem label="备注" name="remark">
      <Input.TextArea v-model:value="formData.remark" placeholder="请输入备注" />
    </FormItem>
  </Form>
</template>