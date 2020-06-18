
export function valueStyle(value:number) {
  if(value===0){
    return{
      color:""}
  }else if(value>0){
    return{
      color:'#df1050'}
  }else{
    return{
      color:'#04f49b'
    }
  }
}
