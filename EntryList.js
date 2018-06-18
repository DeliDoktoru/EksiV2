import React, { Component } from 'react';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/FontAwesome';
import CardView from 'react-native-cardview';
import AwesomeButton from 'react-native-really-awesome-button/src/themes/rick'
import {
    Text,
	FlatList
} from 'react-native';
var controller = require('./controller.js').controller.prototype;

export default class PageList extends Component {
    constructor(props) {
        super(props);
        this.state = { list: [],pageno: this.props.parent.stayingpage, progress: 0 };	
        this.back = this.back.bind(this);
        this.next = this.next.bind(this);
		this.getEntrys = this.getEntrys.bind(this);
		this.getEntrys(this.state.pageno);
		
    }
	
getEntrys(a){

	controller.getEntrys(this.props.parent.key,a).then(res=>{		
	 this.setState({ list: res});
   });
   controller.updateStayingPage(this.props.parent.key,parseInt(a));
	
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
	let b=this.props.parent.pagelength;
	if( b!=null && b>a)
	{	
		this.setState({pageno:a+1});
		this.getEntrys(a+1);	
		this.flatlist.scrollToOffset({ offset: 0, animated: false });
	}
}

    render() {
		let l;
		if(this.state.list[0] != null)
		{l=  <FlatList ref={(ref) => { this.flatlist = ref; }} data={this.state.list} 
		renderItem={({item}) => <CardView cardElevation={5} cardMaxElevation={5} cornerRadius={3} style={{backgroundColor:'#d5e1df'}}><Text style={{margin:5,padding:1,color:'#ff7043',paddingRight:13}}>{item.content}</Text></CardView>} /> ;}
		else
			l=<Text >Kayıt bulunamadı</Text>
	
        return (
           
                <Grid>
                    <Row size={10}>
						{l}
                    </Row>
                    <Row size={1}>
                    <Col >
					<AwesomeButton backgroundDarker='#778899'  backgroundColor='#26a69a' borderColor='#ff7043' raiseLevel={2} style={{alignSelf: 'center',marginBottom:5}} width={50} height={40} type="anchor"   onPress={this.back} ><Icon name="angle-left"  color="#000"  /></AwesomeButton>
                    </Col>
                    <Col>
                    <Text style={{textAlign: 'center',marginTop:10}}>{this.state.pageno}/{this.props.parent.pagelength}</Text>
                    </Col>
                    <Col >
					<AwesomeButton backgroundDarker='#778899'  backgroundColor='#26a69a' borderColor='#ff7043' raiseLevel={2} style={{alignSelf: 'center',marginBottom:5}} width={50} height={40} type="anchor"   onPress={this.next} ><Icon name="angle-right"  color="#000"  /></AwesomeButton>               
                    </Col>
                    </Row>
                </Grid>
            



        );
    }
}



