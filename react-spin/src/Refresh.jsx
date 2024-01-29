import React,{useState} from "react";

function Refresh() {

  const [value,setValue] = useState();

  const refresh = ()=>{
      // it re-renders the component
     setValue({});
  }

  return (
    <div>
      <p>{Math.random()}</p>
      <button onClick={refresh}>Refresh component</button>
    </div>
  );
}
export default Refresh