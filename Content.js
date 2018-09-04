import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import AwesomeButton from 'react-native-really-awesome-button/src/themes/rick'
import {	
    Text,
	FlatList,
	Image,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconF from 'react-native-vector-icons/FontAwesome';
var controller = require('./controller.js').controller.prototype;
export default class test extends Component {
    constructor(props) {
        super(props); 
	this.state = { list: [],title:"",pageno: this.props.parent.state.page.stayingpage};
	 this.backarrow = this.backarrow.bind(this);
	this.getTitle = this.getTitle.bind(this);
        this.getContent = this.getContent.bind(this);
		this.getEntrys = this.getEntrys.bind(this);
		 this.back = this.back.bind(this);
        this.next = this.next.bind(this);
		this.getContent();
		this.getTitle();
    }
	getTitle(){
	  if(this.props.parent.state.change==1)
	{
		this.state.title="TÜMÜ";
	}	
	else if(this.props.parent.state.change==2)
	{
		this.state.title="DEVAM EDİLECEKLER";
	}
	else if(this.props.parent.state.change==3)
	{
		this.state.title="BAŞLAMADIKLARIM";
	}
	else if(this.props.parent.state.change==4)
	{
		this.state.title=this.props.parent.state.page.pagename;
	}
	  
	  
  }
	componentDidMount() {
    this.props.onRef(this)
  }
  
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  backarrow(){
	  this.props.parent.setState({change:0});
  }
	getContent(){
		
	if(this.props.parent.state.change==1)
	{
		controller.getPages().then(res => {
         this.setState({ list: res});
       });
	}	
	else if(this.props.parent.state.change==2)
	{
		controller.getPagesC().then(res => {
         this.setState({ list: res});
       });
	}
	else if(this.props.parent.state.change==3)
	{
		controller.getPagesN().then(res => {
         this.setState({ list: res});
       });
	}
    else if(this.props.parent.state.change==4)
	{ 
	this.getEntrys(this.state.pageno);
	}    
	this.getTitle();
 	}
	getEntrys(a){

	controller.getEntrys(this.props.parent.state.page.key,a).then(res=>{		
	 this.setState({ list: res});
   });
   controller.updateStayingPage(this.props.parent.state.page.key,parseInt(a));
	
	}
	getSelectedPage(a,b){ 
	this.props.parent.setState({change:4,page:{key:a.key,pagelength:a.pagelength,stayingpage:a.stayingpage || 1,pagename:a.pagename} },()=>{ this.getContent(); });
	
  }
back()
{	let a=this.state.pageno;
	if(a>1)
	{	this.setState({pageno:a-1});
		this.getEntrys(a-1);				
		this.flatlist.scrollToOffset({ offset: 0, animated: false });
	}
}
next()
{	
	let a=this.state.pageno;
	let b=this.props.parent.state.page.pagelength;
	if( b!=null && b>a)
	{	
		this.setState({pageno:a+1});
		this.getEntrys(a+1);	
		this.flatlist.scrollToOffset({ offset: 0, animated: false });
	}
}
    render() {
		let l;
		let b;
			if(this.state.list[0] != null) 
		{ 
			if(this.props.parent.state.change!=4){
			l=<FlatList ref={(ref) => { this.flatlist = ref; }}
          data={this.state.list}
          renderItem={({item,index}) => 
		  <TouchableOpacity onPress={this.getSelectedPage.bind(this,item)}>
		  <Grid style={{minHeight: 50,paddingBottom:10,paddingTop:10,backgroundColor:index%2!=0?'#5d9133':'#7aba40',borderBottomWidth: 1,borderBottomColor:"#FFFFFF"}}>
		  <Col size={80} >
		  <Text style={css.inputStyle3}>
			   {item.pagename}
          </Text>
		  </Col>
		  <Col size={20} >
		     <Text style={css.inputStyle3}>
				{item.pagelength}
		    </Text>
		  </Col>
		  </Grid>
		  </TouchableOpacity >

			} />   }
			else{
					l=<FlatList ref={(ref) => { this.flatlist = ref; }}
          data={this.state.list}
          renderItem={({item,index}) => 
	
		  <Grid style={{minHeight: 50,paddingBottom:10,paddingTop:10,backgroundColor:index%2!=0?'#5d9133':'#7aba40',borderBottomWidth: 1,borderBottomColor:"#FFFFFF"}}>
		  <Col  >
		  <Text style={css.inputStyle3}>
			   {item.content}
          </Text>
		  </Col>	
		  </Grid> 	} /> 
				
				b=<Grid style={{position: 'absolute',bottom:  0}}>
	    <Col >
		<AwesomeButton backgroundDarker='#7aba40'  borderColor='#7aba40' raiseLevel={2} style={{alignSelf: 'center',marginBottom:5}} width={50} height={40} type="secondary"   onPress={this.back} ><IconF name="angle-left"  color="#000"  /></AwesomeButton>
        </Col>
        <Col>
        <Text style={{fontFamily: "MarkPro-Bold",fontSize: 14,color:'#393938',textAlign: 'center',marginTop:10}}>{this.state.pageno}/{this.props.parent.state.page.pagelength}</Text>
        </Col>
        <Col >
		<AwesomeButton backgroundDarker='#7aba40'  borderColor='#7aba40' raiseLevel={2} style={{alignSelf: 'center',marginBottom:5}} width={50} height={40} type="secondary"   onPress={this.next} ><IconF name="angle-right"  color="#000"  /></AwesomeButton>               
        </Col>   
		</Grid>
				
					}}
		else
			l=<Text style={{textAlign: 'center',fontFamily: "MarkPro-Bold", fontSize: 16,color:"#393938"}}>Kayıt bulunamadı.</Text>
		
		

        return (
		
  

		<Grid >
		
		<Row size={10} style={{backgroundColor:'#393938'}}>
		<Col size={20} style={css.centerChildrens}>
		<TouchableOpacity  onPress={this.backarrow} style={[css.centerChildrens,{flex:1}]}>
		<Icon name="arrow-left-bold-box" size={40} color="#7aba40" />
		</TouchableOpacity>
		</Col>
		<Col size={50} style={css.centerChildrens}>
		 <Text style={css.inputStyle2}>{this.state.title}</Text>
		</Col>
		<Col size={30} style={css.centerChildrens}>
		  	<Image
		  style={{alignSelf: 'center',width: 70, height: 60}}
          source={require('./imgs/offline.png')}
		  resizeMode="contain" />
		</Col>
		</Row>
		<Row size={90} style={{ marginTop:15,justifyContent: 'center',backgroundColor:'#FFFFFF'}}>
		 	{l}
		</Row>
			{b}				
		</Grid>
		
        );
    }
}

const css = StyleSheet.create({
  theme1: {
   backgroundColor:'#393938'
  },
  theme2: {
    backgroundColor:'#5d9133' //green
  },
  centerChildrens:{
	  justifyContent: 'center', 
	  alignItems: 'center'
  },
  inputStyle:{
	  flexDirection: 'row',
	  marginRight:25,
	  marginLeft:25,
	paddingRight:5,
	paddingLeft:5
  },
  inputStyle2:{
	  textAlign: 'center',
	  fontFamily: "MarkPro-Bold", 
	  fontSize: 14,
	  color:"#FFFFFF",
	  paddingLeft:2,
	  paddingRight:2
	  
  },
  inputStyle3:{
	  fontFamily: "MarkPro-Bold", 
	  fontSize: 16,
	  color:"#FFFFFF",
		paddingLeft:10
	  
  },
 
  
});


