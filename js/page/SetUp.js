/**
 * Created by xiaowuzai on 2018/1/31.
 */
import React,{Component} from 'react';
import PropTypes from "prop-types";
import {StyleSheet,Text,View,Image,TouchableHighlight} from 'react-native';
import {StackNavigator,TabNavigator,DrawerNavigator} from 'react-native-navigation'


function SetUp(){
    //进行初始化配置
    class Root extends Component{
        render(){
            let stackNav=StackNavigator(
                {
                    welcomePage:{
                        screen:'WelcomePage'
                    },
                    homePage:{
                        screen:'HomePage'
                    }
                }
            )
            //return stackNav
        }
    }
    //return <Root/>
}
module.export=SetUp;