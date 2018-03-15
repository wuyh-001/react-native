import React, {Component} from 'react';
import {CheckMore} from './../../../../src/index.js';

export default class DetailsList_Demo extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        const detailsListData = [
            {title:'户名',subTitle:'中国工商银行中国工商银行中国工商银行中国工商银行中国工商银行中国工商银行'},
            {title:'英文户名',subTitle:'China liange'},
            {title:'账号',subTitle:'7412 8523 9632 8521 741'},
            {title:'账户状态',subTitle:'正常'},
            {title:'开户行名称',subTitle:'中国工商银行总行'},
            {title:'户名',subTitle:'中国工商银行中国工商银行中国工商银行中国工商银行中国工商银行中国工商银行'},
            {title:'英文户名',subTitle:'China liange'}

        ]
        return(
            <CheckMore  detailsListData={detailsListData}/>
        );
    }
}