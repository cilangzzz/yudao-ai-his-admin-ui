<script lang="ts" setup>
import type { HisDrugApi } from '#/api/his/drug';

import { Form, FormItem, Input, InputNumber, Select, Textarea } from 'ant-design-vue';

defineProps<{
  formData: HisDrugApi.DrugSaveReqVO;
}>();

/** 药品类型选项 */
const drugTypeOptions = [
  { label: '西药', value: 1 },
  { label: '中成药', value: 2 },
  { label: '中草药', value: 3 },
  { label: '生物制品', value: 4 },
];

/** 医保类型选项 */
const insuranceTypeOptions = [
  { label: '甲类', value: 1 },
  { label: '乙类', value: 2 },
  { label: '自费', value: 3 },
];

/** 特殊药品选项 */
const isSpecialOptions = [
  { label: '普通', value: 0 },
  { label: '麻醉药品', value: 1 },
  { label: '一类精神', value: 2 },
  { label: '二类精神', value: 3 },
  { label: '毒性药品', value: 4 },
];

/** 是否选项 */
const boolOptions = [
  { label: '否', value: 0 },
  { label: '是', value: 1 },
];

/** 状态选项 */
const statusOptions = [
  { label: '停用', value: 0 },
  { label: '正常', value: 1 },
];
</script>

<template>
  <Form :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
    <FormItem label="药品编码" name="drugCode" required>
      <Input v-model:value="formData.drugCode" placeholder="请输入药品编码" />
    </FormItem>
    <FormItem label="药品名称" name="drugName" required>
      <Input v-model:value="formData.drugName" placeholder="请输入药品名称" />
    </FormItem>
    <FormItem label="药品别名" name="drugAlias">
      <Input v-model:value="formData.drugAlias" placeholder="请输入药品别名" />
    </FormItem>
    <FormItem label="药品类型" name="drugType" required>
      <Select v-model:value="formData.drugType" :options="drugTypeOptions" placeholder="请选择药品类型" />
    </FormItem>
    <FormItem label="规格" name="spec" required>
      <Input v-model:value="formData.spec" placeholder="请输入规格" />
    </FormItem>
    <FormItem label="单位" name="unit" required>
      <Input v-model:value="formData.unit" placeholder="请输入单位" />
    </FormItem>
    <FormItem label="最小单位" name="minUnit" required>
      <Input v-model:value="formData.minUnit" placeholder="请输入最小单位" />
    </FormItem>
    <FormItem label="包装换算比" name="packRatio" required>
      <InputNumber v-model:value="formData.packRatio" :min="1" :precision="2" style="width: 100%" placeholder="请输入包装换算比" />
    </FormItem>
    <FormItem label="生产厂家" name="manufacturer" required>
      <Input v-model:value="formData.manufacturer" placeholder="请输入生产厂家" />
    </FormItem>
    <FormItem label="批准文号" name="approvalNo" required>
      <Input v-model:value="formData.approvalNo" placeholder="请输入批准文号" />
    </FormItem>
    <FormItem label="零售价" name="retailPrice" required>
      <InputNumber v-model:value="formData.retailPrice" :min="0" :precision="2" style="width: 100%" placeholder="请输入零售价" />
    </FormItem>
    <FormItem label="采购价" name="purchasePrice" required>
      <InputNumber v-model:value="formData.purchasePrice" :min="0" :precision="2" style="width: 100%" placeholder="请输入采购价" />
    </FormItem>
    <FormItem label="医保类型" name="insuranceType" required>
      <Select v-model:value="formData.insuranceType" :options="insuranceTypeOptions" placeholder="请选择医保类型" />
    </FormItem>
    <FormItem label="医保编码" name="insuranceCode">
      <Input v-model:value="formData.insuranceCode" placeholder="请输入医保编码" />
    </FormItem>
    <FormItem label="特殊药品" name="isSpecial" required>
      <Select v-model:value="formData.isSpecial" :options="isSpecialOptions" placeholder="请选择特殊药品类型" />
    </FormItem>
    <FormItem label="是否抗菌药物" name="isAntibiotic" required>
      <Select v-model:value="formData.isAntibiotic" :options="boolOptions" placeholder="请选择" />
    </FormItem>
    <FormItem label="是否需要皮试" name="skinTestRequired" required>
      <Select v-model:value="formData.skinTestRequired" :options="boolOptions" placeholder="请选择" />
    </FormItem>
    <FormItem label="存储条件" name="storageCondition">
      <Input v-model:value="formData.storageCondition" placeholder="请输入存储条件" />
    </FormItem>
    <FormItem label="有效期（月）" name="shelfLife">
      <InputNumber v-model:value="formData.shelfLife" :min="1" :precision="0" style="width: 100%" placeholder="请输入有效期" />
    </FormItem>
    <FormItem label="状态" name="status" required>
      <Select v-model:value="formData.status" :options="statusOptions" placeholder="请选择状态" />
    </FormItem>
    <FormItem label="备注" name="remark">
      <Textarea v-model:value="formData.remark" :rows="3" placeholder="请输入备注" />
    </FormItem>
  </Form>
</template>
