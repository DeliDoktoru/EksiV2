import mobx, { observable } from "mobx";

class Store {
    //Progressbar'ın görünürlüğü - bool
    @observable hide=true;
    //Sayfayı belirleyen - int
    @observable change=0;
    @observable selectedStatus="all";
}

const store = new Store()
export default store;