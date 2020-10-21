export default{
    name:'TableItem',

    props:{
        type:{
            type:String,  //选择。。。
            default: 'default',
        },
        value:String, //表格th的名字
        key:String, //用于与body绑定相关值
        width:{},
        fixed: [Boolean, String],
        index:[Number,Function] //指定列的位置
    }

    
}