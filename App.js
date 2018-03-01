/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Platform,StyleSheet,Text,View,Image,ListView,TouchableOpacity,RefreshControl} from 'react-native';
import Toast,{DURATION} from 'react-native-easy-toast';

const data={
    'result':[
        {'email':'1@163.net','fullName':<Text>123</Text>},
        {'email':'15@163.com','fullName':'儒雅的小wuwu'},
        {'email':'151@163.com','fullName':'儒雅的小wuwu'},
        {'email':'1517@163.com','fullName':'儒雅的小wuwu'},
        {'email':'15171@163.com','fullName':'儒雅的小wuwu'},
        {'email':'151710@163.com','fullName':'儒雅的小wuwu'},
        {'email':'1517100@163.com','fullName':'儒雅的小wuwu'},
        {'email':'15171009@163.com','fullName':'儒雅的小wuwu'},
        {'email':'151710098@163.com','fullName':'儒雅的小wuwu'},
        {'email':'1517100982@163.com','fullName':'儒雅的小wuwu'},
        {'email':'15171009823@163.com','fullName':'儒雅的小wuwu'},
        {'email':'17600295016@163.com','fullName':'儒雅的小wuwu'},
        {'email':'1760029501@163.com','fullName':'儒雅的小wuwu'},
        {'email':'176002950@163.com','fullName':'儒雅的小wuwu'},
        {'email':'17600295@163.com','fullName':'儒雅的小wuwu'},
        {'email':'1760029@163.com','fullName':'儒雅的小wuwu'},
        {'email':'176002@163.com','fullName':'儒雅的小wuwu'},
        {'email':'17600@163.com','fullName':'儒雅的小wuwu'},
        {'email':'1760@163.com','fullName':'儒雅的小wuwu'},
        {'email':'176@163.com','fullName':'儒雅的小wuwu'},
        {'email':'17@163.com','fullName':'儒雅的小wuwu'},
    ]
}

export default class ListViewComponent extends Component{
    constructor(props){
        super(props)
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            dataSource: ds.cloneWithRows(data.result),
            isLoading:true
        }
        this._renderItem=this._renderItem.bind(this);
        this._renderFooter=this._renderFooter.bind(this);
        this._renderHeader=this._renderHeader.bind(this);
        this._onRefresh=this._onRefresh.bind(this);
        //this._onRefresh();
    }
    _renderItem(rowData){
        return (
            <View style={styles.row}>
                <TouchableOpacity onPress={()=>{this.toast.show('当前单击项为：'+rowData.email,DURATION.LENGTH_LONG)}}>
                    <Text style={styles.tips}>{rowData.email}</Text>
                    <Text style={styles.tips}>{rowData.fullName}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    _renderSeparator(sectionID, rowID, adjacentRowHighlighted){
        return <View key={rowID} style={styles.line}></View>
    }
    _renderFooter(){
        return <Image style={{width:200,height:50}} resizeMode='contain' source={{uri:'http://img.zcool.cn/community/012a51589400c2a8012060c835a590.gif'}}/>
    }
    _renderHeader(){
        return <Image style={{width:200,height:50}} resizeMode='contain' source={{uri:'http://img.zcool.cn/community/0176af5844caf4a8012060c87e987f.gif'}}/>
    }
    _onRefresh(){
        setTimeout(()=>{
            this.setState(
                isLoading:false
            )
        },2000)
    }


    render() {
        let {selectedTab}=this.state;
        return (
                <View style={{flex:1}}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderItem}
                        renderSeparator={this._renderSeparator}
                        renderFooter={this._renderFooter}
                        renderHeader={this._renderHeader}
                        RefreshControl={
                            <RefreshControl
                                refreshing={this.state.isLoading}
                                onRefresh={this._onRefresh}
                            />
                        }
                    />
                    <Toast ref={(toast)=>{this.toast=toast}}/>
                </View>
            );
        }
    }

const styles = StyleSheet.create({
    row: {
        flex: 1,
        height:50
    },
    tips:{

    },
    line:{
        borderWidth:1,
        borderBottomColor:'#ccc',
        height:1
    }
});
