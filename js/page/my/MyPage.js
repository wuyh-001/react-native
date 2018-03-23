/**
 * Created by xiaowuzai on 2018/2/1.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity,TextInput} from 'react-native';

import NavigationBar from './../../common/NavigationBar.js';


export default class MyPage extends Component{
    constructor(props){
        super(props)

    };

    render(){
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'我的'}
                    statusBar={{
                        backgroundColor:'#ee6363'
                    }}
                    rightButton={
                        <TouchableOpacity>
                             <Text>Save</Text>
                        </TouchableOpacity>
                    }
                />
                <Text onPress={()=>this.props.navigate('CustomKey',{isRemove:false,title:'自定义标签',btnTxt:'保存'})}>自定义标签</Text>
                <Text onPress={()=>this.props.navigate('SortKeyPage')}>标签排序</Text>
                <Text onPress={()=>this.props.navigate('CustomKey',{isRemove:true,title:'标签移除',btnTxt:'删除'})}>标签移除</Text>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },

});