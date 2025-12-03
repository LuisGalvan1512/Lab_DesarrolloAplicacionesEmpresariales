import { useEffect } from 'react';
import { useStore } from '../store/store';
import CardList from '../components/CardList';

const Home = () => {
  const { items, setItems } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const data = await response.json();
      setItems(data.results.slice(0, 6));
    };
    if (items.length === 0) {
      fetchData();
    }
  }, []);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4">Welcome to MyApp</h1>
        <p className="lead">Consuming API with React + Zustand</p>
      </div>
      <CardList items={items} />
    </div>
  );
};

export default Home;
