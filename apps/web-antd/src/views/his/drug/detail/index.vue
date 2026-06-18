<script lang="ts" setup>
import type { HisDrugApi } from '#/api/his/drug';

import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { Page } from '@vben/common-ui';

import { Card, Descriptions, DescriptionsItem, Tag } from 'ant-design-vue';

import { getDrug } from '#/api/his/drug';

const route = useRoute();
const drug = ref<HisDrugApi.Drug>();

/** 药品类型字典 */
const DRUG_TYPE_DICT: Record<number, string> = {
  1: '西药',
  2: '中成药',
  3: '中草药',
  4: '生物制品',
};

/** 医保类型字典 */
const INSURANCE_TYPE_DICT: Record<number, { label: string; color: string }> = {
  1: { label: '甲类', color: 'green' },
  2: { label: '乙类', color: 'blue' },
  3: { label: '自费', color: 'default' },
};

/** 特殊药品字典 */
const SPECIAL_DRUG_DICT: Record<number, { label: string; color: string }> = {
  0: { label: '普通', color: 'default' },
  1: { label: '麻醉药品', color: 'red' },
  2: { label: '一类精神', color: 'orange' },
  3: { label: '二类精神', color: 'orange' },
  4: { label: '毒性药品', color: 'red' },
};

/** 加载药品详情 */
async function loadDrug() {
  const id = route.params.id as string;
  if (id) {
    drug.value = await getDrug(Number(id));
  }
}

loadDrug();
</script>

<template>
  <Page auto-content-height>
    <Card title="药品基本信息" v-if="drug">
      <Descriptions :column="3" bordered>
        <DescriptionsItem label="药品编码">{{ drug.drugCode }}</DescriptionsItem>
        <DescriptionsItem label="药品名称">{{ drug.drugName }}</DescriptionsItem>
        <DescriptionsItem label="药品别名">{{ drug.drugAlias || '-' }}</DescriptionsItem>
        <DescriptionsItem label="药品类型">{{ DRUG_TYPE_DICT[drug.drugType] || '-' }}</DescriptionsItem>
        <DescriptionsItem label="药品分类">{{ drug.drugCategoryName || '-' }}</DescriptionsItem>
        <DescriptionsItem label="规格">{{ drug.spec }}</DescriptionsItem>
        <DescriptionsItem label="单位">{{ drug.unit }}</DescriptionsItem>
        <DescriptionsItem label="最小单位">{{ drug.minUnit }}</DescriptionsItem>
        <DescriptionsItem label="包装换算比">{{ drug.packRatio }}</DescriptionsItem>
        <DescriptionsItem label="生产厂家">{{ drug.manufacturer }}</DescriptionsItem>
        <DescriptionsItem label="批准文号">{{ drug.approvalNo }}</DescriptionsItem>
        <DescriptionsItem label="零售价">¥{{ drug.retailPrice }}</DescriptionsItem>
        <DescriptionsItem label="采购价">¥{{ drug.purchasePrice }}</DescriptionsItem>
        <DescriptionsItem label="医保类型">
          <Tag :color="INSURANCE_TYPE_DICT[drug.insuranceType]?.color">
            {{ INSURANCE_TYPE_DICT[drug.insuranceType]?.label || '-' }}
          </Tag>
        </DescriptionsItem>
        <DescriptionsItem label="医保编码">{{ drug.insuranceCode || '-' }}</DescriptionsItem>
        <DescriptionsItem label="特殊药品">
          <Tag :color="SPECIAL_DRUG_DICT[drug.isSpecial]?.color">
            {{ SPECIAL_DRUG_DICT[drug.isSpecial]?.label || '-' }}
          </Tag>
        </DescriptionsItem>
        <DescriptionsItem label="抗菌药物">
          <Tag :color="drug.isAntibiotic === 1 ? 'blue' : 'default'">
            {{ drug.isAntibiotic === 1 ? '是' : '否' }}
          </Tag>
        </DescriptionsItem>
        <DescriptionsItem label="需要皮试">
          <Tag :color="drug.skinTestRequired === 1 ? 'orange' : 'default'">
            {{ drug.skinTestRequired === 1 ? '需要' : '不需要' }}
          </Tag>
        </DescriptionsItem>
        <DescriptionsItem label="存储条件">{{ drug.storageCondition || '-' }}</DescriptionsItem>
        <DescriptionsItem label="有效期">{{ drug.shelfLife ? `${drug.shelfLife} 月` : '-' }}</DescriptionsItem>
        <DescriptionsItem label="状态">
          <Tag :color="drug.status === 1 ? 'green' : 'default'">
            {{ drug.status === 1 ? '正常' : '停用' }}
          </Tag>
        </DescriptionsItem>
        <DescriptionsItem label="创建时间" :span="2">{{ drug.createTime || '-' }}</DescriptionsItem>
        <DescriptionsItem label="备注" :span="3">{{ drug.remark || '-' }}</DescriptionsItem>
      </Descriptions>
    </Card>
  </Page>
</template>