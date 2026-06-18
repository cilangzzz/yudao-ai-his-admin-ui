import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace HisOrderApi {
  /** 医嘱信息 */
  export interface Order {
    id: number;
    orderNo: string;
    admissionId: number;
    patientId: number;
    patientName: string;
    inpatientNo: string;
    orderType: number;
    orderTypeName?: string;
    orderCategory: number;
    orderCategoryName?: string;
    orderContent: string;
    startDate: string;
    endDate?: string;
    status: number;
    statusName?: string;
    doctorId: number;
    doctorName: string;
    nurseId?: number;
    nurseName?: string;
    auditDoctorId?: number;
    auditDoctorName?: string;
    auditTime?: string;
    stopDoctorId?: number;
    stopDoctorName?: string;
    stopTime?: string;
    cancelDoctorId?: number;
    cancelReason?: string;
    createTime: string;
  }

  /** 医嘱分页查询参数 */
  export interface OrderPageReqVO extends PageParam {
    orderNo?: string;
    admissionId?: number;
    patientId?: number;
    orderType?: number;
    orderCategory?: number;
    status?: number;
  }

  /** 审核请求 */
  export interface AuditReqVO {
    orderId: number;
    auditDoctorId: number;
    auditDoctorName: string;
    auditResult: number;
    auditRemark?: string;
  }

  /** 执行请求 */
  export interface ExecuteReqVO {
    orderId: number;
    nurseId: number;
    nurseName: string;
    executeTime?: string;
    executeRemark?: string;
  }

  /** 停止请求 */
  export interface StopReqVO {
    orderId: number;
    stopDoctorId: number;
    stopDoctorName: string;
    stopReason?: string;
  }

  /** 作废请求 */
  export interface CancelReqVO {
    orderId: number;
    cancelDoctorId: number;
    cancelReason?: string;
  }
}

/** 查询医嘱分页列表 */
export function getOrderPage(params: HisOrderApi.OrderPageReqVO) {
  return requestClient.get<PageResult<HisOrderApi.Order>>('/his/order/page', {
    params,
  });
}

/** 查询医嘱详情 */
export function getOrder(id: number) {
  return requestClient.get<HisOrderApi.Order>(`/his/order/get?id=${id}`);
}

/** 查询住院医嘱列表 */
export function getOrderListByAdmission(admissionId: number) {
  return requestClient.get<HisOrderApi.Order[]>(
    `/his/order/list-by-admission?admissionId=${admissionId}`,
  );
}

/** 获取待审核医嘱列表 */
export function getPendingAuditList(admissionId?: number) {
  return requestClient.get<HisOrderApi.Order[]>(
    '/his/order/pending-audit-list',
    { params: { admissionId } },
  );
}

/** 获取执行中医嘱列表 */
export function getExecutingList(admissionId?: number) {
  return requestClient.get<HisOrderApi.Order[]>('/his/order/executing-list', {
    params: { admissionId },
  });
}

/** 获取长期医嘱列表 */
export function getLongTermList(admissionId: number) {
  return requestClient.get<HisOrderApi.Order[]>(
    `/his/order/long-term-list?admissionId=${admissionId}`,
  );
}

/** 获取药品医嘱列表 */
export function getDrugOrderList(admissionId: number) {
  return requestClient.get<HisOrderApi.Order[]>(
    `/his/order/drug-order-list?admissionId=${admissionId}`,
  );
}

/** 审核医嘱 */
export function auditOrder(data: HisOrderApi.AuditReqVO) {
  return requestClient.post('/his/order/audit', data);
}

/** 执行医嘱 */
export function executeOrder(data: HisOrderApi.ExecuteReqVO) {
  return requestClient.post('/his/order/execute', data);
}

/** 停止医嘱 */
export function stopOrder(data: HisOrderApi.StopReqVO) {
  return requestClient.post('/his/order/stop', data);
}

/** 作废医嘱 */
export function cancelOrder(data: HisOrderApi.CancelReqVO) {
  return requestClient.post('/his/order/cancel', data);
}