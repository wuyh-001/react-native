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
    /*
    * 克隆一个数组
    * */
    static clone(arr){
        if(!arr){
            return []
        };
        let newArray=[];
        for(let i=0;i<arr.length;i++){
            newArray[i]=arr[i]
        };
        return newArray;
    }
    /*
    * 判断两个数组是否完全相同
    * */
    static isEqual(arr1,arr2){
        if(!arr1&&arr2){return false};
        if(arr1.length!=arr2.length){return false};
        for(let i=0;i<arr2.length;i++){
            if(arr1[i]!==arr2[i]){
                return false;
            };
        };
        return true;
    }
    /*
    *将数组中制定元素移除
    * */
    static remove(arr,item){
        if(!arr){return};
        for(let i=0;i<arr.length;i++){
            if(item==arr[i]){
                arr.splice(i,1)
            };
        };
    }

}