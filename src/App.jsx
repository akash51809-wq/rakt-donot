import React, { useMemo, useState } from "react";
import {
  Activity, AlertCircle, Bell, CalendarDays, CheckCircle2, ChevronRight,
  Droplets, HeartPulse, Home, LogOut, MapPin, Menu, MessageCircle,
  MoreHorizontal, Search, Settings, ShieldCheck, Smartphone, UserRound,
  Users, X, UserCheck, ClipboardList, BarChart3, Clock3, Phone, Plus,
  Navigation, CircleUserRound, HandHeart, LifeBuoy
} from "lucide-react";

const bloodGroups = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];

const seedRequests = [
  { id:1, patient:"आरव शर्मा", blood:"O+", units:2, hospital:"City Care Hospital", city:"प्रयागराज", urgent:true, status:"Active", time:"12 min ago" },
  { id:2, patient:"नेहा सिंह", blood:"B+", units:1, hospital:"LifeLine Medical", city:"लखनऊ", urgent:false, status:"Pending", time:"38 min ago" },
  { id:3, patient:"राहुल वर्मा", blood:"A-", units:3, hospital:"Apollo Care", city:"वाराणसी", urgent:true, status:"Active", time:"1 hr ago" }
];

const donors = [
  {name:"अमित कुमार", blood:"O+", distance:"1.8 km", city:"प्रयागराज", available:true},
  {name:"स्नेहा मिश्रा", blood:"B+", distance:"3.2 km", city:"प्रयागराज", available:true},
  {name:"रोहित यादव", blood:"A+", distance:"4.6 km", city:"प्रयागराज", available:false},
  {name:"पूजा सिंह", blood:"O-", distance:"6.1 km", city:"प्रयागराज", available:true}
];

const volunteerCases = [
  {id:"VR-1024", type:"Emergency", patient:"आरव शर्मा", blood:"O+", location:"City Care Hospital", distance:"2.1 km", status:"Assigned"},
  {id:"VR-1023", type:"Verification", patient:"नेहा सिंह", blood:"B+", location:"Civil Lines", distance:"4.3 km", status:"In Review"},
  {id:"VR-1018", type:"Delivery", patient:"राहुल वर्मा", blood:"A-", location:"Apollo Care", distance:"7.8 km", status:"Completed"}
];

