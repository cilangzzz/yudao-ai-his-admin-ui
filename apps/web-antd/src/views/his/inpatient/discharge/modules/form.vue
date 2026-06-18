<script lang="ts" setup>
import type { HisDischargeApi } from '#/api/his/discharge';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { createDischarge, updateDischarge } from '#/api/his/discharge';

import FormSchema from './form-schema.vue';

const emit = defineEmits<{
  success: [];
}>();

const formData = ref<HisDischargeApi.DischargeSaveReqVO>({
  admissionId: 0,
  patientId: 0,
  patientName: '',
  deptId: 0,
  deptName: '',
  wardId: 0,
  wardName: '',
  dischargeDate: '',
  dischargeType: 1,
  dischargeDestination: 1,
  dischargeCondition: 1,
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const isEdit = !!formData.value.id;
    try {
      if (isEdit) {
        await updateDischarge(formData.value);
        message.success('更新成功');
      } else {
        await createDischarge(formData.value);
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
      const data = modalApi.getData<HisDischargeApi.Discharge>();
      if (data) {
        formData.value = {
          id: data.id,
          admissionId: data.admissionId,
          patientId: data.patientId,
          patientName: data.patientName,
          inpatientNo: data.inpatientNo,
          deptId: data.deptId,
          deptName: data.deptName,
          wardId: data.wardId,
          wardName: data.wardName,
          bedNo: data.bedNo,
          admissionDate: data.admissionDate,
          dischargeDate: data.dischargeDate,
          hospitalDays: data.hospitalDays,
          admissionDiagnosis: data.admissionDiagnosis,
          dischargeDiagnosis: data.dischargeDiagnosis,
          diagnosisCode: data.diagnosisCode,
          dischargeType: data.dischargeType,
          dischargeDestination: data.dischargeDestination,
          dischargeCondition: data.dischargeCondition,
          dischargeDoctorId: data.dischargeDoctorId,
          dischargeDoctorName: data.dischargeDoctorName,
          remark: data.remark,
        };
      } else {
        formData.value = {
          admissionId: 0,
          patientId: 0,
          patientName: '',
          deptId: 0,
          deptName: '',
          wardId: 0,
          wardName: '',
          dischargeDate: '',
          dischargeType: 1,
          dischargeDestination: 1,
          dischargeCondition: 1,
        };
      }
    }
  },
});

const getTitle = computed(() => {
  return formData.value.id ? '编辑出院记录' : '新增出院记录';
});
</script>

<template>
  <Modal :title="getTitle">
    <FormSchema :form-data="formData" />
  </Modal>
</template>
