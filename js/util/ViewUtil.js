/**
 * Created by xiaowuzai on 2018/3/5.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity} from 'react-native';

import ThemeDao from './../expand/dao/ThemeDao.js';
export default class ViewUtil {
    static getLeftButton(callBack){
        return (
            <TouchableOpacity onPress={()=>{callBack()}}>
                <Image source={require('./../../res/images/ic_arrow_back_white_36pt.png')} style={{width:22,height:22}}/>
            </TouchableOpacity>
        )
    }
    static getRightButton(title,callBack){
        return (
            <TouchableOpacity
                onPress={()=>{callBack()}}
            >
               <View style={{marginRight:10}}>
                <Text style={{fontSize:20,color:'white'}}>{title}</Text>
               </View>
            </TouchableOpacity>
        )
    }
    static getMoreButton(callBack){
        return (
            <TouchableOpacity ref="moreMenuButton" style={{padding:5}} onPress={callBack}>
                <Image source={require('../../res/images/ic_more_vert_white_48pt.png')} style={{width:24,height:24}}/>
            </TouchableOpacity>
        )
    }
    /*
    获取设置页面的item
    callback             单击item的回调函数
    icon                 左侧图标
    text                 显示的文本
    tintStyle            图标样式
     expendableIcon      右侧图标
    */
    static getSettingItem(callBack,icon,text,tintStyle,expendableIcon){
        return (
            <TouchableOpacity
                onPress={callBack}
            >
                <View style={styles.setting_item_container}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image source={icon} style={[{width:20,height:20,marginRight:10},tintStyle]}/>
                        <Text>{text}</Text>
                    </View>
                    <Image source={expendableIcon?expendableIcon:require('../../res/images/ic_tiaozhuan.png')} style={[{width:20,height:20,marginRight:10},tintStyle]}/>
                </View>

            </TouchableOpacity>
        )
    }
}
const styles=StyleSheet.create({
    setting_item_container:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:10,
        height:60,
        backgroundColor:'white'
    }
});












