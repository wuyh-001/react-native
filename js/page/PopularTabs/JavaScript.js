/**
 * Created by xiaowuzai on 2018/2/22.
 */
import React, { Component } from 'react';
import PopularTab from './../PopularTab.js';
import {StyleSheet,Text,View,Image} from 'react-native';
export default  class JavaScript extends Component{
    constructor(props){
        super(props)
    }
    static navigationOptions={
        header:null
    }
    render(){
        return  <PopularTab tab='JavaScript' />
    }
}