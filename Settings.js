
import React, { Component } from 'react';
import {  Row, Grid } from "react-native-easy-grid";
import KeepAwake from 'react-native-keep-awake';
import {observer} from 'mobx-react';
import {Store} from './store.js';
import {
	Text,CheckBox,TouchableOpacity 
} from 'react-native';
import {controller} from './controller.js';
import IconI from 'react-native-vector-icons/Ionicons';

@observer
export default class Settings extends Component {
  constructor(props) {
    super(props);
    
 	


  }


  
  render() {
	

   return (
       <Grid>
         <IconI name="md-star-outline" size={40} color="#CDD989" />
         <IconI name="md-star" size={40} color="#CDD989" />
           <CheckBox value={true}/><Text>Zaman</Text>
           <TouchableOpacity style={{top:  0,right:0}}>
		  <IconI name="md-star-outline" size={40} color="#CDD989" />	
		  </TouchableOpacity>

       </Grid>
			
      
     );
  }
}






