import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { h } from 'vue';

import { Tag } from 'ant-design-vue';

/** 入院状态字典 */
const STATUS_DICT = [
  { label: '待入院', value: 0, color: 'default' },
  { label: '在院', value: 1, color: 'green' },
  { label: '待出院', value: 2, color: 'orange' },
  { label: '已出院', value: 3, color: 'default' },
];

/** 入院方式字典 */
const ADMISSION_WAY_DICT = [
  { label: '门诊入院', value: 1 },
  { label: '急诊入院', value: 2 },
  { label: '转院入院', value: 3 },
  { label: '其他', value: 4 },
];

/** 入院病情字典 */
const ADMISSION_CONDITION_DICT = [
  { label: '一般', value: 1 },
  { label: '急', value: 2 },
  { label: '危重', value: 3 },
];

/** 表格列配置 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'seq', width: 50 },
    {
      field: 'admissionNo',
      title: '住院号',
      width: 130,
      slots: { default: 'admissionNo' },
    },
    {
      field: 'patientName',
      title: '患者姓名',
      width: 100,
    },
    {
      field: 'gender',
      title: '性别',
      width: 60,
      slots: {
        default: ({ row }) => {
          return h(Tag, { color: row.gender === 1 ? 'blue' : 'pink' }, () => row.gender === 1 ? '男' : '女');
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
      width: 120,
    },
    {
      field: 'deptName',
      title: '科室',
      width: 100,
    },
    {
      field: 'wardName',
      title: '病区',
      width: 100,
    },
    {
      field: 'bedNo',
      title: '床号',
      width: 70,
    },
    {
      field: 'doctorName',
      title: '主治医生',
      width: 100,
    },
    {
      field: 'diagnosis',
      title: '诊断',
      width: 150,
      showOverflow: true,
    },
    {
      field: 'admissionDate',
      title: '入院日期',
      width: 110,
    },
    {
      field: 'hospitalDays',
      title: '住院天数',
      width: 90,
      slots: {
        default: ({ row }) => `${row.hospitalDays || 0}天`,
      },
    },
    {
      field: 'admissionStatus',
      title: '状态',
      width: 90,
      slots: { default: 'admissionStatus' },
    },
    {
      field: 'depositAmount',
      title: '预交金',
      width: 100,
      slots: {
        default: ({ row }) => `¥${row.depositAmount}`,
      },
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
export function useGridFormSchema(): VxeTableGridOptions['formConfig']['items'] {
  return [
    {
      field: 'admissionNo',
      title: '住院号',
      span: 4,
      itemRender: {
        name: 'AInput',
        props: { placeholder: '请输入住院号' },
      },
    },
    {
      field: 'patientName',
      title: '患者姓名',
      span: 4,
      itemRender: {
        name: 'AInput',
        props: { placeholder: '请输入患者姓名' },
      },
    },
    {
      field: 'idCardNo',
      title: '身份证号',
      span: 4,
      itemRender: {
        name: 'AInput',
        props: { placeholder: '请输入身份证号' },
      },
    },
    {
      field: 'admissionStatus',
      title: '状态',
      span: 4,
      itemRender: {
        name: 'ASelect',
        props: {
          placeholder: '请选择状态',
          options: STATUS_DICT.map((d) => ({ label: d.label, value: d.value })),
          allowClear: true,
        },
      },
    },
  ];
}