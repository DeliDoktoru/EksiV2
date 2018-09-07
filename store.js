import mobx, { observable } from "mobx";




export const Store={
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
 @observable test:""

}