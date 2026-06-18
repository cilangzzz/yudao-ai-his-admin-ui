import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { h } from 'vue';

import { Tag } from 'ant-design-vue';

/** 出院类型字典 */
const DISCHARGE_TYPE_DICT = [
  { label: '正常出院', value: 1 },
  { label: '转院', value: 2 },
  { label: '自动出院', value: 3 },
  { label: '死亡', value: 4 },
];

/** 出院去向字典 */
const DISCHARGE_DESTINATION_DICT = [
  { label: '回家', value: 1 },
  { label: '转院', value: 2 },
  { label: '社区卫生中心', value: 3 },
  { label: '养老院', value: 4 },
];

/** 出院情况字典 */
const DISCHARGE_CONDITION_DICT = [
  { label: '治愈', value: 1 },
  { label: '好转', value: 2 },
  { label: '未愈', value: 3 },
  { label: '死亡', value: 4 },
];

/** 结算状态字典 */
const SETTLEMENT_STATUS_DICT = [
  { label: '未结算', value: 0, color: 'default' },
  { label: '已结算', value: 1, color: 'success' },
  { label: '已退费', value: 2, color: 'error' },
];

/** 表格列配置 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'seq', width: 50 },
    {
      field: 'dischargeNo',
      title: '出院编号',
      width: 140,
    },
    {
      field: 'patientName',
      title: '患者姓名',
      width: 100,
    },
    {
      field: 'inpatientNo',
      title: '住院号',
      width: 120,
    },
    {
      field: 'deptName',
      title: '科室',
      width: 120,
    },
    {
      field: 'wardName',
      title: '病区',
      width: 100,
    },
    {
      field: 'bedNo',
      title: '床号',
      width: 80,
    },
    {
      field: 'admissionDate',
      title: '入院日期',
      width: 110,
    },
    {
      field: 'dischargeDate',
      title: '出院日期',
      width: 110,
    },
    {
      field: 'hospitalDays',
      title: '住院天数',
      width: 90,
    },
    {
      field: 'admissionDiagnosis',
      title: '入院诊断',
      width: 150,
      showOverflow: true,
    },
    {
      field: 'dischargeDiagnosis',
      title: '出院诊断',
      width: 150,
      showOverflow: true,
    },
    {
      field: 'dischargeType',
      title: '出院类型',
      width: 100,
      slots: {
        default: ({ row }) => {
          const item = DISCHARGE_TYPE_DICT.find((d) => d.value === row.dischargeType);
          const color =
            row.dischargeType === 1
              ? 'green'
              : row.dischargeType === 2
                ? 'blue'
                : row.dischargeType === 3
                  ? 'orange'
                  : 'red';
          return h(Tag, { color }, () => item?.label || '-');
        },
      },
    },
    {
      field: 'dischargeCondition',
      title: '出院情况',
      width: 100,
      slots: {
        default: ({ row }) => {
          const item = DISCHARGE_CONDITION_DICT.find((d) => d.value === row.dischargeCondition);
          const color =
            row.dischargeCondition === 1
              ? 'green'
              : row.dischargeCondition === 2
                ? 'blue'
                : row.dischargeCondition === 3
                  ? 'orange'
                  : 'red';
          return h(Tag, { color }, () => item?.label || '-');
        },
      },
    },
    {
      field: 'settlementStatus',
      title: '结算状态',
      width: 100,
      slots: {
        default: ({ row }) => {
          const item = SETTLEMENT_STATUS_DICT.find((d) => d.value === row.settlementStatus);
          return h(Tag, { color: item?.color || 'default' }, () => item?.label || '-');
        },
      },
    },
    {
      field: 'dischargeDoctorName',
      title: '出院医生',
      width: 100,
    },
    {
      field: 'createTime',
      title: '创建时间',
      width: 170,
    },
    {
      field: 'action',
      title: '操作',
      width: 180,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}

/** 表格搜索表单配置 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'dischargeNo',
      label: '出院编号',
      component: 'Input',
      componentProps: {
        placeholder: '请输入出院编号',
        allowClear: true,
      },
    },
    {
      fieldName: 'patientName',
      label: '患者姓名',
      component: 'Input',
      componentProps: {
        placeholder: '请输入患者姓名',
        allowClear: true,
      },
    },
    {
      fieldName: 'inpatientNo',
      label: '住院号',
      component: 'Input',
      componentProps: {
        placeholder: '请输入住院号',
        allowClear: true,
      },
    },
    {
      fieldName: 'dischargeType',
      label: '出院类型',
      component: 'Select',
      componentProps: {
        placeholder: '请选择出院类型',
        allowClear: true,
        options: DISCHARGE_TYPE_DICT,
      },
    },
    {
      fieldName: 'dischargeDateStart',
      label: '出院开始日期',
      component: 'DatePicker',
      componentProps: {
        placeholder: '请选择开始日期',
        allowClear: true,
        format: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD',
      },
    },
    {
      fieldName: 'dischargeDateEnd',
      label: '出院结束日期',
      component: 'DatePicker',
      componentProps: {
        placeholder: '请选择结束日期',
        allowClear: true,
        format: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD',
      },
    },
  ];
}

export {
  DISCHARGE_TYPE_DICT,
  DISCHARGE_DESTINATION_DICT,
  DISCHARGE_CONDITION_DICT,
  SETTLEMENT_STATUS_DICT,
};
