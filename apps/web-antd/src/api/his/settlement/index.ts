import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace HisSettlementApi {
  /** 结算单信息 */
  export interface Settlement {
    id: number;
    settlementNo: string;
    invoiceNo?: string;
    admissionId: number;
    patientId: number;
    patientName: string;
    inpatientNo: string;
    idCardNo: string;
    admissionDate: string;
    dischargeDate?: string;
    hospitalDays: number;
    deptId: number;
    deptName: string;
    wardId?: number;
    wardName?: string;
    bedId?: number;
    bedNo?: string;
    attendingDoctorId?: number;
    attendingDoctorName?: string;
    insuranceType: number;
    insuranceTypeName?: string;
    insuranceNo?: string;
    settlementType: number;
    settlementTypeName?: string;
    settlementStatus: number;
    settlementStatusName?: string;
    admissionDiagnosis?: string;
    dischargeDiagnosis?: string;
    diagnosisCode?: string;
    // 费用汇总
    totalAmount: number;
    westernMedicineFee?: number;
    chineseMedicineFee?: number;
    examinationFee?: number;
    laboratoryFee?: number;
    treatmentFee?: number;
    nursingFee?: number;
    surgeryFee?: number;
    bedFee?: number;
    materialFee?: number;
    otherFee?: number;
    // 结算金额
    discountAmount?: number;
    payableAmount: number;
    prepaymentAmount?: number;
    insuranceAmount?: number;
    selfAmount?: number;
    refundAmount?: number;
    actualAmount?: number;
    // 支付信息
    paymentType?: number;
    paymentTypeName?: string;
    paymentTime?: string;
    operatorId?: number;
    operatorName?: string;
    settlementTime?: string;
    remark?: string;
    createTime: string;
  }

  /** 结算单保存请求 */
  export interface SettlementSaveReqVO {
    id?: number;
    admissionId: number;
    patientId: number;
    patientName: string;
    inpatientNo?: string;
    idCardNo?: string;
    admissionDate?: string;
    dischargeDate?: string;
    hospitalDays?: number;
    deptId?: number;
    deptName?: string;
    wardId?: number;
    wardName?: string;
    bedId?: number;
    bedNo?: string;
    attendingDoctorId?: number;
    attendingDoctorName?: string;
    insuranceType?: number;
    insuranceNo?: string;
    settlementType?: number;
    admissionDiagnosis?: string;
    dischargeDiagnosis?: string;
    diagnosisCode?: string;
    remark?: string;
  }

  /** 结算单分页查询参数 */
  export interface SettlementPageReqVO extends PageParam {
    settlementNo?: string;
    patientName?: string;
    inpatientNo?: string;
    admissionId?: number;
    patientId?: number;
    deptId?: number;
    settlementStatus?: number;
    settlementType?: number;
    settlementTimeStart?: string;
    settlementTimeEnd?: string;
  }

  /** 费用汇总 */
  export interface FeeSummary {
    totalAmount: number;
    westernMedicineFee: number;
    chineseMedicineFee: number;
    examinationFee: number;
    laboratoryFee: number;
    treatmentFee: number;
    nursingFee: number;
    surgeryFee: number;
    bedFee: number;
    materialFee: number;
    otherFee: number;
    payableAmount: number;
  }

  /** 退费请求 */
  export interface RefundReqVO {
    id: number;
    refundAmount: number;
    remark?: string;
  }
}

/** 查询结算单分页列表 */
export function getSettlementPage(params: HisSettlementApi.SettlementPageReqVO) {
  return requestClient.get<PageResult<HisSettlementApi.Settlement>>(
    '/his/settlement/page',
    { params },
  );
}

/** 查询结算单详情 */
export function getSettlement(id: number) {
  return requestClient.get<HisSettlementApi.Settlement>(
    `/his/settlement/get?id=${id}`,
  );
}

/** 查询入院记录的结算单列表 */
export function getSettlementListByAdmission(admissionId: number) {
  return requestClient.get<HisSettlementApi.Settlement[]>(
    `/his/settlement/list-by-admission?admissionId=${admissionId}`,
  );
}

/** 创建结算单 */
export function createSettlement(data: HisSettlementApi.SettlementSaveReqVO) {
  return requestClient.post<number>('/his/settlement/create', data);
}

/** 更新结算单 */
export function updateSettlement(data: HisSettlementApi.SettlementSaveReqVO) {
  return requestClient.put('/his/settlement/update', data);
}

/** 删除结算单 */
export function deleteSettlement(id: number) {
  return requestClient.delete(`/his/settlement/delete?id=${id}`);
}

/** 结算确认 */
export function confirmSettlement(id: number, paymentType: number) {
  return requestClient.post(
    `/his/settlement/confirm?id=${id}&paymentType=${paymentType}`,
  );
}

/** 退费处理 */
export function refundSettlement(data: HisSettlementApi.RefundReqVO) {
  return requestClient.post('/his/settlement/refund', data);
}

/** 作废结算单 */
export function cancelSettlement(id: number) {
  return requestClient.post(`/his/settlement/cancel?id=${id}`);
}

/** 获取费用汇总 */
export function getFeeSummary(admissionId: number) {
  return requestClient.get<HisSettlementApi.FeeSummary>(
    `/his/settlement/fee-summary?admissionId=${admissionId}`,
  );
}