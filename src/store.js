/**
 * Created by 心然May on 2017/5/2 0002.
 */
const STORAGE_KEY = 'todoListData';
export default {
  fetch(){
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
  },
  save(items){
    window.localStorage.setItem(STORAGE_KEY,JSON.stringify(items))
  }
}
