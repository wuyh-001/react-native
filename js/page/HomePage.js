/**
 * Created by xiaowuzai on 2018/1/31.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';

import PopularPage from './PopularPage.js';
import MyPage from './my/MyPage.js';

export default class HomePage extends Component{
    constructor(props){
        super(props)
        this.state={
            selectedTab:'tb_polular'
        }
    }
    static navigationOptions={
        //headerTitle:'PopularPage'
        header:null
    }

    render() {
        let {selectedTab}=this.state;
        let {navigate}=this.props.navigation;
        return (
            <View style={{flex:1}}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={selectedTab === 'tb_polular'}
                        title="最热"
                        selectedTitleStyle={{color:'#2196f3'}}
                        renderIcon={() => <Image source={require('./../../res/images/ic_polular.png')} style={styles.image}/>}
                        renderSelectedIcon={() => <Image source={require('./../../res/images/ic_polular.png')} style={[styles.image,{tintColor:'#2196f3'}]}/>}
                        onPress={() => this.setState({ selectedTab: 'tb_polular' })}>
                        <View style={{flex:1}}>
                            <PopularPage navigate={navigate}/>
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={selectedTab === 'tb_trending'}
                        title="趋势"
                        renderIcon={() => <Image source={require('./../../res/images/ic_trending.png')} style={styles.image}/>}
                        renderSelectedIcon={() => <Image source={require('./../../res/images/ic_trending.png')} style={[styles.image,{tintColor:'#2196f3'}]}/>}
                        selectedTitleStyle={{color:'#2196f3'}}
                        onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
                        <View style={{flex:1}}>
                            <MyPage/>
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={selectedTab === 'tb_favorite'}
                        title="收藏"
                        selectedTitleStyle={{color:'#2196f3'}}
                        renderIcon={() => <Image source={require('./../../res/images/ic_favorite.png')} style={styles.image}/>}
                        renderSelectedIcon={() => <Image source={require('./../../res/images/ic_favorite.png')} style={[styles.image,{tintColor:'#2196f3'}]}/>}
                        onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>
                        <View style={styles.page1}></View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={selectedTab === 'tb_my'}
                        title="我的"
                        renderIcon={() => <Image source={require('./../../res/images/ic_my.png')} style={styles.image}/>}
                        renderSelectedIcon={() => <Image source={require('./../../res/images/ic_my.png')} style={[styles.image,{tintColor:'#2196f3'}]}/>}
                        selectedTitleStyle={{color:'#2196f3'}}
                        onPress={() => this.setState({ selectedTab: 'tb_my' })}>
                        <View style={{flex:1}}>
                            <MyPage navigate={navigate} />
                        </View>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    page1:{
        flex:1,
        backgroundColor:'red',
    },
    page2:{
        flex:1,
        backgroundColor:'yellow',
    },
    image:{
        width:22,
        height:22
    }

});