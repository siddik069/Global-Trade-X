import { useState, useRef, useEffect } from "react";
import {
  Search, ShoppingCart, Bell, Heart, Star, Package, TrendingUp, Users, MessageCircle,
  Settings, Shield, Globe, ChevronRight, BarChart3, DollarSign, ArrowUp, Send, Bot,
  Store, Truck, CheckCircle, Clock, Edit, Trash2, AlertCircle, Upload, Filter, Plus,
  X, Zap, MapPin, Lock, ShoppingBag, Check, Eye, FileText, Activity, LayoutDashboard
} from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const PRODUCTS = [
  { id:1,  title:"400W Monocrystalline Solar Panel",       price:"$45-$89",    unit:"/piece",  moq:"10 pcs",   cat:"Electronics",  rating:4.8, reviews:2341, orders:"5,000+",  flag:"CN", seller:"SunPower Technology",  verified:true,  badge:"Gold Supplier",         tags:["Hot","Trade Assurance"], color:"#FCD34D", emoji:"\u2600\ufe0f",  desc:"High-efficiency 400W panels, TUV & CE certified, 25-year warranty." },
  { id:2,  title:"CNC Router 1325 Wood Engraving Machine", price:"$2,100-$3,500",unit:"/set",  moq:"1 set",    cat:"Machinery",    rating:4.7, reviews:892,  orders:"1,200+",  flag:"CN", seller:"PrecisionCNC Factory", verified:true,  badge:"Verified Manufacturer", tags:["Trade Assurance"],       color:"#93C5FD", emoji:"\u2699\ufe0f",  desc:"Professional 4-axis CNC router with DSP controller. CE certified." },
  { id:3,  title:"Organic Arabica Coffee Beans Premium",   price:"$3.50-$8.20",unit:"/kg",    moq:"100 kg",   cat:"Agriculture",  rating:4.9, reviews:4120, orders:"12,000+", flag:"BR", seller:"BrasilCafe Exports",   verified:true,  badge:"Gold Supplier",         tags:["Organic","Best Seller"], color:"#A78BFA", emoji:"\u2615",  desc:"Single-origin Arabica from Minas Gerais. Fair Trade certified." },
  { id:4,  title:"N95 FFP2 Medical Respirator Mask",       price:"$0.45-$1.20",unit:"/piece", moq:"1,000 pcs",cat:"Medical",      rating:4.6, reviews:3890, orders:"500K+",   flag:"CN", seller:"MedShield Corp",       verified:true,  badge:"Verified Manufacturer", tags:["CE Certified","Hot"],    color:"#6EE7B7", emoji:"\U0001f3e5", desc:"CE/FDA certified N95 respirator, 95% filtration efficiency." },
  { id:5,  title:"Women's Summer Linen Dress Wholesale",   price:"$8-$18",     unit:"/piece", moq:"50 pcs",   cat:"Clothing",     rating:4.5, reviews:1567, orders:"8,000+",  flag:"BD", seller:"FashionFirst BD",       verified:true,  badge:"Gold Supplier",         tags:["Fast Ship","New"],       color:"#FCA5A5", emoji:"\U0001f457", desc:"Premium linen dresses, 15 colors, XS-3XL. OEM accepted." },
  { id:6,  title:"Electric Cargo Scooter 72V 3000W",       price:"$890-$1,450",unit:"/unit",  moq:"5 units",  cat:"Automotive",   rating:4.7, reviews:677,  orders:"2,100+",  flag:"CN", seller:"EcoRide Motors",        verified:true,  badge:"Verified Manufacturer", tags:["EV","Trade Assurance"],  color:"#BAE6FD", emoji:"\U0001f6f5", desc:"Max 60km/h, 80km range, 500kg payload. EU/US certified." },
  { id:7,  title:"3-Ton Hydraulic Pallet Jack",            price:"$180-$320",  unit:"/unit",  moq:"2 units",  cat:"Machinery",    rating:4.8, reviews:2234, orders:"9,500+",  flag:"CN", seller:"LiftMaster Pro",        verified:true,  badge:"Gold Supplier",         tags:["In Stock"],              color:"#D1D5DB", emoji:"\U0001f527", desc:"Industrial CE marked pallet jack, 3-ton capacity, 1-year warranty." },
  { id:8,  title:"Premium Basmati Rice Long Grain Export", price:"$0.80-$1.40",unit:"/kg",   moq:"500 kg",   cat:"Agriculture",  rating:4.9, reviews:5123, orders:"30,000+", flag:"PK", seller:"GoldenHarvest PK",      verified:true,  badge:"Gold Supplier",         tags:["Premium","Export Ready"],color:"#FDE68A", emoji:"\U0001f33e", desc:"Extra-long grain basmati, aged 2 years. Non-GMO certified." },
  { id:9,  title:"500W LED Stadium Floodlight IP66",        price:"$85-$145",   unit:"/piece", moq:"5 pcs",    cat:"Electronics",  rating:4.7, reviews:1890, orders:"4,200+",  flag:"CN", seller:"BrightLED Factory",     verified:true,  badge:"Verified Manufacturer", tags:["IP66","5yr Warranty"],   color:"#FDE047", emoji:"\U0001f4a1", desc:"55,000 lumens, 130lm/W, 50,000hr lifespan. IP66 waterproof." },
  { id:10, title:"Industrial Kitchen Equipment Set SS",     price:"$2,400-$6,800",unit:"/set", moq:"1 set",    cat:"Agriculture",  rating:4.8, reviews:456,  orders:"800+",    flag:"TR", seller:"KitchenPro Turkey",     verified:true,  badge:"Verified Manufacturer", tags:["Custom Size"],            color:"#E5E7EB", emoji:"\U0001f373", desc:"Complete 304 stainless steel commercial kitchen. Custom sizes." },
  { id:11, title:"PVC Waterproof Roofing Sheet 0.5mm",     price:"$1.20-$2.80",unit:"/sqm",  moq:"200 sqm",  cat:"Construction", rating:4.6, reviews:2100, orders:"15,000+", flag:"IN", seller:"BuildRight India",      verified:true,  badge:"Gold Supplier",         tags:["UV Resistant"],          color:"#86EFAC", emoji:"\U0001f3d7\ufe0f", desc:"UV-stabilized PVC roofing, 20-year lifespan, ISI certified." },
  { id:12, title:"Luxury Bamboo Bath Towels 600 GSM",      price:"$4.50-$9.80",unit:"/piece", moq:"100 pcs",  cat:"Home",         rating:4.9, reviews:7823, orders:"25,000+", flag:"IN", seller:"SoftTouch Textiles",    verified:true,  badge:"Gold Supplier",         tags:["Eco Friendly","Best Seller"],color:"#C4B5FD",emoji:"\U0001f6c1",desc:"Bamboo-cotton blend, OEKO-TEX certified. 40+ colors." },
];
const CATEGORIES = [
  { name:"Electronics", icon:"\u26a1", count:"2.3M+", color:"#3B82F6" },
  { name:"Machinery",   icon:"\u2699\ufe0f", count:"890K+", color:"#6366F1" },
  { name:"Clothing",    icon:"\U0001f455", count:"5.1M+", color:"#EC4899" },
  { name:"Agriculture", icon:"\U0001f33f", count:"1.2M+", color:"#10B981" },
  { name:"Automotive",  icon:"\U0001f697", count:"780K+", color:"#F59E0B" },
  { name:"Construction",icon:"\U0001f3d7\ufe0f", count:"450K+", color:"#78716C" },
  { name:"Medical",     icon:"\U0001f48a", count:"320K+", color:"#EF4444" },
  { name:"Home",        icon:"\U0001f3e1", count:"2.8M+", color:"#8B5CF6" },
];
const REV_DATA = [
  {m:"Jan",rev:42,ord:1240},{m:"Feb",rev:58,ord:1680},{m:"Mar",rev:51,ord:1450},
  {m:"Apr",rev:73,ord:2100},{m:"May",rev:89,ord:2540},{m:"Jun",rev:95,ord:2780},{m:"Jul",rev:108,ord:3120},
];
const PLAT_DATA = [
  {m:"Jan",gmv:890,users:12},{m:"Feb",gmv:1200,users:18},{m:"Mar",gmv:1680,users:24},
  {m:"Apr",gmv:2100,users:31},{m:"May",gmv:2900,users:42},{m:"Jun",gmv:3800,users:58},{m:"Jul",gmv:4600,users:71},
];
const PIE_DATA = [
  {name:"Electronics",v:35,c:"#3B82F6"},{name:"Machinery",v:22,c:"#6366F1"},
  {name:"Clothing",v:18,c:"#EC4899"},{name:"Agriculture",v:15,c:"#10B981"},{name:"Other",v:10,c:"#F59E0B"},
];
const ORDERS = [
  {id:"GT-0841",product:"Solar Panel 400W x 20",   amount:"$1,780",status:"Delivered",      date:"Jan 15",seller:"SunPower Tech"},
  {id:"GT-0792",product:"Coffee Beans 200kg",      amount:"$1,640",status:"In Transit",     date:"Jan 22",seller:"BrasilCafe"},
  {id:"GT-0756",product:"Women's Dress x 100",     amount:"$1,200",status:"Processing",     date:"Jan 28",seller:"FashionFirst BD"},
  {id:"GT-0721",product:"N95 Masks x 5,000",       amount:"$2,250",status:"Pending Payment",date:"Feb 01",seller:"MedShield Corp"},
  {id:"GT-0698",product:"LED Floodlight x 10",     amount:"$1,250",status:"Delivered",      date:"Feb 05",seller:"BrightLED Factory"},
];
const SEL_PRODS = [
  {id:1,name:"400W Solar Panel",   sku:"SP-400W-MONO",  stock:2840,price:"$67",sales:5241,status:"Active"},
  {id:2,name:"200W Solar Panel",   sku:"SP-200W-MONO",  stock:1200,price:"$38",sales:3120,status:"Active"},
  {id:3,name:"Solar Controller",   sku:"SCC-60A-MPPT",  stock:450, price:"$45",sales:1890,status:"Active"},
  {id:4,name:"Lithium Battery",    sku:"LFP-100AH-12V", stock:89,  price:"$289",sales:670,status:"Low Stock"},
  {id:5,name:"Solar Inverter 5KW", sku:"INV-5KW-HYBRID",stock:0,   price:"$560",sales:430,status:"Out of Stock"},
];
const ALL_USERS = [
  {id:1,name:"Michael Torres",   email:"m.torres@email.com",    role:"Buyer",  status:"Active",   joined:"Jan 10",orders:12,spend:"$8,450"},
  {id:2,name:"SunPower Tech",    email:"info@sunpower.cn",      role:"Seller", status:"Active",   joined:"Dec 05",orders:0, spend:"$0"},
  {id:3,name:"Aisha Rahman",     email:"a.rahman@gmail.com",    role:"Buyer",  status:"Active",   joined:"Jan 18",orders:5, spend:"$3,200"},
  {id:4,name:"FashionFirst BD",  email:"sales@fashionfirst.bd", role:"Seller", status:"Pending",  joined:"Feb 01",orders:0, spend:"$0"},
  {id:5,name:"Hans Weber",       email:"h.weber@autoparts.de",  role:"Seller", status:"Active",   joined:"Nov 22",orders:0, spend:"$0"},
  {id:6,name:"Priya Sharma",     email:"priya.s@yahoo.in",      role:"Buyer",  status:"Suspended",joined:"Jan 30",orders:2, spend:"$890"},
];

