
import React, { Component } from 'react';
import {  Row, Grid } from "react-native-easy-grid";
import ProgressBar from 'react-native-progress-bar';
import Content from './Content';
import MainMenu from './MainMenu';
import KeepAwake from 'react-native-keep-awake';
import {observer} from 'mobx-react';
import {Store} from './store.js';
import {
	BackHandler,
	Text
} from 'react-native';
import {controller} from './controller.js';


@observer
export default class App extends Component {
  constructor(props) {
    super(props);
    
 	this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
	KeepAwake.activate();


  }
componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}
componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}
handleBackButtonClick() {
  if(Store.change!=0)
  {  Sore.change=0;
  return true;}
  return false;
}

  
  render() {
	let navi, bottom,progress,test;
	if(!Store.hide)
	{progress=(<Row size={4}>
		<ProgressBar
          fillStyle={{backgroundColor: '#5d9133'}}
          backgroundStyle={{backgroundColor: '#5d9133', borderRadius: 2}}
          style={{margin: 10, flex: 1}}
          progress={Store.progress}
        /> 
			</Row> );
	}
	
	 if(Store.change==0)
	{
		navi=<MainMenu/>;
		
	}
	else 
	{
		
		navi=<Content/>;	
	}
	//test için
	if(Store.test!="")
	{
		test=	<Row size={5} style={{backgroundColor: '#FFFFFF'}} >
		<Text>{Store.test}</Text>
	</Row>;	
	}

   return (
			
      
    <Grid style={{backgroundColor: '#393938'}} >
			
		<KeepAwake />
		{test}	

		{progress}
	
		<Row size={96}>
		{navi}
		</Row>		
      </Grid>


    );
  }
}






