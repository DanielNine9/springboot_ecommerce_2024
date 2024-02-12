import React, { useState } from 'react';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { AdvancedImage } from '@cloudinary/react';

const CloudinaryUploader = () => {
  


  // Transform
  const myImage = new CloudinaryImage('sample', { cloudName: 'your-cloud-name' }).resize(fill().width(100).height(150));

  // Render the image in a React component.
  return (
    <div>
      <AdvancedImage cldImg={myImage} />
    </div>
  )
};

export default CloudinaryUploader;