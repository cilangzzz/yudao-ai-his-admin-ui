import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace OpMedicalRecordApi {
  /** 门诊病历 */
  export interface MedicalRecord {
    id?: number; // 病历ID
    visitId: number; // 就诊ID（挂号ID）
    patientId: number; // 患者ID
    patientName: string; // 患者姓名
    gender?: number; // 性别
    age?: number; // 年龄
    deptId: number; // 科室ID
    deptName: string; // 科室名称
    doctorId: number; // 医生ID
    doctorName: string; // 医生姓名
    chiefComplaint: string; // 主诉
    presentIllness: string; // 现病史
    pastHistory?: string; // 既往史
    personalHistory?: string; // 个人史
    familyHistory?: string; // 家族史
    physicalExam?: string; // 体格检查
    temperature?: number; // 体温
    pulse?: number; // 脉搏
    respiration?: number; // 呼吸
    bloodPressure?: string; // 血压
    height?: number; // 身高
    weight?: number; // 体重
    diagnosis?: string; // 诊断
    diagnosisCodes?: string; // 诊断编码
    treatmentPlan?: string; // 治疗方案
    prescriptionIds?: number[]; // 关联处方ID列表
    status?: number; // 状态：0-草稿，1-已提交，2-已审核
    createTime?: Date; // 创建时间
    updateTime?: Date; // 更新时间
  }

  /** 病历保存请求 */
  export interface MedicalRecordSaveReqVO {
    id?: number; // 病历ID（更新时必填）
    visitId: number; // 就诊ID
    patientId: number; // 患者ID
    patientName: string; // 患者姓名
    deptId: number; // 科室ID
    deptName: string; // 科室名称
    doctorId: number; // 医生ID
    doctorName: string; // 医生姓名
    chiefComplaint: string; // 主诉
    presentIllness: string; // 现病史
    pastHistory?: string; // 既往史
    personalHistory?: string; // 个人史
    familyHistory?: string; // 家族史
    physicalExam?: string; // 体格检查
    temperature?: number; // 体温
    pulse?: number; // 脉搏
    respiration?: number; // 呼吸
    bloodPressure?: string; // 血压
    height?: number; // 身高
    weight?: number; // 体重
    diagnosis?: string; // 诊断
    diagnosisCodes?: string; // 诊断编码
    treatmentPlan?: string; // 治疗方案
    prescriptionIds?: number[]; // 关联处方ID列表
  }

  /** 病历模板 */
  export interface MedicalRecordTemplate {
    id: number; // 模板ID
    name: string; // 模板名称
    deptId?: number; // 科室ID（科室模板）
    doctorId?: number; // 医生ID（个人模板）
    level: number; // 模板级别：1-个人，2-科室，3-全院
    chiefComplaint?: string; // 主诉模板
    presentIllness?: string; // 现病史模板
    pastHistory?: string; // 既往史模板
    physicalExam?: string; // 体格检查模板
    diagnosis?: string; // 诊断模板
    treatmentPlan?: string; // 治疗方案模板
    diagnosisCodes?: string; // 诊断编码
    isDefault?: boolean; // 是否默认模板
    createTime?: Date; // 创建时间
  }

  /** 病历分页查询参数 */
  export interface MedicalRecordPageReqVO extends PageParam {
    patientId?: number; // 患者ID
    patientName?: string; // 患者姓名
    deptId?: number; // 科室ID
    doctorId?: number; // 医生ID
    visitId?: number; // 就诊ID
    status?: number; // 状态
    startTime?: string; // 开始时间
    endTime?: string; // 结束时间
  }

  /** 病历模板保存请求 */
  export interface TemplateSaveReqVO {
    id?: number; // 模板ID
    name: string; // 模板名称
    deptId?: number; // 科室ID
    doctorId?: number; // 医生ID
    level: number; // 模板级别
    chiefComplaint?: string; // 主诉模板
    presentIllness?: string; // 现病史模板
    pastHistory?: string; // 既往史模板
    physicalExam?: string; // 体格检查模板
    diagnosis?: string; // 诊断模板
    treatmentPlan?: string; // 治疗方案模板
    diagnosisCodes?: string; // 诊断编码
    isDefault?: boolean; // 是否默认模板
  }
}

/** 创建病历 */
export function createMedicalRecord(data: OpMedicalRecordApi.MedicalRecordSaveReqVO) {
  return requestClient.post<number>('/his/medical-record/create', data);
}

/** 更新病历 */
export function updateMedicalRecord(data: OpMedicalRecordApi.MedicalRecordSaveReqVO) {
  return requestClient.put<boolean>('/his/medical-record/update', data);
}

/** 获取病历详情 */
export function getMedicalRecord(id: number) {
  return requestClient.get<OpMedicalRecordApi.MedicalRecord>(
    `/his/medical-record/get?id=${id}`,
  );
}

/** 根据就诊ID获取病历 */
export function getMedicalRecordByVisitId(visitId: number) {
  return requestClient.get<OpMedicalRecordApi.MedicalRecord>(
    `/his/medical-record/get-by-visit?visitId=${visitId}`,
  );
}

/** 获取病历分页 */
export function getMedicalRecordPage(params: OpMedicalRecordApi.MedicalRecordPageReqVO) {
  return requestClient.get<PageResult<OpMedicalRecordApi.MedicalRecord>>(
    '/his/medical-record/page',
    { params },
  );
}

/** 提交病历审核 */
export function submitMedicalRecord(id: number) {
  return requestClient.post<boolean>(
    `/his/medical-record/submit?id=${id}`,
  );
}

/** 删除病历 */
export function deleteMedicalRecord(id: number) {
  return requestClient.delete<boolean>(`/his/medical-record/delete?id=${id}`);
}

/** 获取病历模板列表 */
export function getMedicalRecordTemplateList(level?: number, deptId?: number, doctorId?: number) {
  return requestClient.get<OpMedicalRecordApi.MedicalRecordTemplate[]>(
    '/his/medical-record/template/list',
    { params: { level, deptId, doctorId } },
  );
}

/** 获取病历模板详情 */
export function getMedicalRecordTemplate(id: number) {
  return requestClient.get<OpMedicalRecordApi.MedicalRecordTemplate>(
    `/his/medical-record/template/get?id=${id}`,
  );
}

/** 创建病历模板 */
export function createMedicalRecordTemplate(data: OpMedicalRecordApi.TemplateSaveReqVO) {
  return requestClient.post<number>('/his/medical-record/template/create', data);
}

/** 更新病历模板 */
export function updateMedicalRecordTemplate(data: OpMedicalRecordApi.TemplateSaveReqVO) {
  return requestClient.put<boolean>('/his/medical-record/template/update', data);
}

/** 删除病历模板 */
export function deleteMedicalRecordTemplate(id: number) {
  return requestClient.delete<boolean>(
    `/his/medical-record/template/delete?id=${id}`,
  );
}

/** 设为默认模板 */
export function setDefaultTemplate(id: number) {
  return requestClient.post<boolean>(
    `/his/medical-record/template/set-default?id=${id}`,
  );
}