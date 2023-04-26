export const useImageUpload = () => {
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'egu3lgzw'); // value got from here https://console.cloudinary.com/console/c-3b11fb731fc6e5a47cd099ae611db4/getting-started

    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/dwdwjz5kb/upload`, // value got from here https://console.cloudinary.com/settings/c-3b11fb731fc6e5a47cd099ae611db4/upload
      {
        method: 'POST',
        body: formData,
      },
    );
    const cloudinaryData = await cloudinaryResponse.json();
    return cloudinaryData.url as string;
  };

  return {
    uploadImage,
  };
};
