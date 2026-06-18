import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace HisMedicationApi {
  /** 给药记录信息 */
  export interface Medication {
    id: number;
    adminNo: string;
    admissionId: number;
    patientId: number;
    patientName: string;
    inpatientNo: string;
    orderId: number;
    orderNo: string;
    drugId: number;
    drugCode: string;
    drugName: string;
    spec: string;
    dosage: string;
    frequency: string;
    route: string;
    scheduledTime: string;
    status: number;
    statusName?: string;
    nurseId?: number;
    nurseName?: string;
    executeTime?: string;
    notExecutedReason?: string;
    notExecutedReasonType?: string;
    createTime: string;
  }

  /** 给药分页查询参数 */
  export interface MedicationPageReqVO extends PageParam {
    adminNo?: string;
    admissionId?: number;
    patientId?: number;
    status?: number;
    scheduledTime?: string[];
  }

  /** 腕带验证请求 */
  export interface WristbandVerifyReqVO {
    adminId: number;
    wristbandCode: string;
    nurseId: number;
  }

  /** 腕带验证结果 */
  export interface WristbandVerifyResult {
    success: boolean;
    patientId: number;
    patientName: string;
    inpatientNo: string;
    message: string;
  }

  /** 药品条码验证请求 */
  export interface DrugBarcodeVerifyReqVO {
    adminId: number;
    drugBarcode: string;
    nurseId: number;
  }

  /** 药品条码验证结果 */
  export interface DrugBarcodeVerifyResult {
    success: boolean;
    drugId: number;
    drugName: string;
    batchNo: string;
    expireDate: string;
    message: string;
  }

  /** 给药确认请求 */
  export interface MedicationConfirmReqVO {
    adminId: number;
    nurseId: number;
    nurseName: string;
    wristbandVerified: boolean;
    drugBarcodeVerified: boolean;
    executeTime?: string;
    remark?: string;
  }

  /** 未执行原因请求 */
  export interface NotExecutedReqVO {
    adminId: number;
    reason: string;
    reasonType: string;
  }
}

/** 查询给药分页列表 */
export function getMedicationPage(params: HisMedicationApi.MedicationPageReqVO) {
  return requestClient.get<PageResult<HisMedicationApi.Medication>>(
    '/his/medication-admin/page',
    { params },
  );
}

/** 查询给药记录 */
export function getMedication(id: number) {
  return requestClient.get<HisMedicationApi.Medication>(
    `/his/medication-admin/get?id=${id}`,
  );
}

/** 查询住院给药记录列表 */
export function getMedicationListByAdmission(admissionId: number) {
  return requestClient.get<HisMedicationApi.Medication[]>(
    `/his/medication-admin/list-by-admission?admissionId=${admissionId}`,
  );
}

/** 获取待执行给药列表 */
export function getPendingMedicationList(admissionId: number) {
  return requestClient.get<HisMedicationApi.Medication[]>(
    `/his/medication-admin/pending-list?admissionId=${admissionId}`,
  );
}

/** 创建给药记录 */
export function createMedication(data: HisMedicationApi.Medication) {
  return requestClient.post<number>('/his/medication-admin/create', data);
}

/** 更新给药记录 */
export function updateMedication(data: HisMedicationApi.Medication) {
  return requestClient.put('/his/medication-admin/update', data);
}

/** 删除给药记录 */
export function deleteMedication(id: number) {
  return requestClient.delete(`/his/medication-admin/delete?id=${id}`);
}

/** 腕带扫描验证 */
export function verifyWristband(data: HisMedicationApi.WristbandVerifyReqVO) {
  return requestClient.post<HisMedicationApi.WristbandVerifyResult>(
    '/his/medication-admin/verify-wristband',
    data,
  );
}

/** 药品条码验证 */
export function verifyDrugBarcode(data: HisMedicationApi.DrugBarcodeVerifyReqVO) {
  return requestClient.post<HisMedicationApi.DrugBarcodeVerifyResult>(
    '/his/medication-admin/verify-drug',
    data,
  );
}

/** 给药执行确认 */
export function confirmMedication(data: HisMedicationApi.MedicationConfirmReqVO) {
  return requestClient.post<number>('/his/medication-admin/confirm', data);
}

/** 记录未执行原因 */
export function recordNotExecuted(data: HisMedicationApi.NotExecutedReqVO) {
  return requestClient.post('/his/medication-admin/record-not-executed', data);
}