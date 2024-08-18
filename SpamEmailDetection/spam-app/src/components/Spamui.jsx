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
          console.log(res);
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
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
        />
        <br />
        <button type="submit">Predict</button>
      </form>
      {loading?(
        <Box className="spinner-container">
          <div className="loading-spinner"></div>
        </Box>
        
      ):(
        
        <div className={resultClassName}>
        {prediction && <p>Prediction: {prediction}</p>}
        </div>
      )
      }
      



    </div>
    </div>
  )
}

export default Spamui
