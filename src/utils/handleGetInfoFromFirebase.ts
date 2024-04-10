const handleGetInfoFromFirebase = (field: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      fetch(`/api/getInfoFromFirebase/?field=${field}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            console.log("Get info from firebase success");
            resolve(data);
          } else {
            reject("Data fetch was not successful");
          }
        })
        .catch(error => {
          console.error("Failed to fetch data", error);
          reject(error);
        });
    } catch (error) {
      console.error("An error occurred", error);
      reject(error);
    }
  });
};

export default handleGetInfoFromFirebase;