function App(){
  const [role,setRole] = useState("user");
  const [page,setPage] = useState("dashboard");
  const [mobileOpen,setMobileOpen] = useState(false);
  const [blood,setBlood] = useState("O+");
  const [search,setSearch] = useState("");
  const [requests,setRequests] = useState(seedRequests);
  const [toast,setToast] = useState("");
  const [showRequest,setShowRequest] = useState(false);

  const notify = (msg) => { setToast(msg); setTimeout(()=>setToast(""),2400); };

  const roleData = {
    user: {label:"यूज़र", name:"राजेश कुमार", icon:UserRound},
    volunteer: {label:"वॉलंटियर", name:"अंकित मिश्रा", icon:HandHeart},
    admin: {label:"एडमिन", name:"सिस्टम एडमिन", icon:ShieldCheck}
  };
  const current = roleData[role];

  const filteredDonors = useMemo(() => donors.filter(d =>
    (!search || d.name.toLowerCase().includes(search.toLowerCase()) || d.blood.includes(search.toUpperCase())) &&
    d.blood === blood
  ), [blood,search]);

  const nav = {
    user:[
      ["dashboard","डैशबोर्ड",Home],["donors","डोनर खोजें",Search],["requests","ब्लड रिक्वेस्ट",ClipboardList],
      ["messages","मैसेज",MessageCircle],["profile","मेरी प्रोफाइल",UserRound]
    ],
    volunteer:[
      ["dashboard","डैशबोर्ड",Home],["cases","केसेस",LifeBuoy],["donors","डोनर खोजें",Users],
      ["messages","मैसेज",MessageCircle],["profile","प्रोफाइल",UserRound]
    ],
    admin:[
      ["dashboard","डैशबोर्ड",Home],["users","यूज़र्स",Users],["requests","रिक्वेस्ट",ClipboardList],
      ["volunteers","वॉलंटियर्स",UserCheck],["reports","रिपोर्ट्स",BarChart3],["settings","सेटिंग्स",Settings]
    ]
  }[role];

  const switchRole = (r) => { setRole(r); setPage("dashboard"); setMobileOpen(false); notify(r==="user"?"यूज़र मोड चालू":"volunteer"===r?"वॉलंटियर मोड चालू":"एडमिन मोड चालू"); };

  return <div className="app-shell">
    <aside className={mobileOpen ? "sidebar open" : "sidebar"}>
      <div className="brand">
        <div className="brand-mark"><Droplets size={27} fill="currentColor"/></div>
        <div><strong>रक्त</strong><span>DONOR NETWORK</span></div>
        <button className="icon-btn close-mobile" onClick={()=>setMobileOpen(false)}><X size={20}/></button>
      </div>
      <div className="role-card">
        <span className="role-dot"></span><div><small>आप लॉगिन हैं</small><b>{current.label}</b></div>
      </div>
      <nav>
        {nav.map(([id,label,Icon])=><button key={id} className={page===id?"nav-item active":"nav-item"} onClick={()=>{setPage(id);setMobileOpen(false)}}><Icon size={19}/><span>{label}</span></button>)}
      </nav>
      <div className="sidebar-bottom">
        <button className="nav-item" onClick={()=>notify("सेटिंग्स जल्द उपलब्ध होगी")}><Settings size={19}/><span>सेटिंग्स</span></button>
        <button className="nav-item logout" onClick={()=>notify("डेमो लॉगआउट")}><LogOut size={19}/><span>लॉगआउट</span></button>
      </div>
    </aside>

    <main className="main">
      <header className="topbar">
        <button className="mobile-menu icon-btn" onClick={()=>setMobileOpen(true)}><Menu/></button>
        <div className="crumb"><span>रक्त डोनर नेटवर्क</span><ChevronRight size={15}/><b>{nav.find(n=>n[0]===page)?.[1] || "डैशबोर्ड"}</b></div>
        <div className="top-actions">
          <button className="icon-btn notification" onClick={()=>notify("आपके लिए कोई नई notification नहीं है")}><Bell size={20}/><i></i></button>
          <div className="avatar">{current.name.charAt(0)}</div>
          <div className="top-user"><b>{current.name}</b><small>{current.label}</small></div>
        </div>
      </header>

      <div className="role-switcher">
        <span>डेमो Role:</span>
        {Object.entries(roleData).map(([key,v])=><button key={key} className={role===key?"role-switch active": "role-switch"} onClick={()=>switchRole(key)}>{React.createElement(v.icon,{size:15})}{v.label}</button>)}
      </div>

      <section className="content">
        {page==="dashboard" && <Dashboard role={role} requests={requests} onRequest={()=>setShowRequest(true)} onNotify={notify} setPage={setPage}/>}
        {page==="donors" && <Donors blood={blood} setBlood={setBlood} search={search} setSearch={setSearch} donors={filteredDonors} onNotify={notify}/>}
        {page==="requests" && <Requests role={role} requests={requests} setRequests={setRequests} onNotify={notify} onRequest={()=>setShowRequest(true)}/>}
        {page==="messages" && <Messages onNotify={notify}/>}
        {page==="profile" && <Profile role={role} onNotify={notify}/>}
        {page==="cases" && <VolunteerCases onNotify={notify}/>}
        {page==="users" && <AdminUsers onNotify={notify}/>}
        {page==="volunteers" && <AdminVolunteers onNotify={notify}/>}
        {page==="reports" && <Reports/>}
        {page==="settings" && <AdminSettings onNotify={notify}/>}
      </section>
    </main>

    {showRequest && <RequestModal blood={blood} setBlood={setBlood} onClose={()=>setShowRequest(false)} onCreate={(r)=>{setRequests([r,...requests]);setShowRequest(false);notify("ब्लड रिक्वेस्ट सफलतापूर्वक भेजी गई");}}/>}
    {toast && <div className="toast"><CheckCircle2 size={18}/>{toast}</div>}
  </div>
}

