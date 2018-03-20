import { AppRegistry } from 'react-native';
import React, { Component } from 'react';

import  {StackNavigator} from 'react-navigation';

import App from './App.js';

import WelcomePage from './js/page/WelcomePage.js';
import HomePage from './js/page/HomePage.js';

import CustomKey from './js/page/my/CustomKey.js';

import FolderContainer_Demo from './rn_work/examples/src/components/folderContainer/FolderContainer_Demo.js';
import CheckMore_Demo from './rn_work/examples/src/components/checkMore/CheckMore_Demo.js';
import Validator_Demo from './rn_work/examples/src/components/validator/Validator_Demo.js';

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
        }
    }
);

AppRegistry.registerComponent('gitHub', () => stackNav);
