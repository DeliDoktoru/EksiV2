import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import AwesomeButton from 'react-native-really-awesome-button/src/themes/rick'
import {	
    Text,
	FlatList,
	Image,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import {observer} from 'mobx-react';
import {Store} from './store.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconF from 'react-native-vector-icons/FontAwesome';
import {controller} from './controller.js';
import RF from "react-native-responsive-fontsize";
import IconI from 'react-native-vector-icons/Ionicons';
import AnimatedHideView from 'react-native-animated-hide-view';

@observer
export default class Content extends Component {
    constructor(props) {
		super(props); 
		Store.Content=this;
	this.state = { list: [],title:"",pageno: Store.page.stayingpage,fade:-1};
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
	  if(Store.change==1)
	{
		this.state.title="TÜMÜ";
	}	
	else if(Store.change==2)
	{
		this.state.title="DEVAM EDİLECEKLER";
	}
	else if(Store.change==3)
	{
		this.state.title="BAŞLAMADIKLARIM";
	}
	else if(Store.change==4)
	{
		this.state.title=Store.page.pagename;
	}
	  
	  
	}

	
  	backarrow(){
	  Store.change=0;
	
	}
	
	getContent(){
		
	if(Store.change==1)
	{
		controller.getPages().then(res => {
         this.setState({ list: res});
       });
	}	
	else if(Store.change==2)
	{
		controller.getPagesC().then(res => {
         this.setState({ list: res});
       });
	}
	else if(Store.change==3)
	{
		controller.getPagesN().then(res => {
         this.setState({ list: res});
       });
	}
    else if(Store.change==4)
	{ 
	this.getEntrys(Store.page.stayingpage);
	} 

	this.getTitle();

	 }
	 

	getEntrys(a){
	controller.getEntrys(Store.page.key,a).then(res=>{		
	 this.setState({ list: res});
  	});
  
	
	}
	getSelectedPage(a,b){ 
		Store.change=4,
		Store.page.key=a.key,
		Store.page.pagelength=a.pagelength,
		Store.page.stayingpage=a.stayingpage || 1,
		Store.page.pagename=a.pagename,
		this.setState({ pageno: a.stayingpage || 1});
		this.getContent();
	
 	}
	back()
	{	let a=this.state.pageno;
	if(a>1)
	{	this.setState({pageno:a-1});
		this.getEntrys(a-1);
		controller.updateStayingPage(Store.page.key,parseInt(a-1));				
		this.flatlist.scrollToOffset({ offset: 0, animated: false });
	}
	}
	next()		
	{	
	let a=this.state.pageno;
	let b=Store.page.pagelength;
	if( b!=null && b>a)
	{	
		this.setState({pageno:a+1});
		this.getEntrys(a+1);
		controller.updateStayingPage(Store.page.key,parseInt(a+1));	
		this.flatlist.scrollToOffset({ offset: 0, animated: false });
	}
	}
    render() {
		let listRender,bottomRender;
		
			if(this.state.list[0] != null) 
		{ 
			if(Store.change!=4){
			listRender=<FlatList ref={(ref) => { this.flatlist = ref; }}
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
				listRender=<FlatList ref={(ref) => { this.flatlist = ref;  }}
		  data={this.state.list}
		  extraData={this.state}
		   renderItem={({item,index}) => 
		  <Grid style={{minHeight: 50,paddingBottom:(this.state.list.length-1)==index?50:10,paddingTop:15,backgroundColor:index%2!=0?'#5d9133':'#7aba40',borderBottomWidth: 1,borderBottomColor:"#FFFFFF"}}>
		  <Row onPress={()=>{	
			  this.setState(x=>{return {fade:index==x.fade?-1:index}}); 
			  
			  }}>
		  <Text style={[css.inputStyle3,{textAlign: 'left'}]}>
			   {item.content}
          </Text>
		  </Row>	
		  <Row>
		  <AnimatedHideView  visible={(this.state.fade==index)?true:false} >
		  <TouchableOpacity >
		  <IconI name="md-star-outline" size={40} color="#CDD989" />
		  </TouchableOpacity>
		  </AnimatedHideView>
		
		  </Row>	
		  </Grid> 	} /> 
				
				bottomRender=<Grid style={{position: 'absolute',bottom:  0}}>
	    <Col >
		<AwesomeButton backgroundDarker='#7aba40'  borderColor='#7aba40' raiseLevel={2} style={{alignSelf: 'center',marginBottom:5}} width={50} height={40} type="secondary"   onPress={this.back} ><IconF name="angle-left"  color="#000"  /></AwesomeButton>
        </Col>
        <Col>
        <Text style={{fontFamily: "MarkPro-Bold",fontSize: 14,color:'#393938',textAlign: 'center',marginTop:10}}>{this.state.pageno}/{Store.page.pagelength}</Text>
        </Col>
        <Col >
		<AwesomeButton backgroundDarker='#7aba40'  borderColor='#7aba40' raiseLevel={2} style={{alignSelf: 'center',marginBottom:5}} width={50} height={40} type="secondary"   onPress={this.next} ><IconF name="angle-right"  color="#000"  /></AwesomeButton>               
        </Col>   
		</Grid>
		
					}}
		else
			listRender=<Text style={{textAlign: 'center',fontFamily: "MarkPro-Bold", fontSize: 16,color:"#393938"}}>Kayıt bulunamadı.</Text>
		
		

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
			
		 	{listRender}
		</Row>
		
		
			{bottomRender}			
		
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
	  fontSize: RF(2.5),
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


