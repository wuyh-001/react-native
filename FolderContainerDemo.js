/**
 * Created by xiaowuzai on 2018/2/7.
 */

import React, {Component} from 'react';
import {View} from 'react-native';

import {FolderContainer} from './rn_work/src/index.js';

export default class FolderContainerDemo extends Component{
    constructor(props) {
        super(props);
    }
    folderClickFunc(index){
        console.log(index)
    }

    render(){

        const SECTIONS1 = [
            {
                title: '主要信息',
                content: '内容区域'
            }
        ];

        let folderContainer1={
            hasImg:true,
            imgPos:'right',
            initiallyActiveSection:0,
            contentColor:'white',
            section:SECTIONS1,
            isShowHeaderLine:false,
            isHasPadding:false,
            isShowContentLine:false,
            clickFunc:this.folderClickFunc
        }



        return <FolderContainer {...folderContainer1}></FolderContainer>
    }
}