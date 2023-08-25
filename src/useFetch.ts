import { useState, useEffect } from 'react';
import { Hero } from './HeroesListprops';
import axios, { AxiosError, CancelTokenSource } from "axios";
const useFetch = (url:string) => {
    const [info, setInfo] = useState<Hero[]>();
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState<string | null | undefined>(undefined);
    useEffect(() => {
        const fetchData = async () => {
          const source: CancelTokenSource = axios.CancelToken.source();
    
          try {
            const response = await axios.get(url, { cancelToken: source.token });
            setInfo(response.data);
            setIsPending(false);
            setError(null);
          } catch (err) {
            if (axios.isCancel(err)) {
                console.log('Request canceled:', (err as AxiosError).message);
              } else if(err) {
                setError((err as AxiosError).message);
                setIsPending(false);
              }
          }
        };
    
        fetchData();
    
      }, [setError, url]);
    
      return { info, isPending, error };
    };
    
    export default useFetch;