// ImageGenerator.js
import React, { useState } from 'react';

const ImageGenerator = () => {
  const [imageURL, setImageURL] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const query = async (data) => {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
        {
          headers: { Authorization: "Bearer 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" },
          method: "POST",
          body: JSON.stringify(data),
        }
        
      );

      const result = await response.blob();
      console.log(result);
      return result;
    } catch (error) {
      console.error('Error querying image:', error);
    }
  };

  const generateImage = async () => {
    try {
      const data = { inputs: searchQuery };
      const imageBlob = await query(data);
      const imageURL = URL.createObjectURL(imageBlob);
      setImageURL(imageURL);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <div>
      <h1>Image Generator</h1>
      <div>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={generateImage}>Generate Image</button>
      </div>
      {imageURL && <img src={imageURL} alt="Generated" />}
    </div>
  );
};

export default ImageGenerator;
