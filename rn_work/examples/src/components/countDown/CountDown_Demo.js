/**
 * Created by Administrator on 2018/1/2.
 */
import React, {Component} from 'react';
import PropTypes from "prop-types";
import {StyleSheet,Text,View} from 'react-native';

import {CountDown} from 'IFTide';

export default class CountDown_Demo extends Component{
    constructor(props) {
        super(props);
    }
    start(){
        console.log('start')
    }
    finished(){
        console.log('end')
    }

    render(){
        let countDown={
            startTime:5,
            tip:'获取验证码',
            width:100,
            bgColor:'#ff7b7b',
            onPress:this.start,
            finishedFun:this.finished
        };
        return(
            <View>
                <CountDown {...countDown}/>
            </View>
        );
    }
}