function Dashboard({role,requests,onRequest,onNotify,setPage}){
  const stats = role==="admin"
    ? [["कुल यूज़र्स","12,480","+8.2%",Users],["Active Donors","4,286","+12.4%",Droplets],["आज की Requests","186","+5.1%",ClipboardList],["Volunteers","324","+3.8%",UserCheck]]
    : role==="volunteer"
    ? [["Assigned Cases","18","+4",LifeBuoy],["Active Requests","42","+9",ClipboardList],["Verified Donors","126","+18",UserCheck],["Completed","284","+24",CheckCircle2]]
    : [["मेरी Requests","8","+2",ClipboardList],["Saved Donors","24","+6",Users],["Nearby Donors","48","+12",MapPin],["Donations","14","+3",HeartPulse]];
  return <><div className="hero">
    <div><span className="eyebrow"><HeartPulse size={15}/> LIFE SAVING NETWORK</span><h1>{role==="admin"?"पूरा नेटवर्क आपके नियंत्रण में":role==="volunteer"?"आज किसी की जिंदगी बचाने का दिन है":"किसी की जिंदगी बचाने के लिए तैयार हैं?"}</h1><p>{role==="admin"?"सभी blood requests, donors और volunteers को एक जगह manage करें।":role==="volunteer"?"आपके आसपास की urgent cases और verification tasks यहां दिखेंगे।":"सही blood donor को सही समय पर खोजें और जरूरतमंद की मदद करें।"}</p>{role==="user"&&<button className="primary-btn" onClick={onRequest}><Plus size={18}/> Blood Request बनाएं</button>}</div>
    <div className="hero-blood"><div className="pulse-ring"></div><Droplets size={90} fill="currentColor"/><strong>O+</strong><span>AVAILABLE DONORS</span></div>
  </div>
  <div className="stats">{stats.map(([t,n,c,I])=><div className="stat-card" key={t}><div className="stat-icon"><I size={20}/></div><div><span>{t}</span><b>{n}</b><small>{c} इस महीने</small></div></div>)}</div>
  <div className="grid-2">
    <div className="panel"><div className="panel-head"><div><h3>{role==="volunteer"?"Priority Cases":"Recent Blood Requests"}</h3><p>Live network activity</p></div><button className="text-btn" onClick={()=>setPage("requests")}>सभी देखें <ChevronRight size={15}/></button></div>
      {requests.map(r=><div className="request-row" key={r.id}><div className="blood-badge">{r.blood}</div><div className="row-main"><b>{r.patient}</b><span><MapPin size={13}/>{r.hospital} • {r.city}</span></div><div className={r.urgent?"urgent":"normal"}>{r.urgent?"URGENT":"NORMAL"}</div><button className="small-btn" onClick={()=>onNotify("Request details खोले गए")}>View</button></div>)}
    </div>
    <div className="panel map-card"><div className="panel-head"><div><h3>Nearby Network</h3><p>आपके आसपास active donors</p></div><Navigation size={22}/></div><div className="fake-map"><div className="map-grid"></div>{[["28%","35%"],["61%","27%"],["48%","65%"],["74%","58%"],["22%","72%"]].map((p,i)=><span key={i} className={i===0?"map-pin main-pin":"map-pin"} style={{left:p[0],top:p[1]}}><Droplets size={13} fill="currentColor"/></span>)}<div className="map-center"><MapPin size={17}/> आपका स्थान</div></div></div>
  </div></>
}

function Donors({blood,setBlood,search,setSearch,donors,onNotify}){
 return <><PageTitle icon={Search} title="Donor खोजें" sub="अपने blood group के available donors खोजें"/>
 <div className="filter-panel"><div className="searchbox"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="नाम या blood group से खोजें..."/></div><div className="blood-filter">{bloodGroups.map(b=><button key={b} className={blood===b?"selected":""} onClick={()=>setBlood(b)}>{b}</button>)}</div></div>
 <div className="donor-grid">{donors.map(d=><div className="donor-card" key={d.name}><div className="donor-avatar">{d.name.charAt(0)}</div><div className="donor-info"><b>{d.name}</b><span><Droplets size={14}/>{d.blood} <i></i> {d.distance}</span><small><MapPin size={13}/>{d.city}</small></div><span className={d.available?"available":"offline"}>{d.available?"Available":"Unavailable"}</span><div className="donor-actions"><button onClick={()=>onNotify(d.name+" को message भेजा गया")}><MessageCircle size={17}/> Message</button><button onClick={()=>onNotify("Call action शुरू किया गया")}><Phone size={17}/> Call</button></div></div>)}</div></>
}

