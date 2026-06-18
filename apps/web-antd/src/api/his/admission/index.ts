import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace HisAdmissionApi {
  /** 入院记录信息 */
  export interface Admission {
    id: number;
    admissionNo: string;
    patientId: number;
    patientName: string;
    idCardNo: string;
    gender: number;
    age: number;
    phone: string;
    deptId: number;
    deptName: string;
    wardId: number;
    wardName: string;
    bedId: number;
    bedNo: string;
    doctorId: number;
    doctorName: string;
    nurseId?: number;
    nurseName?: string;
    admissionWay: number;
    admissionWayName?: string;
    admissionCondition: number;
    admissionConditionName?: string;
    admissionStatus: number;
    admissionStatusName?: string;
    admissionDate: string;
    hospitalDays?: number;
    diagnosis: string;
    diagnosisCode?: string;
    allergyHistory?: string;
    depositAmount: number;
    depositBalance?: number;
    totalCost?: number;
    remark?: string;
    createTime: string;
  }

  /** 入院保存请求 */
  export interface AdmissionSaveReqVO {
    id?: number;
    patientId: number;
    patientName: string;
    idCardNo: string;
    phone?: string;
    deptId: number;
    deptName: string;
    wardId: number;
    wardName: string;
    bedId: number;
    bedNo: string;
    doctorId: number;
    doctorName: string;
    nurseId?: number;
    nurseName?: string;
    admissionWay: number;
    admissionCondition: number;
    diagnosis: string;
    diagnosisCode?: string;
    allergyHistory?: string;
    depositAmount: number;
    remark?: string;
  }

  /** 入院分页查询参数 */
  export interface AdmissionPageReqVO extends PageParam {
    admissionNo?: string;
    patientName?: string;
    idCardNo?: string;
    patientId?: number;
    deptId?: number;
    wardId?: number;
    admissionStatus?: number;
    admissionDate?: string[];
  }

  /** 转科请求 */
  export interface TransferDeptReqVO {
    id: number;
    newDeptId: number;
    newWardId: number;
    newBedId?: number;
  }

  /** 更换床位请求 */
  export interface UpdateBedReqVO {
    id: number;
    newBedId: number;
    newBedNo: string;
  }

  /** 预交金请求 */
  export interface AddDepositReqVO {
    id: number;
    amount: number;
    payWay?: number;
  }

  /** 住院统计 */
  export interface AdmissionStatistics {
    todayAdmission: number;
    todayDischarge: number;
    inHospital: number;
  }
}

/** 查询入院分页列表 */
export function getAdmissionPage(params: HisAdmissionApi.AdmissionPageReqVO) {
  return requestClient.get<PageResult<HisAdmissionApi.Admission>>(
    '/his/admission/page',
    { params },
  );
}

/** 查询入院详情 */
export function getAdmission(id: number) {
  return requestClient.get<HisAdmissionApi.Admission>(
    `/his/admission/get?id=${id}`,
  );
}

/** 根据住院号查询 */
export function getAdmissionByNo(admissionNo: string) {
  return requestClient.get<HisAdmissionApi.Admission>(
    `/his/admission/get-by-no?admissionNo=${admissionNo}`,
  );
}

/** 查询患者历史住院记录 */
export function getAdmissionListByPatient(patientId: number) {
  return requestClient.get<HisAdmissionApi.Admission[]>(
    `/his/admission/list-by-patient?patientId=${patientId}`,
  );
}

/** 获取在院患者列表 */
export function getInHospitalList() {
  return requestClient.get<HisAdmissionApi.Admission[]>(
    '/his/admission/in-hospital-list',
  );
}

/** 按科室查询在院患者 */
export function getInHospitalByDept(deptId: number) {
  return requestClient.get<HisAdmissionApi.Admission[]>(
    `/his/admission/in-hospital-by-dept?deptId=${deptId}`,
  );
}

/** 按病区查询在院患者 */
export function getInHospitalByWard(wardId: number) {
  return requestClient.get<HisAdmissionApi.Admission[]>(
    `/his/admission/in-hospital-by-ward?wardId=${wardId}`,
  );
}

/** 入院登记 */
export function createAdmission(data: HisAdmissionApi.AdmissionSaveReqVO) {
  return requestClient.post<number>('/his/admission/create', data);
}

/** 更新入院记录 */
export function updateAdmission(data: HisAdmissionApi.AdmissionSaveReqVO) {
  return requestClient.put('/his/admission/update', data);
}

/** 删除入院记录 */
export function deleteAdmission(id: number) {
  return requestClient.delete(`/his/admission/delete?id=${id}`);
}

/** 申请出院 */
export function applyDischarge(id: number) {
  return requestClient.post(`/his/admission/apply-discharge?id=${id}`);
}

/** 确认出院 */
export function confirmDischarge(id: number) {
  return requestClient.post(`/his/admission/confirm-discharge?id=${id}`);
}

/** 转科 */
export function transferDept(data: HisAdmissionApi.TransferDeptReqVO) {
  return requestClient.post('/his/admission/transfer-dept', data);
}

/** 更换床位 */
export function updateBed(data: HisAdmissionApi.UpdateBedReqVO) {
  return requestClient.post('/his/admission/update-bed', data);
}

/** 紧急入院 */
export function emergencyAdmission(data: HisAdmissionApi.AdmissionSaveReqVO) {
  return requestClient.post<number>(
    '/his/admission/emergency-admission',
    data,
  );
}

/** 增加预交金 */
export function addDeposit(data: HisAdmissionApi.AddDepositReqVO) {
  return requestClient.post('/his/admission/add-deposit', data);
}

/** 住院统计 */
export function getAdmissionStatistics() {
  return requestClient.get<HisAdmissionApi.AdmissionStatistics>(
    '/his/admission/statistics',
  );
}