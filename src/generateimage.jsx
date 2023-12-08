function GenerateImage(file, callback) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64String = e.target.result;
      return callback(base64String);
    };
    reader.readAsDataURL(file);
  }
export default GenerateImage;
