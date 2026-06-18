import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { h } from 'vue';

import { Tag } from 'ant-design-vue';

import { useAccess } from '@vben/access';

/** 支付状态字典 */
const PAY_STATUS_DICT = [
  { label: '待支付', value: 0, color: 'orange' },
  { label: '已支付', value: 1, color: 'green' },
  { label: '已退款', value: 2, color: 'red' },
];

/** 表格列配置 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  const { hasAccessByCodes } = useAccess();

  return [
    { type: 'seq', width: 50 },
    {
      field: 'feeNo',
      title: '费用编号',
      width: 140,
    },
    {
      field: 'patientName',
      title: '患者姓名',
      width: 100,
    },
    {
      field: 'deptName',
      title: '科室',
      width: 120,
    },
    {
      field: 'doctorName',
      title: '医生',
      width: 100,
    },
    {
      field: 'totalAmount',
      title: '总金额',
      width: 100,
      align: 'right',
      formatter: ({ cellValue }) => `¥${(cellValue / 100).toFixed(2)}`,
    },
    {
      field: 'discountAmount',
      title: '优惠金额',
      width: 100,
      align: 'right',
      formatter: ({ cellValue }) => `¥${(cellValue / 100).toFixed(2)}`,
    },
    {
      field: 'payAmount',
      title: '实付金额',
      width: 100,
      align: 'right',
      formatter: ({ cellValue }) => `¥${(cellValue / 100).toFixed(2)}`,
    },
    {
      field: 'payStatus',
      title: '支付状态',
      width: 100,
      slots: {
        default: ({ row }) => {
          const item = PAY_STATUS_DICT.find((d) => d.value === row.payStatus);
          return h(Tag, { color: item?.color || 'default' }, () => item?.label || '-');
        },
      },
    },
    {
      field: 'remark',
      title: '备注',
      minWidth: 150,
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
      fieldName: 'feeNo',
      label: '费用编号',
      component: 'Input',
      componentProps: {
        placeholder: '请输入费用编号',
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
      fieldName: 'payStatus',
      label: '支付状态',
      component: 'Select',
      componentProps: {
        placeholder: '请选择支付状态',
        allowClear: true,
        options: PAY_STATUS_DICT,
      },
    },
    {
      fieldName: 'createTime',
      label: '创建时间',
      component: 'RangePicker',
      componentProps: {
        placeholder: ['开始时间', '结束时间'],
        allowClear: true,
      },
    },
  ];
}