function Requests({role,requests,setRequests,onNotify,onRequest}){
 return <><PageTitle icon={ClipboardList} title="Blood Requests" sub={role==="admin"?"सभी requests manage करें":"Blood requirements और emergency requests"}/>{role==="user"&&<button className="primary-btn page-action" onClick={onRequest}><Plus size={18}/> नई Request</button>}
 <div className="panel table-panel"><div className="table-wrap"><table><thead><tr><th>Patient</th><th>Blood</th><th>Hospital</th><th>Units</th><th>Status</th><th>Action</th></tr></thead><tbody>{requests.map(r=><tr key={r.id}><td><b>{r.patient}</b><small>{r.time}</small></td><td><span className="table-blood">{r.blood}</span></td><td>{r.hospital}<small>{r.city}</small></td><td>{r.units}</td><td><span className={r.status==="Active"?"status active":"status pending"}>{r.status}</span></td><td><button className="small-btn" onClick={()=>{setRequests(requests.map(x=>x.id===r.id?{...x,status:"Completed"}:x));onNotify("Request status updated")}}>Update</button></td></tr>)}</tbody></table></div></div></>
}

function VolunteerCases({onNotify}){return <><PageTitle icon={LifeBuoy} title="Volunteer Cases" sub="Assigned emergency और verification tasks"/><div className="case-grid">{volunteerCases.map(c=><div className="case-card" key={c.id}><div className="case-top"><span>{c.id}</span><span className={c.status==="Completed"?"status active":"status pending"}>{c.status}</span></div><div className="case-icon"><Droplets size={24} fill="currentColor"/></div><b>{c.patient}</b><strong>{c.blood} • {c.type}</strong><span><MapPin size={14}/>{c.location} • {c.distance}</span><button className="primary-btn compact" onClick={()=>onNotify("Case "+c.id+" update किया गया")}>Case खोलें</button></div>)}</div></>}

function AdminUsers({onNotify}){return <><PageTitle icon={Users} title="User Management" sub="Registered users और donor accounts"/><div className="panel table-panel"><table><thead><tr><th>User</th><th>Blood</th><th>Location</th><th>Donor</th><th>Status</th><th>Action</th></tr></thead><tbody>{["राजेश कुमार","स्नेहा मिश्रा","अमित यादव","पूजा गुप्ता","विवेक सिंह"].map((n,i)=><tr key={n}><td><b>{n}</b><small>user{i+1024}@rakt.in</small></td><td>{bloodGroups[i+2]}</td><td>प्रयागराज</td><td><span className="status active">Yes</span></td><td>Active</td><td><button className="small-btn" onClick={()=>onNotify("User profile खोली गई")}>Manage</button></td></tr>)}</tbody></table></div></>}

function AdminVolunteers({onNotify}){return <><PageTitle icon={UserCheck} title="Volunteer Management" sub="Verification और field team control"/><div className="stats"><div className="stat-card"><div className="stat-icon"><UserCheck/></div><div><span>Total</span><b>324</b><small>+18 this month</small></div></div><div className="stat-card"><div className="stat-icon"><Activity/></div><div><span>Active Now</span><b>86</b><small>Field volunteers</small></div></div></div><div className="panel"><div className="vol-list">{["अंकित मिश्रा","सुमित पटेल","नेहा वर्मा","रवि शुक्ला"].map((n,i)=><div className="vol-row" key={n}><div className="donor-avatar">{n[0]}</div><div><b>{n}</b><span>Volunteer • प्रयागराज</span></div><span className="status active">Verified</span><button className="small-btn" onClick={()=>onNotify("Volunteer "+n+" manage किया गया")}>Manage</button></div>)}</div></div></>}

function Reports(){return <><PageTitle icon={BarChart3} title="Reports & Analytics" sub="Network performance का overview"/><div className="stats"><div className="stat-card"><div className="stat-icon"><HeartPulse/></div><div><span>Successful Donations</span><b>8,642</b><small>87% success rate</small></div></div><div className="stat-card"><div className="stat-icon"><Clock3/></div><div><span>Avg. Response</span><b>18 min</b><small>-4 min improved</small></div></div><div className="stat-card"><div className="stat-icon"><Users/></div><div><span>Donor Retention</span><b>72%</b><small>+6.4%</small></div></div></div><div className="panel chart-panel"><h3>Monthly Blood Requests</h3><div className="bars">{[44,68,52,78,61,86,72,94,66,82,75,98].map((h,i)=><div key={i}><span style={{height:h+"%"}}></span><small>{i+1}</small></div>)}</div></div></>}

