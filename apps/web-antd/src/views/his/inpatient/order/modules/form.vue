<script lang="ts" setup>
import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { auditOrder, executeOrder, stopOrder, cancelOrder } from '#/api/his/order';

import FormSchema from './form-schema.vue';

type ModalMode = 'detail' | 'audit' | 'execute' | 'stop' | 'cancel';

interface ModalData {
  mode: ModalMode;
  id?: number;
  orderNo?: string;
  orderContent?: string;
  doctorId?: number;
  doctorName?: string;
  admissionId?: number;
}

const emit = defineEmits<{
  success: [];
}>();

const modalMode = ref<ModalMode>('detail');
const orderId = ref<number>(0);

/** 审核表单数据 */
const auditFormData = ref({
  auditResult: 1,
  auditRemark: '',
});

/** 执行表单数据 */
const executeFormData = ref({
  executeRemark: '',
});

/** 停止表单数据 */
const stopFormData = ref({
  stopReason: '',
});

/** 作废表单数据 */
const cancelFormData = ref({
  cancelReason: '',
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    try {
      switch (modalMode.value) {
        case 'audit': {
          await auditOrder({
            orderId: orderId.value,
            auditDoctorId: 1, // TODO: 从当前用户获取
            auditDoctorName: '当前医生', // TODO: 从当前用户获取
            auditResult: auditFormData.value.auditResult,
            auditRemark: auditFormData.value.auditRemark,
          });
          message.success('审核成功');
          break;
        }
        case 'execute': {
          await executeOrder({
            orderId: orderId.value,
            nurseId: 1, // TODO: 从当前用户获取
            nurseName: '当前护士', // TODO: 从当前用户获取
            executeRemark: executeFormData.value.executeRemark,
          });
          message.success('执行成功');
          break;
        }
        case 'stop': {
          await stopOrder({
            orderId: orderId.value,
            stopDoctorId: 1, // TODO: 从当前用户获取
            stopDoctorName: '当前医生', // TODO: 从当前用户获取
            stopReason: stopFormData.value.stopReason,
          });
          message.success('停止成功');
          break;
        }
        case 'cancel': {
          await cancelOrder({
            orderId: orderId.value,
            cancelDoctorId: 1, // TODO: 从当前用户获取
            cancelReason: cancelFormData.value.cancelReason,
          });
          message.success('作废成功');
          break;
        }
        default:
          break;
      }
      emit('success');
      modalApi.close();
    } catch {
      // error
    }
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      const data = modalApi.getData<ModalData>();
      if (data) {
        modalMode.value = data.mode;
        orderId.value = data.id || 0;
      }
      // 重置表单
      auditFormData.value = { auditResult: 1, auditRemark: '' };
      executeFormData.value = { executeRemark: '' };
      stopFormData.value = { stopReason: '' };
      cancelFormData.value = { cancelReason: '' };
    }
  },
});

const getTitle = computed(() => {
  switch (modalMode.value) {
    case 'detail': {
      return '医嘱详情';
    }
    case 'audit': {
      return '审核医嘱';
    }
    case 'execute': {
      return '执行医嘱';
    }
    case 'stop': {
      return '停止医嘱';
    }
    case 'cancel': {
      return '作废医嘱';
    }
    default: {
      return '医嘱操作';
    }
  }
});

const showConfirm = computed(() => {
  return modalMode.value !== 'detail';
});
</script>

<template>
  <Modal :title="getTitle" :show-confirm-button="showConfirm">
    <FormSchema
      :mode="modalMode"
      :order-id="orderId"
      :audit-form-data="auditFormData"
      :execute-form-data="executeFormData"
      :stop-form-data="stopFormData"
      :cancel-form-data="cancelFormData"
    />
  </Modal>
</template>
