/**
 * Created by xiaowuzai on 2018/2/28.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,Animated,View,Image,ListView} from 'react-native';

var MOCKED_MOVIES_DATA = [
    {
        title: 'Title',
        year: '2015',
        posters: {
            thumbnail: 'http://i.imgur.com/UePbdph.jpg'
        }
    }
];

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

export default class MoviesList extends Component{
    constructor(props){
        super(props)
        this.state={
            move:null
        }
    }
    fetchData(){
        fetch(REQUEST_URL).then((response)=>response.json())
                           .then((responseData)=>{
                                this.setState({
                                    move:JSON.stringify(responseData.movies)
                                })
                            })
                            .done()
    }
    renderLoadingView(){
        return(
            <View style={styles.container}>
                <Text>Loading</Text>
            </View>
        )
    }
    renderMove(move){
        return(
            <View style={styles.container}>
                <Image source={{uri:move.posters.thumbnail}} style={styles.thumbnail}/>
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{move.title}</Text>
                    <Text style={styles.year}>{move.year}</Text>
                </View>
            </View>
        )
    }
    componentDidMount(){
        this.fetchData();
    }
    render(){
        if(!this.state.move){
            return this.renderLoadingView();
        };
        /*var move=this.state.move[0];
         return this.renderMove(move);*/
        return (
            <ListView/>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f5fcff'
    },
    thumbnail:{
        width:53,
        height:81
    },
    rightContainer:{
        flex:1
    },
    title:{
        fontSize:20,
        marginBottom:8,
        textAlign:'center'
    },
    year:{
        textAlign:'center'
    },
    listView:{
        paddingTop:20,
        backgroundColor:'#f5fcff'
    }
})
