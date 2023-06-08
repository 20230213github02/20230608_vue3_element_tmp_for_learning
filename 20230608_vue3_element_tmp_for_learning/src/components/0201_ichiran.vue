<template>
    <div>fwe</div>
    <div>
        <h1></h1>
        <!-- <li v-for="application in applications" :key="application.appUketsukeNo">
            {{ application }}
        </li> -->
        <!-- <li v-for="notification in notifacations" :key="notification.ntcID">
            {{ notification }}
        </li> -->
        <el-form>

        </el-form>
        <div>
            {{ applicationPageCount }}
        </div>
        <!-- <div class="demo-pagination-block">
            <div class="demonstration">All combined</div>
            <el-pagination v-model:current-page="currentPage" v-model:page-size="applicationPageCount"
                :page-sizes="[10, 20, 50, 100, 200, 500]" :small="small" :disabled="disabled" :background="background"
                layout="total, sizes, prev, pager, next, jumper" :total="applicationPageCount" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
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
// const currentPage = ref(1);
const getApplicationPage = (pageNum) => {
    axios.get('http://localhost:8815/Application/page/' + pageNum + '/' + applicationPageSize.value).then(response => {
        console.log(response);
        applicationPageCount.value = response.data.pages;
    })
};
onMounted(() => {
    axios.get('http://localhost:8815/Application/all').then(response => {
        // for test add by ZHY
        // console.log(response)
        if (response.status == '200') {
            applications.value = response.data.data;

            //for test add by ZHY
            // console.log(this.applications);
        }
    });
    axios.get('http://localhost:8815/Notification/all').then(response => {
        // console.log(response);
        if (response.status == '200') {
            notifacations.value = response.data.data;
            // console.log(this.notifacations);
        }
    });
    getApplicationPage(1);
}
);

// export default {
//     mounted() {


//     },
// methods: {
//     getApplicationPage(pageNum) {
//         axios.get('http://localhost:8815/Application/page/' + pageNum + '/' + this.applicationPageSize).then(response => {
//             console.log(response);
//             this.applicationPageCount = response.data.pages;
//         })
//     },

//     }
// }

const currentPage1 = ref(5)
const currentPage2 = ref(5)
const currentPage3 = ref(5)
const currentPage4 = ref(4)
const pageSize2 = ref(100)
const pageSize3 = ref(100)
const pageSize4 = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
    console.log(`current page: ${val}`)
}
</script>
<style></style>