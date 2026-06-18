import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace OpFeeApi {
  /** 门诊费用信息 */
  export interface Fee {
    id: number;
    feeNo: string;
    registerId: number;
    patientId: number;
    patientName: string;
    deptId: number;
    deptName: string;
    doctorId: number;
    doctorName: string;
    totalAmount: number;
    discountAmount: number;
    payAmount: number;
    payStatus: number;
    payStatusName?: string;
    remark?: string;
    items?: FeeItem[];
    createTime: string;
  }

  /** 费用明细 */
  export interface FeeItem {
    id: number;
    feeId: number;
    itemCode: string;
    itemName: string;
    itemType: number;
    itemTypeName?: string;
    itemCategory?: string;
    spec?: string;
    unit?: string;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
    discountAmount: number;
    payAmount: number;
    sourceType: number;
    sourceId?: number;
    sourceNo?: string;
    remark?: string;
  }

  /** 费用保存请求 */
  export interface FeeSaveReqVO {
    id?: number;
    registerId: number;
    patientId: number;
    patientName: string;
    deptId: number;
    deptName: string;
    doctorId: number;
    doctorName: string;
    totalAmount: number;
    discountAmount?: number;
    payAmount: number;
    remark?: string;
  }

  /** 费用明细保存请求 */
  export interface FeeItemSaveReqVO {
    id?: number;
    feeId: number;
    itemCode: string;
    itemName: string;
    itemType: number;
    itemCategory?: string;
    spec?: string;
    unit?: string;
    quantity: number;
    unitPrice: number;
    totalAmount: number;
    discountAmount?: number;
    payAmount: number;
    sourceType: number;
    sourceId?: number;
    sourceNo?: string;
    remark?: string;
  }

  /** 费用分页查询参数 */
  export interface FeePageReqVO extends PageParam {
    feeNo?: string;
    patientName?: string;
    patientId?: number;
    registerId?: number;
    deptId?: number;
    payStatus?: number;
    createTime?: string[];
  }
}

/** 查询门诊费用分页列表 */
export function getFeePage(params: OpFeeApi.FeePageReqVO) {
  return requestClient.get<PageResult<OpFeeApi.Fee>>('/his/op-fee/page', {
    params,
  });
}

/** 查询门诊费用详情 */
export function getFee(id: number) {
  return requestClient.get<OpFeeApi.Fee>(`/his/op-fee/get?id=${id}`);
}

/** 查询门诊费用列表 */
export function getFeeList(params: any) {
  return requestClient.get<OpFeeApi.Fee[]>('/his/op-fee/list', { params });
}

/** 根据挂号ID查询费用 */
export function getFeeByRegister(registerId: number) {
  return requestClient.get<OpFeeApi.Fee>(
    `/his/op-fee/get-by-register?registerId=${registerId}`,
  );
}

/** 查询患者未收费费用 */
export function getUnpaidFeeByPatient(patientId: number) {
  return requestClient.get<OpFeeApi.Fee[]>(
    `/his/op-fee/unpaid-by-patient?patientId=${patientId}`,
  );
}

/** 创建门诊费用 */
export function createFee(data: OpFeeApi.FeeSaveReqVO) {
  return requestClient.post<number>('/his/op-fee/create', data);
}

/** 更新门诊费用 */
export function updateFee(data: OpFeeApi.FeeSaveReqVO) {
  return requestClient.put('/his/op-fee/update', data);
}

/** 删除门诊费用 */
export function deleteFee(id: number) {
  return requestClient.delete(`/his/op-fee/delete?id=${id}`);
}

/** 创建费用明细 */
export function createFeeItem(data: OpFeeApi.FeeItemSaveReqVO) {
  return requestClient.post<number>('/his/op-fee/item/create', data);
}

/** 更新费用明细 */
export function updateFeeItem(data: OpFeeApi.FeeItemSaveReqVO) {
  return requestClient.put('/his/op-fee/item/update', data);
}

/** 删除费用明细 */
export function deleteFeeItem(id: number) {
  return requestClient.delete(`/his/op-fee/item/delete?id=${id}`);
}

/** 查询费用明细 */
export function getFeeItem(id: number) {
  return requestClient.get<OpFeeApi.FeeItem>(`/his/op-fee/item/get?id=${id}`);
}

/** 按费用ID查询明细列表 */
export function getFeeItemsByFee(feeId: number) {
  return requestClient.get<OpFeeApi.FeeItem[]>(
    `/his/op-fee/item/list-by-fee?feeId=${feeId}`,
  );
}

/** 按来源查询明细 */
export function getFeeItemsBySource(sourceType: number, sourceId: number) {
  return requestClient.get<OpFeeApi.FeeItem[]>(
    '/his/op-fee/item/list-by-source',
    { params: { sourceType, sourceId } },
  );
}
