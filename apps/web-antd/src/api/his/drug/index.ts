import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace HisDrugApi {
  /** 药品信息 */
  export interface Drug {
    id: number; // 药品ID
    drugCode: string; // 药品编码
    drugName: string; // 药品名称
    drugAlias?: string; // 药品别名
    drugType: number; // 药品类型：1-西药 2-中成药 3-中草药 4-生物制品
    drugTypeName?: string; // 药品类型名称
    drugCategory: number; // 药品分类
    drugCategoryName?: string; // 药品分类名称
    spec: string; // 规格
    unit: string; // 单位
    minUnit: string; // 最小单位
    packRatio: number; // 包装换算比
    manufacturer: string; // 生产厂家
    approvalNo: string; // 批准文号
    retailPrice: number; // 零售价
    purchasePrice: number; // 采购价
    insuranceType: number; // 医保类型：1-甲类 2-乙类 3-自费
    insuranceTypeName?: string; // 医保类型名称
    insuranceCode?: string; // 医保编码
    isSpecial: number; // 是否特殊药品：0-普通 1-麻醉 2-一类精神 3-二类精神 4-毒性
    isSpecialName?: string; // 特殊药品名称
    isAntibiotic: number; // 是否抗菌药物：0-否 1-是
    skinTestRequired: number; // 是否需要皮试：0-否 1-是
    storageCondition?: string; // 存储条件
    shelfLife?: number; // 有效期（月）
    status: number; // 状态：0-停用 1-正常
    statusName?: string; // 状态名称
    remark?: string; // 备注
    createTime?: Date; // 创建时间
  }

  /** 药品分页查询参数 */
  export interface DrugPageReqVO extends PageParam {
    drugCode?: string; // 药品编码
    drugName?: string; // 药品名称（模糊）
    drugType?: number; // 药品类型
    drugCategory?: number; // 药品分类
    manufacturer?: string; // 生产厂家
    status?: number; // 状态
    isSpecial?: number; // 是否特殊药品
    isAntibiotic?: number; // 是否抗菌药物
  }

  /** 药品保存请求 */
  export interface DrugSaveReqVO {
    id?: number; // 药品ID（更新时必填）
    drugCode: string; // 药品编码
    drugName: string; // 药品名称
    drugAlias?: string; // 药品别名
    drugType: number; // 药品类型
    drugCategory: number; // 药品分类
    spec: string; // 规格
    unit: string; // 单位
    minUnit: string; // 最小单位
    packRatio: number; // 包装换算比
    manufacturer: string; // 生产厂家
    approvalNo: string; // 批准文号
    retailPrice: number; // 零售价
    purchasePrice: number; // 采购价
    insuranceType: number; // 医保类型
    insuranceCode?: string; // 医保编码
    isSpecial: number; // 是否特殊药品
    isAntibiotic: number; // 是否抗菌药物
    skinTestRequired: number; // 是否需要皮试
    storageCondition?: string; // 存储条件
    shelfLife?: number; // 有效期（月）
    status: number; // 状态
    remark?: string; // 备注
  }
}

/** 查询药品分页列表 */
export function getDrugPage(params: HisDrugApi.DrugPageReqVO) {
  return requestClient.get<PageResult<HisDrugApi.Drug>>('/his/drug/page', {
    params,
  });
}

/** 查询药品详情 */
export function getDrug(id: number) {
  return requestClient.get<HisDrugApi.Drug>(`/his/drug/get?id=${id}`);
}

/** 查询药品列表 */
export function getDrugList() {
  return requestClient.get<HisDrugApi.Drug[]>('/his/drug/list');
}

/** 按名称模糊查询药品 */
export function getDrugListByName(drugName: string) {
  return requestClient.get<HisDrugApi.Drug[]>('/his/drug/list-by-name', {
    params: { drugName },
  });
}

/** 按类型查询药品 */
export function getDrugListByType(drugType: number) {
  return requestClient.get<HisDrugApi.Drug[]>('/his/drug/list-by-type', {
    params: { drugType },
  });
}

/** 获取特殊药品列表（麻醉、精神、毒性药品） */
export function getSpecialDrugList() {
  return requestClient.get<HisDrugApi.Drug[]>('/his/drug/special-list');
}

/** 获取抗菌药物列表 */
export function getAntibioticDrugList() {
  return requestClient.get<HisDrugApi.Drug[]>('/his/drug/antibiotic-list');
}

/** 新增药品 */
export function createDrug(data: HisDrugApi.DrugSaveReqVO) {
  return requestClient.post('/his/drug/create', data);
}

/** 修改药品 */
export function updateDrug(data: HisDrugApi.DrugSaveReqVO) {
  return requestClient.put('/his/drug/update', data);
}

/** 删除药品 */
export function deleteDrug(id: number) {
  return requestClient.delete(`/his/drug/delete?id=${id}`);
}

/** 导出药品 Excel */
export function exportDrugExcel(params: HisDrugApi.DrugPageReqVO) {
  return requestClient.download('/his/drug/export-excel', { params });
}