function AdminSettings({onNotify}){return <><PageTitle icon={Settings} title="System Settings" sub="Platform configuration और controls"/><div className="settings-grid">{[["Security","OTP, session और access controls"],["Notifications","Push, SMS और emergency alerts"],["Maps & Location","Google Maps API और radius"],["Verification","Donor और volunteer approval"],["Emergency Rules","Priority और escalation settings"],["Appearance","Branding और theme controls"]].map(([t,s])=><button className="setting-card" key={t} onClick={()=>onNotify(t+" settings खोली गई")}><div className="stat-icon"><Settings size={19}/></div><div><b>{t}</b><span>{s}</span></div><ChevronRight/></button>)}</div></>}

function Messages({onNotify}){return <><PageTitle icon={MessageCircle} title="Messages" sub="Donors, requesters और volunteers से secure communication"/><div className="panel chat-demo"><div className="chat-list">{["अमित कुमार","स्नेहा मिश्रा","अंकित मिश्रा"].map((n,i)=><button key={n} onClick={()=>onNotify(n+" की chat खोली गई")}><div className="donor-avatar">{n[0]}</div><div><b>{n}</b><span>{i===0?"मैं आज donation कर सकता हूं।":"Last message • 12 min ago"}</span></div><small>{i+1}</small></button>)}</div><div className="chat-empty"><MessageCircle size={42}/><h3>Secure Chat</h3><p>किसी conversation को चुनें और donor/requester से बात करें।</p></div></div></>}

function Profile({role,onNotify}){return <><PageTitle icon={UserRound} title="My Profile" sub="अपनी जानकारी और availability manage करें"/><div className="profile-card"><div className="profile-cover"></div><div className="profile-body"><div className="profile-avatar">{role==="admin"?"A":role==="volunteer"?"अ":"र"}</div><h2>{role==="admin"?"System Admin":role==="volunteer"?"अंकित मिश्रा":"राजेश कुमार"}</h2><span className="profile-role">{role==="admin"?"Administrator":role==="volunteer"?"Verified Volunteer":"Blood Donor • O+"}</span><div className="profile-fields"><div><small>Blood Group</small><b>O+</b></div><div><small>Location</small><b>प्रयागराज, UP</b></div><div><small>Availability</small><b className="available">Available</b></div></div><button className="primary-btn" onClick={()=>onNotify("Profile edit mode शुरू")}>Profile Edit करें</button></div></div></>}

function RequestModal({blood,setBlood,onClose,onCreate}){const [name,setName]=useState("");const [hospital,setHospital]=useState("");const [units,setUnits]=useState(1);return <div className="modal-backdrop"><div className="modal"><div className="modal-head"><div><span className="eyebrow"><AlertCircle size={14}/> EMERGENCY SUPPORT</span><h2>Blood Request बनाएं</h2></div><button className="icon-btn" onClick={onClose}><X/></button></div><label>Patient Name<input value={name} onChange={e=>setName(e.target.value)} placeholder="Patient का नाम"/></label><label>Blood Group<div className="blood-filter modal-blood">{bloodGroups.map(b=><button type="button" key={b} className={blood===b?"selected":""} onClick={()=>setBlood(b)}>{b}</button>)}</div></label><label>Hospital<input value={hospital} onChange={e=>setHospital(e.target.value)} placeholder="Hospital का नाम"/></label><label>Required Units<input type="number" min="1" max="10" value={units} onChange={e=>setUnits(Number(e.target.value))}/></label><div className="modal-actions"><button className="secondary-btn" onClick={onClose}>Cancel</button><button className="primary-btn" onClick={()=>onCreate({id:Date.now(),patient:name||"New Patient",blood,units,hospital:hospital||"Hospital",city:"प्रयागराज",urgent:true,status:"Active",time:"Just now"})}><HeartPulse size={17}/> Request भेजें</button></div></div></div>}

function PageTitle({icon:Icon,title,sub}){return <div className="page-title"><div className="title-icon"><Icon/></div><div><h1>{title}</h1><p>{sub}</p></div></div>}

export default App;