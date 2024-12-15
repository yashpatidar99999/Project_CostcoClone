import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Authcontext = React.createContext();

const Authcontextprovider = ({ children }) => {
  const [singlepro, setSinglepro] = useState({});
  const [cartpro, setCartpro] = useState([]);
  const [cartcount, setCartcount] = useState(0);
  const [auth, setAuth] = useState(false)
  const [title, setTitle] = useState("")
const navigate = useNavigate()
  function addToCart(ele) {
    let ele2 = { ...ele, qty: 1 };
    setCartpro([...cartpro, ele2]);
    setCartcount(cartcount + 1);
    localStorage.setItem("scart", JSON.stringify([...cartpro, ele2]));
  }

  function handleBuyNow(ele) {
    let ele2 = { ...ele, qty: 1 };
    localStorage.setItem("scart", JSON.stringify([ele2]));
    setCartpro([ele2]);
    setCartcount(1);
  }

  function signupandlogin(){
    setAuth(true)
  }

  function handlerefresh(){
    if(localStorage.getItem("token")){
      setAuth(true)
    }

  }

  function handlerefreshProduct(){
    if(JSON.parse(localStorage.getItem("scart")) == null){
      setCartpro([]);
    setCartcount(0);
    }
    else{
      let ele = JSON.parse(localStorage.getItem("scart"));
      setCartpro(ele);
      setCartcount(ele.length);
    }
   
  }

  function handleCheckoutOrder(){
    let allProIs = JSON.parse(localStorage.getItem("scart"))
    setCartpro(allProIs)
  }

  function handleResetAll(){
    // localStorage.removeItem("token")
    localStorage.removeItem("scart")
    setCartpro([]);
    setCartcount(0);
  }


  function handleLogout(){
    localStorage.removeItem("token")
    navigate("/")
    setAuth(false)
  }

  //  console.log(cartpro)

  function handleUpdatePro(id, val) {
    let updatepro = cartpro.map((ele) => {
      if (ele._id == id) {
        ele.qty = val;
        return ele;
      } else {
        return ele;
      }
    });
    localStorage.setItem("scart", JSON.stringify(updatepro));
    setCartpro(updatepro);
  }

function resetcartcount(){
  setCartcount(0)
  setCartpro([])
}


  function handleFilterIt(val){
    let filterPro = cartpro.filter((ele)=>{
      if(ele._id != val){
        return ele
      }
    })
    setCartpro(filterPro);
    localStorage.setItem("scart", JSON.stringify(filterPro));
    setCartcount(cartcount - 1)
  }

  function refreshsinglePro(){
    let ele = JSON.parse(localStorage.getItem("singlepro"));
    setSinglepro(ele);
    setTitle(ele.title)
    console.log(ele.title)
  }

  function handleSinglepro(data) {
    // console.log(data);
    localStorage.setItem("singlepro", JSON.stringify(data));
    setSinglepro(data);
    setTitle(data.title)
  }

  return (
    <Authcontext.Provider
      value={{
        singlepro,
        handleSinglepro,
        cartcount,
        addToCart,
        handleBuyNow,
        cartpro,
        handleUpdatePro,
        handleFilterIt,
        resetcartcount,
        auth,
        signupandlogin,
        handleLogout,
        handlerefresh,
        refreshsinglePro,
        title,
        handlerefreshProduct,
        handleResetAll,
        handleCheckoutOrder
      }}
    >
      {children}
    </Authcontext.Provider>
  );
};

export default Authcontextprovider;
