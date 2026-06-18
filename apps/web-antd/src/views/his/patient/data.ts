import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { h } from 'vue';

import { Tag } from 'ant-design-vue';

import { ACTION_ICON, renderSetDictTag } from '#/adapter/vxe-table';

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
export function useGridFormSchema(): VxeTableGridOptions['formConfig']['items'] {
  return [
    {
      field: 'patientNo',
      title: '患者编号',
      span: 4,
      itemRender: {
        name: 'AInput',
        props: { placeholder: '请输入患者编号' },
      },
    },
    {
      field: 'name',
      title: '姓名',
      span: 4,
      itemRender: {
        name: 'AInput',
        props: { placeholder: '请输入姓名' },
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
      field: 'phone',
      title: '联系电话',
      span: 4,
      itemRender: {
        name: 'AInput',
        props: { placeholder: '请输入联系电话' },
      },
    },
  ];
}
