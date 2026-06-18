<script lang="ts" setup>
import type { OpRegisterApi } from '#/api/his/register';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { createRegister } from '#/api/his/register';

import FormSchema from './form-schema.vue';

const emit = defineEmits<{
  success: [];
}>();

const formData = ref<OpRegisterApi.RegisterSaveReqVO>({
  patientId: 0,
  deptId: 0,
  doctorId: 0,
  scheduleId: 0,
  registerType: 1,
  visitDate: '',
  timeSlot: 'AM',
  fee: 0,
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    try {
      await createRegister(formData.value);
      message.success('挂号成功');
      emit('success');
      modalApi.close();
    } catch {
      // error
    }
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      formData.value = {
        patientId: 0,
        deptId: 0,
        doctorId: 0,
        scheduleId: 0,
        registerType: 1,
        visitDate: '',
        timeSlot: 'AM',
        fee: 0,
      };
    }
  },
});

const getTitle = computed(() => '现场挂号');
</script>

<template>
  <Modal :title="getTitle">
    <FormSchema :form-data="formData" />
  </Modal>
</template>