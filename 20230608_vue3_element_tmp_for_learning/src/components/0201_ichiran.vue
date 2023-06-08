<template>
    <!-- <div>fwe</div> -->
    <div>
        <h1></h1>
        <div>
            <el-table :data="applications" style="width: 100%">
                <el-table-column fixed prop="appUketsukeNo" label="受付番号" width="150" />
                <el-table-column prop="appShinseiKubun" label="申請区分" width="120" />
                <el-table-column prop="appShinseiDate" label="表紙_申請日" width="120" />
                <el-table-column prop="appKokaiyoStatus" label="公開用ステータス" width="120" />
                <el-table-column prop="appShinseishaKoshinDateTime" label="申請者更新日時" width="600" />
                <el-table-column fixed="right" label="Operations" width="120">
                    <template #default>
                        <el-button link type="primary" size="small" @click="handleClick">Detail</el-button>
                        <el-button link type="primary" size="small">Edit</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div v-for="application in applications">
                {{ application }}
            </div>
        </div>
        <div class="flex items-center mb-4">
            <el-radio-group v-model="small" class="mr-4">
                <el-radio-button :label="false">default</el-radio-button>
                <el-radio-button :label="true">small</el-radio-button>
            </el-radio-group>
            <div>
                background:
                <el-switch v-model="background" class="ml-2" />
            </div>
            <div class="ml-4">
                disabled: <el-switch v-model="disabled" class="ml-2" />
            </div>
        </div>
        <div class="demo-pagination-block">
            <div class="demonstration">All combined</div>
            <el-pagination v-model:current-page="currentPage" v-model:page-size="applicationPageSize"
                :page-sizes="[10, 20, 50, 100, 300, 400]" :small="small" :disabled="disabled" :background="background"
                layout="total, sizes, prev, pager, next, jumper" :total="applicationCount" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
        <el-form>

        </el-form>
        <!-- <div>
            {{ applicationPageCount }}
        </div> -->
    </div>
</template>
<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { ref } from 'vue'

const applications = ref('');
const notifacations = ref('');
const applicationPageCount = ref('');
const applicationPageSize = ref(10);
const applicationCount = ref('');
const currentPage = ref(1);
const getApplicationPage = (pageNum) => {
    axios.get('http://10.211.55.2:8815/Application/page/' + pageNum + '/' + applicationPageSize.value).then(response => {
        console.log(response);
        applicationPageCount.value = response.data.pages;
        applicationCount.value = response.data.total * 1;
        applications.value = response.data.list;
    })
};
onMounted(() => {
    axios.get('http://10.211.55.2:8815/Notification/all').then(response => {
        if (response.status == '200') {
            notifacations.value = response.data.data;
        }
    });
    getApplicationPage(1);
}
);

const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val) => {
    getApplicationPage(currentPage.value);
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {

    console.log(`current page: ${val}`)
    getApplicationPage(currentPage.value);
}
</script>
<style>
.demo-pagination-block+.demo-pagination-block {
    margin-top: 10px;
}

.demo-pagination-block .demonstration {
    margin-bottom: 16px;
}
</style>