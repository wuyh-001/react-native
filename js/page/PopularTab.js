/**
 * Created by xiaowuzai on 2018/2/22.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,ListView,RefreshControl} from 'react-native';
import DataRepository from './../expand/dao/DataRepository.js';
const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=starts';

import RespositoryCell from './../common/RespositoryCell.js';


const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
export default class PopularTab extends Component{
    constructor(props){
        super(props)
        this.state={
            result:'',
            isLoading:false,
            dataSource:ds.cloneWithRows([])
        }
        this.dataRepository=new DataRepository();
    };
    onLoad(){
        this.setState({
            isLoading:true
        });
        let url=this.genUrl(this.props.tabLabel);
        this.dataRepository.fetchNetRepository(url).then(result=>{
            this.setState({
                dataSource:ds.cloneWithRows(result.items),
                isLoading:false
            })
        }).catch(error=>{
            this.setState({
                dataSource:JSON.stringify(error)
            })
        })
    };

    genUrl(key){
        return URL+key+QUERY_STR
    };
    componentDidMount(){
        this.onLoad()
    }
    _renderItem(rowData){
        return (
            <RespositoryCell rowData={rowData}/>
        )
    }
    render(){
        return (
            <View style={styles.container}>
                <ListView
                    enableEmptySections={true}
                    dataSource = {this.state.dataSource}
                    renderRow={this._renderItem}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={()=>this.onLoad()}
                            colors={['#2196f3']}
                            tintColor={'#2196f3'}
                            title={'Loading'}
                        />
                    }
                />
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1
    }
});