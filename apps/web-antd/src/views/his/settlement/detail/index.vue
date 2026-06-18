<script lang="ts" setup>
import type { HisSettlementApi } from '#/api/his/settlement';

import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { Page } from '@vben/common-ui';

import { Card, Descriptions, DescriptionsItem, Tag } from 'ant-design-vue';

import { getSettlement } from '#/api/his/settlement';

const route = useRoute();
const settlement = ref<HisSettlementApi.Settlement>();

/** 结算状态字典 */
const STATUS_DICT: Record<number, { label: string; color: string }> = {
  0: { label: '待结算', color: 'default' },
  1: { label: '已结算', color: 'green' },
  2: { label: '已退费', color: 'red' },
  3: { label: '已作废', color: 'default' },
};

/** 结算类型字典 */
const SETTLEMENT_TYPE_DICT: Record<number, string> = {
  1: '正常结算',
  2: '中途结算',
  3: '出院结算',
};

/** 医保类型字典 */
const INSURANCE_TYPE_DICT: Record<number, string> = {
  1: '城镇职工医保',
  2: '城镇居民医保',
  3: '新农合',
  4: '自费',
};

/** 加载结算详情 */
async function loadSettlement() {
  const id = route.params.id as string;
  if (id) {
    settlement.value = await getSettlement(Number(id));
  }
}

loadSettlement();
</script>

<template>
  <Page auto-content-height>
    <Card title="结算基本信息" v-if="settlement">
      <Descriptions :column="3" bordered>
        <DescriptionsItem label="结算单号">{{ settlement.settlementNo }}</DescriptionsItem>
        <DescriptionsItem label="发票号">{{ settlement.invoiceNo || '-' }}</DescriptionsItem>
        <DescriptionsItem label="住院号">{{ settlement.inpatientNo }}</DescriptionsItem>
        <DescriptionsItem label="患者姓名">{{ settlement.patientName }}</DescriptionsItem>
        <DescriptionsItem label="身份证号">{{ settlement.idCardNo }}</DescriptionsItem>
        <DescriptionsItem label="入院日期">{{ settlement.admissionDate }}</DescriptionsItem>
        <DescriptionsItem label="出院日期">{{ settlement.dischargeDate || '-' }}</DescriptionsItem>
        <DescriptionsItem label="住院天数">{{ settlement.hospitalDays }} 天</DescriptionsItem>
        <DescriptionsItem label="科室">{{ settlement.deptName }}</DescriptionsItem>
        <DescriptionsItem label="病区">{{ settlement.wardName || '-' }}</DescriptionsItem>
        <DescriptionsItem label="床号">{{ settlement.bedNo || '-' }}</DescriptionsItem>
        <DescriptionsItem label="主治医生">{{ settlement.attendingDoctorName || '-' }}</DescriptionsItem>
        <DescriptionsItem label="医保类型">{{ INSURANCE_TYPE_DICT[settlement.insuranceType] || '-' }}</DescriptionsItem>
        <DescriptionsItem label="医保编号">{{ settlement.insuranceNo || '-' }}</DescriptionsItem>
        <DescriptionsItem label="结算类型">{{ SETTLEMENT_TYPE_DICT[settlement.settlementType] || '-' }}</DescriptionsItem>
        <DescriptionsItem label="结算状态">
          <Tag :color="STATUS_DICT[settlement.settlementStatus]?.color">
            {{ STATUS_DICT[settlement.settlementStatus]?.label || '-' }}
          </Tag>
        </DescriptionsItem>
        <DescriptionsItem label="入院诊断">{{ settlement.admissionDiagnosis || '-' }}</DescriptionsItem>
        <DescriptionsItem label="出院诊断" :span="2">{{ settlement.dischargeDiagnosis || '-' }}</DescriptionsItem>
      </Descriptions>
    </Card>

    <Card title="费用汇总" style="margin-top: 16px" v-if="settlement">
      <Descriptions :column="4" bordered>
        <DescriptionsItem label="总费用">¥{{ settlement.totalAmount }}</DescriptionsItem>
        <DescriptionsItem label="西药费">¥{{ settlement.westernMedicineFee || 0 }}</DescriptionsItem>
        <DescriptionsItem label="中药费">¥{{ settlement.chineseMedicineFee || 0 }}</DescriptionsItem>
        <DescriptionsItem label="检查费">¥{{ settlement.examinationFee || 0 }}</DescriptionsItem>
        <DescriptionsItem label="化验费">¥{{ settlement.laboratoryFee || 0 }}</DescriptionsItem>
        <DescriptionsItem label="治疗费">¥{{ settlement.treatmentFee || 0 }}</DescriptionsItem>
        <DescriptionsItem label="护理费">¥{{ settlement.nursingFee || 0 }}</DescriptionsItem>
        <DescriptionsItem label="手术费">¥{{ settlement.surgeryFee || 0 }}</DescriptionsItem>
        <DescriptionsItem label="床位费">¥{{ settlement.bedFee || 0 }}</DescriptionsItem>
        <DescriptionsItem label="材料费">¥{{ settlement.materialFee || 0 }}</DescriptionsItem>
        <DescriptionsItem label="其他费用">¥{{ settlement.otherFee || 0 }}</DescriptionsItem>
        <DescriptionsItem label="优惠金额">¥{{ settlement.discountAmount || 0 }}</DescriptionsItem>
      </Descriptions>
    </Card>

    <Card title="结算金额" style="margin-top: 16px" v-if="settlement">
      <Descriptions :column="3" bordered>
        <DescriptionsItem label="应付金额">¥{{ settlement.payableAmount }}</DescriptionsItem>
        <DescriptionsItem label="预交金">¥{{ settlement.prepaymentAmount || 0 }}</DescriptionsItem>
        <DescriptionsItem label="医保报销">¥{{ settlement.insuranceAmount || 0 }}</DescriptionsItem>
        <DescriptionsItem label="自付金额">¥{{ settlement.selfAmount || 0 }}</DescriptionsItem>
        <DescriptionsItem label="退费金额">¥{{ settlement.refundAmount || 0 }}</DescriptionsItem>
        <DescriptionsItem label="实收金额">¥{{ settlement.actualAmount || 0 }}</DescriptionsItem>
        <DescriptionsItem label="支付方式">{{ settlement.paymentTypeName || '-' }}</DescriptionsItem>
        <DescriptionsItem label="支付时间">{{ settlement.paymentTime || '-' }}</DescriptionsItem>
        <DescriptionsItem label="结算时间">{{ settlement.settlementTime || '-' }}</DescriptionsItem>
        <DescriptionsItem label="操作员">{{ settlement.operatorName || '-' }}</DescriptionsItem>
        <DescriptionsItem label="创建时间" :span="2">{{ settlement.createTime }}</DescriptionsItem>
        <DescriptionsItem label="备注" :span="3">{{ settlement.remark || '-' }}</DescriptionsItem>
      </Descriptions>
    </Card>
  </Page>
</template>