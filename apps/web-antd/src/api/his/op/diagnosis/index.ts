import { requestClient } from '#/api/request';

export namespace OpDiagnosisApi {
  /** 诊断信息 */
  export interface Diagnosis {
    id?: number; // 诊断ID
    visitId: number; // 就诊ID（挂号ID）
    diagnosisCode: string; // 诊断编码（ICD-10）
    diagnosisName: string; // 诊断名称
    diagnosisOrder: number; // 诊断序号（主诊断为1）
    diagnosisType: string; // 诊断类型
    isPrimary: boolean; // 是否主诊断
    remark?: string; // 备注
    createTime?: Date; // 创建时间
  }

  /** 诊断开立请求 */
  export interface DiagnosisSaveReqVO {
    visitId: number; // 就诊ID
    diagnosisList: DiagnosisItem[]; // 诊断列表
  }

  /** 诊断项 */
  export interface DiagnosisItem {
    diagnosisCode: string; // 诊断编码
    diagnosisName: string; // 诊断名称
    diagnosisOrder: number; // 诊断序号
    diagnosisType: string; // 诊断类型
    isPrimary: boolean; // 是否主诊断
    remark?: string; // 备注
  }

  /** ICD-10诊断编码 */
  export interface Icd10Code {
    code: string; // 编码
    name: string; // 名称
    category?: string; // 分类
    subCategory?: string; // 子分类
  }

  /** ICD-10查询参数 */
  export interface Icd10QueryReqVO {
    keyword?: string; // 关键词
    category?: string; // 分类
    limit?: number; // 返回数量限制
  }
}

/** 开立诊断 */
export function createDiagnosis(data: OpDiagnosisApi.DiagnosisSaveReqVO) {
  return requestClient.post<number>('/his/op/visit/diagnosis', data);
}

/** 获取诊断列表 */
export function getDiagnosisList(visitId: number) {
  return requestClient.get<OpDiagnosisApi.Diagnosis[]>(
    `/his/op/visit/diagnosis/list?visitId=${visitId}`,
  );
}

/** 更新诊断 */
export function updateDiagnosis(data: OpDiagnosisApi.DiagnosisSaveReqVO) {
  return requestClient.put<boolean>('/his/op/visit/diagnosis/update', data);
}

/** 删除诊断 */
export function deleteDiagnosis(visitId: number, diagnosisId: number) {
  return requestClient.delete<boolean>(
    `/his/op/visit/diagnosis/delete?visitId=${visitId}&diagnosisId=${diagnosisId}`,
  );
}

/** 搜索ICD-10诊断编码 */
export function searchIcd10Codes(params: OpDiagnosisApi.Icd10QueryReqVO) {
  return requestClient.get<OpDiagnosisApi.Icd10Code[]>(
    '/his/icd10/search',
    { params },
  );
}

/** 获取ICD-10诊断编码详情 */
export function getIcd10CodeDetail(code: string) {
  return requestClient.get<OpDiagnosisApi.Icd10Code>(
    `/his/icd10/get?code=${code}`,
  );
}

/** 获取常用诊断列表 */
export function getCommonDiagnosisList(deptId?: number) {
  return requestClient.get<OpDiagnosisApi.Icd10Code[]>(
    '/his/icd10/common-diagnosis',
    { params: { deptId } },
  );
}