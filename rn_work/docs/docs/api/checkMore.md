# CheckMore

##Example
![CheckMore](../img/CheckMore.jpg)

##Usage

    #js
    import React, { Component } from 'react';
    import {CheckMore} from 'IFTide';

    export default class CheckMore_Demo extends Component{
        constructor(props) {
            super(props);
        }
        callBackFun(flag){
            console.log(flag)
        }
        handleFunc(){
            console.log(123)
        }

        render(){
            const detailsListData = [
                {title:'户名',subTitle:'中国工商银行中国工商银行中国工商银行中国工商银行中国工商银行中国工商银行'},
                {title:'英文户名',subTitle:'China liange'},
                {title:'账号',subTitle:'7412 8523 9632 8521 741'},
                {title:'账户状态',subTitle:'正常'},
                {subTitle:'中国工商银行总行',titleComponent:<TextInput style={{width:200,height:50,borderColor:'red',borderWidth:1}}/>}
            ];
            let checkMore={
                limitNum:3,
                data:detailsListData,
                //errorMsg:'错误提示信息',
                //errorMsgColor:'blue',
                //handleTips:'操作',
                //handleFunc:this.handleFunc,
                clickFun:this.callBackFun
            }
            return(
                <CheckMore  {...checkMore}/>
            );
        }
    }

## Validator Props
| prop | default | type | description |
| ------------ | ------------ | ------------ | ------------ |
| errorMsg | none | string | 错误提示信息 |
| errorMsgColor | none | #ea4940 | 错误提示信息字体颜色 |
| handleTips | none | arr | 操作提示语 |
| handleFunc | none | fun | 操作回调函数 |
| clickFun | none | fun | 点击下拉箭头的回调函数 |
| limitNum | 3 | num | 初始化显示的列表个数 |
| data | none | arr | 数据 |