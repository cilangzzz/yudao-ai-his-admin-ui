import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { h } from 'vue';

import { Tag } from 'ant-design-vue';

import type { OpPrescriptionApi } from '#/api/his/prescription';

/** 处方类型字典 */
const PRESCRIPTION_TYPE_DICT = [
  { label: '西药', value: 1 },
  { label: '中药', value: 2 },
  { label: '中成药', value: 3 },
];

/** 处方状态字典 */
const PRESCRIPTION_STATUS_DICT = [
  { label: '待审核', value: 0, color: 'orange' },
  { label: '已审核', value: 1, color: 'green' },
  { label: '已调配', value: 2, color: 'blue' },
  { label: '已发药', value: 3, color: 'cyan' },
  { label: '已退药', value: 4, color: 'red' },
  { label: '已作废', value: 5, color: 'default' },
];

/** 获取处方类型标签 */
function getPrescriptionTypeTag(type: number) {
  const item = PRESCRIPTION_TYPE_DICT.find((d) => d.value === type);
  return item?.label || '-';
}

/** 获取处方状态标签 */
function getPrescriptionStatusTag(status: number) {
  const item = PRESCRIPTION_STATUS_DICT.find((d) => d.value === status);
  return h(Tag, { color: item?.color || 'default' }, () => item?.label || '-');
}

/** 表格列配置 */
export function useGridColumns(): VxeTableGridOptions<OpPrescriptionApi.Prescription>['columns'] {
  return [
    { type: 'seq', width: 50 },
    {
      field: 'prescriptionNo',
      title: '处方编号',
      width: 160,
    },
    {
      field: 'patientName',
      title: '患者姓名',
      width: 100,
    },
    {
      field: 'idCardNo',
      title: '身份证号',
      width: 180,
    },
    {
      field: 'gender',
      title: '性别',
      width: 60,
      slots: {
        default: ({ row }) => {
          return row.gender === 1 ? '男' : row.gender === 2 ? '女' : '-';
        },
      },
    },
    {
      field: 'age',
      title: '年龄',
      width: 60,
    },
    {
      field: 'phone',
      title: '联系电话',
      width: 130,
    },
    {
      field: 'deptName',
      title: '科室',
      width: 120,
    },
    {
      field: 'doctorName',
      title: '开方医生',
      width: 100,
    },
    {
      field: 'prescriptionType',
      title: '处方类型',
      width: 90,
      slots: {
        default: ({ row }) => getPrescriptionTypeTag(row.prescriptionType),
      },
    },
    {
      field: 'diagnosis',
      title: '诊断',
      width: 150,
      showOverflow: true,
    },
    {
      field: 'status',
      title: '状态',
      width: 90,
      slots: {
        default: ({ row }) => getPrescriptionStatusTag(row.status),
      },
    },
    {
      field: 'totalAmount',
      title: '总金额',
      width: 100,
      slots: {
        default: ({ row }) => `¥${row.totalAmount?.toFixed(2) || '0.00'}`,
      },
    },
    {
      field: 'createTime',
      title: '创建时间',
      width: 170,
    },
    {
      field: 'action',
      title: '操作',
      width: 200,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}

/** 表格搜索表单配置 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'prescriptionNo',
      label: '处方编号',
      component: 'Input',
      componentProps: {
        placeholder: '请输入处方编号',
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
      fieldName: 'idCardNo',
      label: '身份证号',
      component: 'Input',
      componentProps: {
        placeholder: '请输入身份证号',
        allowClear: true,
      },
    },
    {
      fieldName: 'prescriptionType',
      label: '处方类型',
      component: 'Select',
      componentProps: {
        placeholder: '请选择处方类型',
        allowClear: true,
        options: PRESCRIPTION_TYPE_DICT,
      },
    },
    {
      fieldName: 'status',
      label: '状态',
      component: 'Select',
      componentProps: {
        placeholder: '请选择状态',
        allowClear: true,
        options: PRESCRIPTION_STATUS_DICT.map((item) => ({
          label: item.label,
          value: item.value,
        })),
      },
    },
    {
      fieldName: 'createTime',
      label: '创建时间',
      component: 'RangePicker',
      componentProps: {
        placeholder: ['开始时间', '结束时间'],
        allowClear: true,
        format: 'YYYY-MM-DD',
        valueFormat: 'YYYY-MM-DD',
      },
    },
  ];
}

export { PRESCRIPTION_TYPE_DICT, PRESCRIPTION_STATUS_DICT };