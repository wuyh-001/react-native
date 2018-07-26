/**
 * Created by xiaowuzai on 2018/2/1.
 */
import React, { Component } from 'react';
import {StyleSheet,Dimensions,DeviceEventEmitter,Text,View,ListView,ActivityIndicator,Image,TouchableOpacity,TextInput,ScrollView,Platform} from 'react-native';

import ViewUtil from './../util/ViewUtil.js';
import GlobalStyles from './../../res/styles/GlobalStyles.js'
import Toast,{DURATION} from 'react-native-easy-toast';
import FavouriteDao from '../expand/dao/FavouriteDao.js';
import DataRepository,{FLAG_STORAGE} from './../expand/dao/DataRepository.js';
import LanguangeDao,{FLAG_LANGUAGE} from './../expand/dao/LanguangeDao.js';
import ProjectModel from '../modal/ProjectModel.js';
import RespositoryCell from './../common/RespositoryCell.js';
import Utils from '../util/Utils.js';

import {ACTION_HOME} from './HomePage.js'

var {height, width} = Dimensions.get('window');

const API_URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=starts';

const favouriteDao=new FavouriteDao(FLAG_STORAGE.flag_popular);

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var dat=ds.cloneWithRows(['row 1', 'row 2'])
export default class SearchPage extends Component{
    constructor(props){
        super(props)
        this.state={
            rightButtonText:'搜索',
            isLoading:false,
            val:'',
            favouriteKeys:[],
            bottomButton:false,
            dataSource:new ListView.DataSource({
                rowHasChanged:((r1,r2)=>{r1!=r2})
            })
        }
        this.languageDao=new LanguangeDao(FLAG_LANGUAGE.flag_key);
        this.keys=[];
        this.isKeyChanged=false;
    };
    static navigationOptions={
        header:null
    }
    genUrl(key){
        return API_URL+key+QUERY_STR
    };

