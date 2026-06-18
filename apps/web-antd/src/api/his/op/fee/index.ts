import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace OpFeeApi {
  /** 门诊费用信息 */
  export interface Fee {
    id: number; // 费用ID
    feeNo: string; // 费用单号
    registerId: number; // 挂号ID
    patientId: number; // 患者ID
    patientName: string; // 患者姓名
    deptId: number; // 科室ID
    deptName: string; // 科室名称
    doctorId: number; // 医生ID
    doctorName: string; // 医生姓名
    totalAmount: number; // 费用总额
    discountAmount: number; // 优惠金额
    payAmount: number; // 实付金额
    payStatus: number; // 收费状态：0-未收费，1-已收费，2-已退费
    payStatusName?: string; // 收费状态名称
    payTime?: string; // 收费时间
    payType?: number; // 支付方式
    payTypeName?: string; // 支付方式名称
    items?: FeeItem[]; // 费用明细列表
    remark?: string; // 备注
    createTime: string; // 创建时间
    updateTime?: string; // 更新时间
  }

  /** 费用明细信息 */
  export interface FeeItem {
    id: number; // 明细ID
    feeId: number; // 费用ID
    itemCode: string; // 项目编码
    itemName: string; // 项目名称
    itemType: number; // 项目类型：1-药品，2-检查，3-检验，4-诊疗，5-护理，6-手术，7-其他
    itemTypeName?: string; // 项目类型名称
    itemCategory?: string; // 项目分类
    spec?: string; // 规格
    unit?: string; // 单位
    quantity: number; // 数量
    unitPrice: number; // 单价
    totalAmount: number; // 总金额
    discountAmount: number; // 优惠金额
    payAmount: number; // 实付金额
    sourceType: number; // 来源类型：1-检验申请，2-检查申请，3-处方药品，4-治疗项目，5-其他
    sourceId?: number; // 来源ID
    sourceNo?: string; // 来源单号
    payStatus?: number; // 收费状态
    createTime?: string; // 创建时间
  }

  /** 费用保存请求 */
  export interface FeeSaveReqVO {
    id?: number; // 费用ID（更新时必填）
    registerId: number; // 挂号ID
    patientId: number; // 患者ID
    patientName: string; // 患者姓名
    deptId: number; // 科室ID
    deptName?: string; // 科室名称
    doctorId?: number; // 医生ID
    doctorName?: string; // 医生姓名
    totalAmount: number; // 费用总额
    discountAmount?: number; // 优惠金额
    payAmount: number; // 实付金额
    remark?: string; // 备注
  }

  /** 费用分页查询参数 */
  export interface FeePageReqVO extends PageParam {
    feeNo?: string; // 费用单号
    registerId?: number; // 挂号ID
    patientId?: number; // 患者ID
    patientName?: string; // 患者姓名
    deptId?: number; // 科室ID
    doctorId?: number; // 医生ID
    payStatus?: number; // 收费状态
    createTime?: string[]; // 创建时间范围
  }

  /** 费用明细保存请求 */
  export interface FeeItemSaveReqVO {
    id?: number; // 明细ID（更新时必填）
    feeId: number; // 费用ID
    itemCode: string; // 项目编码
    itemName: string; // 项目名称
    itemType: number; // 项目类型
    itemCategory?: string; // 项目分类
    spec?: string; // 规格
    unit?: string; // 单位
    quantity: number; // 数量
    unitPrice: number; // 单价
    totalAmount: number; // 总金额
    discountAmount?: number; // 优惠金额
    payAmount: number; // 实付金额
    sourceType: number; // 来源类型
    sourceId?: number; // 来源ID
    sourceNo?: string; // 来源单号
  }

  /** 费用明细分页查询参数 */
  export interface FeeItemPageReqVO extends PageParam {
    feeId?: number; // 费用ID
    itemType?: number; // 项目类型
    sourceType?: number; // 来源类型
    sourceId?: number; // 来源ID
  }
}

// ==================== 费用单接口 ====================

/** 查询费用分页列表 */
export function getOpFeePage(params: OpFeeApi.FeePageReqVO) {
  return requestClient.get<PageResult<OpFeeApi.Fee>>('/his/op-fee/page', {
    params,
  });
}

/** 查询费用列表 */
export function getOpFeeList(params: Partial<OpFeeApi.FeePageReqVO>) {
  return requestClient.get<OpFeeApi.Fee[]>('/his/op-fee/list', { params });
}

/** 查询费用详情 */
export function getOpFee(id: number) {
  return requestClient.get<OpFeeApi.Fee>(`/his/op-fee/get?id=${id}`);
}

/** 根据挂号ID查询费用 */
export function getOpFeeByRegister(registerId: number) {
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

/** 新增费用 */
export function createOpFee(data: OpFeeApi.FeeSaveReqVO) {
  return requestClient.post<number>('/his/op-fee/create', data);
}

/** 修改费用 */
export function updateOpFee(data: OpFeeApi.FeeSaveReqVO) {
  return requestClient.put('/his/op-fee/update', data);
}

/** 删除费用 */
export function deleteOpFee(id: number) {
  return requestClient.delete(`/his/op-fee/delete?id=${id}`);
}

// ==================== 费用明细接口 ====================

/** 查询费用明细分页列表 */
export function getOpFeeItemPage(params: OpFeeApi.FeeItemPageReqVO) {
  return requestClient.get<PageResult<OpFeeApi.FeeItem>>(
    '/his/op-fee/item/page',
    { params },
  );
}

/** 查询费用明细详情 */
export function getOpFeeItem(id: number) {
  return requestClient.get<OpFeeApi.FeeItem>(
    `/his/op-fee/item/get?id=${id}`,
  );
}

/** 根据费用ID查询明细列表 */
export function getOpFeeItemsByFeeId(feeId: number) {
  return requestClient.get<OpFeeApi.FeeItem[]>(
    `/his/op-fee/item/list-by-fee?feeId=${feeId}`,
  );
}

/** 根据来源查询明细列表 */
export function getOpFeeItemsBySource(
  sourceType: number,
  sourceId: number,
) {
  return requestClient.get<OpFeeApi.FeeItem[]>(
    `/his/op-fee/item/list-by-source?sourceType=${sourceType}&sourceId=${sourceId}`,
  );
}

/** 新增费用明细 */
export function createOpFeeItem(data: OpFeeApi.FeeItemSaveReqVO) {
  return requestClient.post<number>('/his/op-fee/item/create', data);
}

/** 修改费用明细 */
export function updateOpFeeItem(data: OpFeeApi.FeeItemSaveReqVO) {
  return requestClient.put('/his/op-fee/item/update', data);
}

/** 删除费用明细 */
export function deleteOpFeeItem(id: number) {
  return requestClient.delete(`/his/op-fee/item/delete?id=${id}`);
}