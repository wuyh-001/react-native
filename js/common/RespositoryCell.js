/**
 * Created by xiaowuzai on 2018/2/22.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity,TextInput} from 'react-native';

export default  class RespositoryCell extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <TouchableOpacity style={styles.container}>
                <View style={styles.cell_container}>
                    <Text style={styles.title}>{this.props.rowData.full_name}</Text>
                    <Text style={styles.description}>{this.props.rowData.description}</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',alignItems:'center',flex:1}}>
                            <Text>Author:</Text>
                            <Image source={{uri:this.props.rowData.owner.avatar_url}} style={{width:18,height:18}}/>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',flex:1}}>
                            <Text>Starts:</Text>
                            <Text>{this.props.rowData.stargazers_count}</Text>
                        </View>
                        <Image source={require('./../../res/images/ic_star.png')} style={{width:18,height:18}}/>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },
    title:{
        fontSize:16,
        marginBottom:2,
        color:'#212121'
    },
    description:{
        fontSize:14,
        marginBottom:2,
        color:'#757575',

    },
    cell_container:{
        backgroundColor:'white',
        padding:10,
        marginLeft:5,
        marginRight:5,
        marginVertical:3,
        borderWidth:0.3,
        borderColor:'#ddd',
        borderRadius:2,
        shadowColor:'gray',
        shadowOffset:{width:0.5,height:0.5},
        shadowOpacity:0.4,
        shadowRadius:1,
        elevation:2
    }
});