    getFavouriteKeys(){
        favouriteDao.getFavouriteKeys().then(keys=>{
            if(keys){
                this.updateState({favouriteKeys:keys})
            };
            this.flushFavouriteState()
        }).catch(e=>{
            this.flushFavouriteState()
        })
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
            dataSource:this.getDataSource(projectModel),
            rightButtonText:'搜索'
        })
    }
    getDataSource(data){
        return this.state.dataSource.cloneWithRows(data)
    }

    onFavourite(item,isFavourite){
        if(isFavourite){
            favouriteDao.saveFavouriteItem(item.id.toString(),JSON.stringify(item))
        }else{
            favouriteDao.removeFavouriteItem(item.id.toString())
        };

    }


    loadData=()=>{
        let url=this.genUrl(this.state.val);
        this.updateState({isLoading:true});
        fetch(url).then(responseData=>responseData.json())
        .then(result=>{
            if(!this || !result || !result.items || result.items.length==0){
                this.toast.show("没有数据",DURATION.LENGTH_SHORT);
                this.updateState({isLoading:false,rightButtonText:'搜索'})
                return
            };
            this.items=result.items;
            this.getFavouriteKeys();
                if(!this.checkKeyIsExist(this.keys,this.state.val)){
                    this.updateState({bottomButton:true})
                };
        }).catch(error=>{
            this.setState({
                isLoading:false,
                rightButtonText:'搜索'
            })
        })

    }
    componentWillUnmount(){
        if(this.isKeyChanged){
            DeviceEventEmitter.emit('ACTION_HOME',ACTION_HOME.A_RESTART)
        }

    }
    componentDidMount(){
        this.initKeys()
    }
    //获取所有标签
    async initKeys(){
        this.keys= await this.languageDao.fetch()
    }
    //
    checkKeyIsExist(keys,key){
        for(let i=0;i<keys.length;i++){
            if(key.toLowerCase()===keys[i].name.toLowerCase()){
                return true;
            }
        };
        return false
    }

    addKeyClickEvent=()=>{
        let key=this.state.val;
        if(this.checkKeyIsExist(this.keys,key)){
            this.refs.toast.show(key+"已经存在")
        }else{
            key={
                "path":key,
                "name":key,
                "checked":true
            };
            this.keys.unshift(key);
            this.languageDao.save(this.keys);
            this.refs.toast.show("添加成功");
            this.isKeyChanged=true;
        };

    }

    updateState(dic){
        this.setState(dic)
    }

    onBackPress=()=>{
        this.refs.textInput.blur();
        this.props.navigation.goBack();
    }

    onRightClickEvent=()=>{
        if(this.state.rightButtonText=="搜索"){
            this.updateState({rightButtonText:'取消'})
            this.loadData()
        }else{
            this.updateState({rightButtonText:'搜索',isLoading:false})
        };
        this.refs.textInput.blur();
    }

    rendNavBar=()=>{
        let backButton=ViewUtil.getLeftButton(()=>{this.onBackPress()});
        let inputView=<TextInput ref="textInput" onChangeText={(val)=>{this.updateState({val:val})}} style={styles.textInput}/>
        let rightButton=<TouchableOpacity onPress={this.onRightClickEvent} style={styles.rightButtonStyle}>
                            <Text style={styles.rightButtonText}>{this.state.rightButtonText}</Text>
                        </TouchableOpacity>
        return (
            <View style={styles.nav}>
                {backButton}
                {inputView}
                {rightButton}
            </View>
        )
    }
    _renderItem=(projectModel)=>{
        let navigate=this.props.navigation.navigate
        return (
            <RespositoryCell
                projectModel={projectModel}
                key={projectModel.item.id}
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
        let statusBar=null;
        if(Platform.OS==="ios"){
            statusBar=<View style={[styles.statusBar,{backgroundColor:'#2196f3'}]}></View>
        };
        let that=this;
        let listView=!that.state.isLoading?<ListView
                        enableEmptySections={true}
                        dataSource = {that.state.dataSource}
                        renderRow={this._renderItem}

                     />:null;
        let indicator=that.state.isLoading?<ActivityIndicator
                            style={styles.indicator}
                            color={'#2196f3'}
                            size="large"
                            animating={that.state.isLoading}
                        />:null;
        let containerView=<View style={{flex:1}}>
                            {indicator}
                            {listView}
                          </View>
        let bottomButton=that.state.bottomButton?<TouchableOpacity style={styles.addButton} onPress={that.addKeyClickEvent}>
                                <Text style={styles.bottomButton}>添加标签</Text>
                            </TouchableOpacity>:null;

        return (
            <View style={styles.container}>
                {statusBar}
                {this.rendNavBar()}
                {containerView}
                {bottomButton}
                <Toast ref="toast" />
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },
    nav:{
        flexDirection:'row',
        paddingTop:15,
        paddingBottom:15,
        backgroundColor:'#2196f3',
        alignItems:'center',
        height:(Platform.OS=='ios')?GlobalStyles.nav_bar_height_ios:GlobalStyles.nav_bar_height_android,
    },
    statusBar:{
        height:20
    },
    textInput:{
        flex:1,
        height:(Platform.OS=='ios')?30:40,
        borderWidth:(Platform.OS=='ios')? 1 : 0,
        borderColor:'white',
        marginLeft:15,
        marginRight:15,
        paddingLeft:5,
        color:'white',
        borderRadius:5
    },
    rightButtonStyle:{
        marginRight:10
    },
    rightButtonText:{
        color:'white',
        fontSize:16
    },
    indicator:{
        alignItems:'center',
        justifyContent:'center',
        flex:1
    },
    addButton:{
        alignItems:'center',
        height:40,
        backgroundColor:'#2196f3',
        justifyContent:'center',
        opacity:0.9,
        position:"absolute",
        left:0,
        right:0,
        top:(height-45)
    },
    bottomButton:{
        color:'white',
        fontSize:16
    }

});