const ST = {
  "Delivered":{bg:"#ECFDF5",c:"#059669"},"Active":{bg:"#ECFDF5",c:"#059669"},
  "In Transit":{bg:"#EFF6FF",c:"#1A56DB"},"Processing":{bg:"#FEF3C7",c:"#D97706"},
  "Low Stock":{bg:"#FEF3C7",c:"#D97706"},"Pending":{bg:"#FEF3C7",c:"#D97706"},
  "Pending Payment":{bg:"#FEF2F2",c:"#DC2626"},"Out of Stock":{bg:"#FEF2F2",c:"#DC2626"},"Suspended":{bg:"#FEF2F2",c:"#DC2626"},
};
function Badge({s}){const{bg,c}=ST[s]||{bg:"#F3F4F6",c:"#6B7280"};return <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{background:bg,color:c}}>{s}</span>;}
function StatCard({icon:I,label,value,change,color="#1A56DB",bg="#EFF6FF"}){return(
  <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{background:bg}}><I size={20} style={{color}}/></div>
      {change!=null&&<div className={`flex items-center gap-1 text-xs font-semibold ${change>=0?"text-green-600":"text-red-500"}`}><ArrowUp size={12} style={{transform:change<0?"rotate(180deg)":"none"}}/>{Math.abs(change)}%</div>}
    </div>
    <div className="mt-3"><div className="text-2xl font-bold text-gray-900">{value}</div><div className="text-sm text-gray-500 mt-0.5">{label}</div></div>
  </div>
);}

function ProductCard({p,onView,addToCart,wishlist=[],toggleWish}){
  const liked=wishlist.some(x=>x.id===p.id);
  return(
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={()=>onView(p)}>
      <div className="h-44 flex items-center justify-center relative" style={{background:`linear-gradient(135deg,${p.color}33,${p.color}66)`}}>
        <span style={{fontSize:64}}>{p.emoji}</span>
        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity" onClick={e=>{e.stopPropagation();toggleWish(p);}}>
          <Heart size={15} fill={liked?"#EF4444":"none"} className={liked?"text-red-500":"text-gray-400"}/>
        </button>
        {p.tags[0]&&<div className="absolute top-3 left-3"><span className="text-xs px-2 py-0.5 rounded-full font-medium bg-amber-100 text-amber-700">{p.tags[0]}</span></div>}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-1.5 text-xs text-gray-500">
          <span>{p.flag}</span><span className="truncate">{p.seller}</span>
          {p.verified&&<CheckCircle size={11} className="text-blue-500 flex-shrink-0"/>}
        </div>
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug mb-2 group-hover:text-blue-600 transition-colors">{p.title}</h3>
        <div className="text-blue-600 font-bold text-base mb-1">{p.price}<span className="text-gray-400 text-xs font-normal"> {p.unit}</span></div>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>MOQ: <strong className="text-gray-700">{p.moq}</strong></span>
          <div className="flex items-center gap-1"><Star size={11} fill="#F59E0B" className="text-amber-400"/><span className="font-medium text-gray-700">{p.rating}</span></div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
          <span className="text-xs font-medium text-amber-600">{p.badge}</span>
          <span className="text-xs text-gray-400">{p.orders}</span>
        </div>
        <button className="mt-3 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl opacity-0 group-hover:opacity-100 transition-all"
          onClick={e=>{e.stopPropagation();addToCart(p);}}>+ Add to Cart</button>
      </div>
    </div>
  );
}

