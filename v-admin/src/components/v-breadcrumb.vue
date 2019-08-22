<template> 
    <el-breadcrumb 
    v-if="breadcrumbValue.length > 2"
    separator-class="el-icon-arrow-right"
    style="text-align: right; font-size: 12px; height: 30px; margin:10px 20px 0px; 20px;"
    >
        <template v-for="item in breadcrumbValue">
            <el-breadcrumb-item
                v-if="item.to"
                :key="item.name"
                :to="item.to"
                :replace="true"
            >
                {{item.name}}
            </el-breadcrumb-item>
            <el-breadcrumb-item v-else :key="item.name">
                {{item.name}}
            </el-breadcrumb-item>
        </template>
    </el-breadcrumb>
</template>

<script>
export default {
    props: {
        breadcrumb: {
            type:Array,
            default: () => []
        }
    },
    data () {
        return {};
    },
    computed: {
        breadcrumbValue() {
            const { breadcrumb } = this;
            console.log(breadcrumb)
            if (breadcrumb.length) {
                return breadcrumb
            };
            return this.$route.matched
            .filter(data=> data.meta && data.meta.breadcrumb)
            .map(data => ({
                name: data.meta.breadcrumb.title,
                to: data.meta.replace ? { path: data.name} : undefined
            }));
        }
    },   
}
</script>