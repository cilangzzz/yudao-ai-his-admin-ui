<script lang="ts" setup>
import type { OpPrescriptionApi } from '#/api/his/prescription';

import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { Page } from '@vben/common-ui';

import {
  Card,
  Descriptions,
  DescriptionsItem,
  Tag,
  Table,
  TableColumn,
  Divider,
} from 'ant-design-vue';

import { getPrescription } from '#/api/his/prescription';

const route = useRoute();
const prescription = ref<OpPrescriptionApi.Prescription>();

/** 处方类型字典 */
const PRESCRIPTION_TYPE_DICT: Record<number, string> = {
  1: '西药',
  2: '中药',
  3: '中成药',
};

/** 处方状态字典 */
const PRESCRIPTION_STATUS_DICT: Record<number, { label: string; color: string }> = {
  0: { label: '待审核', color: 'orange' },
  1: { label: '已审核', color: 'green' },
  2: { label: '已调配', color: 'blue' },
  3: { label: '已发药', color: 'cyan' },
  4: { label: '已退药', color: 'red' },
  5: { label: '已作废', color: 'default' },
};

/** 性别字典 */
const GENDER_DICT: Record<number, string> = {
  1: '男',
  2: '女',
};

/** 皮试结果字典 */
const SKIN_TEST_RESULT_DICT: Record<number, { label: string; color: string }> = {
  0: { label: '阴性', color: 'green' },
  1: { label: '阳性', color: 'red' },
};

/** 加载处方详情 */
async function loadPrescription() {
  const id = route.params.id as string;
  if (id) {
    prescription.value = await getPrescription(Number(id));
  }
}

loadPrescription();

/** 获取处方状态显示 */
function getStatusDisplay(status: number) {
  const item = PRESCRIPTION_STATUS_DICT[status];
  return item || { label: '-', color: 'default' };
}

/** 获取皮试结果显示 */
function getSkinTestResultDisplay(result?: number) {
  if (result === undefined || result === null) return null;
  const item = SKIN_TEST_RESULT_DICT[result];
  return item || { label: '-', color: 'default' };
}
</script>

<template>
  <Page auto-content-height>
    <template v-if="prescription">
      <!-- 处方基本信息 -->
      <Card title="处方基本信息">
        <Descriptions :column="3" bordered>
          <DescriptionsItem label="处方编号">{{ prescription.prescriptionNo }}</DescriptionsItem>
          <DescriptionsItem label="处方类型">
            <Tag color="blue">{{ PRESCRIPTION_TYPE_DICT[prescription.prescriptionType] || '-' }}</Tag>
          </DescriptionsItem>
          <DescriptionsItem label="状态">
            <Tag :color="getStatusDisplay(prescription.status).color">
              {{ getStatusDisplay(prescription.status).label }}
            </Tag>
          </DescriptionsItem>
          <DescriptionsItem label="患者姓名">{{ prescription.patientName }}</DescriptionsItem>
          <DescriptionsItem label="身份证号">{{ prescription.idCardNo }}</DescriptionsItem>
          <DescriptionsItem label="性别">
            <Tag :color="prescription.gender === 1 ? 'blue' : 'pink'">
              {{ GENDER_DICT[prescription.gender] || '-' }}
            </Tag>
          </DescriptionsItem>
          <DescriptionsItem label="年龄">{{ prescription.age }} 岁</DescriptionsItem>
          <DescriptionsItem label="联系电话">{{ prescription.phone || '-' }}</DescriptionsItem>
          <DescriptionsItem label="科室">{{ prescription.deptName }}</DescriptionsItem>
          <DescriptionsItem label="开方医生">{{ prescription.doctorName }}</DescriptionsItem>
          <DescriptionsItem label="诊断" :span="3">{{ prescription.diagnosis }}</DescriptionsItem>
          <DescriptionsItem label="总金额">
            <span style="color: #f5222d; font-weight: bold;">
              ¥{{ prescription.totalAmount?.toFixed(2) || '0.00' }}
            </span>
          </DescriptionsItem>
          <DescriptionsItem label="备注" :span="2">{{ prescription.remark || '-' }}</DescriptionsItem>
          <DescriptionsItem label="创建时间" :span="3">{{ prescription.createTime }}</DescriptionsItem>
        </Descriptions>
      </Card>

      <Divider />

      <!-- 处方明细 -->
      <Card title="处方明细">
        <Table
          :data-source="prescription.items"
          :pagination="false"
          bordered
          row-key="id"
        >
          <TableColumn title="序号" width="60" data-index="id" :custom-render="({ index }) => index + 1" />
          <TableColumn title="药品编码" width="120" data-index="drugCode" />
          <TableColumn title="药品名称" width="150" data-index="drugName" />
          <TableColumn title="规格" width="100" data-index="spec" />
          <TableColumn title="数量" width="80" data-index="quantity" />
          <TableColumn title="单位" width="60" data-index="unit" />
          <TableColumn title="用法" width="100" data-index="usageMethod" />
          <TableColumn title="用量" width="100">
            <template #default="{ record }">
              {{ record.dosage }}{{ record.dosageUnit || '' }}
            </template>
          </TableColumn>
          <TableColumn title="频次" width="80" data-index="frequency" />
          <TableColumn title="天数" width="60" data-index="days" />
          <TableColumn title="单价" width="80">
            <template #default="{ record }">
              ¥{{ record.unitPrice?.toFixed(2) || '0.00' }}
            </template>
          </TableColumn>
          <TableColumn title="金额" width="80">
            <template #default="{ record }">
              ¥{{ record.totalAmount?.toFixed(2) || '0.00' }}
            </template>
          </TableColumn>
          <TableColumn title="皮试" width="80">
            <template #default="{ record }">
              <Tag v-if="record.skinTestRequired === 1" color="orange">需要</Tag>
              <span v-else>-</span>
            </template>
          </TableColumn>
          <TableColumn title="皮试结果" width="100">
            <template #default="{ record }">
              <template v-if="record.skinTestRequired === 1">
                <Tag v-if="record.skinTestResult !== undefined && record.skinTestResult !== null"
                     :color="getSkinTestResultDisplay(record.skinTestResult)?.color">
                  {{ getSkinTestResultDisplay(record.skinTestResult)?.label }}
                </Tag>
                <span v-else style="color: #999;">待测</span>
              </template>
              <span v-else>-</span>
            </template>
          </TableColumn>
          <TableColumn title="备注" data-index="remark" :ellipsis="true" />
        </Table>
      </Card>
    </template>
  </Page>
</template>