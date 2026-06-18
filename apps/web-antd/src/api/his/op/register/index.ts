import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace OpRegisterApi {
  /** 挂号信息 */
  export interface Register {
    id: number; // 挂号ID
    registerNo: string; // 挂号单号
    patientId: number; // 患者ID
    patientName: string; // 患者姓名
    idCardNo?: string; // 身份证号
    gender?: number; // 性别
    age?: number; // 年龄
    phone?: string; // 手机号
    deptId: number; // 科室ID
    deptName: string; // 科室名称
    doctorId: number; // 医生ID
    doctorName: string; // 医生姓名
    scheduleId?: number; // 排班ID
    registerType: number; // 挂号类型：1-普通，2-专家，3-急诊
    registerTypeName?: string; // 挂号类型名称
    visitDate: string; // 就诊日期
    timeSlot?: string; // 时间段：AM-上午，PM-下午
    queueNo: number; // 队列号
    status: number; // 状态
    statusName?: string; // 状态名称
    fee: number; // 挂号费用
    payStatus?: number; // 支付状态
    payStatusName?: string; // 支付状态名称
    remark?: string; // 备注
    createTime: Date; // 创建时间
    visitStartTime?: Date; // 就诊开始时间
    visitEndTime?: Date; // 就诊结束时间
  }

  /** 候诊患者信息 */
  export interface WaitingPatient {
    id: number; // 挂号ID
    registerNo: string; // 挂号单号
    queueNo: number; // 队列号
    patientId: number; // 患者ID
    patientName: string; // 患者姓名
    gender: number; // 性别
    age: number; // 年龄
    phone?: string; // 手机号
    status: number; // 状态
    statusName?: string; // 状态名称
    waitTime?: number; // 预计等待分钟
  }

  /** 挂号创建请求 */
  export interface RegisterSaveReqVO {
    patientId: number; // 患者ID
    deptId: number; // 科室ID
    doctorId: number; // 医生ID
    scheduleId?: number; // 排班ID
    registerType: number; // 挂号类型
    visitDate: string; // 就诊日期
    timeSlot?: string; // 时间段
    queueNo?: number; // 队列号
    fee?: number; // 挂号费用
    remark?: string; // 备注
  }

  /** 挂号分页查询参数 */
  export interface RegisterPageReqVO extends PageParam {
    registerNo?: string; // 挂号单号
    patientName?: string; // 患者姓名
    idCardNo?: string; // 身份证号
    deptId?: number; // 科室ID
    doctorId?: number; // 医生ID
    status?: number; // 挂号状态
    visitDate?: string; // 就诊日期
    registerType?: number; // 挂号类型
  }
}

/** 创建挂号（现场挂号） */
export function createRegister(data: OpRegisterApi.RegisterSaveReqVO) {
  return requestClient.post<number>('/his/register/create', data);
}

/** 退号 */
export function refundRegister(id: number, reason?: string) {
  return requestClient.post<boolean>('/his/register/refund', null, {
    params: { id, reason },
  });
}

/** 获取挂号详情 */
export function getRegister(id: number) {
  return requestClient.get<OpRegisterApi.Register>(
    `/his/register/get?id=${id}`,
  );
}

/** 获取挂号分页 */
export function getRegisterPage(params: OpRegisterApi.RegisterPageReqVO) {
  return requestClient.get<PageResult<OpRegisterApi.Register>>(
    '/his/register/page',
    { params },
  );
}

/** 开始就诊 */
export function startVisit(id: number) {
  return requestClient.post<boolean>('/his/register/start-visit', null, {
    params: { id },
  });
}

/** 结束就诊 */
export function endVisit(id: number) {
  return requestClient.post<boolean>('/his/register/end-visit', null, {
    params: { id },
  });
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
  return requestClient.post<OpRegisterApi.WaitingPatient>(
    '/his/register/call-next',
    null,
    { params: { doctorId, date } },
  );
}