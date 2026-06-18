<script lang="ts" setup>
import type { HisMedicationApi } from '#/api/his/medication';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { createMedication, updateMedication } from '#/api/his/medication';

import FormSchema from './form-schema.vue';

const emit = defineEmits<{
  success: [];
}>();

const formData = ref<HisMedicationApi.Medication>({
  id: 0,
  adminNo: '',
  admissionId: 0,
  patientId: 0,
  patientName: '',
  inpatientNo: '',
  orderId: 0,
  orderNo: '',
  drugId: 0,
  drugCode: '',
  drugName: '',
  spec: '',
  dosage: '',
  frequency: '',
  route: '',
  scheduledTime: '',
  status: 0,
  createTime: '',
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const isEdit = !!formData.value.id;
    try {
      if (isEdit) {
        await updateMedication(formData.value);
        message.success('更新成功');
      } else {
        await createMedication(formData.value);
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
      const data = modalApi.getData<HisMedicationApi.Medication>();
      if (data) {
        formData.value = {
          id: data.id,
          adminNo: data.adminNo,
          admissionId: data.admissionId,
          patientId: data.patientId,
          patientName: data.patientName,
          inpatientNo: data.inpatientNo,
          orderId: data.orderId,
          orderNo: data.orderNo,
          drugId: data.drugId,
          drugCode: data.drugCode,
          drugName: data.drugName,
          spec: data.spec,
          dosage: data.dosage,
          frequency: data.frequency,
          route: data.route,
          scheduledTime: data.scheduledTime,
          status: data.status,
          createTime: data.createTime,
        };
      } else {
        formData.value = {
          id: 0,
          adminNo: '',
          admissionId: 0,
          patientId: 0,
          patientName: '',
          inpatientNo: '',
          orderId: 0,
          orderNo: '',
          drugId: 0,
          drugCode: '',
          drugName: '',
          spec: '',
          dosage: '',
          frequency: '',
          route: '',
          scheduledTime: '',
          status: 0,
          createTime: '',
        };
      }
    }
  },
});

const getTitle = computed(() => {
  return formData.value.id ? '编辑给药记录' : '新增给药记录';
});
</script>

<template>
  <Modal :title="getTitle">
    <FormSchema :form-data="formData" />
  </Modal>
</template>