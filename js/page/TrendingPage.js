/**
 * Created by xiaowuzai on 2018/2/1.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity,TextInput} from 'react-native';

import DataRepository,{FLAG_STORAGE} from '../expand/dao/DataRepository.js';

import NavigationBar from '../common/NavigationBar.js';
import LanguangeDao,{FLAG_LANGUAGE} from '../expand/dao/LanguangeDao.js';

import ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';
import TrendingTab from './TrendingTab.js';
import TimeSpan from '../modal/TimeSpan.js';
import Popover from '../common/Popover.js';

var timeSpanTextArray=[new TimeSpan('今 天','?since=daily'),new TimeSpan('本 周','?since=weekly'),new TimeSpan('本 月','?since=monthly')];

export default class TrendingPage extends Component{
    constructor(props){
        super(props)
        this.state={
            language:[],
            isVisible:false,
            buttonRect:{},
            timeSpanView:timeSpanTextArray[0]
        }
        this.dataRepository=new DataRepository(FLAG_STORAGE.flag_popular);
        this.languageDao=new LanguangeDao(FLAG_LANGUAGE.flag_language);
    };
    componentDidMount(){
        this.loadData()
    }
    loadData(){
        this.languageDao.fetch().then(result=>{
            this.setState({language:result})
        }).catch(e=>console.log(e))
    }
    showPopover() {
        this.refs.button.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
    }
    closePopover() {
        this.setState({isVisible: false});
    }
    renderTitleView(){
        let timeSpanView=this.state.timeSpanView;
        return (
            <View>
                <TouchableOpacity ref='button' onPress={this.showPopover.bind(this)}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{fontSize:16,color:'white',fontWeight:'400'}}>趋势</Text>
                        <Text style={{fontSize:16,color:'white',fontWeight:'400'}}>{timeSpanView.showText}</Text>
                        <Image source={require('../../res/images/ic_spinner_triangle.png')} style={{width:12,height:12,marginLeft:5}}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    onSelectTimeSpan(timeSpan){
        this.setState({
            isVisible:false,
            timeSpanView:timeSpan
        })
    }

    render(){
        let navigate=this.props.navigate
        let content=this.state.language.length>0?<ScrollableTabView
            renderTabBar={() => <ScrollableTabBar/>}
            initialPage={1}
            >
            {this.state.language.map((result,i,arr)=>{
                let lan=arr[i];
                return lan.checked?<TrendingTab tabLabel={lan.name} timeSpan={this.state.timeSpanView} key={i} navigate={navigate}/>:null
            })}
        </ScrollableTabView>:null
        let that=this;
        let timeSpanView=<Popover
                            isVisible={this.state.isVisible}
                            fromRect={this.state.buttonRect}
                            placement="bottom"
                            contentStyle={{backgroundColor:"#343434",opacity:0.8}}
                            onClose={this.closePopover.bind(this)}>
                            {
                                timeSpanTextArray.map(function(result,i,arr){
                                    return(
                                        <TouchableOpacity key={i} onPress={()=>{
                                            that.onSelectTimeSpan(arr[i])
                                        }}>
                                            <Text style={{fontSize:14,color:'white',fontWeight:'200',padding:5}}>{arr[i].showText}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </Popover>
        return (
            <View style={styles.container}>
                <NavigationBar
                    titleView={this.renderTitleView()}
                    statusBar={{
                        backgroundColor:'#ee6363'
                    }}
                />
                {content}
                {timeSpanView}
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1
    }
});