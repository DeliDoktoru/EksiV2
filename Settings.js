
import React, { Component } from 'react';
import {  Row, Grid } from "react-native-easy-grid";
import KeepAwake from 'react-native-keep-awake';
import {observer} from 'mobx-react';
import {Store} from './store.js';
import {
	Text,CheckBox 
} from 'react-native';
import {controller} from './controller.js';


@observer
export default class Settings extends Component {
  constructor(props) {
    super(props);
    
 	


  }


  
  render() {
	

   return (
       <Grid>
           <CheckBox value={true}/><Text>Zaman</Text>


       </Grid>
			
      
     );
  }
}






