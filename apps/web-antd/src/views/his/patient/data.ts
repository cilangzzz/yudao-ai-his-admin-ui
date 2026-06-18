import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { h } from 'vue';

import { Tag } from 'ant-design-vue';

/** 性别字典 */
const GENDER_DICT = [
  { label: '男', value: 1 },
  { label: '女', value: 2 },
];

/** 表格列配置 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'seq', width: 50 },
    {
      field: 'patientNo',
      title: '患者编号',
      width: 140,
    },
    {
      field: 'name',
      title: '姓名',
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
      width: 80,
      slots: {
        default: ({ row }) => {
          const item = GENDER_DICT.find((d) => d.value === row.gender);
          return h(Tag, { color: row.gender === 1 ? 'blue' : 'pink' }, () => item?.label || '-');
        },
      },
    },
    {
      field: 'age',
      title: '年龄',
      width: 80,
    },
    {
      field: 'phone',
      title: '联系电话',
      width: 130,
    },
    {
      field: 'bloodType',
      title: '血型',
      width: 80,
    },
    {
      field: 'address',
      title: '地址',
      minWidth: 200,
      showOverflow: true,
    },
    {
      field: 'createTime',
      title: '创建时间',
      width: 170,
    },
    {
      field: 'action',
      title: '操作',
      width: 150,
      fixed: 'right',
      slots: { default: 'actions' },
    },
  ];
}

/** 表格搜索表单配置 */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'patientNo',
      label: '患者编号',
      component: 'Input',
      componentProps: {
        placeholder: '请输入患者编号',
        allowClear: true,
      },
    },
    {
      fieldName: 'name',
      label: '姓名',
      component: 'Input',
      componentProps: {
        placeholder: '请输入姓名',
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
      fieldName: 'phone',
      label: '联系电话',
      component: 'Input',
      componentProps: {
        placeholder: '请输入联系电话',
        allowClear: true,
      },
    },
  ];
}
