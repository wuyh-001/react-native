import React, {Component} from 'react';
import PropTypes from "prop-types";
import {StyleSheet,Text,View,ListView} from 'react-native';

const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});

export default class DetailsList extends Component {
    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            data: ds.cloneWithRows([]),
            dataArr:props.detailsListData
        }
    }

    componentDidMount(){
        this.setState({
            data:ds.cloneWithRows(this.state.dataArr),
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    enableEmptySections={true}
                    dataSource = {this.state.data}
                    renderRow={this._renderItem}
            />
            </View>
        );
    }

    _renderItem(rowData){
        let title=<Text style={styles.name} >{rowData.title}</Text>
        let content;
        let contentArr=[];
        if(typeof rowData.content=='string'){
            content=<Text style={styles.content} >{rowData.content}</Text>
        }else{
            for(var i=0;i<rowData.content.length;i++){
                contentArr.push(<Text style={styles.contentArr} key={i}>{rowData.content[i]}</Text>)
            }
            content=contentArr
        }
        return (
            <View style={styles.item} >
                {title}
                <View>{content}</View>
            </View>
        )
    }
}
DetailsList.propTypes={
    detailsListData:PropTypes.array
}


const styles = StyleSheet.create({
    item:{
        flexDirection:'row',
        marginBottom:10,
        paddingLeft:13,
        paddingRight:13,
        flexBasis:'auto'
    },
    name:{
        width:130,
        fontSize:14,
        color:"#969696",
        justifyContent: 'center'
    },
    content:{
        color:'#333',
        fontSize:14,
        justifyContent: 'center'
    },
    contentArr:{
        flexDirection:'column',
        color:'#333',
        fontSize:14,
        flex:1,
        justifyContent: 'center'
    }
});

