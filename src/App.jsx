// import {React , useState } from "react";
// import JobForm from "./Job_Form";
import  "./App.css"
// import JobGrid from './frontend/card_grid.jsx'
import HeroTitle from './components/Home/HeroTitle.jsx'
import '@mantine/core/styles.css';
import {MantineProvider } from '@mantine/core';
import HeaderMegaMenu from './components/Home/Header/Header.jsx'




function App() {

  //> Connect the database 

  // const [showForm, setShowForm] = useState(false);

  // const handleFormSubmit = (data) => {
  //   console.log("Submitted Data:", data);
  //   setShowForm(false);
  // };

  return (
    <div>
      <MantineProvider>
        <HeaderMegaMenu></HeaderMegaMenu>
    
      {/* <h1>LooKJObs Backend Prototype</h1>
      <h1>Batch-12 CSE-B</h1>
      <button onClick={() => setShowForm(true)}>LooKing for a JOb</button>
      {showForm && <JobForm onSubmit={handleFormSubmit} onClose={() => setShowForm(false)} />} */}
     <HeroTitle></HeroTitle>

  
      

      </MantineProvider>
    </div>
  );
}

export default App;







