<script lang="ts" setup>
import type { HisSettlementApi } from '#/api/his/settlement';

import { Form, FormItem, Input, InputNumber, Select, DatePicker, Textarea } from 'ant-design-vue';

import {
  INSURANCE_TYPE_DICT,
  SETTLEMENT_TYPE_DICT,
} from '../data';

defineProps<{
  formData: HisSettlementApi.SettlementSaveReqVO;
}>();
</script>

<template>
  <Form :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
    <FormItem label="患者姓名" name="patientName" required>
      <Input v-model:value="formData.patientName" placeholder="请输入患者姓名" />
    </FormItem>
    <FormItem label="住院号" name="inpatientNo">
      <Input v-model:value="formData.inpatientNo" placeholder="请输入住院号" />
    </FormItem>
    <FormItem label="身份证号" name="idCardNo">
      <Input v-model:value="formData.idCardNo" placeholder="请输入身份证号" />
    </FormItem>
    <FormItem label="入院日期" name="admissionDate">
      <DatePicker v-model:value="formData.admissionDate" style="width: 100%" placeholder="请选择入院日期" />
    </FormItem>
    <FormItem label="出院日期" name="dischargeDate">
      <DatePicker v-model:value="formData.dischargeDate" style="width: 100%" placeholder="请选择出院日期" />
    </FormItem>
    <FormItem label="住院天数" name="hospitalDays">
      <InputNumber v-model:value="formData.hospitalDays" :min="0" style="width: 100%" placeholder="请输入住院天数" />
    </FormItem>
    <FormItem label="科室名称" name="deptName">
      <Input v-model:value="formData.deptName" placeholder="请输入科室名称" />
    </FormItem>
    <FormItem label="病区名称" name="wardName">
      <Input v-model:value="formData.wardName" placeholder="请输入病区名称" />
    </FormItem>
    <FormItem label="床位号" name="bedNo">
      <Input v-model:value="formData.bedNo" placeholder="请输入床位号" />
    </FormItem>
    <FormItem label="主治医生" name="attendingDoctorName">
      <Input v-model:value="formData.attendingDoctorName" placeholder="请输入主治医生" />
    </FormItem>
    <FormItem label="医保类型" name="insuranceType">
      <Select v-model:value="formData.insuranceType" :options="INSURANCE_TYPE_DICT" placeholder="请选择医保类型" allow-clear />
    </FormItem>
    <FormItem label="医保卡号" name="insuranceNo">
      <Input v-model:value="formData.insuranceNo" placeholder="请输入医保卡号" />
    </FormItem>
    <FormItem label="结算类型" name="settlementType">
      <Select v-model:value="formData.settlementType" :options="SETTLEMENT_TYPE_DICT" placeholder="请选择结算类型" allow-clear />
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
    <FormItem label="备注" name="remark">
      <Textarea v-model:value="formData.remark" placeholder="请输入备注" :rows="3" />
    </FormItem>
  </Form>
</template>
