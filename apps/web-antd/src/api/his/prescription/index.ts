import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace OpPrescriptionApi {
  /** 处方信息 */
  export interface Prescription {
    id: number;
    prescriptionNo: string;
    registerId: number;
    patientId: number;
    patientName: string;
    idCardNo: string;
    gender: number;
    age: number;
    phone: string;
    doctorId: number;
    doctorName: string;
    deptId: number;
    deptName: string;
    prescriptionType: number;
    prescriptionTypeName?: string;
    diagnosis: string;
    diagnosisCode: string;
    status: number;
    statusName?: string;
    totalAmount: number;
    remark?: string;
    items: PrescriptionItem[];
    createTime: string;
  }

  /** 处方明细 */
  export interface PrescriptionItem {
    id: number;
    drugId: number;
    drugCode: string;
    drugName: string;
    spec: string;
    quantity: number;
    unit: string;
    dosage: string;
    dosageUnit?: string;
    frequency: string;
    usageMethod: string;
    days: number;
    unitPrice: number;
    totalAmount: number;
    skinTestRequired: number;
    skinTestResult?: number;
    remark?: string;
  }

  /** 处方保存请求 */
  export interface PrescriptionSaveReqVO {
    id?: number;
    registerId: number;
    patientId: number;
    patientName: string;
    doctorId: number;
    doctorName: string;
    deptId: number;
    deptName: string;
    prescriptionType: number;
    diagnosis: string;
    diagnosisCode?: string;
    remark?: string;
    items: PrescriptionItemSaveReqVO[];
  }

  /** 处方明细保存请求 */
  export interface PrescriptionItemSaveReqVO {
    id?: number;
    drugId: number;
    drugCode: string;
    drugName: string;
    spec: string;
    quantity: number;
    unit: string;
    dosage: string;
    dosageUnit?: string;
    frequency: string;
    usageMethod: string;
    days: number;
    unitPrice: number;
    totalAmount: number;
    skinTestRequired: number;
    remark?: string;
  }

  /** 处方分页查询参数 */
  export interface PrescriptionPageReqVO extends PageParam {
    prescriptionNo?: string;
    patientName?: string;
    idCardNo?: string;
    patientId?: number;
    registerId?: number;
    doctorId?: number;
    deptId?: number;
    status?: number;
    prescriptionType?: number;
    createTime?: string[];
  }

  /** 审核请求 */
  export interface AuditReqVO {
    id: number;
    pharmacistId: number;
    pharmacistName: string;
    remark?: string;
  }

  /** 发药请求 */
  export interface SendReqVO {
    id: number;
    pharmacistId: number;
    pharmacistName: string;
  }

  /** 退药请求 */
  export interface ReturnReqVO {
    id: number;
    reason: string;
  }

  /** 皮试请求 */
  export interface SkinTestReqVO {
    id: number;
    itemId: number;
    result: number;
    remark?: string;
  }
}

/** 查询处方分页列表 */
export function getPrescriptionPage(
  params: OpPrescriptionApi.PrescriptionPageReqVO,
) {
  return requestClient.get<PageResult<OpPrescriptionApi.Prescription>>(
    '/his/prescription/page',
    { params },
  );
}

/** 查询处方详情 */
export function getPrescription(id: number) {
  return requestClient.get<OpPrescriptionApi.Prescription>(
    `/his/prescription/get?id=${id}`,
  );
}

/** 根据处方编号查询 */
export function getPrescriptionByNo(prescriptionNo: string) {
  return requestClient.get<OpPrescriptionApi.Prescription>(
    `/his/prescription/get-by-no?prescriptionNo=${prescriptionNo}`,
  );
}

/** 开立处方 */
export function createPrescription(
  data: OpPrescriptionApi.PrescriptionSaveReqVO,
) {
  return requestClient.post<number>('/his/prescription/create', data);
}

/** 更新处方 */
export function updatePrescription(
  data: OpPrescriptionApi.PrescriptionSaveReqVO,
) {
  return requestClient.put('/his/prescription/update', data);
}

/** 删除处方 */
export function deletePrescription(id: number) {
  return requestClient.delete(`/his/prescription/delete?id=${id}`);
}

/** 查询处方明细 */
export function getPrescriptionItems(prescriptionId: number) {
  return requestClient.get<OpPrescriptionApi.PrescriptionItem[]>(
    `/his/prescription/items?prescriptionId=${prescriptionId}`,
  );
}

/** 根据挂号ID查询处方列表 */
export function getPrescriptionListByRegister(registerId: number) {
  return requestClient.get<OpPrescriptionApi.Prescription[]>(
    `/his/prescription/list-by-register?registerId=${registerId}`,
  );
}

/** 根据患者ID查询处方历史 */
export function getPrescriptionListByPatient(patientId: number) {
  return requestClient.get<OpPrescriptionApi.Prescription[]>(
    `/his/prescription/list-by-patient?patientId=${patientId}`,
  );
}

/** 审核通过 */
export function auditPassPrescription(data: OpPrescriptionApi.AuditReqVO) {
  return requestClient.post('/his/prescription/audit-pass', data);
}

/** 审核退回 */
export function auditRejectPrescription(data: OpPrescriptionApi.AuditReqVO) {
  return requestClient.post('/his/prescription/audit-reject', data);
}

/** 调配处方 */
export function dispensePrescription(id: number) {
  return requestClient.post(`/his/prescription/dispense?id=${id}`);
}

/** 发药 */
export function sendPrescription(data: OpPrescriptionApi.SendReqVO) {
  return requestClient.post('/his/prescription/send', data);
}

/** 批量发药 */
export function batchSendPrescription(
  ids: number[],
  data: OpPrescriptionApi.SendReqVO,
) {
  return requestClient.post('/his/prescription/batch-send', {
    ...data,
    ids: ids.join(','),
  });
}

/** 退药 */
export function returnPrescription(data: OpPrescriptionApi.ReturnReqVO) {
  return requestClient.post('/his/prescription/return', data);
}

/** 记录皮试结果 */
export function recordSkinTest(data: OpPrescriptionApi.SkinTestReqVO) {
  return requestClient.post('/his/prescription/record-skin-test', data);
}

/** 获取待审核处方列表 */
export function getPendingAuditList(deptId?: number) {
  return requestClient.get<OpPrescriptionApi.Prescription[]>(
    '/his/prescription/pending-audit-list',
    { params: { deptId } },
  );
}

/** 获取待调配处方列表 */
export function getPendingDispenseList(deptId?: number) {
  return requestClient.get<OpPrescriptionApi.Prescription[]>(
    '/his/prescription/pending-dispense-list',
    { params: { deptId } },
  );
}

/** 获取待发药处方列表 */
export function getPendingSendList(deptId?: number) {
  return requestClient.get<OpPrescriptionApi.Prescription[]>(
    '/his/prescription/pending-send-list',
    { params: { deptId } },
  );
}
