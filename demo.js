/**
 * Created by Administrator on 2018/1/2.
 */
import React, {Component} from 'react';
import PropTypes from "prop-types";
import {StyleSheet,Text,View,TextInput,ScrollView} from 'react-native';

import {CountDown,FolderContainer,SwipeAction,DetailsList} from './rn_work/src/index.js'
import FolderContainerDemo from './FolderContainerDemo.js';

export default class Demo extends Component{
    constructor(props) {
        super(props);
    }

    start(){
        console.log('start')
    }
    finished(){
        console.log('end')
    }
    swiperDeleteEven(rowData,sectionId,rowID){
        console.log(rowData,sectionId,rowID)
    }
    folderClickFunc(index){
        console.log(index)

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

        let countDown={
            startTime:5,
            tip:'获取验证码',
            width:100,
            bgColor:'#ff7b7b',
            onPress:this.start,
            finishedFun:this.finished
        };

        let deleteListView={
            deleteText:'删除',
            bgColor:'#ff7b7b',
            dataSource:['工商银行','招商银行','农业银行'],
            swiperDeleteEvent:this.swiperDeleteEven
        };

        const SECTIONS1 = [
            {
                //title: '主要信息',
                titleComponent:<Text style={{marginBottom:5}}>123</Text>,
                content: '内容区域',
                status:'已审核',
                statusColor:'green'
            },
            {
                title: '主要信息',
                //content: '内容区域',
                contentComponent:<FolderContainerDemo/>,
                subTitle:'次要信息',
                status:'未通过',
                statusColor:'red'
            },
            {
                title: '主要信息',
                content: '内容区域',
                //contentComponent:<FolderContainerDemo/>,
                subTitle:'次要信息',
                subTitleComponent:<Text style={{marginBottom:5}}>123</Text>,
                status:'未通过',
                statusColor:'yellow'
            }
        ];
        const SECTIONS2 = [
            {
                title: '主要信息',
                content: '内容区域',
            },
            {
                title: '主要信息',
                subTitle:'次要信息',
                content: '内容区域... loream主要信息已审核,内容区域... loream主要信息已审核,内容区域... loream主要信息已审核,内容区域... loream主要信息已审核    '
            }
        ];
        let folderContainer1={
            hasImg:true,
            imgPos:'right',
            marginTop:5,
            contentColor:'#fff',
            isShowContentLine:false,
            isShowHeaderLine:true,
            isHasMargin:true,
            isHasPadding:true,
            hasAccording:false,
            initiallyActiveSection:0,
            section:SECTIONS1,
            clickFunc:this.folderClickFunc
        }
        let folderContainer2={
            hasImg:true,
            imgPos:'center',
            initiallyActiveSection:0,
            section:SECTIONS2,
            clickFunc:this.folderClickFunc
        }



        return(
            <ScrollView>
                {/*
                <CountDown {...countDown}/>
                <SwipeAction {...deleteListView}></SwipeAction>

                <FolderContainer {...folderContainer2}></FolderContainer>
                 */}
                <FolderContainer {...folderContainer1}></FolderContainer>

            </ScrollView>
        );
    }
}