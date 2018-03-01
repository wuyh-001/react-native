/**
 * Created by xiaowuzai on 2018/1/30.
 */
import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Image,ListView,TouchableOpacity,RefreshControl,TextInput} from 'react-native';
//import Accordion from 'react-native-collapsible/Accordion';

import Accordion from './Accordion.js'



const SECTIONS = [
    {
        title: 'First',
        content:'123',
        titleComponent: <Text>test title</Text>

    },
    {
        title: 'Second',
        content:'789',
        contentComponent: <TextInput placeholder='placeholder' style={{borderWidth:1,borderColor:'red',height:30}}/>
    }
];


export default class CollapsibleCom extends Component {
    constructor(props) {
        super(props)

    }
    _renderHeader(section,index,isActive,arr) {
        console.log('section'+section)
        console.log('index'+index)
        console.log('isActive'+isActive)
        console.log('arr'+arr)
        let component,title;
        if(section.titleComponent){
            component=section.titleComponent
        }
        if(section.title){
            content=<Text>{section.title}</Text>
    }
        return (
            <View>
                {component}
                {content}
            </View>
        );
    }

    _renderContent(section) {
        let component,content;
        if(section.contentComponent){
            component=section.contentComponent
        }
        if(section.content){
            content=<Text>{section.content}</Text>
        }

        return (
            <View>
                {component}
                {content}
            </View>
        );
    }

    render() {
        return (
            <Accordion
                sections={SECTIONS}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
            />
        )
    }
}
const styles = StyleSheet.create({
    row: {
        flex: 1,
        height:50
    },
    tips:{

    },
    line:{
        borderWidth:1,
        borderBottomColor:'#ccc',
        height:1
    }
});