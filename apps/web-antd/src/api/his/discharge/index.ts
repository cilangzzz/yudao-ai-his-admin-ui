import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace HisDischargeApi {
  /** 出院记录信息 */
  export interface Discharge {
    id: number;
    dischargeNo: string;
    admissionId: number;
    patientId: number;
    patientName: string;
    inpatientNo: string;
    deptId: number;
    deptName: string;
    wardId: number;
    wardName: string;
    bedNo: string;
    admissionDate: string;
    dischargeDate: string;
    hospitalDays: number;
    admissionDiagnosis: string;
    dischargeDiagnosis?: string;
    diagnosisCode?: string;
    dischargeType: number;
    dischargeTypeName?: string;
    dischargeDestination: number;
    dischargeDestinationName?: string;
    dischargeCondition: number;
    dischargeConditionName?: string;
    dischargeDoctorId?: number;
    dischargeDoctorName?: string;
    settlementStatus: number;
    settlementStatusName?: string;
    remark?: string;
    createTime: string;
  }

  /** 出院保存请求 */
  export interface DischargeSaveReqVO {
    id?: number;
    admissionId: number;
    patientId: number;
    patientName: string;
    inpatientNo?: string;
    deptId: number;
    deptName: string;
    wardId: number;
    wardName: string;
    bedNo?: string;
    admissionDate?: string;
    dischargeDate: string;
    hospitalDays?: number;
    admissionDiagnosis?: string;
    dischargeDiagnosis?: string;
    diagnosisCode?: string;
    dischargeType: number;
    dischargeDestination: number;
    dischargeCondition: number;
    dischargeDoctorId?: number;
    dischargeDoctorName?: string;
    remark?: string;
  }

  /** 出院分页查询参数 */
  export interface DischargePageReqVO extends PageParam {
    dischargeNo?: string;
    patientName?: string;
    inpatientNo?: string;
    admissionId?: number;
    deptId?: number;
    dischargeType?: number;
    dischargeDateStart?: string;
    dischargeDateEnd?: string;
  }
}

/** 查询出院分页列表 */
export function getDischargePage(params: HisDischargeApi.DischargePageReqVO) {
  return requestClient.get<PageResult<HisDischargeApi.Discharge>>(
    '/his/discharge/page',
    { params },
  );
}

/** 查询出院详情 */
export function getDischarge(id: number) {
  return requestClient.get<HisDischargeApi.Discharge>(
    `/his/discharge/get?id=${id}`,
  );
}

/** 创建出院记录 */
export function createDischarge(data: HisDischargeApi.DischargeSaveReqVO) {
  return requestClient.post<number>('/his/discharge/create', data);
}

/** 更新出院记录 */
export function updateDischarge(data: HisDischargeApi.DischargeSaveReqVO) {
  return requestClient.put('/his/discharge/update', data);
}

/** 删除出院记录 */
export function deleteDischarge(id: number) {
  return requestClient.delete(`/his/discharge/delete?id=${id}`);
}