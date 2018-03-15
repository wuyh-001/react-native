/**
 * Created by xiaowuzai on 2018/3/5.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity,ScrollView,AsyncStorage} from 'react-native';
import keys from './../../../res/data/keys.json';

export var FLAG_LANGUAGE={flag_language:'flag_language_language',flag_key:'flag_language_key'}
export default class LanguangeDao{
    constructor(flag){
        this.flag=flag;
    }
    fetch(){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(this.flag,(error,result)=>{
                if(error){
                    reject(error)
                }else{
                    if(result){
                        try{
                            resolve(JSON.parse(result))
                        }catch(e){
                            reject(e)
                        }
                    }else{
                        var data=this.flag===FLAG_LANGUAGE.flag_key?keys:null;
                        this.save(data);
                        resolve(data);
                    }
                }
            })
        })
    }
    save(data){
        var stringData=JSON.stringify(data);
        AsyncStorage.setItem(this.flag,stringData,(error)=>{

        })
    }
}