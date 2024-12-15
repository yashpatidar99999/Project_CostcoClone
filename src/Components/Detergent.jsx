import React from "react";
import Navbar from "../Allsimiler/Navbar";
import style from "../Css/Product.module.css";
import Footer from "../Allsimiler/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../Context/Authcontextprovider";
import Afterloginnav from "../Allsimiler/Afterloginnav";
import Processing from "../Allsimiler/Processing"

const Detergent = () => {

  const {handleSinglepro,auth,handlerefreshProduct,handlerefresh} = React.useContext(Authcontext)
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false)
  const [content, setContent] = useState("All Products")

  function handleProduct(ele) {
    navigate("/productdetails")
    handleSinglepro(ele)
  }

  async function getDeterData() {
    try {
      setLoad(true)
      let res = await fetch(
        "https://costco-backend.onrender.com/detergent/getdetergent"
      );
      let res2 = await res.json();
      // console.log(res2.detergents);
      if(content == "All Products"){
        setLoad(false)
        setData(res2.detergents);
      }
      else if(content == "Low to High"){
        let lowToHigh = res2.detergents.sort((a, b) => {
          return a.price - b.price;
        });
        setData(lowToHigh)
        setLoad(false)
      }
      else if(content == "High to Low"){
        let highToLow = res2.detergents.sort((a, b) => {
          return b.price - a.price;
        });
        setData(highToLow)
        setLoad(false)
      }

     
    } catch (error) {
      setLoad(false)
      console.log(error)
    }
  }


  function handleProSort(event){
    console.log(event.target.value)
    if(event.target.value == "Low to High" ){
      setContent(event.target.value)
    }
    else if(event.target.value == "High to Low"){
      setContent(event.target.value)
    }
    else if(event.target.value == "All Products"){
      setContent(event.target.value)
    }
  }

  useEffect(() => {
    document.title = "Laundry Detergent & Supplies | Costco"
    handlerefreshProduct()
    handlerefresh()
  }, [])
  


  useEffect(() => {
    document.title = "Laundry Detergent & Supplies | Costco"
    handlerefreshProduct()
    getDeterData();
  }, [content]);


  if(load){
    return <Processing/>
  }


  return (
    <div className={style.pro}>
       {auth ? <Afterloginnav /> : <Navbar />}
      <div className={style.promain}>
        <div className={style.promain1}>
          <p className={style.filter1}>Filter Results</p>
          <hr className={style.ruller4} />

          <p className={style.category}>Category</p>
          <p className={style.progrop1}>
            Grocery, Household Essentials &amp; Pet
          </p>
          <p className={style.progrop1}>Cleaning Supplies</p>
          <p className={style.progrop1}>Laundry Detergent &amp; Supplies</p>

          <hr className={style.ruller5} />

          <div className={style.duo}>
            <div className={style.selectsmall}></div>
            <p className={style.selectsmallp1}>Delivery</p>
          </div>
          <div className={style.duo}>
            <div className={style.selectsmall}></div>
            <p className={style.selectsmallp1}>2-Day Delivery</p>
          </div>

          <div className={style.duo}>
            <div className={style.selectsmall}></div>
            <p className={style.selectsmallp1}>Buy in Warehouse</p>
          </div>
          <hr className={style.ruller5} />

          <p className={style.category}>Price</p>
          <div className={style.duo}>
            <div className={style.selectsmall}></div>
            <p className={style.selectsmallp1}>$0 to $25</p>
          </div>

          <div className={style.duo}>
            <div className={style.selectsmall}></div>
            <p className={style.selectsmallp1}>$25 to $50</p>
          </div>

          <div className={style.duo}>
            <div className={style.selectsmall}></div>
            <p className={style.selectsmallp1}>$50 to $100</p>
          </div>

          <hr className={style.ruller5} />

          <p className={style.category}>Brand</p>
          <div className={style.duo}>
            <div className={style.selectsmall}></div>
            <p className={style.selectsmallp1}>All</p>
          </div>
          <div className={style.duo}>
            <div className={style.selectsmall}></div>
            <p className={style.selectsmallp1}>Arm & Hammer</p>
          </div>
          <div className={style.duo}>
            <div className={style.selectsmall}></div>
            <p className={style.selectsmallp1}>Boulder Clean</p>
          </div>
          <div className={style.duo}>
            <div className={style.selectsmall}></div>
            <p className={style.selectsmallp1}>Bounce</p>
          </div>
          <div className={style.duo}>
            <div className={style.selectsmall}></div>
            <p className={style.selectsmallp1}>DKNY</p>
          </div>

          <hr className={style.ruller5} />
          <p className={style.category}>Form</p>
          <div className={style.duo}>
            <div className={style.selectsmall}></div>
            <p className={style.selectsmallp1}>Beads</p>
          </div>
          <div className={style.duo}>
            <div className={style.selectsmall}></div>
            <p className={style.selectsmallp1}>Liquid</p>
          </div>
          <div className={style.duo}>
            <div className={style.selectsmall}></div>
            <p className={style.selectsmallp1}>Pods</p>
          </div>
          <div className={style.duo}>
            <div className={style.selectsmall}></div>
            <p className={style.selectsmallp1}>Powder</p>
          </div>
          <div className={style.duo}>
            <div className={style.selectsmall}></div>
            <p className={style.selectsmallp1}>Sheets</p>
          </div>
        </div>

        <div className={style.promain2}>
          <p className={style.promain2cat}>Laundry Detergent & Supplies</p>
          {data &&
            data.map((ele, index) => {
              return (
                <div
                  key={index}
                  className={style.smallpro}
                  onClick={()=>{handleProduct(ele)}}
                >
                  <img src={ele.img} alt="" />
                  <p className={style.smallprop1}>${ele.price}</p>
                  <p className={style.smallprop2}>{ele.title}</p>
                </div>
              );
            })}
        </div>
      </div>

      <select className={style.selectpro} onChange={handleProSort} value={content} style={{cursor:"pointer"}}>
        <option value="All Products">All Products</option>
        <option value="High to Low">High to Low</option>
        <option value="Low to High">Low to High</option>
      </select>

      <Footer />
    </div>
  );
};

export default Detergent;
