import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace HisPatientApi {
  /** 患者信息 */
  export interface Patient {
    id: number; // 患者ID
    patientNo: string; // 患者编号
    name: string; // 患者姓名
    idCardNo: string; // 身份证号
    gender: number; // 性别：1-男，2-女
    genderName?: string; // 性别名称
    birthday: string; // 出生日期
    age?: number; // 年龄
    phone: string; // 联系电话
    address: string; // 家庭住址
    emergencyContact: string; // 紧急联系人
    emergencyPhone: string; // 紧急联系电话
    bloodType: string; // 血型：A/B/AB/O
    marriageStatus: number; // 婚姻状态：1-未婚，2-已婚，3-离异，4-丧偶
    marriageStatusName?: string; // 婚姻状态名称
    occupation: string; // 职业
    nation: string; // 民族
    nativePlace: string; // 籍贯
    createTime: string; // 创建时间
  }

  /** 患者保存请求 */
  export interface PatientSaveReqVO {
    id?: number; // 患者ID（更新时必填）
    name: string; // 患者姓名
    idCardNo: string; // 身份证号
    gender: number; // 性别：1-男，2-女
    birthday?: string; // 出生日期
    phone?: string; // 联系电话
    address?: string; // 家庭住址
    emergencyContact?: string; // 紧急联系人
    emergencyPhone?: string; // 紧急联系电话
    bloodType?: string; // 血型
    marriageStatus?: number; // 婚姻状态
    occupation?: string; // 职业
    nation?: string; // 民族
    nativePlace?: string; // 籍贯
  }

  /** 患者分页查询参数 */
  export interface PatientPageReqVO extends PageParam {
    name?: string; // 患者姓名（模糊查询）
    idCardNo?: string; // 身份证号
    phone?: string; // 联系电话
    patientNo?: string; // 患者编号
    gender?: number; // 性别
    createTime?: string[]; // 创建时间范围
  }
}

/** 查询患者分页列表 */
export function getPatientPage(params: HisPatientApi.PatientPageReqVO) {
  return requestClient.get<PageResult<HisPatientApi.Patient>>(
    '/his/patient/page',
    { params },
  );
}

/** 查询患者详情 */
export function getPatient(id: number) {
  return requestClient.get<HisPatientApi.Patient>(
    `/his/patient/get?id=${id}`,
  );
}

/** 根据身份证号查询患者 */
export function getPatientByIdCard(idCardNo: string) {
  return requestClient.get<HisPatientApi.Patient>(
    `/his/patient/get-by-id-card?idCardNo=${idCardNo}`,
  );
}

/** 新增患者 */
export function createPatient(data: HisPatientApi.PatientSaveReqVO) {
  return requestClient.post('/his/patient/create', data);
}

/** 修改患者 */
export function updatePatient(data: HisPatientApi.PatientSaveReqVO) {
  return requestClient.put('/his/patient/update', data);
}

/** 删除患者 */
export function deletePatient(id: number) {
  return requestClient.delete(`/his/patient/delete?id=${id}`);
}
