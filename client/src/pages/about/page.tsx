import { useEffect, useState } from "react";
import PageClient from "./component/page";
import { fetchAPI } from "@/lib/fetchAPI";


export default function AboutPage() {
  const [directorData, setDirectorData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadDirectors = async () => {
      try {
        const res = await fetchAPI<any[]>("/directors");
        setDirectorData(res || []);
      } catch (error) {
        console.error("Failed to fetch directors:", error);
        setDirectorData([]);
      } finally {
        setLoading(false);
      }
    };

    loadDirectors();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return <PageClient data={directorData} />;
}