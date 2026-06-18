<script lang="ts" setup>
import type { HisDrugApi } from '#/api/his/drug';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { createDrug, updateDrug } from '#/api/his/drug';

import FormSchema from './form-schema.vue';

const emit = defineEmits<{
  success: [];
}>();

const formData = ref<HisDrugApi.DrugSaveReqVO>({
  drugCode: '',
  drugName: '',
  drugAlias: '',
  drugType: 1,
  drugCategory: 1,
  spec: '',
  unit: '',
  minUnit: '',
  packRatio: 1,
  manufacturer: '',
  approvalNo: '',
  retailPrice: 0,
  purchasePrice: 0,
  insuranceType: 3,
  insuranceCode: '',
  isSpecial: 0,
  isAntibiotic: 0,
  skinTestRequired: 0,
  storageCondition: '',
  shelfLife: undefined,
  status: 1,
  remark: '',
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const isEdit = !!formData.value.id;
    try {
      if (isEdit) {
        await updateDrug(formData.value);
        message.success('更新成功');
      } else {
        await createDrug(formData.value);
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
      const data = modalApi.getData<HisDrugApi.Drug>();
      if (data) {
        formData.value = {
          id: data.id,
          drugCode: data.drugCode,
          drugName: data.drugName,
          drugAlias: data.drugAlias,
          drugType: data.drugType,
          drugCategory: data.drugCategory,
          spec: data.spec,
          unit: data.unit,
          minUnit: data.minUnit,
          packRatio: data.packRatio,
          manufacturer: data.manufacturer,
          approvalNo: data.approvalNo,
          retailPrice: data.retailPrice,
          purchasePrice: data.purchasePrice,
          insuranceType: data.insuranceType,
          insuranceCode: data.insuranceCode,
          isSpecial: data.isSpecial,
          isAntibiotic: data.isAntibiotic,
          skinTestRequired: data.skinTestRequired,
          storageCondition: data.storageCondition,
          shelfLife: data.shelfLife,
          status: data.status,
          remark: data.remark,
        };
      } else {
        formData.value = {
          drugCode: '',
          drugName: '',
          drugAlias: '',
          drugType: 1,
          drugCategory: 1,
          spec: '',
          unit: '',
          minUnit: '',
          packRatio: 1,
          manufacturer: '',
          approvalNo: '',
          retailPrice: 0,
          purchasePrice: 0,
          insuranceType: 3,
          insuranceCode: '',
          isSpecial: 0,
          isAntibiotic: 0,
          skinTestRequired: 0,
          storageCondition: '',
          shelfLife: undefined,
          status: 1,
          remark: '',
        };
      }
    }
  },
});

const getTitle = computed(() => {
  return formData.value.id ? '编辑药品' : '新增药品';
});
</script>

<template>
  <Modal :title="getTitle">
    <FormSchema :form-data="formData" />
  </Modal>
</template>
