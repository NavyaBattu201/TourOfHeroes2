import { useState,useEffect} from "react";
import axios,{ AxiosError, CancelTokenSource } from "axios";
import { Hero } from './HeroesListprops';
interface HeroDetailsProps {
  id: string;
}
const HeroDetails :React.FC<HeroDetailsProps>= ({id}):JSX.Element => {
    console.log(id); 
    const [info, setInfo] = useState<Hero>();
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState<string | null | undefined>(undefined);
    useEffect(() => {
        const fetchData = async () => {
          const source: CancelTokenSource = axios.CancelToken.source();
    
          try {
            const response = await axios.get('http://localhost:8000/heros/' + id, { cancelToken: source.token });
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
    
      }, [id, setError]);



    const [heroName, setHeroName] = useState<string>("");
    useEffect(() => {
        if(info){
            setHeroName(info.name);
        }
    }
    , [info]); 
  const updateHeroName = async (name: string) => {
    try {
      const response = await axios.patch(`http://localhost:8000/heros/` + id, {
        name: name
      });
      if (response.data) {
        console.log("Hero name updated successfully");
      } else {
        throw new Error("Failed to update hero name");
      }     
    } catch (error) {
      console.error(error);
    }
  };
    return (
        <div>
            {isPending && <div>loading...</div>}
            {error && <div>{error}</div>}
            {info && (
                <div className="hero-details">
                    <h2>{heroName} Details</h2>
                    <div className="hero-content">
                        <p>Id:{id}</p>
                        <form>
                            <label>Hero name:</label>
                            <input
                                type="text"
                                value={heroName}
                                onChange={(e)=>{setHeroName(e.target.value);
                                    updateHeroName(e.target.value as string);}}
                            />
                        </form>
                    </div>
                    <br />
                    <button
                        className="button"
                        onClick={() => window.history.back()}>
                        Back</button>
                </div>
            )}
        </div>
    );
}
export default HeroDetails;