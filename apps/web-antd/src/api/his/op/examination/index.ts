import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace OpExaminationApi {
  /** 检验/检查申请单 */
  export interface ExaminationRequest {
    id?: number; // 申请单ID
    requestNo: string; // 申请单号
    visitId: number; // 就诊ID（挂号ID）
    patientId: number; // 患者ID
    patientName: string; // 患者姓名
    gender?: number; // 性别
    age?: number; // 年龄
    deptId: number; // 申请科室ID
    deptName: string; // 申请科室名称
    doctorId: number; // 申请医生ID
    doctorName: string; // 申请医生姓名
    requestType: number; // 申请类型：1-检验，2-检查
    diagnosis?: string; // 临床诊断
    diagnosisCodes?: string; // 诊断编码
    status: number; // 状态
    statusName?: string; // 状态名称
    totalAmount: number; // 总金额
    remark?: string; // 备注
    items: ExaminationItem[]; // 申请项目列表
    createTime?: Date; // 创建时间
  }

  /** 检验/检查项目 */
  export interface ExaminationItem {
    id?: number; // 项目ID
    requestId: number; // 申请单ID
    itemType: number; // 项目类型：1-检验，2-检查
    itemCode: string; // 项目编码
    itemName: string; // 项目名称
    execDeptId?: number; // 执行科室ID
    execDeptName?: string; // 执行科室名称
    price: number; // 单价
    quantity: number; // 数量
    amount: number; // 金额
    status?: number; // 状态
    result?: string; // 结果
    abnormalFlag?: number; // 异常标志：0-正常，1-异常
    reportTime?: Date; // 报告时间
    remark?: string; // 备注
  }

  /** 检验/检查申请保存请求 */
  export interface ExaminationSaveReqVO {
    id?: number; // 申请单ID（更新时必填）
    visitId: number; // 就诊ID
    patientId: number; // 患者ID
    patientName: string; // 患者姓名
    deptId: number; // 科室ID
    deptName: string; // 科室名称
    doctorId: number; // 医生ID
    doctorName: string; // 医生姓名
    requestType: number; // 申请类型
    diagnosis?: string; // 临床诊断
    diagnosisCodes?: string; // 诊断编码
    remark?: string; // 备注
    items: ExaminationItemSaveVO[]; // 申请项目列表
  }

  /** 检验/检查项目保存请求 */
  export interface ExaminationItemSaveVO {
    id?: number; // 项目ID
    itemType: number; // 项目类型
    itemCode: string; // 项目编码
    itemName: string; // 项目名称
    execDeptId?: number; // 执行科室ID
    price: number; // 单价
    quantity: number; // 数量
    remark?: string; // 备注
  }

  /** 检验/检查套餐 */
  export interface ExaminationPackage {
    id: number; // 套餐ID
    name: string; // 套餐名称
    packageType: number; // 套餐类型：1-检验，2-检查
    deptId?: number; // 科室ID
    items: ExaminationPackageItem[]; // 套餐项目列表
    totalPrice: number; // 套餐总价
    description?: string; // 套餐描述
    isCommon?: boolean; // 是否常用
  }

  /** 套餐项目 */
  export interface ExaminationPackageItem {
    id: number; // 项目ID
    itemCode: string; // 项目编码
    itemName: string; // 项目名称
    itemType: number; // 项目类型
    price: number; // 单价
  }

  /** 申请单分页查询参数 */
  export interface ExaminationPageReqVO extends PageParam {
    requestNo?: string; // 申请单号
    patientId?: number; // 患者ID
    patientName?: string; // 患者姓名
    deptId?: number; // 科室ID
    doctorId?: number; // 医生ID
    requestType?: number; // 申请类型
    status?: number; // 状态
    startTime?: string; // 开始时间
    endTime?: string; // 结束时间
  }

  /** 检验项目查询参数 */
  export interface ExaminationItemQueryReqVO {
    keyword?: string; // 关键词
    itemType?: number; // 项目类型
    deptId?: number; // 科室ID
    limit?: number; // 返回数量限制
  }

  /** 检验/检查项目字典 */
  export interface ExaminationItemDict {
    itemCode: string; // 项目编码
    itemName: string; // 项目名称
    itemType: number; // 项目类型
    execDeptId?: number; // 执行科室ID
    execDeptName?: string; // 执行科室名称
    price: number; // 单价
    unit?: string; // 单位
    referenceRange?: string; // 参考范围
    isCommon?: boolean; // 是否常用
  }
}

/** 创建检验/检查申请 */
export function createExaminationRequest(data: OpExaminationApi.ExaminationSaveReqVO) {
  return requestClient.post<number>('/his/examination/create', data);
}

/** 更新检验/检查申请 */
export function updateExaminationRequest(data: OpExaminationApi.ExaminationSaveReqVO) {
  return requestClient.put<boolean>('/his/examination/update', data);
}

/** 删除检验/检查申请 */
export function deleteExaminationRequest(id: number) {
  return requestClient.delete<boolean>(`/his/examination/delete?id=${id}`);
}

/** 获取检验/检查申请详情 */
export function getExaminationRequest(id: number) {
  return requestClient.get<OpExaminationApi.ExaminationRequest>(
    `/his/examination/get?id=${id}`,
  );
}

/** 根据申请单号查询 */
export function getExaminationRequestByNo(requestNo: string) {
  return requestClient.get<OpExaminationApi.ExaminationRequest>(
    `/his/examination/get-by-no?requestNo=${requestNo}`,
  );
}

/** 获取检验/检查申请分页 */
export function getExaminationRequestPage(params: OpExaminationApi.ExaminationPageReqVO) {
  return requestClient.get<PageResult<OpExaminationApi.ExaminationRequest>>(
    '/his/examination/page',
    { params },
  );
}

/** 根据就诊ID查询申请列表 */
export function getExaminationRequestListByVisitId(visitId: number) {
  return requestClient.get<OpExaminationApi.ExaminationRequest[]>(
    `/his/examination/list-by-visit?visitId=${visitId}`,
  );
}

/** 根据患者ID查询申请历史 */
export function getExaminationRequestListByPatientId(patientId: number) {
  return requestClient.get<OpExaminationApi.ExaminationRequest[]>(
    `/his/examination/list-by-patient?patientId=${patientId}`,
  );
}

/** 搜索检验/检查项目 */
export function searchExaminationItems(params: OpExaminationApi.ExaminationItemQueryReqVO) {
  return requestClient.get<OpExaminationApi.ExaminationItemDict[]>(
    '/his/examination/item/search',
    { params },
  );
}

/** 获取常用检验/检查项目 */
export function getCommonExaminationItems(itemType?: number, deptId?: number) {
  return requestClient.get<OpExaminationApi.ExaminationItemDict[]>(
    '/his/examination/item/common-list',
    { params: { itemType, deptId } },
  );
}

/** 获取检验/检查套餐列表 */
export function getExaminationPackageList(packageType?: number, deptId?: number) {
  return requestClient.get<OpExaminationApi.ExaminationPackage[]>(
    '/his/examination/package/list',
    { params: { packageType, deptId } },
  );
}

/** 获取检验/检查套餐详情 */
export function getExaminationPackage(id: number) {
  return requestClient.get<OpExaminationApi.ExaminationPackage>(
    `/his/examination/package/get?id=${id}`,
  );
}

/** 取消检验/检查申请 */
export function cancelExaminationRequest(id: number, reason?: string) {
  return requestClient.post<boolean>(
    '/his/examination/cancel',
    null,
    { params: { id, reason } },
  );
}