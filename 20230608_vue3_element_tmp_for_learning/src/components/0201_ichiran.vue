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
            <!-- <div v-for="application in applications">
                {{ application }}
            </div> -->
        </div>
        <div>
            <el-table :data="notifacations" style="width: 100%">
                <el-table-column fixed prop="ntcID" label="ID" width="150" />
                <el-table-column prop="ntcDATE" label="掲載開始日" width="120" />
                <el-table-column prop="ntcTITLE" label="タイトル" width="120" />
                <el-table-column prop="ntcJUYO" label="重要内容" width="120" />
                <el-table-column fixed="right" label="Operations" width="120">
                    <template #default>
                        <el-button link type="primary" size="small" @click="handleClick">Detail</el-button>
                        <el-button link type="primary" size="small">Edit</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <div v-for="application in applications">
                {{ application }}
            </div> -->
        </div> 
        <!-- ページネーション機能の設定 -->
        <div class="flex items-center mb-4">
            <!-- small 属性-->
            <el-radio-group v-model="small" class="mr-4">
                <el-radio-button :label="false">default</el-radio-button>
                <el-radio-button :label="true">small</el-radio-button>
            </el-radio-group>
            <!-- 背景属性 -->
            <div>
                background:
                <el-switch v-model="background" class="ml-2" />
            </div>
            <!-- disable 属性 -->
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

// 現在クエリされた申請情報
const applications = ref('');
// クエリされたお知らせ情報
const notifacations = ref('');
// ページ数
const applicationPageCount = ref('');
// 各ページの申請情報数
const applicationPageSize = ref(10);
// 申請数
const applicationCount = ref('');
// 現在のページ番号
const currentPage = ref(1);
// 一ページの申請をクエリする
const getApplicationPage = (pageNum) => {
    // 一ページの申請をクエリする
    axios.get('http://10.211.55.2:8815/Application/page/' + pageNum + '/' + applicationPageSize.value).then(response => {
        console.log(response);
        if (response.status == '200') {
        // ページ数をクエリする
        applicationPageCount.value = response.data.pages;
        // 申請数をクエリする
        applicationCount.value = response.data.total * 1;
        // 現在クエリされた申請情報をクエリする
        applications.value = response.data.list;
        }
    })
};
// お知らせをクエリする
const getNotifications = () =>{
    axios.get('http://10.211.55.2:8815/Notification/all').then(response => {
        if (response.status == '200') {
            notifacations.value = response.data.data;
        }
    });
}
// ページに入る時にクエリする
onMounted(() => {
    // 一ページの申請をクエリする
    getApplicationPage(1);
    // お知らせをクエリする
    getNotifications();
}
);
// small属性
const small = ref(false)
// background属性
const background = ref(false)
// disabled属性
const disabled = ref(false)

// 各ページの申請情報数変更時の行為
const handleSizeChange = (val) => {
    // 一ページの申請をクエリする
    getApplicationPage(currentPage.value);
    // console.log(`${val} items per page`)
}
// ページ変更時の行為
const handleCurrentChange = (val) => {
    // console.log(`current page: ${val}`)
    // 一ページの申請をクエリする
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