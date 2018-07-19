import { AppRegistry } from 'react-native';
import React, { Component } from 'react';

import  {StackNavigator} from 'react-navigation';

import App from './App.js';

import WelcomePage from './js/page/WelcomePage.js';
import HomePage from './js/page/HomePage.js';

import CustomKey from './js/page/my/CustomKey.js';
import SortKeyPage from './js/page/my/SortKeyPage.js';
import AboutPage from './js/page/about/AboutPage.js'
import RepositoryDetail from './js/page/RepositoryDetail.js'

const stackNav=StackNavigator(
    {
        welcomePage:{
            screen:WelcomePage
        },
        homePage:{
            screen:HomePage
        },
        CustomKey:{
            screen:CustomKey
        },
        SortKeyPage:{
            screen:SortKeyPage
        },
        AboutPage:{
            screen:AboutPage
        },
        RepositoryDetail:{
            screen:RepositoryDetail
        }
    }
);

AppRegistry.registerComponent('gitHub', () => stackNav);
