/**
 * Created by xiaowuzai on 2018/2/22.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,ListView,RefreshControl,DeviceEventEmitter} from 'react-native';

import DataRepository,{FLAG_STORAGE} from './../expand/dao/DataRepository.js';

const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=starts';

import RespositoryCell from './../common/RespositoryCell.js';
import TrendingCell from './../common/TrendingCell.js';
import RepositoryDetail from './RepositoryDetail.js';
import ProjectModel from '../modal/ProjectModel.js';
import FavouriteDao from '../expand/dao/FavouriteDao.js';
import Utils from '../util/Utils.js';
import ArrayUtil from '../util/ArrayUtil.js';


const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});


export default class FavouriteTab extends Component{
    constructor(props){
        super(props)
        this.state={
            result:'',
            isLoading:false,
            dataSource:ds.cloneWithRows([]),
            favouriteKeys:[]
        }
        this.unFavouriteItems=[];
        this.favouriteDao=new FavouriteDao(this.props.flag);
        this.dataRepository=new DataRepository();
        this._renderItem=this._renderItem.bind(this);
    }

    updateState(dic){
        if(!this){return};
        this.setState(dic)
    }

    onLoad(isShowLoading){
        if(isShowLoading){
            this.setState({
                isLoading:true
            });
        };

        this.favouriteDao.getAllFavouriteItems().then(items=>{
            var resultData=[];
            for(var i=0;i<items.length;i++){
                resultData.push(new ProjectModel(items[i],true))
            };
            this.updateState({
                isLoading:false,
                dataSource:ds.cloneWithRows(resultData)
            })
        }).catch(e=>{
            this.updateState({
                isLoading:false
            })
        })

    };

    componentDidMount(){
        this.onLoad(true)
    }
    componentWillReceiveProps(nextProps,pro){
        this.onLoad(false)
    }

    onFavourite(item,isFavourite){
        var key=this.props.flag==FLAG_STORAGE.flag_popular?item.id.toString():item.fullName;
        if(isFavourite){
            this.favouriteDao.saveFavouriteItem(key,JSON.stringify(item))
        }else{
            this.favouriteDao.removeFavouriteItem(key)
        };
        ArrayUtil.updataArray(this.unFavouriteItems,item);
        if(this.unFavouriteItems.length>0){
            if(this.props.flag==FLAG_STORAGE.flag_popular){
                DeviceEventEmitter.emit('favouriteChanged_popular');
            }else{
                DeviceEventEmitter.emit('favouriteChanged_trending');
            }
        };
    }

    _renderItem(projectModel){
        let navigate=this.props.navigate;
        let CellComponent=this.props.flag==FLAG_STORAGE.flag_popular?RespositoryCell:TrendingCell;
        return (
            <CellComponent
                projectModel={projectModel}
                key={this.props.flag==FLAG_STORAGE.flag_popular?projectModel.item.id:projectModel.item.full_name}
                onSelect={()=>{
                    navigate('RepositoryDetail',{data:projectModel})
                }}
                onFavourite={(item,isFavourite)=>{
                    this.onFavourite(item,isFavourite)
                }}
            />
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