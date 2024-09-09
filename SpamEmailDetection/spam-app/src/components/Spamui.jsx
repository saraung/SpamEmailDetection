import React, { useState } from 'react'
import axios from 'axios';
import '../App.css';
import { Box } from '@mui/material';

const Spamui = () => {

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState('');
    const [prediction, setPrediction] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true); 
   
      try {
        const res = await axios.post("https://spamemaildetection-python-api.onrender.com/api/predict", { message });

   
        if (res.status === 200) {
          setPrediction(''); 
          setTimeout(() => {
            setPrediction(res.data.prediction); 
          }, 100);
          setLoading(false)
        } else {
          alert(res.data);
        }
      } catch (err) {
        window.location.reload()
        setLoading(false)
        if (err.response && err.response.status === 400) {
          alert(err.response.data); 
        } else {
          console.error(err);
          alert('An error occurred while trying to make the prediction.');
        }
       
      }
   };
   
    
    
    const resultClassName = prediction ? prediction : '';

    
  return (
    <div>
        <div className="spamui">
      <h2>Spam Email Detection</h2>
      <form onSubmit={handleSubmit}>
      <textarea
        id="inputtextarea"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
        rows={20}
        cols={60}
        style={{ fontSize: "20px", padding: "10px" ,height:"200px",width:"600px"}}
/>

        <br />
        <button style={{height:"55px",width:"120px"}} type="submit">Predict</button>
      </form>
      {loading?(
        <Box className="spinner-container">
          <div className="loading-spinner"></div>
        </Box>
        
      ):(
        
        <div className={resultClassName}>
        {prediction && <h2>Prediction: {prediction}</h2>}
        </div>
      )
      }
      



    </div>
    </div>
  )
}

export default Spamui
