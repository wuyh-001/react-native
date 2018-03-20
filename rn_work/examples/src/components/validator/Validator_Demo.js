/**
 * Created by xiaowuzai on 2018/3/20.
 */
import React, {Component} from 'react';
import {Validator} from './../../../../src/index.js';
import { View,Text } from 'react-native';

export default class Validator_Demo extends Component{
    constructor(props) {
        super(props);
    }

    handleFunc(){
        console.log('给我狠狠的刷新')
    }

    render(){
        let icon=require('./fj.jpg');
        let validator={
            errorMsg:'网络不给力啊',
            tips:'世界上最遥远的距离,就是我有网而你没有',
            handleTips:'给我狠狠的刷新',
            handleFunc:this.handleFunc,
            img:icon
        }
        return(
                <Validator {...validator}/>
        );
    }
}