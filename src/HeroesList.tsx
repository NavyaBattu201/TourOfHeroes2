import { Link } from 'wouter';
import { Hero } from './HeroesListprops';

interface HeroesListProps {
    heroes: Hero[];
  }
const HeroesList:React.FC<HeroesListProps> = ({ heroes }): JSX.Element => {
    return (
        <div className="heroslist">
            <div className="herobox">
                {heroes.map(item=> (
                    <div key={item.id}>
                        <p>
                            <Link href={`/hero/${item.id}`}>{item.id}: {item.name}</Link>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HeroesList;