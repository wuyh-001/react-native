/**
 * Created by Administrator on 2018/1/2.
 */
import React,{Component} from 'react';
import {View} from 'react-native';
import {FolderContainer} from './../../../../src/index.js';

import Demo from './Demo.js';

//import {FolderContainer} from 'IFTide';

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
                title: '这是第一个title',
                //content: '这是第一个content',
                //contentComponent:<Demo/>,
                status:'待审核',
                statusColor:'green'
            },
            {
                title: '这是第二个title',
                content: '这是第二个content',
                subTitle:'这是第二个subTitle',
                status:'待审核',
                statusColor:'red'
            }
        ];
        const SECTIONS2 = [
            {
                title: '这是第三个title',
                content: '这是第三个content',
            },
            {
                title: '这是第四个title',
                content: '这是第四个content',
            }
        ];
        let folderContainer1={
            hasImg:true,
            imgPos:'right',
            marginTop:10,
            contentColor:'#fff',
            isShowContentLine:false,
            initiallyActiveSection:0,
            hasAccording:false,
            section:SECTIONS1,
            clickFunc:this.folderClickFunc
        }
        let folderContainer2={
            hasImg:true,
            imgPos:'center',
            marginTop:10,
            initiallyActiveSection:0,
            section:SECTIONS2,
            clickFunc:this.folderClickFunc
        }

        return (
            <View>
                <FolderContainer {...folderContainer1}></FolderContainer>
                <View style={{height:40}}></View>
                <FolderContainer {...folderContainer2}></FolderContainer>
            </View>
        );

    }
}