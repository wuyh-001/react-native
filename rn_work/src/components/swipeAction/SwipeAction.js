import React, { Component } from 'react';
import PropTypes from "prop-types";
import {StyleSheet,Text,View,ListView,TouchableOpacity} from 'react-native';
import SwipeRow from './SwipeRow.js';
import SwipeListView from './SwipeListView.js';

const  ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});

export default class SwipeAction extends Component<{}> {
    constructor(props) {
        super(props);
        this.state={
            data:ds.cloneWithRows([]),
            rows:props.dataSource,
            moveX:-50,
            swiperMoreEvent:props.swiperMoreEvent,
            swiperDeleteEvent:props.swiperDeleteEvent
        }
        this.deleteItem=this.deleteItem.bind(this);
    }
    deleteItem(rowData,sectionID,rowID,rowMap){
        let newData = [];
        let dataSource=this.state.rows;
        for(var i=0;i<dataSource.length;i++){
            if(dataSource[i]!=rowData){
                newData.push(dataSource[i])
            };

        };
        dataSource.splice(rowID,1)
        this.setState({
            data:ds.cloneWithRows(newData)
        });
        this.state.swiperDeleteEvent(rowData,sectionID,rowID);
        rowMap[`${sectionID}${rowID}`].closeRow();
    }
    componentDidMount(){
        this.setState({
            data:ds.cloneWithRows(this.state.rows),
        });
    }

  render() {
        return (
              <View >
                    <SwipeListView
                        dataSource={this.state.data}
                        enableEmptySections={true}
                        renderRow={(data,sectionID,rowID)=>(
                            <View style={styles.rowFront}>
                                <Text>{data}</Text>
                            </View>
                        )}
                        renderHiddenRow={(rowData,sectionID,rowID,rowMap) => (
                            <View style={styles.rowBack}>
                                <TouchableOpacity>
                                  <View style={styles.leftView}>
                                    <Text style={{color:'white'}}>left</Text>
                                  </View>
                                </TouchableOpacity>
                                <TouchableOpacity  >
                                  <View style={styles.right}>
                                      <Text style={styles.rightStyle} onPress={()=>{this.deleteItem(rowData,sectionID,rowID,rowMap)}}>{this.props.deleteText}</Text>
                                  </View>
                                </TouchableOpacity>
                            </View>
                          )}
                        rightOpenValue={this.state.moveX}
                        disableRightSwipe={true}
                    />
              </View>
        );
  }
}


SwipeAction.propTypes={
    deleteText:PropTypes.string,
    bgColor:PropTypes.string,
    dataArr:PropTypes.array,
    swiperDeleteEvent:PropTypes.func
}

SwipeAction.defaultProps = {
    deleteText:'删除',
    bgColor:'#ff7b7b'
};


const styles = StyleSheet.create({
    rowLeft:{
        width:50,
        textAlign:'center',
        alignItems:'center',
        justifyContent:'space-between',

    },
    rowBack: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    },
    rowFront: {
        backgroundColor: '#fff',
        borderBottomColor: '#e3e3e5',
        borderBottomWidth: 1,
        justifyContent: 'center',
        paddingTop:8,
        paddingBottom:8,
        paddingLeft:13,
        paddingRight:15,
    },
    leftView: {
        flexDirection:"row",
        width: 50,
        alignItems: 'center',
        backgroundColor: '#ff7b7b',
        padding:8,
        justifyContent: 'center'
    },
    right: {
        flexDirection:"row",
        width: 50,
        alignItems: 'center',
        backgroundColor: '#ff7b7b',
        flex:1,
        justifyContent: 'space-around',
    },
    rightStyle:{
        textAlign:'center',
        color:'white'
    }
})