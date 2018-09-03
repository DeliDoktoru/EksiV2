
import React, { Component } from 'react';
import {  Row, Grid } from "react-native-easy-grid";
import ProgressBar from 'react-native-progress-bar';
import Content from './Content';
import MainMenu from './MainMenu';
import KeepAwake from 'react-native-keep-awake';


import {
  View, 
  BackHandler,
} from 'react-native';
var controller = require('./controller.js').controller.prototype;



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { link:"",hide:true,progress:0,change:0,page:{key:1,pagelength:1,stayingpage:1,pagename:""}};
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
  if(this.state.change!=0)
  {  this.setState({change:0});
  return true;}
  return false;
}

   downloadPage(p,t) {
	if(p.state.hide==true)
	{   p.setState({ hide:false,link:"İndiriliyor..."});
		let a=p.state.link;
		if(a=!null && (a.search("http://eksisozluk.com")!=-1 || a.search("https://eksisozluk.com")!=-1))
		{ controller.save(p.state.link,p).then(res=>{
			p.setState({ hide:true,link:""});
		});}
	}
  }
  
  render() {
	let navi, bottom,progress;
	if(!this.state.hide)
	{progress=(<Row size={4}>
		<ProgressBar
          fillStyle={{backgroundColor: '#5d9133'}}
          backgroundStyle={{backgroundColor: '#5d9133', borderRadius: 2}}
          style={{margin: 10, flex: 1}}
          progress={this.state.progress}
        /> 
			</Row> );
	}
	
	 if(this.state.change==0)
	{
		navi=<MainMenu parent={this}/>;
		
	}
	else 
	{
		
		navi=<Content parent={this} onRef={ref => (this.child = ref)} />;	
	}
	
	
    return (
	
      
      <Grid style={{backgroundColor: '#393938'}} >

		<KeepAwake />
		
		{progress}
	
		<Row size={96}>
		{navi}
		</Row>		
			
       
		
	
        
      </Grid>


    );
  }
}






