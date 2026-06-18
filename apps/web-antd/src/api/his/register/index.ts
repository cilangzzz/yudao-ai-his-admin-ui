import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace OpRegisterApi {
  /** 挂号信息 */
  export interface Register {
    id: number;
    registerNo: string;
    patientId: number;
    patientName: string;
    idCardNo: string;
    gender: number;
    age: number;
    phone: string;
    deptId: number;
    deptName: string;
    doctorId: number;
    doctorName: string;
    scheduleId: number;
    registerType: number;
    registerTypeName?: string;
    visitDate: string;
    timeSlot: string;
    queueNo: number;
    status: number;
    statusName?: string;
    fee: number;
    payStatus: number;
    payStatusName?: string;
    remark?: string;
    createTime: string;
    visitStartTime?: string;
    visitEndTime?: string;
  }

  /** 挂号保存请求 */
  export interface RegisterSaveReqVO {
    patientId: number;
    deptId: number;
    doctorId: number;
    scheduleId: number;
    registerType: number;
    visitDate: string;
    timeSlot?: string;
    queueNo?: number;
    fee?: number;
    remark?: string;
  }

  /** 挂号分页查询参数 */
  export interface RegisterPageReqVO extends PageParam {
    registerNo?: string;
    patientName?: string;
    idCardNo?: string;
    deptId?: number;
    doctorId?: number;
    status?: number;
    visitDate?: string;
    registerType?: number;
  }

  /** 候诊患者信息 */
  export interface WaitingPatient {
    id: number;
    registerNo: string;
    queueNo: number;
    patientName: string;
    gender: number;
    age: number;
    status: number;
    statusName: string;
    waitTime: number;
  }

  /** 退号请求 */
  export interface RefundReqVO {
    id: number;
    reason?: string;
  }
}

/** 查询挂号分页列表 */
export function getRegisterPage(params: OpRegisterApi.RegisterPageReqVO) {
  return requestClient.get<PageResult<OpRegisterApi.Register>>(
    '/his/register/page',
    { params },
  );
}

/** 查询挂号详情 */
export function getRegister(id: number) {
  return requestClient.get<OpRegisterApi.Register>(
    `/his/register/get?id=${id}`,
  );
}

/** 现场挂号 */
export function createRegister(data: OpRegisterApi.RegisterSaveReqVO) {
  return requestClient.post<number>('/his/register/create', data);
}

/** 退号 */
export function refundRegister(data: OpRegisterApi.RefundReqVO) {
  return requestClient.post<boolean>('/his/register/refund', data);
}

/** 开始就诊 */
export function startVisit(id: number) {
  return requestClient.post<boolean>(`/his/register/start-visit?id=${id}`);
}

/** 结束就诊 */
export function endVisit(id: number) {
  return requestClient.post<boolean>(`/his/register/end-visit?id=${id}`);
}

/** 获取候诊列表 */
export function getWaitingList(doctorId: number, date?: string) {
  return requestClient.get<OpRegisterApi.WaitingPatient[]>(
    '/his/register/waiting-list',
    { params: { doctorId, date } },
  );
}

/** 叫号 */
export function callNextPatient(doctorId: number, date?: string) {
  return requestClient.post<OpRegisterApi.Register>(
    '/his/register/call-next',
    null,
    { params: { doctorId, date } },
  );
}
