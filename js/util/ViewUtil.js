/**
 * Created by xiaowuzai on 2018/3/5.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity} from 'react-native';

export default class ViewUtil {
    static getLeftButton(callBack){
        return (
            <TouchableOpacity onPress={()=>{callBack()}}>
                <Image source={require('./../../res/images/ic_arrow_back_white_36pt.png')} style={{width:22,height:22}}/>
            </TouchableOpacity>
        )
    }
}













