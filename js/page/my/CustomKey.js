/**
 * Created by xiaowuzai on 2018/3/2.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity,TextInput} from 'react-native';

import NavigationBar from './../../common/NavigationBar.js';


export default class CustomKey extends Component{
    constructor(props){
        super(props)

    };
    static navigationOptions={
        //headerTitle:'PopularPage'
        header:null
    }

    render(){
        let {navigate,goBack}=this.props.navigation;
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'自定义标签'}
                    statusBar={{
                        backgroundColor:'#ee6363'
                    }}
                    leftButton={
                        <TouchableOpacity onPress={()=>{goBack()}}>
                            <Image source={require('./../../../res/images/ic_arrow_back_white_36pt.png')} style={{width:22,height:22}}/>
                        </TouchableOpacity>
                    }
                    rightButton={
                        <TouchableOpacity>
                             <Text>Save</Text>
                        </TouchableOpacity>
                    }
                    />
                <Text>自定义标签</Text>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },

});