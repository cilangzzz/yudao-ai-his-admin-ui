import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { h } from 'vue';

import { Tag } from 'ant-design-vue';

/** 挂号状态字典 */
const STATUS_DICT = [
  { label: '已挂号', value: 1, color: 'green' },
  { label: '就诊中', value: 2, color: 'blue' },
  { label: '已就诊', value: 3, color: 'default' },
  { label: '已退号', value: 4, color: 'red' },
];

/** 挂号类型字典 */
const REGISTER_TYPE_DICT = [
  { label: '普通', value: 1 },
  { label: '专家', value: 2 },
  { label: '急诊', value: 3 },
];

/** 表格列配置 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'seq', width: 50 },
    {
      field: 'registerNo',
      title: '挂号单号',
      width: 150,
      slots: { default: 'registerNo' },
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
      field: 'doctorName',
      title: '医生',
      width: 100,
    },
    {
      field: 'registerType',
      title: '挂号类型',
      width: 90,
      slots: {
        default: ({ row }) => {
          const item = REGISTER_TYPE_DICT.find((d) => d.value === row.registerType);
          return item?.label || '-';
        },
      },
    },
    {
      field: 'visitDate',
      title: '就诊日期',
      width: 110,
    },
    {
      field: 'timeSlot',
      title: '时段',
      width: 70,
      slots: {
        default: ({ row }) => row.timeSlot === 'AM' ? '上午' : '下午',
      },
    },
    {
      field: 'queueNo',
      title: '排队号',
      width: 80,
    },
    {
      field: 'status',
      title: '状态',
      width: 90,
      slots: { default: 'status' },
    },
    {
      field: 'fee',
      title: '费用',
      width: 80,
      slots: {
        default: ({ row }) => `¥${row.fee}`,
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
      fieldName: 'registerNo',
      label: '挂号单号',
      component: 'Input',
      componentProps: {
        placeholder: '请输入挂号单号',
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
      fieldName: 'status',
      label: '状态',
      component: 'Select',
      componentProps: {
        placeholder: '请选择状态',
        options: STATUS_DICT.map((d) => ({ label: d.label, value: d.value })),
        allowClear: true,
      },
    },
  ];
}