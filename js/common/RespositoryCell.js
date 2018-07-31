/**
 * Created by xiaowuzai on 2018/2/22.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity,TextInput} from 'react-native';

export default  class RespositoryCell extends Component{
    constructor(props){
        super(props)
        this.state={
            isFavourite:this.props.projectModel.isFavourite,
            favouriteIcon:this.props.projectModel.isFavourite?require('../../res/images/ic_star.png'):require('../../res/images/ic_unstar_transparent.png')
        }
    }
    setFavouriteState(isFavourite){
        this.setState({
            isFavourite:isFavourite,
            favouriteIcon:isFavourite?require('../../res/images/ic_star.png'):require('../../res/images/ic_unstar_transparent.png')
        })
    }
    onPressFavourite(){
        this.setFavouriteState(!this.state.isFavourite);
        this.props.onFavourite(this.props.projectModel.item,!this.state.isFavourite)
    }
    componentWillReceiveProps(nextProps){
        this.setFavouriteState(nextProps.projectModel.isFavourite)
    }
    render(){
        let projectModel=this.props.projectModel.item?this.props.projectModel.item:this.props.projectModel;
        let theme=this.props.theme;
        let favouriteButton=<TouchableOpacity onPress={()=>{this.onPressFavourite()}}>
                                <Image source={this.state.favouriteIcon} style={[{width:18,height:18},theme.styles.tabBarSelectedIcon]}/>
                            </TouchableOpacity>
        return (
            <TouchableOpacity style={styles.container} onPress={()=>{this.props.onSelect()}}>
                <View style={styles.cell_container}>
                    <Text style={styles.title}>{projectModel.full_name}</Text>
                    <Text style={styles.description}>{projectModel.description}</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',alignItems:'center',flex:1}}>
                            <Text>Author:</Text>
                            <Image source={{uri:projectModel.owner.avatar_url}} style={{width:18,height:18}}/>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',flex:1}}>
                            <Text>Starts:</Text>
                            <Text>{projectModel.stargazers_count}</Text>
                        </View>
                        {favouriteButton}
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