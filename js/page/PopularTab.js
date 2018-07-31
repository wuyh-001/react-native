/**
 * Created by xiaowuzai on 2018/2/22.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,ListView,RefreshControl,DeviceEventEmitter} from 'react-native';

import DataRepository,{FLAG_STORAGE} from './../expand/dao/DataRepository.js';

const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=starts';

import RespositoryCell from './../common/RespositoryCell.js';
import RepositoryDetail from './RepositoryDetail.js';
import ProjectModel from '../modal/ProjectModel.js';
import FavouriteDao from '../expand/dao/FavouriteDao.js';
import Utils from '../util/Utils.js';

const favouriteDao=new FavouriteDao(FLAG_STORAGE.flag_popular);
const dataRepository=new DataRepository(FLAG_STORAGE.flag_popular);
const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});


export default class PopularTab extends Component{
    constructor(props){
        super(props)
        this.state={
            result:'',
            isLoading:false,
            dataSource:ds.cloneWithRows([]),
            favouriteKeys:[]
        }
        this.isFavouriteChanged=false;
        this._renderItem=this._renderItem.bind(this);
    }
    //更新每一项的收藏状态
    flushFavouriteState(){
        let projectModel=[];
        let items=this.items;
        for(let i=0;i<items.length;i++){
            projectModel.push(new ProjectModel(items[i],Utils.checkFavourite(items[i],this.state.favouriteKeys)))
        };
        this.updateState({
            isLoading:false,
            dataSource:this.getDataSource(projectModel)
        })
    }
    getDataSource(data){
        return this.state.dataSource.cloneWithRows(data)
    }

    updateState(dic){
        if(!this){return};
        this.setState(dic)
    }

    getFavouriteKeys(){
        favouriteDao.getFavouriteKeys().then(keys=>{
            if(keys){
                this.updateState({favouriteKeys:keys})
            }
            this.flushFavouriteState()
        }).catch(e=>{
            this.flushFavouriteState()
        })
    }


    onLoad(isShowLoading){
        if(isShowLoading){
            this.setState({
                isLoading:true
            });
        }

        let url=this.genUrl(this.props.tabLabel);
        dataRepository.fetchRepository(url)
            .then(result=>{
                this.items=result && result.items?result.items:result?result:[];

                this.getFavouriteKeys();

                if(result&&result.update_data&&!dataRepository.checkData(result.update_data)){
                    DeviceEventEmitter.emit('showToast','数据过时');
                    return dataRepository.fetchNetRepository(url);
                }else{
                    DeviceEventEmitter.emit('showToast','显示缓存数据');
                };
            }).then(items=>{
                if(!items&&items.length==0){
                    return
                };
                this.items=items;

                this.getFavouriteKeys();

                DeviceEventEmitter.emit('showToast','显示网络数据');
            }).catch(error=>{
                console.log(error)
                this.setState({
                    isLoading:false
                })
            })
    };

    genUrl(key){
        return URL+key+QUERY_STR
    };
    componentWillReceiveProps(nextProps,pro){
        this.onLoad(false);
        if(this.isFavouriteChanged){
            this.isFavouriteChanged=false;
            this.getFavouriteKeys();
        }
    }
    componentDidMount(){
        this.onLoad(true);
        this.listener=DeviceEventEmitter.addListener('favouriteChanged_popular',function(){
            this.isFavouriteChanged=true;
        })
    }
    componentWillUnmount(){
        if(this.listener){
            this.listener.remove();
        }
    }

    onFavourite(item,isFavourite){
        if(isFavourite){
            favouriteDao.saveFavouriteItem(item.id.toString(),JSON.stringify(item))
        }else{
            favouriteDao.removeFavouriteItem(item.id.toString())
        };

    }

    _renderItem(projectModel){
        let navigate=this.props.navigate;
        let theme=this.props.theme;
        return (
            <RespositoryCell
                projectModel={projectModel}
                key={projectModel.item.id}
                theme={this.props.theme}
                onSelect={()=>{
                    navigate('RepositoryDetail',{data:projectModel,theme:theme})
                }}
                onFavourite={(item,isFavourite)=>{
                    this.onFavourite(item,isFavourite)
                }}
            />
        )
    }

    render(){
        let theme=this.props.theme;
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
                            colors={[theme.themeColor]}
                            tintColor={theme.themeColor}
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