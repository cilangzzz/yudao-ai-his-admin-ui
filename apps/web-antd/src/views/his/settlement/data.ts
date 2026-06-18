import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { h } from 'vue';

import { Tag } from 'ant-design-vue';

/** 结算状态字典 */
const SETTLEMENT_STATUS_DICT = [
  { label: '待结算', value: 0, color: 'default' },
  { label: '已结算', value: 1, color: 'success' },
  { label: '已退费', value: 2, color: 'warning' },
  { label: '已作废', value: 3, color: 'error' },
];

/** 结算类型字典 */
const SETTLEMENT_TYPE_DICT = [
  { label: '出院结算', value: 1 },
  { label: '中途结算', value: 2 },
  { label: '转科结算', value: 3 },
];

/** 医保类型字典 */
const INSURANCE_TYPE_DICT = [
  { label: '自费', value: 0 },
  { label: '城镇职工医保', value: 1 },
  { label: '城镇居民医保', value: 2 },
  { label: '新农合', value: 3 },
];

/** 支付方式字典 */
const PAYMENT_TYPE_DICT = [
  { label: '现金', value: 1 },
  { label: '银行卡', value: 2 },
  { label: '微信', value: 3 },
  { label: '支付宝', value: 4 },
  { label: '医保卡', value: 5 },
];

/** 表格列配置 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'seq', width: 50 },
    {
      field: 'settlementNo',
      title: '结算单号',
      width: 160,
    },
    {
      field: 'invoiceNo',
      title: '发票号',
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
      title: '床位号',
      width: 80,
    },
    {
      field: 'settlementType',
      title: '结算类型',
      width: 100,
      slots: {
        default: ({ row }) => {
          const item = SETTLEMENT_TYPE_DICT.find((d) => d.value === row.settlementType);
          return item?.label || '-';
        },
      },
    },
    {
      field: 'totalAmount',
      title: '总费用',
      width: 100,
      align: 'right',
      formatter: ({ cellValue }) => (cellValue ? `¥${cellValue.toFixed(2)}` : '-'),
    },
    {
      field: 'payableAmount',
      title: '应付金额',
      width: 100,
      align: 'right',
      formatter: ({ cellValue }) => (cellValue ? `¥${cellValue.toFixed(2)}` : '-'),
    },
    {
      field: 'insuranceAmount',
      title: '医保支付',
      width: 100,
      align: 'right',
      formatter: ({ cellValue }) => (cellValue ? `¥${cellValue.toFixed(2)}` : '-'),
    },
    {
      field: 'selfAmount',
      title: '自费金额',
      width: 100,
      align: 'right',
      formatter: ({ cellValue }) => (cellValue ? `¥${cellValue.toFixed(2)}` : '-'),
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
      field: 'settlementTime',
      title: '结算时间',
      width: 170,
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
      fieldName: 'settlementNo',
      label: '结算单号',
      component: 'Input',
      componentProps: {
        placeholder: '请输入结算单号',
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
      fieldName: 'settlementStatus',
      label: '结算状态',
      component: 'Select',
      componentProps: {
        placeholder: '请选择结算状态',
        allowClear: true,
        options: SETTLEMENT_STATUS_DICT,
      },
    },
    {
      fieldName: 'settlementType',
      label: '结算类型',
      component: 'Select',
      componentProps: {
        placeholder: '请选择结算类型',
        allowClear: true,
        options: SETTLEMENT_TYPE_DICT,
      },
    },
  ];
}

/** 导出字典供其他组件使用 */
export {
  INSURANCE_TYPE_DICT,
  PAYMENT_TYPE_DICT,
  SETTLEMENT_STATUS_DICT,
  SETTLEMENT_TYPE_DICT,
};
