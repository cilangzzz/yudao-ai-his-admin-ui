<script lang="ts" setup>
import type { HisSettlementApi } from '#/api/his/settlement';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { createSettlement, updateSettlement } from '#/api/his/settlement';

import FormSchema from './form-schema.vue';

const emit = defineEmits<{
  success: [];
}>();

const formData = ref<HisSettlementApi.SettlementSaveReqVO>({
  admissionId: 0,
  patientId: 0,
  patientName: '',
  inpatientNo: '',
  idCardNo: '',
  admissionDate: '',
  dischargeDate: '',
  hospitalDays: 0,
  deptId: undefined,
  deptName: '',
  wardId: undefined,
  wardName: '',
  bedId: undefined,
  bedNo: '',
  attendingDoctorId: undefined,
  attendingDoctorName: '',
  insuranceType: undefined,
  insuranceNo: '',
  settlementType: undefined,
  admissionDiagnosis: '',
  dischargeDiagnosis: '',
  diagnosisCode: '',
  remark: '',
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const isEdit = !!formData.value.id;
    try {
      if (isEdit) {
        await updateSettlement(formData.value);
        message.success('更新成功');
      } else {
        await createSettlement(formData.value);
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
      const data = modalApi.getData<HisSettlementApi.Settlement>();
      if (data) {
        formData.value = {
          id: data.id,
          admissionId: data.admissionId,
          patientId: data.patientId,
          patientName: data.patientName,
          inpatientNo: data.inpatientNo,
          idCardNo: data.idCardNo,
          admissionDate: data.admissionDate,
          dischargeDate: data.dischargeDate,
          hospitalDays: data.hospitalDays,
          deptId: data.deptId,
          deptName: data.deptName,
          wardId: data.wardId,
          wardName: data.wardName,
          bedId: data.bedId,
          bedNo: data.bedNo,
          attendingDoctorId: data.attendingDoctorId,
          attendingDoctorName: data.attendingDoctorName,
          insuranceType: data.insuranceType,
          insuranceNo: data.insuranceNo,
          settlementType: data.settlementType,
          admissionDiagnosis: data.admissionDiagnosis,
          dischargeDiagnosis: data.dischargeDiagnosis,
          diagnosisCode: data.diagnosisCode,
          remark: data.remark,
        };
      } else {
        formData.value = {
          admissionId: 0,
          patientId: 0,
          patientName: '',
          inpatientNo: '',
          idCardNo: '',
          admissionDate: '',
          dischargeDate: '',
          hospitalDays: 0,
          deptId: undefined,
          deptName: '',
          wardId: undefined,
          wardName: '',
          bedId: undefined,
          bedNo: '',
          attendingDoctorId: undefined,
          attendingDoctorName: '',
          insuranceType: undefined,
          insuranceNo: '',
          settlementType: undefined,
          admissionDiagnosis: '',
          dischargeDiagnosis: '',
          diagnosisCode: '',
          remark: '',
        };
      }
    }
  },
});

const getTitle = computed(() => {
  return formData.value.id ? '编辑结算单' : '新增结算单';
});
</script>

<template>
  <Modal :title="getTitle">
    <FormSchema :form-data="formData" />
  </Modal>
</template>
