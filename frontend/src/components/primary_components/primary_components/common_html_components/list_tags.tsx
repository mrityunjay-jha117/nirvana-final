import {useNavigate } from "react-router-dom"
export default function Tags({link,name="mrityu"}:any){
  const navigate=useNavigate();
  return(<div className="flex text-xs lex-row cursor-pointer"
  onClick={()=>{navigate(`/${link}`)}}>
  {name}
  </div>)
}