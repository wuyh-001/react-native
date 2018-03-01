/**
 * Created by xiaowuzai on 2018/2/1.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableHighlight,TextInput} from 'react-native';
import DataRepository from './../expand/dao/DataRepository.js';
const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=starts';

export default class PopularPage extends Component{
    constructor(props){
        super(props)
        this.state={
            result:''
        }
        this.dataRepository=new DataRepository();
    };

    static navigationOptions={
        header:null
    }

    onLoad(){
        let url=this.genUrl(this.text);
        this.dataRepository.fetchNetRepository(url).then(result=>{
            this.setState({
                result:JSON.stringify(result)
            })
        }).catch(error=>{
            this.setState({
                result:JSON.stringify(error)
            })
        })
    };

    genUrl(key){
        return URL+key+QUERY_STR
    };
    componentDidMount(){
        this.props.navigate('tabNav')
    }
    render(){
        return (
            <View style={styles.container}>

            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },
    tips:{
        fontSize:20
    },
    textInput:{
        height:30,
        borderWidth:1,
        borderColor:'#ccc',
        margin:10
    }
});