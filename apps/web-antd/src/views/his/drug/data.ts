import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { HisDrugApi } from '#/api/his/drug';

import { h } from 'vue';

import { Tag } from 'ant-design-vue';

/** 药品类型字典 */
const DRUG_TYPE_DICT: HisDrugApi.Drug[] = [
  { label: '西药', value: 1 },
  { label: '中成药', value: 2 },
  { label: '中草药', value: 3 },
  { label: '生物制品', value: 4 },
];

/** 医保类型字典 */
const INSURANCE_TYPE_DICT = [
  { label: '甲类', value: 1 },
  { label: '乙类', value: 2 },
  { label: '自费', value: 3 },
];

/** 特殊药品字典 */
const IS_SPECIAL_DICT = [
  { label: '普通', value: 0 },
  { label: '麻醉药品', value: 1 },
  { label: '一类精神', value: 2 },
  { label: '二类精神', value: 3 },
  { label: '毒性药品', value: 4 },
];

/** 状态字典 */
const STATUS_DICT = [
  { label: '停用', value: 0 },
  { label: '正常', value: 1 },
];

/** 表格列配置 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'seq', width: 50 },
    {
      field: 'drugCode',
      title: '药品编码',
      width: 120,
    },
    {
      field: 'drugName',
      title: '药品名称',
      width: 150,
      showOverflow: true,
    },
    {
      field: 'drugAlias',
      title: '药品别名',
      width: 120,
      showOverflow: true,
    },
    {
      field: 'drugTypeName',
      title: '药品类型',
      width: 100,
      slots: {
        default: ({ row }) => {
          const item = DRUG_TYPE_DICT.find((d) => d.value === row.drugType);
          const colorMap: Record<number, string> = {
            1: 'blue',
            2: 'green',
            3: 'orange',
            4: 'purple',
          };
          return h(Tag, { color: colorMap[row.drugType] || 'default' }, () => item?.label || '-');
        },
      },
    },
    {
      field: 'spec',
      title: '规格',
      width: 100,
    },
    {
      field: 'unit',
      title: '单位',
      width: 80,
    },
    {
      field: 'retailPrice',
      title: '零售价',
      width: 100,
      slots: {
        default: ({ row }) => {
          return `¥${row.retailPrice?.toFixed(2) || '0.00'}`;
        },
      },
    },
    {
      field: 'manufacturer',
      title: '生产厂家',
      width: 150,
      showOverflow: true,
    },
    {
      field: 'insuranceTypeName',
      title: '医保类型',
      width: 80,
      slots: {
        default: ({ row }) => {
          const item = INSURANCE_TYPE_DICT.find((d) => d.value === row.insuranceType);
          const colorMap: Record<number, string> = {
            1: 'green',
            2: 'blue',
            3: 'default',
          };
          return h(Tag, { color: colorMap[row.insuranceType] || 'default' }, () => item?.label || '-');
        },
      },
    },
    {
      field: 'isSpecialName',
      title: '特殊药品',
      width: 100,
      slots: {
        default: ({ row }) => {
          if (row.isSpecial === 0) {
            return h(Tag, { color: 'default' }, () => '普通');
          }
          const colorMap: Record<number, string> = {
            1: 'red',
            2: 'orange',
            3: 'gold',
            4: 'magenta',
          };
          return h(Tag, { color: colorMap[row.isSpecial] || 'default' }, () => row.isSpecialName || '-');
        },
      },
    },
    {
      field: 'status',
      title: '状态',
      width: 80,
      slots: {
        default: ({ row }) => {
          const item = STATUS_DICT.find((d) => d.value === row.status);
          return h(Tag, { color: row.status === 1 ? 'success' : 'error' }, () => item?.label || '-');
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
      fieldName: 'drugCode',
      label: '药品编码',
      component: 'Input',
      componentProps: {
        placeholder: '请输入药品编码',
        allowClear: true,
      },
    },
    {
      fieldName: 'drugName',
      label: '药品名称',
      component: 'Input',
      componentProps: {
        placeholder: '请输入药品名称',
        allowClear: true,
      },
    },
    {
      fieldName: 'drugType',
      label: '药品类型',
      component: 'Select',
      componentProps: {
        placeholder: '请选择药品类型',
        allowClear: true,
        options: DRUG_TYPE_DICT,
      },
    },
    {
      fieldName: 'manufacturer',
      label: '生产厂家',
      component: 'Input',
      componentProps: {
        placeholder: '请输入生产厂家',
        allowClear: true,
      },
    },
    {
      fieldName: 'status',
      label: '状态',
      component: 'Select',
      componentProps: {
        placeholder: '请选择状态',
        allowClear: true,
        options: STATUS_DICT,
      },
    },
    {
      fieldName: 'isSpecial',
      label: '特殊药品',
      component: 'Select',
      componentProps: {
        placeholder: '请选择',
        allowClear: true,
        options: IS_SPECIAL_DICT,
      },
    },
  ];
}

/** 药品类型选项 */
export function useDrugTypeOptions() {
  return DRUG_TYPE_DICT;
}

/** 医保类型选项 */
export function useInsuranceTypeOptions() {
  return INSURANCE_TYPE_DICT;
}

/** 特殊药品选项 */
export function useIsSpecialOptions() {
  return IS_SPECIAL_DICT;
}

/** 状态选项 */
export function useStatusOptions() {
  return STATUS_DICT;
}