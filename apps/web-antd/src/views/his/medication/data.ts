import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { h } from 'vue';

import { Tag } from 'ant-design-vue';

import type { HisMedicationApi } from '#/api/his/medication';

/** 给药状态字典 */
const STATUS_DICT: Record<number, { label: string; color: string }> = {
  0: { label: '待执行', color: 'orange' },
  1: { label: '已执行', color: 'green' },
  2: { label: '未执行', color: 'red' },
};

/** 给药途径字典 */
const ROUTE_DICT: Record<string, string> = {
  PO: '口服',
  IV: '静脉注射',
  IM: '肌肉注射',
  SC: '皮下注射',
  ID: '皮内注射',
  IH: '吸入',
  SL: '舌下含服',
  PR: '直肠给药',
  TOP: '外用',
};

/** 表格列配置 */
export function useGridColumns(): VxeTableGridOptions<HisMedicationApi.Medication>['columns'] {
  return [
    { type: 'seq', width: 50 },
    {
      field: 'adminNo',
      title: '给药编号',
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
      field: 'orderNo',
      title: '医嘱编号',
      width: 140,
    },
    {
      field: 'drugName',
      title: '药品名称',
      minWidth: 150,
      showOverflow: true,
    },
    {
      field: 'spec',
      title: '规格',
      width: 100,
    },
    {
      field: 'dosage',
      title: '剂量',
      width: 80,
    },
    {
      field: 'frequency',
      title: '频次',
      width: 80,
    },
    {
      field: 'route',
      title: '给药途径',
      width: 100,
      slots: {
        default: ({ row }) => {
          const routeName = ROUTE_DICT[row.route] || row.route || '-';
          return routeName;
        },
      },
    },
    {
      field: 'scheduledTime',
      title: '计划执行时间',
      width: 170,
    },
    {
      field: 'status',
      title: '状态',
      width: 90,
      slots: {
        default: ({ row }) => {
          const statusInfo = STATUS_DICT[row.status] || { label: '-', color: 'default' };
          return h(Tag, { color: statusInfo.color }, () => statusInfo.label);
        },
      },
    },
    {
      field: 'nurseName',
      title: '执行护士',
      width: 100,
    },
    {
      field: 'executeTime',
      title: '执行时间',
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
      fieldName: 'adminNo',
      label: '给药编号',
      component: 'Input',
      componentProps: {
        placeholder: '请输入给药编号',
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
      fieldName: 'status',
      label: '状态',
      component: 'Select',
      componentProps: {
        placeholder: '请选择状态',
        allowClear: true,
        options: [
          { label: '待执行', value: 0 },
          { label: '已执行', value: 1 },
          { label: '未执行', value: 2 },
        ],
      },
    },
    {
      fieldName: 'scheduledTime',
      label: '计划执行时间',
      component: 'RangePicker',
      componentProps: {
        placeholder: ['开始时间', '结束时间'],
        allowClear: true,
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
      },
    },
  ];
}