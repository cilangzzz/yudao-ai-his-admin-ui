<script lang="ts" setup>
import type { HisAdmissionApi } from '#/api/his/admission';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { createAdmission, updateAdmission } from '#/api/his/admission';

import FormSchema from './form-schema.vue';

const emit = defineEmits<{
  success: [];
}>();

const formData = ref<HisAdmissionApi.AdmissionSaveReqVO>({
  patientId: 0,
  patientName: '',
  idCardNo: '',
  phone: '',
  deptId: 0,
  deptName: '',
  wardId: 0,
  wardName: '',
  bedId: 0,
  bedNo: '',
  doctorId: 0,
  doctorName: '',
  admissionWay: 1,
  admissionCondition: 1,
  diagnosis: '',
  depositAmount: 0,
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const isEdit = !!formData.value.id;
    try {
      if (isEdit) {
        await updateAdmission(formData.value);
        message.success('更新成功');
      } else {
        await createAdmission(formData.value);
        message.success('入院登记成功');
      }
      emit('success');
      modalApi.close();
    } catch {
      // error
    }
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      const data = modalApi.getData<HisAdmissionApi.Admission>();
      if (data) {
        formData.value = {
          id: data.id,
          patientId: data.patientId,
          patientName: data.patientName,
          idCardNo: data.idCardNo,
          phone: data.phone,
          deptId: data.deptId,
          deptName: data.deptName,
          wardId: data.wardId,
          wardName: data.wardName,
          bedId: data.bedId,
          bedNo: data.bedNo,
          doctorId: data.doctorId,
          doctorName: data.doctorName,
          admissionWay: data.admissionWay,
          admissionCondition: data.admissionCondition,
          diagnosis: data.diagnosis,
          depositAmount: data.depositAmount,
        };
      } else {
        formData.value = {
          patientId: 0,
          patientName: '',
          idCardNo: '',
          phone: '',
          deptId: 0,
          deptName: '',
          wardId: 0,
          wardName: '',
          bedId: 0,
          bedNo: '',
          doctorId: 0,
          doctorName: '',
          admissionWay: 1,
          admissionCondition: 1,
          diagnosis: '',
          depositAmount: 0,
        };
      }
    }
  },
});

const getTitle = computed(() => {
  return formData.value.id ? '编辑入院记录' : '入院登记';
});
</script>

<template>
  <Modal :title="getTitle">
    <FormSchema :form-data="formData" />
  </Modal>
</template>