import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "./ultils";

function App() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const query = ref(db, "hotels");
    onValue(query, (snapshot) => {
      if (snapshot.exists()) {
        setHotels(Object.values(snapshot.val()));
      }
    });
  }, []);

  const data = JSON.stringify(hotels);
  return (
    <>
      <h1>Hotels</h1>
      <p>{data}</p>
    </>
  );
}

export default App;
