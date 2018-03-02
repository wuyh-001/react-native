/**
 * Created by xiaowuzai on 2018/1/31.
 */
import React,{Component} from 'react';
import PropTypes from "prop-types";
import {StyleSheet,Text,View,Image,TouchableHighlight,TouchableOpacity,AsyncStorage,TextInput} from 'react-native';
import Toast,{DURATION} from 'react-native-easy-toast';

import NavigationBar from './../common/NavigationBar.js';

const KEY='text';

export default class WelcomePage extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.timer=setTimeout(()=>{
            this.props.navigation.navigate('homePage')
        },500)
    }
    componentWillUnmount(){
        this.timer&&clearTimeout(this.timer)
    }

    static navigationOptions={
        header:null
    }

    onSave(){
       let that=this;
        AsyncStorage.setItem(KEY,that.text,(error)=>{
            if(!error){
                this.toast.show('保存成功',DURATION.LENGTH_LONG)
            }else{
                console.log('failed')
                this.toast.show('保存失败',DURATION.LENGTH_LONG)
            }
        })
    }
    onRemove(){
        AsyncStorage.removeItem(KEY,(error)=>{
            if(!error){
                this.toast.show('删除成功',DURATION.LENGTH_LONG)
            }else{
                console.log('failed')
                this.toast.show('删除失败',DURATION.LENGTH_LONG)
            }
        })
    }
    onFetch(){
        AsyncStorage.getItem(KEY,(error,result)=>{
            if(!error&&result){
                this.toast.show('取出的内容为：'+result,DURATION.LENGTH_LONG)
            }else{
                console.log('failed')
                this.toast.show('取出失败',DURATION.LENGTH_LONG)
            }
        })
    }

    render(){
        return (
            <View style={{flex:1}}>
                <NavigationBar
                    title={'welcome'}
                    statusBar={{
                        backgroundColor:'#ee6363'
                    }}
                    leftButton={
                        <TouchableOpacity>
                            <Image source={require('./../../res/images/ic_arrow_back_white_36pt.png')} style={{width:22,height:22}}/>
                        </TouchableOpacity>
                    }
                    rightButton={
                        <TouchableOpacity>
                            <Image source={require('./../../res/images/ic_star.png')} style={{width:22,height:22}}/>
                        </TouchableOpacity>
                    }
                />
                <TextInput style={{borderColor:'#ddd',borderWidth:1,height:40}} onChangeText={text=>this.text=text}/>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Text onPress={()=>this.onSave()}>save</Text>
                    <Text onPress={()=>this.onRemove()}>remove</Text>
                    <Text onPress={()=>this.onFetch()}>fetch</Text>
                </View>
                <Toast ref={(toast)=>{this.toast=toast}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft:10,
        paddingRight:10
    }
});