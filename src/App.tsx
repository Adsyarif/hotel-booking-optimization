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
    <main className="mt-2">
      <h1 className="">Hotels</h1>
      <p>{data}</p>
    </main>
  );
}

export default App;
