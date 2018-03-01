/**
 * Created by xiaowuzai on 2018/3/1.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,Platform,StatusBar} from 'react-native';
import PropTypes from 'prop-types';

const NAV_BAR_HEIGHT_ANDROID=50;
const NAV_BAR_HEIGHT_IOS=40;
const STATUS_BAR_HEIGHT=20; //状态栏的高度
const StatusBarShape={
    backgroundColor:PropTypes.string,
    barStyle:PropTypes.oneOf(['default', 'light-content', 'dark-content']),
    hide:PropTypes.bool
}

export default class NavigationBar extends Component{
    constructor(props){
        super(props)
        this.state={
            title:'',
            hide:false

        }
    }
    render(){
        let status=<View style={[styles.statusBar,this.props.statusBar]}><StatusBar {...this.props.statusBar}/></View>
        let titleView=this.props.titleView?this.props.titleView:<Text style={styles.title}>{this.props.title}</Text>;
        let content=(
            <View style={styles.navBar}>
                {this.props.leftButton}
                <View style={styles.titleView}>{titleView}</View>
                {this.props.rightButton}
            </View>
        )
        return (
            <View>
                {content}
            </View>
        )
    }
}

NavigationBar.propTypes={
    style:View.propTypes.style,
    title:PropTypes.string,
    titleView:PropTypes.element,
    hide:PropTypes.bool,
    leftButton:PropTypes.element,
    rightButton:PropTypes.element,
    statusBar:PropTypes.shape(StatusBarShape)
}

NavigationBar.defaultProps={
    statusBar:{
        barStyle:'light-content',
        hidden:false
    }
}

const styles=StyleSheet.create({
    navBar:{
        justifyContent:'space-between',
        alignItems:'center',
        height:Platform.OS=='ios'?NAV_BAR_HEIGHT_IOS:NAV_BAR_HEIGHT_ANDROID,
        backgroundColor:'#ee6363',
        flexDirection:'row',
        paddingLeft:10,
        paddingRight:10
    },
    titleView:{
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        left:40,
        right:40,
        top:0,
        bottom:0
    },
    title:{
        fontSize:20,
        color:'white'
    },
    statusBar:{
        height:Platform.OS=='ios'?STATUS_BAR_HEIGHT:0
    }
});