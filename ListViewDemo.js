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
        //isFirst ����Ƿ��ǵ�һ�ν����ҳ�棬����ʼ������
        //i��LoadMore  �����������ˢ�º��������ظ���
        let page;
        if(isLoadMore){//�������ظ���
            //ȡ��ҳ��
            page=this.demoListPageIndex[0];
           //�޸ļ���״̬
            this.setState({isLoadingTail:true});
        }else{//����ˢ��
            //ˢ��ʱҳ��ʼ��ʱ1
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
        //��ֹ�ظ�����
        if(this.state.isLoadingTail){
            return
        };
        //��ȡ����
        this.fetchData(false,true)
    }

    _onRefresh=()=>{
        //�����ص����һҳ���ݣ��ٴ�����ˢ��ʱ����Ҫ�ر�isNoMoreData״̬��
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