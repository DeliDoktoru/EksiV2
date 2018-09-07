import mobx, { observable,action } from "mobx";
import {controller} from './controller.js';



export const Store={
 //MainMenu ve Content nesneleri 
 @observable MainMenu:null,@observable Content:null,
 //Progressbar'ın görünürlüğü - bool
 @observable hide:true,
 //Sayfayı belirleyen - int
 @observable change:0,
 //İndirilen sayfanın linki - String
 @observable link:"",
//İndirme durumunu gösteren % lik - Int
 @observable progress:0,
 //Sayfayla ilgili bilgiler - Obj
 @observable page:{key:1,pagelength:1,stayingpage:1,pagename:""},
 //test etmek için - String
 @observable test:"",
 //Sayfalarını indirmeye başlatmak
 @action downloadPage(){
    if(Store.hide==true)
	{   Store.hide=false;
		//linki a ya atıyoruz
		let a=Store.link;
		Store.link="İndiriliyor...";
		if(a!=null && (a.search("http://eksisozluk.com")!=-1 || a.search("https://eksisozluk.com")!=-1))
		{ 	
			controller.save(a).then(res=>{
			Store.hide=true;
			Store.link="";
		});
	
	}
	}
 }

}