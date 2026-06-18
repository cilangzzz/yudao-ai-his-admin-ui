<script lang="ts" setup>
import type { OpFeeApi } from '#/api/his/fee';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { createFee, updateFee } from '#/api/his/fee';

import FormSchema from './form-schema.vue';

const emit = defineEmits<{
  success: [];
}>();

const formData = ref<OpFeeApi.FeeSaveReqVO>({
  registerId: 0,
  patientId: 0,
  patientName: '',
  deptId: 0,
  deptName: '',
  doctorId: 0,
  doctorName: '',
  totalAmount: 0,
  discountAmount: 0,
  payAmount: 0,
  remark: '',
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const isEdit = !!formData.value.id;
    try {
      if (isEdit) {
        await updateFee(formData.value);
        message.success('更新成功');
      } else {
        await createFee(formData.value);
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
      const data = modalApi.getData<OpFeeApi.Fee>();
      if (data) {
        formData.value = {
          id: data.id,
          registerId: data.registerId,
          patientId: data.patientId,
          patientName: data.patientName,
          deptId: data.deptId,
          deptName: data.deptName,
          doctorId: data.doctorId,
          doctorName: data.doctorName,
          totalAmount: data.totalAmount,
          discountAmount: data.discountAmount,
          payAmount: data.payAmount,
          remark: data.remark,
        };
      } else {
        formData.value = {
          registerId: 0,
          patientId: 0,
          patientName: '',
          deptId: 0,
          deptName: '',
          doctorId: 0,
          doctorName: '',
          totalAmount: 0,
          discountAmount: 0,
          payAmount: 0,
          remark: '',
        };
      }
    }
  },
});

const getTitle = computed(() => {
  return formData.value.id ? '编辑费用' : '新增费用';
});
</script>

<template>
  <Modal :title="getTitle">
    <FormSchema :form-data="formData" />
  </Modal>
</template>
