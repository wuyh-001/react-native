/**
 * Created by Administrator on 2018/1/2.
 */
import React,{Component} from 'react';
import PropTypes from "prop-types";
import {StyleSheet,Text,View,Image,TouchableHighlight} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

import {FolderContainer} from 'IFTide';

export default class FolderContainer_Demo extends Component<{}> {
    constructor(props) {
        super(props);
    }
    folderClickFunc(index){
        console.log(index)
    }
    render(){
        const SECTIONS1 = [
            {
                title: '��Ҫ��Ϣ',
                content: '��������',
                status:'�����',
                statusColor:'green'
            },
            {
                title: '��Ҫ��Ϣ',
                content: '��������',
                subTitle:'��Ҫ��Ϣ',
                status:'δͨ��',
                statusColor:'red'
            }
        ];
        const SECTIONS2 = [
            {
                title: '��Ҫ��Ϣ',
                content: '��������'
            },
            {
                title: '��Ҫ��Ϣ',
                subTitle:'��Ҫ��Ϣ',
                content: '��������... loream��Ҫ��Ϣ�����,��������... loream��Ҫ��Ϣ�����,��������... loream��Ҫ��Ϣ�����,��������... loream��Ҫ��Ϣ�����    '
            }
        ];
        let folderContainer1={
            hasImg:true,
            imgPos:'right',
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

        return (
            <View>
                <FolderContainer {...folderContainer2}></FolderContainer>
                <FolderContainer {...folderContainer1}></FolderContainer>
            </View>
        );

    }
}