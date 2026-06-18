<script lang="ts" setup>
import type { OpFeeApi } from '#/api/his/fee';

import { Form, FormItem, Input, InputNumber } from 'ant-design-vue';

defineProps<{
  formData: OpFeeApi.FeeSaveReqVO;
}>();
</script>

<template>
  <Form :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
    <FormItem label="挂号ID" name="registerId" required>
      <InputNumber
        v-model:value="formData.registerId"
        placeholder="请输入挂号ID"
        :min="0"
        style="width: 100%"
      />
    </FormItem>
    <FormItem label="患者ID" name="patientId" required>
      <InputNumber
        v-model:value="formData.patientId"
        placeholder="请输入患者ID"
        :min="0"
        style="width: 100%"
      />
    </FormItem>
    <FormItem label="患者姓名" name="patientName" required>
      <Input v-model:value="formData.patientName" placeholder="请输入患者姓名" />
    </FormItem>
    <FormItem label="科室ID" name="deptId" required>
      <InputNumber
        v-model:value="formData.deptId"
        placeholder="请输入科室ID"
        :min="0"
        style="width: 100%"
      />
    </FormItem>
    <FormItem label="科室名称" name="deptName" required>
      <Input v-model:value="formData.deptName" placeholder="请输入科室名称" />
    </FormItem>
    <FormItem label="医生ID" name="doctorId" required>
      <InputNumber
        v-model:value="formData.doctorId"
        placeholder="请输入医生ID"
        :min="0"
        style="width: 100%"
      />
    </FormItem>
    <FormItem label="医生姓名" name="doctorName" required>
      <Input v-model:value="formData.doctorName" placeholder="请输入医生姓名" />
    </FormItem>
    <FormItem label="总金额(元)" name="totalAmount" required>
      <InputNumber
        v-model:value="formData.totalAmount"
        placeholder="请输入总金额"
        :min="0"
        :precision="2"
        style="width: 100%"
      />
    </FormItem>
    <FormItem label="优惠金额(元)" name="discountAmount">
      <InputNumber
        v-model:value="formData.discountAmount"
        placeholder="请输入优惠金额"
        :min="0"
        :precision="2"
        style="width: 100%"
      />
    </FormItem>
    <FormItem label="实付金额(元)" name="payAmount" required>
      <InputNumber
        v-model:value="formData.payAmount"
        placeholder="请输入实付金额"
        :min="0"
        :precision="2"
        style="width: 100%"
      />
    </FormItem>
    <FormItem label="备注" name="remark">
      <Input.TextArea
        v-model:value="formData.remark"
        placeholder="请输入备注"
        :rows="3"
      />
    </FormItem>
  </Form>
</template>
