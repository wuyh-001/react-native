/**
 * Created by wuyanhua on 2018/7/31.
 */

import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,DeviceEventEmitter} from 'react-native';
import HomePage,{ACTION_HOME} from './HomePage.js';

import {NavigationActions } from 'react-navigation';

export default class BaseComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            theme:this.props.theme
        }
    }
    componentDidMount(){
        let that=this;
        this.baseListener=DeviceEventEmitter.addListener('ACTION_BASE',(action,params)=>that.onBaseAction(action,params))
    }
    componentWillUnmount(){
        this.baseListener&&this.baseListener.remove();
    }
    //通知回调事件处理
    onBaseAction(action,params){
        if(action==ACTION_HOME.A_THEME){
            this.onThemeChange(params);
        }
    }

    onThemeChange(theme){
        if(!theme){return};
        this.setState({theme:theme})
    }

}

