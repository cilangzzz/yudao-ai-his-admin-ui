<script lang="ts" setup>
import type { OpPrescriptionApi } from '#/api/his/prescription';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { createPrescription, updatePrescription } from '#/api/his/prescription';

import FormSchema from './form-schema.vue';

const emit = defineEmits<{
  success: [];
}>();

const formData = ref<OpPrescriptionApi.PrescriptionSaveReqVO>({
  registerId: 0,
  patientId: 0,
  patientName: '',
  doctorId: 0,
  doctorName: '',
  deptId: 0,
  deptName: '',
  prescriptionType: 1,
  diagnosis: '',
  diagnosisCode: '',
  remark: '',
  items: [],
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const isEdit = !!formData.value.id;
    try {
      if (isEdit) {
        await updatePrescription(formData.value);
        message.success('更新成功');
      } else {
        await createPrescription(formData.value);
        message.success('创建成功');
      }
      emit('success');
      modalApi.close();
    } catch {
      // error
    }
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      const data = modalApi.getData<OpPrescriptionApi.Prescription>();
      if (data) {
        // 编辑模式：填充表单数据
        formData.value = {
          id: data.id,
          registerId: data.registerId,
          patientId: data.patientId,
          patientName: data.patientName,
          doctorId: data.doctorId,
          doctorName: data.doctorName,
          deptId: data.deptId,
          deptName: data.deptName,
          prescriptionType: data.prescriptionType,
          diagnosis: data.diagnosis,
          diagnosisCode: data.diagnosisCode,
          remark: data.remark || '',
          items: data.items?.map((item) => ({
            id: item.id,
            drugId: item.drugId,
            drugCode: item.drugCode,
            drugName: item.drugName,
            spec: item.spec,
            quantity: item.quantity,
            unit: item.unit,
            dosage: item.dosage,
            dosageUnit: item.dosageUnit,
            frequency: item.frequency,
            usageMethod: item.usageMethod,
            days: item.days,
            unitPrice: item.unitPrice,
            totalAmount: item.totalAmount,
            skinTestRequired: item.skinTestRequired,
            remark: item.remark || '',
          })) || [],
        };
      } else {
        // 新增模式：重置表单
        formData.value = {
          registerId: 0,
          patientId: 0,
          patientName: '',
          doctorId: 0,
          doctorName: '',
          deptId: 0,
          deptName: '',
          prescriptionType: 1,
          diagnosis: '',
          diagnosisCode: '',
          remark: '',
          items: [],
        };
      }
    }
  },
});

const getTitle = computed(() => {
  return formData.value.id ? '编辑处方' : '新增处方';
});
</script>

<template>
  <Modal :title="getTitle" width="800px">
    <FormSchema :form-data="formData" />
  </Modal>
</template>