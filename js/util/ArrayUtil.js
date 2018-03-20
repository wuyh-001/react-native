/**
 * Created by xiaowuzai on 2018/3/20.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity} from 'react-native';

export default class ArrayUtil {
    /*
    * 更新数组，若item已经存在则从数组中将其删除，否则添加到数组中
    * */
    static updataArray(array,item){
        for(var i=0;i<array.length;i++){
            var temp=array[i];
            if(temp==item){
                array.splice(i,1);
                return;
            };
        };
        array.push(item);
    }
}