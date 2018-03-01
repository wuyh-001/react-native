# DetailsList

##Example
![DetailsList](../img/detailsList.png)

##Usage

    #js
    import React, {Component} from 'react';
    import {DetailsList} from 'IFTide';

    export default class DetailsList_Demo extends Component{
        constructor(props) {
            super(props);
        }

        render(){
            const detailsListData = [
                {title:'户名',content:'中国工商银行'},
                {title:'英文户名',content:'China liange'},
                {title:'账号',content:'7412 8523 9632 8521 741'},
                {title:'账户状态',content:'正常'},
                {title:'开户行名称',content:'中国工商银行总行'},
                {title:'账户别名',content:'工商银行'},
                {title:'可用余额',content:['RMB 431213','PLN 12345','USD 23456','EUR 894793']},
                {title:'当前余额',content:['RMB 431213','PLN 12345','USD 23456','EUR 894793']}
            ]
            return(
                <View>
                    <DetailsList  detailsListData={detailsListData}/>
                </View>
            );
        }
    }

## CountDown Props
| prop | default | type | description |
| ------------ | ------------ | ------------ | ------------ |
| detailsListData | none | arr | 数据源 |