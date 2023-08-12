import { useParams, useHistory } from "react-router-dom";
import { useState,useEffect, SetStateAction} from "react";
import useFetch2 from "./useFetch2";
const HeroDetails :React.FC= () => {
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const {info, isPending, error } = useFetch2('http://localhost:8000/heros/' + id);
    const [heroName, setHeroName] = useState<string>("");
    useEffect(() => {
        if(info){
            setHeroName(info.name);
        }
    }
    , [info]);

    const updateHeroName = async (newName: any) => {
        try {
            const response = await fetch(`http://localhost:8000/heros/` + id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newName }),
            });

            if (!response.ok) {
                throw new Error('Failed to update hero name');
            } 
        } catch (error) {
            console.error(error);
        }
    };
    const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setHeroName(e.target.value);
        updateHeroName(e.target.value);
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
                                // placeholder={info.name}
                                value={heroName}
                                onChange={handleInputChange}
                            />
                        </form>
                    </div>
                    <br />
                    <button
                        className="button"
                        onClick={() => history.go(-1)}>
                        Back</button>
                </div>
            )}
        </div>
    );
}
export default HeroDetails;