function Navbar({setPage,cart,user,setUser}){
  return(
    <nav style={{fontFamily:"'Plus Jakarta Sans',sans-serif",position:"sticky",top:0,zIndex:50}}>
      <div className="bg-gray-900 text-gray-400 text-xs py-1.5 px-4 flex justify-between items-center">
        <span>Shipping to <strong className="text-white">190+ countries</strong> · Verified Suppliers Only</span>
        <div className="flex gap-4">
          <span className="cursor-pointer hover:text-white" onClick={()=>setPage("seller_dashboard")}>Sell on GlobalTradeX</span>
          <span className="cursor-pointer hover:text-white" onClick={()=>setPage("messages")}>Help Center</span>
          {user?<span className="cursor-pointer hover:text-white" onClick={()=>setUser(null)}>Sign Out</span>
               :<span className="cursor-pointer hover:text-white" onClick={()=>setPage("auth")}>Sign In</span>}
        </div>
      </div>
      <div className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div className="flex-shrink-0 cursor-pointer flex items-center gap-2" onClick={()=>setPage("home")}>
            <div style={{background:"linear-gradient(135deg,#1A56DB,#0E3FAF)",borderRadius:10,width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center"}}><Globe size={20} color="white"/></div>
            <div><div style={{fontWeight:800,fontSize:18,color:"#111827",letterSpacing:"-0.5px"}}>GlobalTradeX</div><div style={{fontSize:9,color:"#6B7280",letterSpacing:"2px",fontWeight:600}}>MARKETPLACE</div></div>
          </div>
          <div className="flex-1 max-w-2xl">
            <div className="flex rounded-xl overflow-hidden border-2 border-blue-600">
              <select className="px-3 bg-gray-50 text-xs border-r border-gray-200 text-gray-600 outline-none">
                <option>All Categories</option>{CATEGORIES.map(c=><option key={c.name}>{c.name}</option>)}
              </select>
              <input className="flex-1 px-4 py-2.5 text-sm outline-none bg-white" placeholder="Search products, suppliers..." onKeyDown={e=>e.key==="Enter"&&setPage("products")}/>
              <button className="px-5 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 text-sm font-semibold" onClick={()=>setPage("products")}><Search size={15}/> Search</button>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="relative p-2.5 rounded-xl hover:bg-gray-100" onClick={()=>setPage("checkout")}>
              <ShoppingCart size={22} className="text-gray-700"/>
              {cart.length>0&&<span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{cart.length}</span>}
            </button>
            <button className="p-2.5 rounded-xl hover:bg-gray-100" onClick={()=>setPage("messages")}><MessageCircle size={22} className="text-gray-700"/></button>
            <button className="relative p-2.5 rounded-xl hover:bg-gray-100"><Bell size={22} className="text-gray-700"/><span className="absolute top-2 right-2 bg-red-500 rounded-full w-1.5 h-1.5"/></button>
            {user?(
              <div className="flex items-center gap-2 pl-2 border-l border-gray-200 ml-1 cursor-pointer" onClick={()=>setPage(user.role==="seller"?"seller_dashboard":user.role==="admin"?"admin_dashboard":"buyer_dashboard")}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{background:"linear-gradient(135deg,#1A56DB,#7C3AED)"}}>{user.name[0].toUpperCase()}</div>
                <div className="hidden md:block"><div className="text-xs font-semibold text-gray-800">{user.name}</div><div className="text-xs text-gray-500 capitalize">{user.role}</div></div>
              </div>
            ):(
              <button className="ml-2 px-4 py-2 text-sm font-semibold text-white rounded-xl" style={{background:"linear-gradient(135deg,#1A56DB,#7C3AED)"}} onClick={()=>setPage("auth")}>Sign In</button>
            )}
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-2 flex gap-1 overflow-x-auto">
          {["All Products",...CATEGORIES.map(c=>c.name),"RFQ Center","Trade Assurance","Verified Suppliers"].map(cat=>(
            <button key={cat} className="flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 text-gray-500 transition-colors whitespace-nowrap" onClick={()=>setPage("products")}>{cat}</button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function HomePage({setPage,setSelProd,addToCart,wishlist,toggleWish}){
  return(
    <div className="bg-gray-50">
      <div style={{background:"linear-gradient(135deg,#0D1B4E 0%,#0A2472 45%,#1652F0 100%)",padding:"64px 0 80px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,right:0,width:"55%",height:"100%",background:"radial-gradient(ellipse at 70% 50%,rgba(99,102,241,.3) 0%,transparent 70%)"}}/>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full mb-5 border border-white/10"><Zap size={12} className="text-yellow-400"/> 200,000+ Verified Suppliers · 190 Countries</div>
            <h1 style={{fontWeight:800,fontSize:"clamp(34px,5vw,56px)",color:"white",lineHeight:1.08,letterSpacing:"-1.5px"}}>Trade Without<br/><span style={{color:"#60A5FA"}}>Borders.</span></h1>
            <p className="text-blue-200 mt-4 text-base leading-relaxed max-w-lg">Connect directly with manufacturers, wholesalers and suppliers worldwide. Verified quality, complete trade protection.</p>
            <div className="flex gap-8 mt-7">{[["5M+","Products"],["$2.8B","Trade Value"],["50K+","Verified Sellers"]].map(([v,l])=><div key={l}><div style={{fontSize:22,fontWeight:800,color:"white"}}>{v}</div><div style={{fontSize:12,color:"#93C5FD"}}>{l}</div></div>)}</div>
            <div className="flex gap-3 mt-7">
              <button className="px-6 py-3 text-sm font-bold rounded-xl text-blue-900 bg-white hover:opacity-90" onClick={()=>setPage("products")}>Browse Products</button>
              <button className="px-6 py-3 text-sm font-bold rounded-xl text-white border border-white/30 hover:bg-white/10" onClick={()=>setPage("auth")}>Start Selling</button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[{I:Shield,t:"Trade Assurance",d:"Money-back up to $500K",c:"#1A56DB"},{I:CheckCircle,t:"Verified Suppliers",d:"On-site factory inspections",c:"#059669"},{I:Truck,t:"Global Logistics",d:"Door-to-door worldwide",c:"#D97706"},{I:Lock,t:"Secure Payments",d:"Escrow on all orders",c:"#7C3AED"}].map(b=>(
            <div key={b.t} className="bg-white rounded-2xl p-4 border border-gray-100 flex items-start gap-3 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:b.c+"18"}}><b.I size={20} style={{color:b.c}}/></div>
              <div><div className="text-sm font-semibold text-gray-800">{b.t}</div><div className="text-xs text-gray-500 mt-0.5">{b.d}</div></div>
            </div>
          ))}
        </div>
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5"><h2 className="text-xl font-bold text-gray-900">Browse by Category</h2><button className="text-sm text-blue-600 font-medium flex items-center gap-1" onClick={()=>setPage("products")}>View All <ChevronRight size={16}/></button></div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {CATEGORIES.map(cat=>(
              <button key={cat.name} className="bg-white rounded-2xl p-3 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all text-center" onClick={()=>setPage("products")}>
                <div className="text-2xl mb-1.5">{cat.icon}</div>
                <div className="text-xs font-semibold text-gray-700">{cat.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{cat.count}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5"><h2 className="text-xl font-bold text-gray-900">Hot Products</h2><button className="text-sm text-blue-600 font-medium flex items-center gap-1" onClick={()=>setPage("products")}>See All <ChevronRight size={16}/></button></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{PRODUCTS.slice(0,8).map(p=><ProductCard key={p.id} p={p} onView={v=>{setSelProd(v);setPage("product_detail");}} addToCart={addToCart} wishlist={wishlist} toggleWish={toggleWish}/>)}</div>
        </div>
        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Recently Added</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{PRODUCTS.slice(8).map(p=><ProductCard key={p.id} p={p} onView={v=>{setSelProd(v);setPage("product_detail");}} addToCart={addToCart} wishlist={wishlist} toggleWish={toggleWish}/>)}</div>
        </div>
        <div className="rounded-2xl overflow-hidden" style={{background:"linear-gradient(135deg,#0F172A,#1E3A5F)"}}>
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div><div className="text-white/60 text-sm mb-2 font-medium">For Businesses</div><h3 className="text-white text-2xl md:text-3xl font-bold mb-3">Ready to trade globally?</h3><p className="text-blue-200 text-sm max-w-md">Join 50,000+ verified sellers. Reach buyers in 190+ countries.</p></div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0"><button className="px-6 py-3 text-sm font-bold rounded-xl text-blue-900 bg-white" onClick={()=>setPage("auth")}>Register as Supplier</button><button className="px-6 py-3 text-sm font-bold rounded-xl text-white border border-white/30" onClick={()=>setPage("messages")}>Talk to Support</button></div>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 text-gray-400 py-10 px-4 mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1"><div className="flex items-center gap-2 mb-3"><div style={{background:"linear-gradient(135deg,#1A56DB,#0E3FAF)",borderRadius:8,width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center"}}><Globe size={13} color="white"/></div><span className="text-white font-bold text-sm">GlobalTradeX</span></div><p className="text-xs leading-relaxed">World leading B2B/B2C marketplace connecting buyers and sellers globally.</p></div>
            {[{title:"Marketplace",links:["Products","Suppliers","Trade Assurance","RFQ Center"]},{title:"Sell",links:["Start Selling","Seller Dashboard","Advertising","Pricing"]},{title:"Help",links:["Help Center","Disputes","Contact Us","Live Chat"]},{title:"Legal",links:["Terms of Service","Privacy Policy","Cookie Policy","IP Protection"]}].map(col=>(
              <div key={col.title}><h4 className="text-white text-sm font-semibold mb-3">{col.title}</h4><ul className="space-y-2">{col.links.map(l=><li key={l} className="text-xs hover:text-white cursor-pointer">{l}</li>)}</ul></div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs"><span>© 2025 GlobalTradeX Inc. All rights reserved.</span><div className="flex gap-3 text-gray-500">{["US English","CN Chinese","ES Spanish","AR Arabic"].map(l=><span key={l} className="hover:text-white cursor-pointer">{l}</span>)}</div></div>
        </div>
      </div>
    </div>
  );
}

function ProductsPage({setPage,setSelProd,addToCart,wishlist,toggleWish}){
  const [selCat,setSelCat]=useState("All");
  const filtered=PRODUCTS.filter(p=>selCat==="All"||p.cat===selCat);
  return(
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-5"><span className="cursor-pointer hover:text-blue-600" onClick={()=>setPage("home")}>Home</span><ChevronRight size={14}/><span className="text-gray-800 font-medium">All Products</span><span className="text-gray-400">({filtered.length})</span></div>
        <div className="flex gap-6">
          <div className="hidden md:block w-52 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Filter size={15}/>Filters</h3>
              <div className="mb-5">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Category</h4>
                {["All",...CATEGORIES.map(c=>c.name)].map(cat=>(
                  <button key={cat} className="w-full text-left text-sm px-2 py-1.5 rounded-lg transition-colors"
                    style={{background:selCat===cat?"#EFF6FF":"transparent",color:selCat===cat?"#1A56DB":"#374151",fontWeight:selCat===cat?600:400}}
                    onClick={()=>setSelCat(cat)}>{cat}</button>
                ))}
              </div>
              <div className="mb-5">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Supplier Type</h4>
                {["Gold Supplier","Verified Manufacturer","Trade Assurance"].map(t=><label key={t} className="flex items-center gap-2 text-sm text-gray-600 py-1 cursor-pointer"><input type="checkbox" className="rounded"/>{t}</label>)}
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Min. Order</h4>
                {["Any","1-10 pcs","10-100 pcs","100+ pcs"].map(t=><label key={t} className="flex items-center gap-2 text-sm text-gray-600 py-1 cursor-pointer"><input type="radio" name="moq"/>{t}</label>)}
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">{filtered.length} products found</span>
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 outline-none">{["Relevance","Price: Low to High","Price: High to Low","Best Rating","Most Orders"].map(s=><option key={s}>{s}</option>)}</select>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(p=><ProductCard key={p.id} p={p} onView={v=>{setSelProd(v);setPage("product_detail");}} addToCart={addToCart} wishlist={wishlist} toggleWish={toggleWish}/>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductDetail({p,setPage,addToCart}){
  const [qty,setQty]=useState(1);
  const [tab,setTab]=useState("description");
  if(!p)return null;
  return(
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-5"><span className="cursor-pointer hover:text-blue-600" onClick={()=>setPage("home")}>Home</span><ChevronRight size={14}/><span className="cursor-pointer hover:text-blue-600" onClick={()=>setPage("products")}>Products</span><ChevronRight size={14}/><span className="text-gray-800">{p.cat}</span></div>
        <div className="grid md:grid-cols-5 gap-5 mb-6">
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl p-8 flex items-center justify-center mb-3 border border-gray-100" style={{height:300,background:`linear-gradient(135deg,${p.color}22,${p.color}55)`}}><span style={{fontSize:110}}>{p.emoji}</span></div>
            <div className="grid grid-cols-4 gap-2">{[0,1,2,3].map((ti)=><div key={ti} className="rounded-xl border-2 border-gray-100 hover:border-blue-400 cursor-pointer flex items-center justify-center" style={{height:64,background:`${p.color}22`}}><span style={{fontSize:26}}>{p.emoji}</span></div>)}</div>
          </div>
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex gap-2 mb-3 flex-wrap">{p.tags.map(t=><span key={t} className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-50 text-blue-700">{t}</span>)}</div>
              <h1 className="text-xl font-bold text-gray-900 mb-3">{p.title}</h1>
              <div className="flex items-center gap-3 mb-4"><div className="flex">{[1,2,3,4,5].map((s)=><Star key={s} size={14} fill={s<=Math.floor(p.rating)?"#F59E0B":"none"} className="text-amber-400"/>)}</div><span className="text-sm font-medium">{p.rating}</span><span className="text-sm text-gray-500">({p.reviews.toLocaleString()} reviews)</span></div>
              <div className="bg-blue-50 rounded-xl p-4 mb-4">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Volume Pricing</div>
                <div className="grid grid-cols-3 gap-2">{[{q:p.moq,pr:"Base"},{q:"50+ pcs",pr:"-5%"},{q:"200+ pcs",pr:"-12%"}].map((t,i)=><div key={i} className="bg-white rounded-lg p-2 text-center border border-blue-100"><div className="text-xs text-gray-500">{t.q}</div><div className="text-sm font-bold text-blue-700 mt-0.5">{t.pr}</div></div>)}</div>
              </div>
              <div className="flex items-center justify-between text-sm mb-4 p-3 bg-gray-50 rounded-xl"><span className="text-gray-600">Min. Order Qty</span><span className="font-semibold">{p.moq}</span></div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm text-gray-600">Qty:</span>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden"><button className="px-3 py-2 hover:bg-gray-50 font-medium" onClick={()=>setQty(Math.max(1,qty-1))}>-</button><input className="w-14 text-center text-sm font-medium py-2 border-x border-gray-200 outline-none" value={qty} onChange={e=>setQty(parseInt(e.target.value)||1)}/><button className="px-3 py-2 hover:bg-gray-50 font-medium" onClick={()=>setQty(qty+1)}>+</button></div>
              </div>
              <div className="flex gap-3"><button className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm" onClick={()=>addToCart(p)}>Add to Cart</button><button className="flex-1 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-xl text-sm" onClick={()=>setPage("messages")}>Contact Supplier</button></div>
              <button className="w-full mt-2 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl text-sm hover:bg-gray-50">Request for Quotation (RFQ)</button>
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="text-center mb-4"><div className="w-14 h-14 rounded-2xl mx-auto mb-2 flex items-center justify-center text-2xl" style={{background:`${p.color}33`}}>{p.emoji}</div><h3 className="font-bold text-gray-900 text-sm">{p.seller}</h3><div className="flex items-center justify-center gap-1 mt-1"><CheckCircle size={12} className="text-blue-500"/><span className="text-xs text-blue-600">{p.badge}</span></div><div className="text-xs text-gray-500 mt-1">{p.flag}</div></div>
              <div className="space-y-2 mb-4">{[["Response Rate","98.4%"],["Avg Response","< 4 hrs"],["On-time Delivery","96.2%"],["Rating","5 Stars"]].map(([l,v])=><div key={l} className="flex justify-between text-xs"><span className="text-gray-500">{l}</span><span className="font-semibold text-gray-800">{v}</span></div>)}</div>
              <button className="w-full py-2.5 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700" onClick={()=>setPage("messages")}>Chat Now</button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100">
          <div className="flex border-b border-gray-100 px-6">{["description","specifications","reviews","qanda"].map(t=><button key={t} className="px-5 py-4 text-sm font-medium border-b-2 -mb-px transition-colors" style={{borderColor:tab===t?"#1A56DB":"transparent",color:tab===t?"#1A56DB":"#9CA3AF"}} onClick={()=>setTab(t)}>{t==="qanda"?"Q & A":t.charAt(0).toUpperCase()+t.slice(1)}</button>)}</div>
          <div className="p-6">
            {tab==="description"&&<div><p className="text-gray-700 leading-relaxed mb-5">{p.desc}</p><div className="grid md:grid-cols-2 gap-3">{["International quality certifications","Customization / OEM accepted","Sample orders available","Bulk discount pricing","Door-to-door shipping","Trade Assurance covered"].map(f=><div key={f} className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle size={15} className="text-green-500"/>{f}</div>)}</div></div>}
            {tab==="specifications"&&<div className="grid md:grid-cols-2 gap-3">{[["Model","GTX-2024"],["Origin",p.flag],["Certification","CE / ISO 9001"],["Warranty","12 months"],["Lead Time","15-20 days"],["Payment","T/T, L/C, PayPal, Escrow"],["Samples","Free samples available"],["OEM/ODM","Accepted"]].map(([k,v])=><div key={k} className="flex justify-between py-2.5 px-3 bg-gray-50 rounded-lg text-sm"><span className="text-gray-500">{k}</span><span className="font-medium text-gray-800">{v}</span></div>)}</div>}
            {tab==="reviews"&&<div className="space-y-4">{[{u:"Michael S.",f:"US",r:5,d:"Jan 15",t:"Excellent quality, shipped on time. Very responsive supplier throughout."},{u:"Hans K.",f:"DE",r:5,d:"Jan 12",t:"Very satisfied. Perfect packaging, arrived in flawless condition. Will reorder."},{u:"Ahmed R.",f:"AE",r:4,d:"Dec 28",t:"Good quality. Slight delay but supplier kept me updated daily."}].map((rv,i)=><div key={i} className="p-4 bg-gray-50 rounded-xl"><div className="flex items-center justify-between mb-2"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold">{rv.u[0]}</div><span className="font-medium text-sm">{rv.u} ({rv.f})</span></div><span className="text-xs text-gray-400">{rv.d}</span></div><div className="flex mb-1.5">{[1,2,3,4,5].map((s)=><Star key={s} size={13} fill={s<=rv.r?"#F59E0B":"none"} className="text-amber-400"/>)}</div><p className="text-sm text-gray-600">{rv.t}</p></div>)}</div>}
            {tab==="qanda"&&<div className="space-y-4">{[{q:"Can you do custom branding / OEM?",a:"Yes, OEM accepted with your brand logo and packaging. MOQ applies."},{q:"What is the delivery time?",a:"Standard 15-20 business days. Express shipping available."},{q:"Do you provide samples?",a:"Yes. Sample cost fully refundable on bulk orders."}].map((qa,i)=><div key={i} className="p-4 bg-gray-50 rounded-xl"><p className="text-sm font-semibold text-gray-800 mb-2">Q: {qa.q}</p><p className="text-sm text-gray-600">A: {qa.a}</p></div>)}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthPage({setPage,login}){
  const [mode,setMode]=useState("login");
  const [role,setRole]=useState("buyer");
  const [form,setForm]=useState({name:"",email:"",password:""});
  const handle=()=>{
    const nm=mode==="login"?(form.email.includes("admin")?"Admin User":form.email.includes("seller")?"Seller User":"Buyer User"):form.name;
    const rl=mode==="login"?(form.email.includes("admin")?"admin":form.email.includes("seller")?"seller":"buyer"):role;
    login({name:nm,email:form.email,role:rl});
    setPage(rl==="admin"?"admin_dashboard":rl==="seller"?"seller_dashboard":"buyer_dashboard");
  };
  return(
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 border border-gray-100">
        <div className="text-center mb-8"><div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{background:"linear-gradient(135deg,#1A56DB,#7C3AED)"}}><Globe size={28} color="white"/></div><h1 className="text-2xl font-bold text-gray-900 mb-1">GlobalTradeX</h1><p className="text-gray-500 text-sm">Your global trade marketplace</p></div>
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">{["login","register"].map(m=><button key={m} className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all capitalize" style={{background:mode===m?"white":"transparent",color:mode===m?"#111827":"#6B7280",boxShadow:mode===m?"0 1px 3px rgba(0,0,0,.1)":""}} onClick={()=>setMode(m)}>{m==="login"?"Sign In":"Register"}</button>)}</div>
        {mode==="register"&&<div className="mb-4"><label className="text-xs font-semibold text-gray-600 mb-2 block">I want to</label><div className="grid grid-cols-2 gap-2">{[{v:"buyer",l:"Buy Products",i:"Shopping"},{v:"seller",l:"Sell Products",i:"Factory"}].map(r=><button key={r.v} className="p-3 rounded-xl border-2 text-sm font-medium" style={{borderColor:role===r.v?"#1A56DB":"#E5E7EB",background:role===r.v?"#EFF6FF":"white",color:role===r.v?"#1A56DB":"#374151"}} onClick={()=>setRole(r.v)}>{r.l}</button>)}</div></div>}
        <div className="space-y-3 mb-6">
          {mode==="register"&&<input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500" placeholder="Full Name / Company Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>}
          <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500" placeholder="Email Address" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
          <input className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
        </div>
        <button className="w-full py-3 text-white font-semibold rounded-xl text-sm" style={{background:"linear-gradient(135deg,#1A56DB,#7C3AED)"}} onClick={handle}>{mode==="login"?"Sign In":"Create Account"}</button>
        <div className="text-center mt-4"><p className="text-xs text-gray-400 mb-3">Or continue with</p><div className="flex gap-2">{["Google","GitHub"].map(s=><button key={s} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-50">{s}</button>)}</div></div>
        <p className="text-center text-xs text-gray-500 mt-4"><span className="font-medium text-blue-600">Demo:</span> admin@gtx.com / seller@gtx.com / buyer@gtx.com</p>
      </div>
    </div>
  );
}

function Checkout({cart,setCart,setPage}){
  const [step,setStep]=useState(1);
  const total=cart.reduce((s,i)=>{const n=parseFloat(i.price.replace(/[^0-9.]/g,"").split(".").slice(0,2).join("."));return s+(isNaN(n)?0:n);},0);
  if(step===3)return(
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl p-12 text-center shadow-xl max-w-md w-full mx-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><Check size={36} className="text-green-600"/></div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
        <p className="text-gray-500 mb-2">Order <strong>#GT-{Math.floor(Math.random()*9000+1000)}</strong> placed successfully.</p>
        <p className="text-sm text-gray-400 mb-8">Confirmation email with tracking details within 24 hours.</p>
        <div className="flex gap-3"><button className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700" onClick={()=>{setCart([]);setPage("buyer_dashboard");}}>View Orders</button><button className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold" onClick={()=>{setCart([]);setPage("home");}}>Continue Shopping</button></div>
      </div>
    </div>
  );
  return(
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>
        <div className="flex items-center mb-8">{["Cart","Shipping","Payment"].map((s,i)=><div key={s} className="flex items-center"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{background:step>i?"#1A56DB":step===i+1?"#1A56DB":"#E5E7EB",color:step>i||step===i+1?"white":"#9CA3AF"}}>{step>i?<Check size={14}/>:i+1}</div><span className="text-sm font-medium" style={{color:step===i+1?"#1A56DB":"#9CA3AF"}}>{s}</span></div>{i<2&&<div className="w-12 h-0.5 mx-3" style={{background:step>i+1?"#1A56DB":"#E5E7EB"}}/>}</div>)}</div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {step===1&&<div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">{cart.length===0?<div className="p-12 text-center text-gray-400"><ShoppingCart size={40} className="mx-auto mb-3 opacity-30"/><p>Your cart is empty</p><button className="mt-4 text-blue-600 text-sm font-medium" onClick={()=>setPage("products")}>Browse Products</button></div>:cart.map((item,i)=><div key={i} className="p-5 flex items-center gap-4"><div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0" style={{background:`${item.color}22`}}>{item.emoji}</div><div className="flex-1"><div className="font-medium text-gray-800 text-sm">{item.title}</div><div className="text-xs text-gray-500 mt-0.5">{item.seller}</div></div><div className="font-bold text-gray-900">{item.price}</div><button className="text-red-400 hover:text-red-600 p-1" onClick={()=>setCart(cart.filter((_,j)=>j!==i))}><X size={16}/></button></div>)}</div>}
            {step===2&&<div className="bg-white rounded-2xl border border-gray-100 p-6"><h3 className="font-semibold text-gray-800 mb-5">Shipping Information</h3><div className="grid grid-cols-2 gap-4">{["Full Name","Company Name","Email Address","Phone Number","Country","City","State / Province","ZIP Code"].map(f=><div key={f} className={f==="Email Address"||f==="Company Name"?"col-span-2":""}><label className="text-xs font-semibold text-gray-600 mb-1.5 block">{f}</label><input className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500" placeholder={f}/></div>)}</div><div className="mt-5"><h4 className="text-sm font-semibold text-gray-700 mb-3">Shipping Method</h4>{[{n:"Standard Freight",t:"15-25 days",p:"$85"},{n:"Express Air",t:"5-8 days",p:"$240"},{n:"DHL Express",t:"3-5 days",p:"$380"}].map(m=><label key={m.n} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl mb-2 cursor-pointer hover:border-blue-200"><input type="radio" name="ship"/><div className="flex-1"><div className="text-sm font-medium text-gray-800">{m.n} <span className="text-xs text-gray-400">({m.t})</span></div></div><span className="font-semibold text-gray-800">{m.p}</span></label>)}</div></div>}
          </div>
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
              <h3 className="font-semibold text-gray-800 mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4"><div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal ({cart.length} items)</span><span>${total.toFixed(2)}</span></div><div className="flex justify-between text-sm"><span className="text-gray-500">Shipping</span><span className="text-green-600">Quoted</span></div><div className="flex justify-between text-sm"><span className="text-gray-500">Trade Assurance</span><span className="text-green-600">Included</span></div></div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900 mb-4"><span>Total</span><span>${total.toFixed(2)}</span></div>
              {step===2&&<div className="mb-4 p-3 bg-blue-50 rounded-xl text-xs text-blue-700 flex items-start gap-2"><Shield size={13} className="mt-0.5 flex-shrink-0"/><span>Payment protected by <strong>Trade Assurance</strong>. Funds released after delivery confirmed.</span></div>}
              <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl text-sm" onClick={()=>cart.length>0&&setStep(s=>Math.min(s+1,3))}>{step===1?"Proceed to Shipping":step===2?"Proceed to Payment":"Place Order"}</button>
              {step>1&&<button className="w-full mt-2 py-2 text-sm text-gray-500" onClick={()=>setStep(s=>s-1)}>Back</button>}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400"><Lock size={11}/> SSL Secured · PCI DSS Compliant</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BuyerDashboard({user,setPage,wishlist,toggleWish}){
  const [tab,setTab]=useState("orders");
  return(
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-56 bg-white border-r border-gray-100 flex-shrink-0">
        <div className="p-5 border-b border-gray-100"><div className="w-12 h-12 rounded-2xl mb-2 flex items-center justify-center text-white text-lg font-bold" style={{background:"linear-gradient(135deg,#1A56DB,#7C3AED)"}}>{(user?.name||"B")[0]}</div><div className="font-bold text-gray-900 text-sm">{user?.name||"Guest Buyer"}</div><div className="text-xs text-gray-500">{user?.email||"buyer@example.com"}</div></div>
        <nav className="p-4 space-y-1">{[{I:ShoppingBag,l:"My Orders",k:"orders"},{I:Heart,l:"Wishlist",k:"wishlist"},{I:Shield,l:"Trade Assurance",k:"trade"},{I:MessageCircle,l:"Messages",k:"msg"},{I:Settings,l:"Account",k:"settings"}].map(({I,l,k})=><button key={k} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors" style={{background:tab===k?"#EFF6FF":"transparent",color:tab===k?"#1A56DB":"#6B7280",fontWeight:tab===k?600:400}} onClick={()=>{if(k==="msg")setPage("messages");else setTab(k);}}><I size={16}/>{l}</button>)}</nav>
      </div>
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Buyer Dashboard</h1>
        <p className="text-gray-500 text-sm mb-6">Manage your orders and preferences</p>
        {tab==="orders"&&<div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">{ORDERS.map(o=><div key={o.id} className="p-5 flex items-center gap-4 hover:bg-gray-50/50"><div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl flex-shrink-0">📦</div><div className="flex-1"><div className="font-medium text-gray-800 text-sm">{o.product}</div><div className="text-xs text-gray-500 mt-0.5">{o.id} · {o.seller} · {o.date}</div></div><div className="font-bold text-gray-900">{o.amount}</div><Badge s={o.status}/></div>)}</div>}
        {tab==="wishlist"&&<div className="grid grid-cols-2 md:grid-cols-4 gap-4">{wishlist.length===0?<div className="col-span-4 text-center py-16 text-gray-400"><Heart size={40} className="mx-auto mb-3 opacity-30"/><p>No items in wishlist</p></div>:wishlist.map(p=><ProductCard key={p.id} p={p} onView={()=>{}} addToCart={()=>{}} wishlist={wishlist} toggleWish={toggleWish}/>)}</div>}
        {(tab==="trade"||tab==="settings")&&<div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400"><div className="text-4xl mb-3">🔒</div><p className="font-medium text-gray-700 capitalize">{tab.replace(/_/g," ")}</p></div>}
      </div>
    </div>
  );
}

function SellerDashboard({user}){
  const [tab,setTab]=useState("overview");
  const [showAdd,setShowAdd]=useState(false);
  return(
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-60 bg-gray-900 text-white flex-shrink-0 flex flex-col">
        <div className="p-5 border-b border-gray-800 flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-lg">{(user?.name||"S")[0]}</div><div><div className="font-semibold text-sm">{user?.name||"SunPower Tech"}</div><div className="text-xs text-gray-400">Gold Supplier</div></div></div>
        <nav className="flex-1 p-4 space-y-1">{[{I:BarChart3,l:"Overview",k:"overview"},{I:Package,l:"Products",k:"products"},{I:ShoppingBag,l:"Orders",k:"orders"},{I:TrendingUp,l:"Analytics",k:"analytics"},{I:Settings,l:"Settings",k:"settings"}].map(({I,l,k})=><button key={k} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-colors" style={{background:tab===k?"#1A56DB":"transparent",color:tab===k?"white":"#9CA3AF"}} onClick={()=>setTab(k)}><I size={16}/>{l}</button>)}</nav>
        <div className="p-4 border-t border-gray-800"><div className="rounded-xl p-3 text-xs text-white" style={{background:"linear-gradient(135deg,#1A56DB,#7C3AED)"}}><div className="font-semibold mb-1">Upgrade to Enterprise</div><div className="text-white/70">Unlock unlimited listings and analytics</div></div></div>
      </div>
      <div className="flex-1 p-6 overflow-auto">
        {tab==="overview"&&<div>
          <div className="flex items-center justify-between mb-6"><div><h1 className="text-2xl font-bold text-gray-900">Seller Dashboard</h1><p className="text-gray-500 text-sm mt-1">Welcome back, {user?.name||"SunPower Tech"}!</p></div><button className="px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl flex items-center gap-2" onClick={()=>setShowAdd(true)}><Plus size={15}/>Add Product</button></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard icon={DollarSign} label="Total Revenue" value="$108K" change={23} color="#1A56DB" bg="#EFF6FF"/>
            <StatCard icon={ShoppingBag} label="Total Orders" value="3,124" change={18} color="#059669" bg="#ECFDF5"/>
            <StatCard icon={Package} label="Active Products" value="47" change={5} color="#7C3AED" bg="#F5F3FF"/>
            <StatCard icon={Star} label="Avg Rating" value="4.8 ★" change={2} color="#D97706" bg="#FFFBEB"/>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-800 mb-4">Revenue Overview</h3>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={REV_DATA}><defs><linearGradient id="rv" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#1A56DB" stopOpacity={0.2}/><stop offset="95%" stopColor="#1A56DB" stopOpacity={0}/></linearGradient></defs><XAxis dataKey="m" tick={{fontSize:12,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:12,fill:"#9CA3AF"}} axisLine={false} tickLine={false} tickFormatter={v=>"$"+v+"K"}/><Tooltip formatter={v=>["$"+v+"K","Revenue"]} contentStyle={{borderRadius:12,border:"1px solid #E5E7EB"}}/><Area type="monotone" dataKey="rev" stroke="#1A56DB" strokeWidth={2.5} fill="url(#rv)"/></AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-800 mb-4">Sales Mix</h3>
              <ResponsiveContainer width="100%" height={160}><PieChart><Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={48} outerRadius={72} paddingAngle={3} dataKey="v">{PIE_DATA.map((e,pi)=><Cell key={pi} fill={e.c}/>)}</Pie><Tooltip formatter={v=>[v+"%","Share"]}/></PieChart></ResponsiveContainer>
              <div className="space-y-1.5 mt-2">{PIE_DATA.map(d=><div key={d.name} className="flex items-center justify-between text-xs"><div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{background:d.c}}/><span className="text-gray-600">{d.name}</span></div><span className="font-semibold text-gray-800">{d.v}%</span></div>)}</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4"><h3 className="font-semibold text-gray-800">Recent Orders</h3><button className="text-sm text-blue-600" onClick={()=>setTab("orders")}>View All</button></div>
            <div className="divide-y divide-gray-50">{ORDERS.slice(0,4).map(o=><div key={o.id} className="py-3 flex items-center gap-4"><div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl flex-shrink-0">📦</div><div className="flex-1"><div className="text-sm font-medium text-gray-800">{o.product}</div><div className="text-xs text-gray-400">{o.id} · {o.date}</div></div><div className="font-semibold text-gray-900">{o.amount}</div><Badge s={o.status}/></div>)}</div>
          </div>
        </div>}
        {tab==="products"&&<div>
          <div className="flex items-center justify-between mb-6"><h1 className="text-2xl font-bold text-gray-900">Product Inventory</h1><div className="flex gap-2"><button className="px-4 py-2.5 border border-gray-200 text-sm font-medium rounded-xl flex items-center gap-2"><Upload size={15}/>Bulk Upload</button><button className="px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl flex items-center gap-2" onClick={()=>setShowAdd(true)}><Plus size={15}/>Add Product</button></div></div>
          <div className="bg-white rounded-2xl border border-gray-100">
            <div className="p-4 border-b border-gray-100 flex gap-3"><input className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none" placeholder="Search products..."/></div>
            <table className="w-full"><thead><tr className="border-b border-gray-100">{["Product","SKU","Stock","Price","Sales","Status","Actions"].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>)}</tr></thead>
            <tbody>{SEL_PRODS.map(p=><tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50"><td className="px-4 py-3 text-sm font-medium text-gray-800">{p.name}</td><td className="px-4 py-3 text-xs text-gray-500 font-mono">{p.sku}</td><td className="px-4 py-3 text-sm font-semibold" style={{color:p.stock===0?"#DC2626":p.stock<100?"#D97706":"#059669"}}>{p.stock.toLocaleString()}</td><td className="px-4 py-3 text-sm font-semibold text-gray-800">{p.price}</td><td className="px-4 py-3 text-sm text-gray-600">{p.sales.toLocaleString()}</td><td className="px-4 py-3"><Badge s={p.status}/></td><td className="px-4 py-3"><div className="flex gap-1"><button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600"><Edit size={14}/></button><button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={14}/></button></div></td></tr>)}</tbody></table>
          </div>
        </div>}
        {tab==="orders"&&<div>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Order Management</h1>
          <div className="grid grid-cols-4 gap-4 mb-6">{[{l:"Total Orders",v:"3,124",c:"#1A56DB"},{l:"Pending",v:"28",c:"#D97706"},{l:"In Transit",v:"142",c:"#7C3AED"},{l:"Delivered",v:"2,954",c:"#059669"}].map(s=><div key={s.l} className="bg-white rounded-2xl p-4 border border-gray-100 text-center"><div className="text-2xl font-bold" style={{color:s.c}}>{s.v}</div><div className="text-xs text-gray-500 mt-1">{s.l}</div></div>)}</div>
          <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">{ORDERS.map(o=><div key={o.id} className="p-5 flex items-center gap-4"><div className="flex-1"><div className="font-medium text-gray-800 text-sm">{o.product}</div><div className="text-xs text-gray-400">{o.id} · {o.date}</div></div><div className="font-bold text-gray-900">{o.amount}</div><Badge s={o.status}/><div className="flex gap-2"><button className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600">Details</button><button className="text-xs px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg font-medium">Update</button></div></div>)}</div>
        </div>}
        {tab==="analytics"&&<div>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h1>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-5"><h3 className="font-semibold text-gray-800 mb-4">Revenue ($K)</h3><ResponsiveContainer width="100%" height={240}><BarChart data={REV_DATA}><XAxis dataKey="m" tick={{fontSize:11,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:11,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{borderRadius:12,border:"1px solid #E5E7EB"}}/><Bar dataKey="rev" fill="#1A56DB" radius={[6,6,0,0]} name="Revenue"/></BarChart></ResponsiveContainer></div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5"><h3 className="font-semibold text-gray-800 mb-4">Monthly Orders</h3><ResponsiveContainer width="100%" height={240}><LineChart data={REV_DATA}><XAxis dataKey="m" tick={{fontSize:11,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:11,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{borderRadius:12,border:"1px solid #E5E7EB"}}/><Line type="monotone" dataKey="ord" stroke="#7C3AED" strokeWidth={2.5} dot={{r:4,fill:"#7C3AED"}} name="Orders"/></LineChart></ResponsiveContainer></div>
          </div>
        </div>}
        {tab==="settings"&&<div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400"><div className="text-4xl mb-3">⚙️</div><p className="text-sm mt-1">Store settings and configuration.</p></div>}
      </div>
      {showAdd&&<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={()=>setShowAdd(false)}><div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl" onClick={e=>e.stopPropagation()}><div className="flex items-center justify-between mb-5"><h2 className="text-lg font-bold text-gray-900">Add New Product</h2><button onClick={()=>setShowAdd(false)} className="p-2 hover:bg-gray-100 rounded-xl"><X size={18}/></button></div><div className="space-y-3">{[["Product Title","Enter full product name"],["Price Range","e.g. $10-$50"],["Min. Order Qty","e.g. 100 pcs"],["Stock Quantity","e.g. 5000"]].map(([l,ph])=><div key={l}><label className="text-xs font-semibold text-gray-600 mb-1.5 block">{l}</label><input className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-500" placeholder={ph}/></div>)}<div><label className="text-xs font-semibold text-gray-600 mb-1.5 block">Category</label><select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none">{CATEGORIES.map(c=><option key={c.name}>{c.name}</option>)}</select></div><div><label className="text-xs font-semibold text-gray-600 mb-1.5 block">Description</label><textarea className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none resize-none" rows={3} placeholder="Product description..."/></div><div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-blue-400"><Upload size={24} className="mx-auto mb-2 text-gray-400"/><p className="text-sm text-gray-500">Click to upload product images</p></div></div><div className="flex gap-3 mt-5"><button className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700" onClick={()=>setShowAdd(false)}>Cancel</button><button className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold" onClick={()=>setShowAdd(false)}>Publish Product</button></div></div></div>}
    </div>
  );
}

function AdminDashboard(){
  const [tab,setTab]=useState("overview");
  return(
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-60 bg-gray-900 text-white flex-shrink-0 flex flex-col">
        <div className="p-5 border-b border-gray-800 flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center"><Shield size={18}/></div><div><div className="font-semibold text-sm">Admin Panel</div><div className="text-xs text-gray-400">GlobalTradeX</div></div></div>
        <nav className="flex-1 p-4 space-y-1">{[{I:LayoutDashboard,l:"Overview",k:"overview"},{I:Users,l:"User Management",k:"users"},{I:Store,l:"Seller Approvals",k:"sellers"},{I:Package,l:"Product Moderation",k:"products"},{I:AlertCircle,l:"Disputes",k:"disputes"},{I:BarChart3,l:"Analytics",k:"analytics"},{I:DollarSign,l:"Commission",k:"commission"},{I:Shield,l:"Fraud Detection",k:"fraud"}].map(({I,l,k})=><button key={k} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-colors" style={{background:tab===k?"#DC2626":"transparent",color:tab===k?"white":"#9CA3AF"}} onClick={()=>setTab(k)}><I size={16}/>{l}</button>)}</nav>
      </div>
      <div className="flex-1 p-6 overflow-auto">
        {tab==="overview"&&<div>
          <div className="flex items-center justify-between mb-6"><h1 className="text-2xl font-bold text-gray-900">Platform Overview</h1><div className="flex items-center gap-2 text-sm text-gray-500"><Activity size={16} className="text-green-500"/><span>All systems operational</span></div></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard icon={Users} label="Total Users" value="284,192" change={12} color="#1A56DB" bg="#EFF6FF"/>
            <StatCard icon={Store} label="Active Sellers" value="52,841" change={8} color="#059669" bg="#ECFDF5"/>
            <StatCard icon={DollarSign} label="Platform GMV" value="$4.6B" change={31} color="#7C3AED" bg="#F5F3FF"/>
            <StatCard icon={TrendingUp} label="Commission Revenue" value="$92M" change={28} color="#D97706" bg="#FFFBEB"/>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-5"><h3 className="font-semibold text-gray-800 mb-4">Platform GMV ($M)</h3><ResponsiveContainer width="100%" height={220}><AreaChart data={PLAT_DATA}><defs><linearGradient id="gv" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#7C3AED" stopOpacity={0.2}/><stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/></linearGradient></defs><XAxis dataKey="m" tick={{fontSize:12,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:12,fill:"#9CA3AF"}} axisLine={false} tickLine={false} tickFormatter={v=>"$"+v+"M"}/><Tooltip contentStyle={{borderRadius:12,border:"1px solid #E5E7EB"}}/><Area type="monotone" dataKey="gmv" stroke="#7C3AED" strokeWidth={2.5} fill="url(#gv)"/></AreaChart></ResponsiveContainer></div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5"><h3 className="font-semibold text-gray-800 mb-4">New Users (K)</h3><ResponsiveContainer width="100%" height={220}><BarChart data={PLAT_DATA}><XAxis dataKey="m" tick={{fontSize:12,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:12,fill:"#9CA3AF"}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{borderRadius:12,border:"1px solid #E5E7EB"}}/><Bar dataKey="users" fill="#1A56DB" radius={[6,6,0,0]} name="New Users (K)"/></BarChart></ResponsiveContainer></div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">{[{t:"Pending Seller Approvals",c:"47",col:"#D97706",d:"Require verification review"},{t:"Open Disputes",c:"128",col:"#EF4444",d:"Buyer-seller disputes"},{t:"Flagged Products",c:"23",col:"#7C3AED",d:"Under content review"}].map(c=><div key={c.t} className="bg-white rounded-2xl border border-gray-100 p-5"><div className="flex items-center justify-between mb-3"><span className="text-2xl font-bold" style={{color:c.col}}>{c.c}</span><button className="text-xs font-medium text-blue-600">Review All</button></div><div className="text-sm font-semibold text-gray-800">{c.t}</div><div className="text-xs text-gray-500 mt-0.5">{c.d}</div></div>)}</div>
        </div>}
        {tab==="users"&&<div>
          <div className="flex items-center justify-between mb-6"><h1 className="text-2xl font-bold text-gray-900">User Management</h1><div className="flex gap-2"><input className="border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none" placeholder="Search users..."/><select className="border border-gray-200 rounded-xl px-3 text-sm outline-none">{["All Roles","Buyer","Seller","Admin"].map(r=><option key={r}>{r}</option>)}</select></div></div>
          <div className="bg-white rounded-2xl border border-gray-100"><table className="w-full"><thead><tr className="border-b border-gray-100">{["User","Role","Status","Joined","Orders","Spend","Actions"].map(h=><th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>)}</tr></thead><tbody>{ALL_USERS.map(u=><tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50/50"><td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{background:"linear-gradient(135deg,#1A56DB,#7C3AED)"}}>{u.name[0]}</div><div><div className="text-sm font-medium text-gray-800">{u.name}</div><div className="text-xs text-gray-400">{u.email}</div></div></div></td><td className="px-4 py-3"><span className="text-xs px-2 py-1 rounded-full font-medium" style={{background:u.role==="Seller"?"#FEF3C7":"#EFF6FF",color:u.role==="Seller"?"#92400E":"#1A56DB"}}>{u.role}</span></td><td className="px-4 py-3"><Badge s={u.status}/></td><td className="px-4 py-3 text-xs text-gray-500">{u.joined}</td><td className="px-4 py-3 text-sm text-gray-600">{u.orders}</td><td className="px-4 py-3 text-sm font-medium text-gray-800">{u.spend}</td><td className="px-4 py-3"><div className="flex gap-1"><button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600"><Eye size={14}/></button><button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={14}/></button></div></td></tr>)}</tbody></table></div>
        </div>}
        {tab==="sellers"&&<div>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Seller Approvals</h1>
          <div className="space-y-4">{[{n:"FashionFirst Bangladesh",co:"BD",cat:"Clothing",d:"Feb 01"},{n:"GreenEnergy Solar India",co:"IN",cat:"Energy",d:"Feb 03"},{n:"AutoParts Express Korea",co:"KR",cat:"Automotive",d:"Feb 05"}].map(s=><div key={s.n} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4"><div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-2xl flex-shrink-0">🏭</div><div className="flex-1"><div className="font-semibold text-gray-800">{s.n}</div><div className="text-xs text-gray-500 mt-0.5">{s.co} · {s.cat} · Applied: {s.d}</div></div><Badge s="Processing"/><div className="flex gap-2"><button className="px-4 py-2 bg-green-50 text-green-600 text-xs font-semibold rounded-xl">Approve</button><button className="px-4 py-2 bg-red-50 text-red-500 text-xs font-semibold rounded-xl">Reject</button></div></div>)}</div>
        </div>}
        {(tab!=="overview"&&tab!=="users"&&tab!=="sellers")&&<div><h1 className="text-2xl font-bold text-gray-900 mb-6 capitalize">{tab}</h1><div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400"><div className="text-4xl mb-3">🔧</div><p className="font-medium text-gray-700 capitalize">{tab}</p><p className="text-sm mt-1">Full functionality in enterprise build.</p></div></div>}
      </div>
    </div>
  );
}

function MessagesPage(){
  const [msgs,setMsgs]=useState([{role:"assistant",text:"Hi! I'm TradeBot, your AI assistant powered by Claude.\n\nI can help you with:\n- Finding suppliers and products\n- Order tracking and disputes\n- Trade Assurance and payments\n- Shipping and logistics\n- RFQ and wholesale queries\n\nWhat can I help you with today?"}]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const [selConv,setSelConv]=useState(null);
  const convs=[{id:1,name:"SunPower Technology",last:"Your order has been shipped",time:"2m ago",unread:2,emoji:"\u2600\ufe0f"},{id:2,name:"Support Team",last:"How can we help you?",time:"1h ago",unread:0,emoji:"\U0001f3a7"},{id:3,name:"BrasilCafe Exports",last:"Sample is ready to ship",time:"3h ago",unread:1,emoji:"\u2615"},{id:4,name:"MedShield Corp",last:"Invoice attached",time:"Yesterday",unread:0,emoji:"\U0001f3e5"}];
  const endRef=useRef(null);
  useEffect(()=>{endRef.current?.scrollIntoView({behavior:"smooth"});},[msgs,loading]);
  const sendMsg=async()=>{
    if(!input.trim()||loading)return;
    const userMsg=input.trim();
    setInput("");
    setMsgs(m=>[...m,{role:"user",text:userMsg}]);
    setLoading(true);
    try{
      const history=msgs.map(m=>({role:m.role,content:m.text}));
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY || "";
      const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":apiKey,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:"You are TradeBot, the AI customer support assistant for GlobalTradeX, a global B2B/B2C marketplace. Help buyers and sellers with: product sourcing, supplier verification, order tracking, Trade Assurance, payments, shipping logistics, RFQ, MOQ, dispute resolution. Be friendly, concise, professional. Use markdown for formatting. If unsure, offer to connect with a human agent.",messages:[...history,{role:"user",content:userMsg}]})});
      const data=await res.json();
      const reply=data.content?.[0]?.text||"Sorry, I could not process that. Please try again.";
      setMsgs(m=>[...m,{role:"assistant",text:reply}]);
    }catch{
      setMsgs(m=>[...m,{role:"assistant",text:"I'm having trouble connecting. Please try again or email support@globaltradeX.com"}]);
    }
    setLoading(false);
  };
  const renderText=(txt)=>txt.split("\n").map((line,i)=>{
    const bold=line.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/^- /,"• ");
    return <p key={i} className="mb-1 last:mb-0 text-sm leading-relaxed" dangerouslySetInnerHTML={{__html:bold}}/>;
  });
  const selConvData=convs.find(c=>c.id===selConv);
  return(
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Messaging Center</h1>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex" style={{height:"calc(100vh - 200px)"}}>
          <div className="w-72 border-r border-gray-100 flex flex-col flex-shrink-0">
            <div className="p-4 border-b border-gray-100"><input className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none" placeholder="Search conversations..."/></div>
            <button className={"p-4 border-b border-gray-100 flex items-center gap-3 hover:bg-blue-50/50 transition-colors text-left "+(selConv===null?"bg-blue-50":"")} onClick={()=>setSelConv(null)}>
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0" style={{background:"linear-gradient(135deg,#1A56DB,#7C3AED)"}}><Bot size={20} color="white"/></div>
              <div className="flex-1 min-w-0"><div className="font-semibold text-sm text-gray-800">TradeBot AI Assistant</div><div className="text-xs text-gray-400">24/7 AI-powered support</div></div>
              <span className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"/>
            </button>
            <div className="flex-1 overflow-y-auto">{convs.map(c=><button key={c.id} className={"w-full p-4 border-b border-gray-50 flex items-center gap-3 hover:bg-gray-50 transition-colors "+(selConv===c.id?"bg-gray-50":"")} onClick={()=>setSelConv(c.id)}><div className="w-11 h-11 rounded-2xl bg-gray-100 flex items-center justify-center text-xl flex-shrink-0">{c.emoji}</div><div className="flex-1 min-w-0 text-left"><div className="flex items-center justify-between"><span className="font-semibold text-sm text-gray-800 truncate">{c.name}</span><span className="text-xs text-gray-400 flex-shrink-0">{c.time}</span></div><div className="text-xs text-gray-400 truncate mt-0.5">{c.last}</div></div>{c.unread>0&&<span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold flex-shrink-0">{c.unread}</span>}</button>)}</div>
          </div>
          {selConv===null?(
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b border-gray-100 flex items-center gap-3"><div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{background:"linear-gradient(135deg,#1A56DB,#7C3AED)"}}><Bot size={18} color="white"/></div><div><div className="font-semibold text-gray-800">TradeBot AI Assistant</div><div className="text-xs text-green-600 font-medium">Online - Powered by Claude AI</div></div></div>
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {msgs.map((m,i)=><div key={i} className={"flex "+(m.role==="user"?"justify-end":"justify-start")}>
                  {m.role==="assistant"&&<div className="w-8 h-8 rounded-xl flex items-center justify-center mr-2 flex-shrink-0 mt-0.5" style={{background:"linear-gradient(135deg,#1A56DB,#7C3AED)"}}><Bot size={14} color="white"/></div>}
                  <div className="max-w-md px-4 py-3 rounded-2xl" style={{background:m.role==="user"?"linear-gradient(135deg,#1A56DB,#7C3AED)":"#F9FAFB",color:m.role==="user"?"white":"#111827",border:m.role==="user"?"none":"1px solid #E5E7EB",borderTopLeftRadius:m.role==="assistant"?4:undefined,borderTopRightRadius:m.role==="user"?4:undefined}}>
                    {renderText(m.text)}
                  </div>
                </div>)}
                {loading&&<div className="flex justify-start"><div className="w-8 h-8 rounded-xl flex items-center justify-center mr-2 flex-shrink-0" style={{background:"linear-gradient(135deg,#1A56DB,#7C3AED)"}}><Bot size={14} color="white"/></div><div className="px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm text-gray-400 flex items-center gap-2"><div className="flex gap-1">{[0,1,2].map((dot)=><div key={dot} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay:dot*0.15+"s"}}/>)}</div>TradeBot is thinking...</div></div>}
                <div ref={endRef}/>
              </div>
              <div className="px-5 pb-2 flex gap-2 flex-wrap">{["Track my order","Find a solar panel supplier","What is Trade Assurance?","How to dispute an order"].map(s=><button key={s} className="text-xs px-3 py-1.5 rounded-xl border border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors" onClick={()=>setInput(s)}>{s}</button>)}</div>
              <div className="p-4 border-t border-gray-100"><div className="flex gap-3"><input className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white transition-colors" placeholder="Ask TradeBot anything..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMsg()}/><button className="w-12 h-12 flex items-center justify-center rounded-xl flex-shrink-0" style={{background:"linear-gradient(135deg,#1A56DB,#7C3AED)"}} onClick={sendMsg}><Send size={18} color="white"/></button></div></div>
            </div>
          ):(
            <div className="flex-1 flex flex-col">
              <div className="p-4 border-b border-gray-100 flex items-center gap-3"><div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center text-xl">{selConvData?.emoji}</div><div><div className="font-semibold text-gray-800">{selConvData?.name}</div><div className="text-xs text-green-600 font-medium">Online</div></div></div>
              <div className="flex-1 flex items-center justify-center text-gray-400"><div className="text-center"><div className="text-4xl mb-3">{selConvData?.emoji}</div><p className="text-sm">Start your conversation with <strong>{selConvData?.name}</strong></p></div></div>
              <div className="p-4 border-t border-gray-100"><div className="flex gap-3"><input className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500" placeholder="Type a message..."/><button className="w-12 h-12 flex items-center justify-center rounded-xl" style={{background:"linear-gradient(135deg,#1A56DB,#7C3AED)"}}><Send size={18} color="white"/></button></div></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App(){
  const [page,setPage]=useState("home");
  const [user,setUser]=useState(null);
  const [cart,setCart]=useState([]);
  const [wishlist,setWishlist]=useState([]);
  const [selProd,setSelProd]=useState(null);
  const addToCart=(p)=>setCart(c=>[...c,p]);
  const toggleWish=(p)=>setWishlist(w=>w.some(x=>x.id===p.id)?w.filter(x=>x.id!==p.id):[...w,p]);
  const shared={setPage,addToCart,wishlist,toggleWish};
  return(
    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",minHeight:"100vh",background:"#F9FAFB"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;}
        .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
        .animate-bounce{animation:bounce 1s infinite;}
      `}</style>
      {page!=="auth"&&<Navbar setPage={setPage} cart={cart} user={user} setUser={setUser}/>}
      {page==="home"            &&<HomePage       {...shared} setSelProd={setSelProd}/>}
      {page==="products"        &&<ProductsPage   {...shared} setSelProd={setSelProd}/>}
      {page==="product_detail"  &&<ProductDetail  p={selProd} setPage={setPage} addToCart={addToCart}/>}
      {page==="auth"            &&<AuthPage       setPage={setPage} login={u=>setUser(u)}/>}
      {page==="checkout"        &&<Checkout       cart={cart} setCart={setCart} setPage={setPage}/>}
      {page==="buyer_dashboard" &&<BuyerDashboard user={user} setPage={setPage} wishlist={wishlist} toggleWish={toggleWish}/>}
      {page==="seller_dashboard"&&<SellerDashboard user={user}/>}
      {page==="admin_dashboard" &&<AdminDashboard/>}
      {page==="messages"        &&<MessagesPage/>}
    </div>
  );
}
