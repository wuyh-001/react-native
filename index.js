import { AppRegistry } from 'react-native';
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image} from 'react-native';

//import TabNav from 'react-native-tab-navigator';
import  {StackNavigator,TabNavigator,DrawerNavigator} from 'react-navigation';

import ListViewComponent from './App.js';
//import CollapsibleCom from './CollapsibleCom.js';
//import FolderContainer_Demo from './folderContainer/FolderContainer_Demo.js';

import WelcomePage from './js/page/WelcomePage.js';
import HomePage from './js/page/HomePage.js';
import PopularPage from './js/page/PopularPage.js';

import JavaPage from './js/page/PopularTabs/JAVA.js';
import IOSsPage from './js/page/PopularTabs/IOS.js';
import AndroidPage from './js/page/PopularTabs/Android.js';
import JavaScriptPage from './js/page/PopularTabs/JavaScript.js';

//import List from './component_jq/ListViewComponent.js'
//import RefreshControlComponent from './component_jq/RefreshControlComponent.js'
//import ModalComponent from './component_jq/ModalComponent.js'
//import AnimatedComponent from './component_jq/AnimatedComponent.js'

import MoviesList from './SampleAppMovies/MoviesList.js';


import Demo from './demo.js';

const tabNav=TabNavigator({
    Java:{
        screen:JavaPage
    },
    IOS:{
        screen:IOSsPage
    },
    Android:{
        screen:AndroidPage
    },
    JavaScript:{
        screen:JavaScriptPage
    }
},{
    tabBarPosition: 'top'
})

const stackNav=StackNavigator(
    {
        welcomePage:{
            screen:WelcomePage
        },
        homePage:{
            screen:HomePage
        },
        tabNav:{
            screen:tabNav
        }
    }
);


AppRegistry.registerComponent('gitHub', () => MoviesList);
