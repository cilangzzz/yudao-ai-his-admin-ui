import { requestClient } from '#/api/request';

export namespace CdsApi {
  /** CDS校验请求 */
  export interface CdsCheckReqVO {
    patientId: number; // 患者ID
    prescriptionItems: CdsPrescriptionItem[]; // 处方药品列表
  }

  /** CDS处方药品项 */
  export interface CdsPrescriptionItem {
    drugId: number; // 药品ID
    drugName: string; // 药品名称
    dosage?: string; // 剂量
    frequency?: string; // 频率
  }

  /** CDS警告级别 */
  export type CdsWarningLevel = 'HIGH' | 'MEDIUM' | 'LOW';

  /** CDS警告类型 */
  export type CdsWarningType = 'ALLERGY' | 'INTERACTION' | 'DOSAGE' | 'CONDITION' | 'DUPLICATE' | 'CONTRAINDICATION';

  /** CDS警告信息 */
  export interface CdsWarning {
    level: CdsWarningLevel; // 警告级别
    type: CdsWarningType; // 警告类型
    drugName: string; // 药品名称
    message: string; // 警告信息
    suggestion?: string; // 建议信息
    relatedDrugs?: string[]; // 相关药品（用于药物相互作用）
  }

  /** CDS校验结果 */
  export interface CdsCheckResult {
    warnings: CdsWarning[]; // 警告列表
    passed: boolean; // 是否通过校验
    hasHighRisk: boolean; // 是否存在高风险警告
    hasMediumRisk: boolean; // 是否存在中风险警告
  }

  /** 药物相互作用检查请求 */
  export interface InteractionCheckReqVO {
    drugIds: number[]; // 药品ID列表
  }

  /** 药物相互作用结果 */
  export interface DrugInteraction {
    drugId1: number; // 药品1ID
    drugName1: string; // 药品1名称
    drugId2: number; // 药品2ID
    drugName2: string; // 药品2名称
    severity: 'HIGH' | 'MEDIUM' | 'LOW'; // 严重程度
    description: string; // 相互作用描述
    recommendation?: string; // 处理建议
  }

  /** 过敏史检查请求 */
  export interface AllergyCheckReqVO {
    patientId: number; // 患者ID
    drugIds: number[]; // 药品ID列表
  }

  /** 过敏检查结果 */
  export interface AllergyCheckResult {
    hasAllergy: boolean; // 是否存在过敏
    allergyDrugIds: number[]; // 过敏药品ID列表
    allergyDetails: AllergyDetail[]; // 过敏详情
  }

  /** 过敏详情 */
  export interface AllergyDetail {
    drugId: number; // 药品ID
    drugName: string; // 药品名称
    allergen: string; // 过敏原
    reaction: string; // 过敏反应
    severity: 'HIGH' | 'MEDIUM' | 'LOW'; // 严重程度
  }

  /** 剂量校验请求 */
  export interface DosageCheckReqVO {
    patientId: number; // 患者ID
    drugId: number; // 药品ID
    dosage: number; // 剂量
    dosageUnit: string; // 剂量单位
    frequency: string; // 使用频率
    age?: number; // 年龄
    weight?: number; // 体重(kg)
    renalFunction?: string; // 肾功能状态
    liverFunction?: string; // 肝功能状态
  }

  /** 剂量校验结果 */
  export interface DosageCheckResult {
    isAppropriate: boolean; // 剂量是否合适
    minDosage?: number; // 最小剂量
    maxDosage?: number; // 最大剂量
    recommendedDosage?: number; // 推荐剂量
    unit: string; // 单位
    warning?: string; // 警告信息
  }

  /** 禁忌症检查请求 */
  export interface ContraindicationCheckReqVO {
    patientId: number; // 患者ID
    drugIds: number[]; // 药品ID列表
    diagnosisCodes?: string[]; // 诊断编码列表
  }

  /** 禁忌症检查结果 */
  export interface ContraindicationCheckResult {
    hasContraindication: boolean; // 是否存在禁忌
    contraindications: ContraindicationDetail[]; // 禁忌详情列表
  }

  /** 禁忌详情 */
  export interface ContraindicationDetail {
    drugId: number; // 药品ID
    drugName: string; // 药品名称
    contraindication: string; // 禁忌症
    reason: string; // 原因
    severity: 'HIGH' | 'MEDIUM' | 'LOW'; // 严重程度
  }
}

/** CDS综合校验 */
export function checkCds(data: CdsApi.CdsCheckReqVO) {
  return requestClient.post<CdsApi.CdsCheckResult>('/his/cds/check', data);
}

/** 药物相互作用检查 */
export function checkDrugInteraction(data: CdsApi.InteractionCheckReqVO) {
  return requestClient.post<CdsApi.DrugInteraction[]>(
    '/his/cds/check-interaction',
    data,
  );
}

/** 过敏史检查 */
export function checkAllergy(data: CdsApi.AllergyCheckReqVO) {
  return requestClient.post<CdsApi.AllergyCheckResult>(
    '/his/cds/check-allergy',
    data,
  );
}

/** 剂量校验 */
export function checkDosage(data: CdsApi.DosageCheckReqVO) {
  return requestClient.post<CdsApi.DosageCheckResult>(
    '/his/cds/check-dosage',
    data,
  );
}

/** 禁忌症检查 */
export function checkContraindication(data: CdsApi.ContraindicationCheckReqVO) {
  return requestClient.post<CdsApi.ContraindicationCheckResult>(
    '/his/cds/check-contraindication',
    data,
  );
}
