/**
 * Created by Administrator on 2018/1/2.
 */
import React,{Component} from 'react';
import {View,TextInput} from 'react-native';

import FolderContainer from './FolderContainer.js';

export default class FolderContainer_Demo extends Component<{}> {
    constructor(props) {
        super(props);
    }
    folderClickFunc(index){
        console.log(index)
    }
    render(){
        const SECTIONS = [
            {
                title: 'First',
                content: 'Lorem ipsum...',
            },
            {
                title: 'Second',
                content: 'Lorem ipsum...',
                contentComponent: <TextInput placeholder='placeholder' style={{borderWidth:1,borderColor:'red',height:30}}/>
            }
        ];
        let folderContainer={
            hasImg:true,
            imgPos:'right',
            initiallyActiveSection:0,
            section:SECTIONS,
            clickFunc:this.folderClickFunc
        }

        return (
            <View>
                <FolderContainer {...folderContainer}></FolderContainer>
            </View>
        );

    }
}