<script lang="ts" setup>
import type { HisPatientApi } from '#/api/his/patient';

import { computed, ref } from 'vue';

import {
  onCloseModal,
  useVbenModal,
} from '@vben/common-ui';

import { message } from 'ant-design-vue';

import {
  createPatient,
  getPatient,
  updatePatient,
} from '#/api/his/patient';

import FormSchema from './form-schema.vue';

const emit = defineEmits<{
  success: [];
}>();

const formData = ref<HisPatientApi.PatientSaveReqVO>({
  name: '',
  idCardNo: '',
  gender: 1,
  birthday: '',
  phone: '',
  address: '',
  emergencyContact: '',
  emergencyPhone: '',
  bloodType: '',
  marriageStatus: undefined,
  occupation: '',
  nation: '',
  nativePlace: '',
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const isEdit = !!formData.value.id;
    try {
      if (isEdit) {
        await updatePatient(formData.value);
        message.success('更新成功');
      } else {
        await createPatient(formData.value);
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
      const data = modalApi.getData<HisPatientApi.Patient | null>();
      if (data) {
        formData.value = {
          id: data.id,
          name: data.name,
          idCardNo: data.idCardNo,
          gender: data.gender,
          birthday: data.birthday,
          phone: data.phone,
          address: data.address,
          emergencyContact: data.emergencyContact,
          emergencyPhone: data.emergencyPhone,
          bloodType: data.bloodType,
          marriageStatus: data.marriageStatus,
          occupation: data.occupation,
          nation: data.nation,
          nativePlace: data.nativePlace,
        };
      } else {
        formData.value = {
          name: '',
          idCardNo: '',
          gender: 1,
        };
      }
    }
  },
});

const getTitle = computed(() => {
  return formData.value.id ? '编辑患者' : '新增患者';
});
</script>

<template>
  <Modal :title="getTitle">
    <FormSchema :form-data="formData" />
  </Modal>
</template>
