/**
 * Created by xiaowuzai on 2018/2/1.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity,TextInput,ScrollView} from 'react-native';

import NavigationBar from './../../common/NavigationBar.js';
import LanguangeDao,{FLAG_LANGUAGE} from './../../expand/dao/LanguangeDao.js';

import {MORE_MENU} from './../../common/MoreMenu.js';
import GlobalStyles from './../../../res/styles/GlobalStyles.js';
import ViewUtil from './../../util/ViewUtil.js';

export default class MyPage extends Component{
    constructor(props){
        super(props)

    };
    clickEvent=(tab)=>{
        let TargetComponent,params={};

        switch(tab){
            case MORE_MENU.Custom_Language:
                TargetComponent='CustomKey';
                params={isRemove:false,title:'自定义语言',btnTxt:'保存',flag:FLAG_LANGUAGE.flag_language}
                break;
            case MORE_MENU.Custom_Key:
                TargetComponent='CustomKey';
                params={isRemove:false,title:'自定义标签',btnTxt:'保存',flag:FLAG_LANGUAGE.flag_key}
                break;
            case MORE_MENU.Remove_Key:
                TargetComponent='CustomKey';

                params={isRemove:true,title:'标签移除',btnTxt:'删除',flag:FLAG_LANGUAGE.flag_key}
                break;
            case MORE_MENU.Sort_Key:
                TargetComponent='SortKeyPage';
                params={title:'标签排序',btnTxt:'保存',flag:FLAG_LANGUAGE.flag_key}
                break;
            case MORE_MENU.Sort_Language:
                TargetComponent='SortKeyPage';
                params={title:'语言排序',btnTxt:'保存',flag:FLAG_LANGUAGE.flag_language}
                break;
            case MORE_MENU.Custom_Theme:
                break;
            case MORE_MENU.About_Author:
                break;
            case MORE_MENU.About:
                TargetComponent='AboutPage';
                break;
        }
        if(TargetComponent){
            this.props.navigate(TargetComponent,params)
        }

    }
    getItem=(callBack,icon,text)=>{
        return ViewUtil.getSettingItem(callBack,icon,text,{tintColor:'#2196f3'}, null)
    }

    render(){
        let navigationBar=<NavigationBar
                              title={'我的'}
                              style={{backgroundColor:'#2196f3'}}
                          />
        let that=this;
        return (
            <View style={GlobalStyles.root_container}>
                {navigationBar}
                <ScrollView>
                    <TouchableOpacity onPress={()=>{this.clickEvent(MORE_MENU.About)}}>
                        <View style={[styles.item,{height:90}]}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Image source={require('../../../res/images/ic_trending.png')} style={[{width:40,height:40,marginRight:10},{tintColor:'#2196f3'}]}/>
                                <Text>GitHub Popular</Text>
                            </View>
                            <Image source={require('../../../res/images/ic_tiaozhuan.png')} style={[{width:20,height:20,marginRight:10},{tintColor:'#2196f3'}]}/>
                        </View>
                    </TouchableOpacity>
                    <View style={GlobalStyles.line} />
                    {/*趋势管理*/}
                    <Text style={styles.groupTitle}>趋势管理</Text>
                    <View style={GlobalStyles.line} />
                    {
                        that.getItem(
                            ()=>this.clickEvent(MORE_MENU.Custom_Language),
                            require('./img/ic_custom_language.png'),
                            '自定义语言'
                        )
                    }
                    <View style={GlobalStyles.line} />
                    {
                        that.getItem(
                            ()=>this.clickEvent(MORE_MENU.Sort_Language),
                            require('./img/ic_swap_vert.png'),
                            '语言排序'
                        )
                    }
                    <View style={GlobalStyles.line} />
                    {/*标签管理*/}
                    <Text style={styles.groupTitle}>标签管理</Text>
                    <View style={GlobalStyles.line} />
                    {
                        that.getItem(
                            ()=>this.clickEvent(MORE_MENU.Custom_Key),
                            require('./img/ic_custom_language.png'),
                            '自定义标签'
                        )
                    }
                    <View style={GlobalStyles.line} />
                    {
                        that.getItem(
                            ()=>this.clickEvent(MORE_MENU.Sort_Key),
                            require('./img/ic_swap_vert.png'),
                            '标签排序'
                        )
                    }
                    <View style={GlobalStyles.line} />
                    {
                        that.getItem(
                            ()=>this.clickEvent(MORE_MENU.Remove_Key),
                            require('./img/ic_remove.png'),
                            '标签移除'
                        )
                    }
                    <View style={GlobalStyles.line} />
                    {/*设置*/}
                    <Text style={styles.groupTitle}>设置</Text>
                    <View style={GlobalStyles.line} />
                    {
                        that.getItem(
                            ()=>this.clickEvent(MORE_MENU.Custom_Theme),
                            require('./img/ic_view_quilt.png'),
                            '自定义主题'
                        )
                    }
                    <View style={GlobalStyles.line} />
                    {
                        that.getItem(
                            ()=>this.clickEvent(MORE_MENU.About_Author),
                            require('./img/ic_insert_emoticon.png'),
                            '关于作者'
                        )
                    }
                    <View style={GlobalStyles.line} />
                </ScrollView>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,

    },
    text:{
        padding:10,
        borderBottomWidth:1,
        borderColor:'#d8d8d8'
    },
    item:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:10,
        height:60,
        backgroundColor:'white'
    },
    groupTitle:{
        marginLeft:10,
        marginTop:10,
        marginBottom:10,
        fontSize:12,
        color:'#ccc'
    }
});