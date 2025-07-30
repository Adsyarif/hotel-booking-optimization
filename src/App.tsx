import {
  query,
  startAfter,
  limitToFirst,
  orderByKey,
  onValue,
  ref,
} from "firebase/database";
import { useCallback, useEffect, useRef, useState } from "react";
import { db } from "./ultils";
import HotelCard from "./components/HotelCard";
import type { IHotelData } from "./types";

const LIMIT_DATA = 5;

function App() {
  const [hotels, setHotels] = useState<IHotelData[]>([]);
  const [lastItemKey, setLastItemKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadingRef = useRef<HTMLDivElement | null>(null);

  const loadHotels = useCallback(
    (after?: string) => {
      if (isLoading) return;

      setIsLoading(true);
      const queryConstrains = [limitToFirst(LIMIT_DATA), orderByKey()];

      if (after) {
        queryConstrains.push(startAfter(after));
      }

      const hotelsQuery = query(ref(db, "hotels"), ...queryConstrains);

      onValue(hotelsQuery, (snapshot) => {
        if (snapshot.exists()) {
          const hotelsKey = Object.keys(snapshot.val());
          setLastItemKey(hotelsKey[hotelsKey.length - 1]);
          const hotelsData = Object.values(snapshot.val()) as IHotelData[];
          setHotels((prevHotelsData) =>
            after ? [...prevHotelsData, ...hotelsData] : [...hotelsData],
          );
        }
        setIsLoading(false);
      });
    },
    [isLoading],
  );
  useEffect(() => {
    loadHotels();
  }, [loadHotels]);

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      const first = entries[0];

      if (!isLoading && first.isIntersecting && lastItemKey) {
        loadHotels(lastItemKey);
      }
    };

    const options: IntersectionObserverInit = { threshold: 0.1 };

    const observer = new IntersectionObserver(callback, options);

    const loadingRefCurrent = loadingRef.current;
    if (loadingRefCurrent) {
      observer.observe(loadingRefCurrent);
    }

    return () => {
      if (loadingRefCurrent) {
        observer.unobserve(loadingRefCurrent);
      }
    };
  }, [lastItemKey, isLoading, loadHotels]);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Explore</h1>
      <section className="flex flex-col gap-6">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} data={hotel} />
        ))}
        <div ref={loadingRef} className="flex items-center justify-center">
          {isLoading && (
            <div className="animate-spin w-6 h-6 border-b-2 border-gray-400 rounded-full mb-6" />
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
