import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { h } from 'vue';

import { Tag } from 'ant-design-vue';

/** 医嘱类型字典 */
const ORDER_TYPE_DICT = [
  { label: '长期医嘱', value: 1 },
  { label: '临时医嘱', value: 2 },
];

/** 医嘱分类字典 */
const ORDER_CATEGORY_DICT = [
  { label: '药品', value: 1 },
  { label: '检查', value: 2 },
  { label: '检验', value: 3 },
  { label: '治疗', value: 4 },
  { label: '护理', value: 5 },
  { label: '饮食', value: 6 },
  { label: '其他', value: 7 },
];

/** 医嘱状态字典 */
const ORDER_STATUS_DICT = [
  { label: '待审核', value: 0, color: 'orange' },
  { label: '已审核', value: 1, color: 'blue' },
  { label: '执行中', value: 2, color: 'green' },
  { label: '已停止', value: 3, color: 'default' },
  { label: '已作废', value: 4, color: 'red' },
];

/** 获取医嘱状态颜色 */
export function getOrderStatusColor(status: number): string {
  const item = ORDER_STATUS_DICT.find((d) => d.value === status);
  return item?.color || 'default';
}

/** 获取医嘱状态标签 */
export function getOrderStatusLabel(status: number): string {
  const item = ORDER_STATUS_DICT.find((d) => d.value === status);
  return item?.label || '-';
}

/** 表格列配置 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'seq', width: 50 },
    {
      field: 'orderNo',
      title: '医嘱编号',
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
      width: 130,
    },
    {
      field: 'orderType',
      title: '医嘱类型',
      width: 100,
      slots: {
        default: ({ row }) => {
          const item = ORDER_TYPE_DICT.find((d) => d.value === row.orderType);
          return h(Tag, { color: row.orderType === 1 ? 'blue' : 'green' }, () => item?.label || '-');
        },
      },
    },
    {
      field: 'orderCategory',
      title: '医嘱分类',
      width: 100,
      slots: {
        default: ({ row }) => {
          const item = ORDER_CATEGORY_DICT.find((d) => d.value === row.orderCategory);
          return item?.label || '-';
        },
      },
    },
    {
      field: 'orderContent',
      title: '医嘱内容',
      minWidth: 200,
      showOverflow: true,
    },
    {
      field: 'doctorName',
      title: '开嘱医生',
      width: 100,
    },
    {
      field: 'startDate',
      title: '开始时间',
      width: 170,
    },
    {
      field: 'status',
      title: '状态',
      width: 100,
      slots: {
        default: ({ row }) => {
          return h(Tag, { color: getOrderStatusColor(row.status) }, () => getOrderStatusLabel(row.status));
        },
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
      fieldName: 'orderNo',
      label: '医嘱编号',
      component: 'Input',
      componentProps: {
        placeholder: '请输入医嘱编号',
        allowClear: true,
      },
    },
    {
      fieldName: 'patientId',
      label: '患者ID',
      component: 'Input',
      componentProps: {
        placeholder: '请输入患者ID',
        allowClear: true,
      },
    },
    {
      fieldName: 'orderType',
      label: '医嘱类型',
      component: 'Select',
      componentProps: {
        placeholder: '请选择医嘱类型',
        allowClear: true,
        options: ORDER_TYPE_DICT,
      },
    },
    {
      fieldName: 'orderCategory',
      label: '医嘱分类',
      component: 'Select',
      componentProps: {
        placeholder: '请选择医嘱分类',
        allowClear: true,
        options: ORDER_CATEGORY_DICT,
      },
    },
    {
      fieldName: 'status',
      label: '状态',
      component: 'Select',
      componentProps: {
        placeholder: '请选择状态',
        allowClear: true,
        options: ORDER_STATUS_DICT.map((item) => ({
          label: item.label,
          value: item.value,
        })),
      },
    },
  ];
}

/** 医嘱类型选项 */
export const orderTypeOptions = ORDER_TYPE_DICT;

/** 医嘱分类选项 */
export const orderCategoryOptions = ORDER_CATEGORY_DICT;

/** 医嘱状态选项 */
export const orderStatusOptions = ORDER_STATUS_DICT;
