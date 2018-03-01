/**
 * Created by xiaowuzai on 2018/2/9.
 */
import React, { Component } from 'react';
import { ListView, View, Text, ActivityIndicator, RefreshControl } from 'react-native';

export default class ListViewDemo extends Component{
    constructor(props){
        super(props);
        var ds =new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            demoList:ds.cloneWithRows([]),
            isLoadingTail:false,
            isRefreshing:false,
            isNoMoreData:false
        }
    }

    fetchData(isFirst,isLoadMore){
        //isFirst 标记是否是第一次进入该页面，即初始化加载
        //i是LoadMore  标记区分下拉刷新和下拉加载更多
        let page;
        if(isLoadMore){//上拉加载更多
            //取出页码
            page=this.demoListPageIndex[0];
           //修改加载状态
            this.setState({isLoadingTail:true});
        }else{//下拉刷新
            //刷新时页码始终时1
            page=1;
            if(!isFirst){
                this.setState({
                    isRefreshing:true
                })
            }
        };
        let url = 'http://travel.9797168.com/user/tips/getDynamicTips?type=45&p=' + page + '&num=10';
        fetch(url,{
            method:'GET',
            HEADERS:{}
        })
        .then((response)=>{
            if(response.ok){
                return response.json()
            }
        })
        .then((responseJson)=>{
            if(responseJson.status==1){
               let respondeData=responseJson.data;
            }
        })
    }

    componentDidMount(){
        this.fetchData(true,false)
    }

    _endReached=()=>{
        //防止重复申请
        if(this.state.isLoadingTail){
            return
        };
        //获取数据
        this.fetchData(false,true)
    }

    _onRefresh=()=>{
        //当加载到最后一页数据，再次下拉刷新时，需要关闭isNoMoreData状态机
        this.setState({
            isNoMoreData:false
        });
        this.fetchData(false,false)
    }

    render(){
        return (
            <ListView
                enableEmptySections={true}
                dataSource={this.state.demoList}
                renderRow={(rowData)=>this._renderRow(rowData)}
                renderFooter={()=>this._renderFooter()}
                onEndReached={()=>this._endReached()}
                onEndReachedThreshold={20}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={()=>this._onRefresh()}
                    />
                }
            />
        )
    }
}