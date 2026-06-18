<script lang="ts" setup>
import type { OpPrescriptionApi } from '#/api/his/prescription';

import { computed } from 'vue';

import {
  Form,
  FormItem,
  Input,
  InputNumber,
  Select,
  Button,
  Table,
  TableColumn,
  Space,
  Divider,
} from 'ant-design-vue';

import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';

const props = defineProps<{
  formData: OpPrescriptionApi.PrescriptionSaveReqVO;
}>();

/** 处方类型选项 */
const prescriptionTypeOptions = [
  { label: '西药', value: 1 },
  { label: '中药', value: 2 },
  { label: '中成药', value: 3 },
];

/** 计算总金额 */
const totalAmount = computed(() => {
  return props.formData.items.reduce((sum, item) => sum + (item.totalAmount || 0), 0);
});

/** 添加药品项 */
function addItem() {
  props.formData.items.push({
    drugId: 0,
    drugCode: '',
    drugName: '',
    spec: '',
    quantity: 1,
    unit: '',
    dosage: '',
    dosageUnit: '',
    frequency: '',
    usageMethod: '',
    days: 1,
    unitPrice: 0,
    totalAmount: 0,
    skinTestRequired: 0,
    remark: '',
  });
}

/** 删除药品项 */
function removeItem(index: number) {
  props.formData.items.splice(index, 1);
}

/** 更新药品项金额 */
function updateItemAmount(index: number) {
  const item = props.formData.items[index];
  item.totalAmount = (item.unitPrice || 0) * (item.quantity || 0);
}
</script>

<template>
  <Form :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
    <!-- 患者信息 -->
    <Divider orientation="left">患者信息</Divider>
    <FormItem label="患者姓名" name="patientName" required>
      <Input v-model:value="formData.patientName" placeholder="请输入患者姓名" />
    </FormItem>
    <FormItem label="挂号ID" name="registerId" required>
      <InputNumber v-model:value="formData.registerId" placeholder="请输入挂号ID" style="width: 100%" />
    </FormItem>
    <FormItem label="患者ID" name="patientId" required>
      <InputNumber v-model:value="formData.patientId" placeholder="请输入患者ID" style="width: 100%" />
    </FormItem>

    <!-- 处方信息 -->
    <Divider orientation="left">处方信息</Divider>
    <FormItem label="科室" name="deptName" required>
      <Input v-model:value="formData.deptName" placeholder="请输入科室名称" />
    </FormItem>
    <FormItem label="医生" name="doctorName" required>
      <Input v-model:value="formData.doctorName" placeholder="请输入医生姓名" />
    </FormItem>
    <FormItem label="处方类型" name="prescriptionType" required>
      <Select v-model:value="formData.prescriptionType" :options="prescriptionTypeOptions" placeholder="请选择处方类型" />
    </FormItem>
    <FormItem label="诊断" name="diagnosis" required>
      <Input.TextArea v-model:value="formData.diagnosis" placeholder="请输入诊断信息" :rows="2" />
    </FormItem>
    <FormItem label="诊断编码" name="diagnosisCode">
      <Input v-model:value="formData.diagnosisCode" placeholder="请输入诊断编码" />
    </FormItem>
    <FormItem label="备注" name="remark">
      <Input.TextArea v-model:value="formData.remark" placeholder="请输入备注" :rows="2" />
    </FormItem>

    <!-- 药品明细 -->
    <Divider orientation="left">
      <Space>
        <span>药品明细</span>
        <Button type="link" size="small" @click="addItem">
          <template #icon><PlusOutlined /></template>
          添加药品
        </Button>
      </Space>
    </Divider>

    <Table
      :data-source="formData.items"
      :pagination="false"
      bordered
      size="small"
      row-key="drugCode"
    >
      <TableColumn title="药品名称" width="150">
        <template #default="{ record, index }">
          <Input v-model:value="record.drugName" placeholder="药品名称" size="small" />
        </template>
      </TableColumn>
      <TableColumn title="编码" width="100">
        <template #default="{ record }">
          <Input v-model:value="record.drugCode" placeholder="编码" size="small" />
        </template>
      </TableColumn>
      <TableColumn title="规格" width="80">
        <template #default="{ record }">
          <Input v-model:value="record.spec" placeholder="规格" size="small" />
        </template>
      </TableColumn>
      <TableColumn title="数量" width="80">
        <template #default="{ record, index }">
          <InputNumber
            v-model:value="record.quantity"
            :min="1"
            size="small"
            style="width: 100%"
            @change="updateItemAmount(index)"
          />
        </template>
      </TableColumn>
      <TableColumn title="单位" width="60">
        <template #default="{ record }">
          <Input v-model:value="record.unit" placeholder="单位" size="small" />
        </template>
      </TableColumn>
      <TableColumn title="单价" width="80">
        <template #default="{ record, index }">
          <InputNumber
            v-model:value="record.unitPrice"
            :min="0"
            :precision="2"
            size="small"
            style="width: 100%"
            @change="updateItemAmount(index)"
          />
        </template>
      </TableColumn>
      <TableColumn title="金额" width="80">
        <template #default="{ record }">
          <span style="color: #f5222d;">¥{{ record.totalAmount?.toFixed(2) || '0.00' }}</span>
        </template>
      </TableColumn>
      <TableColumn title="用量" width="100">
        <template #default="{ record }">
          <Input v-model:value="record.dosage" placeholder="用量" size="small" />
        </template>
      </TableColumn>
      <TableColumn title="频次" width="80">
        <template #default="{ record }">
          <Input v-model:value="record.frequency" placeholder="频次" size="small" />
        </template>
      </TableColumn>
      <TableColumn title="用法" width="80">
        <template #default="{ record }">
          <Input v-model:value="record.usageMethod" placeholder="用法" size="small" />
        </template>
      </TableColumn>
      <TableColumn title="天数" width="60">
        <template #default="{ record }">
          <InputNumber v-model:value="record.days" :min="1" size="small" style="width: 100%" />
        </template>
      </TableColumn>
      <TableColumn title="皮试" width="70">
        <template #default="{ record }">
          <Select
            v-model:value="record.skinTestRequired"
            :options="[
              { label: '否', value: 0 },
              { label: '是', value: 1 },
            ]"
            size="small"
            style="width: 100%"
          />
        </template>
      </TableColumn>
      <TableColumn title="操作" width="60" fixed="right">
        <template #default="{ index }">
          <Button type="link" danger size="small" @click="removeItem(index)">
            <template #icon><DeleteOutlined /></template>
          </Button>
        </template>
      </TableColumn>
    </Table>

    <!-- 总金额显示 -->
    <div style="text-align: right; margin-top: 16px;">
      <span style="font-size: 16px;">处方总金额：</span>
      <span style="color: #f5222d; font-size: 20px; font-weight: bold;">
        ¥{{ totalAmount.toFixed(2) }}
      </span>
    </div>
  </Form>
</template>