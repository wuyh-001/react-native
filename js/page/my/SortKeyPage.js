/**
 * Created by xiaowuzai on 2018/2/1.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableHighlight,TextInput,Alert} from 'react-native';

import SortableListView from 'react-native-sortable-listview';

import NavigationBar from './../../common/NavigationBar.js';

import LanguangeDao,{FLAG_LANGUAGE} from './../../expand/dao/LanguangeDao.js';
import ArrayUtil from '../../util/ArrayUtil.js';
import ViewUtil from './../../util/ViewUtil.js';


export default class SortKeyPage extends Component{
    constructor(props){
        super(props)
        this.dataArray=[];//从数据库中读取的所有标签的数组
        this.sortReaultArray=[];//排序之后新生成的数组
        this.originalCheckedArray=[];//初始化时被选中的标签的顺序
        this.state={
            checkedArray:[],
        }
    };
    static navigationOptions={
        //headerTitle:'PopularPage'
        header:null
    }
    componentDidMount(){
        this.LanguangeDao=new LanguangeDao(FLAG_LANGUAGE.flag_key);
        this.loadData();
    }
    loadData(){
        this.LanguangeDao.fetch().then(result=>{
            this.getCheckedItems(result)
        }).catch(error=>{
            console.log(error)
        })
    }
    getCheckedItems(result){
        this.dataArray=result;
        let checkedArray=[];
        for(let i=0;i<result.length;i++){
            let data=result[i];
            if(data.checked){
                checkedArray.push(data);
            }
        };
        this.setState({
            checkedArray:checkedArray
        });
        this.originalCheckedArray=ArrayUtil.clone(checkedArray)
    }
    onBack(){
        let {navigate,goBack}=this.props.navigation;
        let bool=ArrayUtil.isEqual(this.originalCheckedArray,this.state.checkedArray)
        if(bool){
            goBack();
            return;
        };
        Alert.alert(
            '提示',
            '要保存修改吗？',
            [
                {text: '不保存', onPress: () => goBack(), style: 'cancel'},
                {text: '保存', onPress: () => this.onSave(true)},
            ],
           { cancelable: false }
        )
    }
    onSave(isChecked){
        let {navigate,goBack}=this.props.navigation;
        let bool=ArrayUtil.isEqual(this.originalCheckedArray,this.state.checkedArray)
        if(!isChecked&&bool){
            goBack();
            return;
        };
        this.sortResult();
        this.LanguangeDao.save(this.sortReaultArray);
        goBack();
    }
    sortResult(){
        this.sortReaultArray=ArrayUtil.clone(this.dataArray)
        for(let i=0;i<this.originalCheckedArray.length;i++){
            let item=this.originalCheckedArray[i];
            let index=this.dataArray.indexOf(item);
            this.sortReaultArray.splice(index,1,this.state.checkedArray[i])
        };
    }
    render(){
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'我的'}
                    statusBar={{
                        backgroundColor:'#ee6363'
                    }}
                    leftButton={
                        ViewUtil.getLeftButton(()=>{this.onBack()})
                    }
                    rightButton={
                        <TouchableHighlight style={{alignItems:'center'}} onPress={()=>{this.onSave()}}>
                             <Text style={styles.title}>保存</Text>
                        </TouchableHighlight>
                    }
                />
                <SortableListView
                    style={{ flex: 1 }}
                    data={this.state.checkedArray}
                    order={Object.keys(this.state.checkedArray)}
                    onRowMoved={e => {
                        this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0])
                        this.forceUpdate()
                    }}
                    renderRow={row => <SortCell data={row}/>}
                    />
            </View>
        )
    }
}
class SortCell extends Component{
    render(){
        return(
            <TouchableHighlight
                underlayColor={'#eee'}
                delayLongPress={500}
                style={styles.item}
                {...this.props.sortHandlers}
            >
                <View style={styles.row}>
                    <Image style={styles.image} source={require('./img/ic_sort.png')}/>
                    <Text>{this.props.data.name}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },
    row:{
        flexDirection:'row',
        alignItems:'center'
    },
    item:{
        padding:15,
        backgroundColor:'#f8f8f8',
        borderBottomWidth:1,
        borderColor:'#eee'
    },
    image:{
        width:16,
        height:16,
        tintColor:'#2196f3',
        marginRight:10
    },
    title:{
        color:'white',
        fontSize:20
    }
});