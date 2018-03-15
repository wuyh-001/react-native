/**
 * Created by xiaowuzai on 2018/3/2.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity,ScrollView} from 'react-native';
import CheckBox from 'react-native-check-box';

import NavigationBar from './../../common/NavigationBar.js';
import ViewUtil from './../../util/ViewUtil.js';
import LanguangeDao,{FLAG_LANGUAGE} from './../../expand/dao/LanguangeDao.js';

export default class CustomKey extends Component{
    constructor(props){
        super(props)
        this.languageDao=new LanguangeDao(FLAG_LANGUAGE.flag_key);
        this.state={
            data:[]
        }
    };
    static navigationOptions={
        //headerTitle:'PopularPage'
        header:null
    }
    componentDidMount(){
        this.loadData()
    }
    loadData(){
        this.languageDao.fetch().then(result=>{
            this.setState({data:result})
        }).catch(e=>console.log(e))
    }

    onSave(){
        let {navigate,goBack}=this.props.navigation;
        goBack();
    }
    renderView(){
        if(!this.state.data || this.state.data.length===0){
            return null;
        };
        let len=this.state.data.length;
        let views=[];
        for(let i=0;i<len-2;i+=2){
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(this.state.data[i])}
                        {this.renderCheckBox(this.state.data[i+1])}
                    </View>
                    <View style={styles.line}></View>
                </View>
            )
        };

        views.push(
            <View key={len-1}>
                <View style={styles.item}>
                    {len%2==0?this.renderCheckBox(this.state.data[len-2]):null}
                    {this.renderCheckBox(this.state.data[len-1])}
                </View>
                <View style={styles.line}></View>
            </View>
        )
        return views;
    }
    onClick(data){

    }
    renderCheckBox(data){
        let leftText=data.name;
        return(
            <CheckBox
                style={{flex:1}}
                onClick={()=>this.onClick(data)}
                leftText={leftText}
                checkedImage={<Image source={require('./img/ic_check_box.png')} style={{tintColor:'#6495ed'}}/>}
                unCheckedImage={<Image source={require('./img/ic_check_box_outline_blank.png')} style={{tintColor:'#6495ed'}}/>}
            />
        )
    }

    render(){
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'自定义标签'}
                    statusBar={{
                        backgroundColor:'#ee6363'
                    }}
                    leftButton={
                        ViewUtil.getLeftButton(()=>{this.onSave()})
                    }
                    rightButton={
                        <TouchableOpacity onPress={()=>{this.onSave()}}>
                             <View>
                                <Text style={styles.title}>Save</Text>
                             </View>
                        </TouchableOpacity>
                    }
                    />
                <ScrollView>
                    {this.renderView()}
                </ScrollView>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },
    title:{
        fontSize:18,
        color:'white'
    },
    line:{
        height:1,
        backgroundColor:'gray'
    },
    item:{
        flexDirection:'row',
        alignItems:'center',
        height:30
    }
});