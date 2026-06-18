import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace OpPrescriptionApi {
  /** 处方信息 */
  export interface Prescription {
    id: number; // 处方ID
    prescriptionNo: string; // 处方编号
    registerId: number; // 挂号ID
    patientId: number; // 患者ID
    patientName: string; // 患者姓名
    idCardNo?: string; // 身份证号
    gender?: number; // 性别
    age?: number; // 年龄
    phone?: string; // 手机号
    doctorId: number; // 医生ID
    doctorName: string; // 医生姓名
    deptId: number; // 科室ID
    deptName: string; // 科室名称
    prescriptionType: number; // 处方类型：1-西药，2-中药，3-草药
    prescriptionTypeName?: string; // 处方类型名称
    diagnosis: string; // 诊断
    diagnosisCode?: string; // 诊断编码
    status: number; // 状态
    statusName?: string; // 状态名称
    totalAmount: number; // 总金额
    remark?: string; // 备注
    items?: PrescriptionItem[]; // 处方明细
    createTime: Date; // 创建时间
  }

  /** 处方明细 */
  export interface PrescriptionItem {
    id?: number; // 明细ID
    drugId: number; // 药品ID
    drugCode: string; // 药品编码
    drugName: string; // 药品名称
    spec: string; // 规格
    quantity: number; // 数量
    unit: string; // 单位
    dosage?: string; // 剂量
    dosageUnit?: string; // 剂量单位
    frequency: string; // 使用频率
    usageMethod: string; // 使用方法
    days?: number; // 天数
    unitPrice: number; // 单价
    totalAmount: number; // 总金额
    skinTestRequired?: number; // 是否需要皮试：0-否，1-是
    skinTestResult?: number; // 皮试结果：null-未做，0-阴性，1-阳性
    remark?: string; // 备注
  }

  /** 处方创建/更新请求 */
  export interface PrescriptionSaveReqVO {
    id?: number; // 处方ID（更新时必填）
    registerId: number; // 挂号ID
    patientId: number; // 患者ID
    patientName: string; // 患者姓名
    doctorId: number; // 医生ID
    doctorName: string; // 医生姓名
    deptId: number; // 科室ID
    deptName: string; // 科室名称
    prescriptionType: number; // 处方类型
    diagnosis: string; // 诊断
    diagnosisCode?: string; // 诊断编码
    remark?: string; // 备注
    items: PrescriptionItem[]; // 处方明细
  }

  /** 处方审核请求 */
  export interface PrescriptionAuditReqVO {
    id: number; // 处方ID
    pharmacistId: number; // 药师ID
    pharmacistName: string; // 药师姓名
    remark?: string; // 审核备注
    reason?: string; // 退回原因
  }

  /** 处方发药请求 */
  export interface PrescriptionSendReqVO {
    id: number; // 处方ID
    pharmacistId: number; // 发药药师ID
    pharmacistName: string; // 发药药师姓名
  }

  /** 处方退药请求 */
  export interface PrescriptionReturnReqVO {
    id: number; // 处方ID
    reason: string; // 退药原因
  }

  /** 皮试结果记录请求 */
  export interface SkinTestReqVO {
    prescriptionItemId: number; // 处方明细ID
    result: number; // 皮试结果：0-阴性，1-阳性
    operatorId: number; // 操作人ID
    operatorName: string; // 操作人姓名
  }

  /** 处方分页查询参数 */
  export interface PrescriptionPageReqVO extends PageParam {
    prescriptionNo?: string; // 处方编号
    patientName?: string; // 患者姓名
    patientId?: number; // 患者ID
    deptId?: number; // 科室ID
    doctorId?: number; // 医生ID
    status?: number; // 状态
    prescriptionType?: number; // 处方类型
    startTime?: string; // 开始时间
    endTime?: string; // 结束时间
  }
}

/** 开立处方 */
export function createPrescription(data: OpPrescriptionApi.PrescriptionSaveReqVO) {
  return requestClient.post<number>('/his/prescription/create', data);
}

/** 更新处方 */
export function updatePrescription(data: OpPrescriptionApi.PrescriptionSaveReqVO) {
  return requestClient.put<boolean>('/his/prescription/update', data);
}

/** 删除处方 */
export function deletePrescription(id: number) {
  return requestClient.delete<boolean>(`/his/prescription/delete?id=${id}`);
}

/** 获取处方详情 */
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

/** 获取处方分页 */
export function getPrescriptionPage(params: OpPrescriptionApi.PrescriptionPageReqVO) {
  return requestClient.get<PageResult<OpPrescriptionApi.Prescription>>(
    '/his/prescription/page',
    { params },
  );
}

/** 获取处方明细 */
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
export function auditPassPrescription(data: OpPrescriptionApi.PrescriptionAuditReqVO) {
  return requestClient.post<boolean>('/his/prescription/audit-pass', null, {
    params: data,
  });
}

/** 审核退回 */
export function auditRejectPrescription(data: OpPrescriptionApi.PrescriptionAuditReqVO) {
  return requestClient.post<boolean>('/his/prescription/audit-reject', null, {
    params: data,
  });
}

/** 调配处方 */
export function dispensePrescription(id: number, pharmacistId: number, pharmacistName: string) {
  return requestClient.post<boolean>('/his/prescription/dispense', null, {
    params: { id, pharmacistId, pharmacistName },
  });
}

/** 发药 */
export function sendPrescription(data: OpPrescriptionApi.PrescriptionSendReqVO) {
  return requestClient.post<boolean>('/his/prescription/send', null, {
    params: data,
  });
}

/** 批量发药 */
export function batchSendPrescription(ids: number[], pharmacistId: number, pharmacistName: string) {
  return requestClient.post<boolean>('/his/prescription/batch-send', null, {
    params: { ids: ids.join(','), pharmacistId, pharmacistName },
  });
}

/** 退药 */
export function returnPrescription(data: OpPrescriptionApi.PrescriptionReturnReqVO) {
  return requestClient.post<boolean>('/his/prescription/return', data);
}

/** 记录皮试结果 */
export function recordSkinTest(data: OpPrescriptionApi.SkinTestReqVO) {
  return requestClient.post<boolean>('/his/prescription/record-skin-test', data);
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
