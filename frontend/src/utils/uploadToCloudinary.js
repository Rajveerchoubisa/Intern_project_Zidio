
export const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'Zidio_Ecommerce');  // 🔥 Important
    data.append('cloud_name', 'rajveercloud'); //rajveercloud //api key - 461217848683994 // api secret -S1nUNjbmSZuQacxKEwea9J82OKI
  
    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/rajveercloud/image/upload', {
        method: 'POST',
        body: data,
      });
  
      const json = await res.json();
      return json.url; // 🌟 This is the uploaded image URL
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  };