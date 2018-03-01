/**
 * Created by Administrator on 2018/1/2.
 */
import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Platform,StyleSheet,Text,View,ListView,TouchableOpacity} from 'react-native';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';

import {SwipeAction} from 'IFTide';

export default class SwipeAction_Demo extends Component{
    constructor(props) {
        super(props);
    }
    swiperDeleteEven(rowData,sectionId,rowID){
        console.log(rowData,sectionId,rowID)
    }

    render(){
        let deleteListView={
            deleteText:'ɾ��',
            bgColor:'#ff7b7b',
            dataSource:['��������','��������','ũҵ����'],
            swiperDeleteEvent:this.swiperDeleteEven
        };
        return(
            <View>
                <SwipeAction {...deleteListView}></SwipeAction>
            </View>
        );
    }
}