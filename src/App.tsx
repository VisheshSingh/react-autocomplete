import { useEffect, useState } from 'react';
import './App.css';

function useDebounceValue(value: string, time = 250) {
  const [debounceVal, setDebounceVal] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceVal(value);
    }, time);

    return () => {
      clearTimeout(timer);
    };
  }, [value, time]);
  return debounceVal;
}

function getAutoCompleteResults(query: string): Promise<string[]> {
  const fruits = [
    'Abiu',
    'Açaí',
    'Acerola',
    'Akebi',
    'Ackee',
    'African Cherry Orange',
    'American Mayapple',
    'Apple',
    'Apricot',
    'Aratiles',
    'Araza',
    'Avocado',
    'Banana',
    'Bilberry',
    'Blackberry',
    'Blackcurrant',
    'Black sapote',
    'Blueberry',
    'Boysenberry',
    'Breadfruit',
    'Cactus pear',
    'Canistel',
    'Catmon',
    'Cempedak',
    'Cherimoya',
    'Cherry',
    'Chico fruit',
    'Cloudberry',
    'Coco de mer',
    'Coconut',
    'Crab apple',
    'Cranberry',
    'Currant',
    'Damson',
    'Date',
    'Dragonfruit ',
    'Durian',
    'Elderberry',
    'Feijoa',
    'Fig',
    'Finger ',
    'Gac',
    'Goji berry',
    'Gooseberry',
    'Grape',
    'Raisin',
    'Grapefruit',
    'Grewia asiatica',
    'Guava',
    'Hala fruit',
    'Haws',
    'Honeyberry',
    'Huckleberry',
    'Jabuticaba',
    'Jackfruit',
    'Jambul',
    'Japanese plum',
    'Jostaberry',
    'Jujube',
    'Juniper berry',
    'Kaffir lime',
    'Kiwano ',
    'Kiwifruit',
    'Kumquat',
    'Lanzones',
    'Lemon',
    'Lime',
    'Loganberry',
    'Longan',
    'Loquat',
    'Lulo',
    'Lychee',
    'Magellan Barberry',
    'Macopa ',
    'Mamey apple',
    'Mamey Sapote',
    'Mango',
    'Mangosteen',
    'Marionberry',
    'Medlar',
    'Melon',
    'Cantaloupe',
    'Galia melon',
    'Honeydew',
    'Mouse melon',
    'Muskmelon',
    'Watermelon',
    'Miracle fruit',
    'Momordica fruit',
    'Monstera deliciosa',
    'Mulberry',
    'Nance',
    'Nectarine',
    'Orange',
    'Blood orange',
    'Clementine',
    'Mandarine',
    'Tangerine',
    'Papaya',
    'Passionfruit',
    'Pawpaw',
    'Peach',
    'Pear',
    'Persimmon',
    'Plantain',
    'Plum',
    'Prune',
    'Pineapple',
    'Pineberry',
    'Plumcot',
    'Pomegranate',
    'Pomelo',
    'Quince',
    'Raspberry',
    'Salmonberry',
    'Rambutan',
    'Redcurrant',
    'Rose apple',
    'Salal berry',
    'Salak',
    'Santol',
    'Sapodilla',
    'Sapote',
    'Saquico',
    'Sarguelas',
    'Satsuma',
    'Sloe',
    'Soursop',
    'Star apple',
    'Star fruit',
    'Strawberry',
    'Sugar apple',
    'Suriname cherry',
    'Tamarillo',
    'Tamarind',
    'Tangelo',
    'Tayberry',
    'Thimbleberry',
    'Ugli fruit',
    'White currant',
    'White sapote',
    'Ximenia',
    'Yuzu',
  ];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(
        fruits.filter((fruit) =>
          fruit.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, Math.random() * 1000);
  });
}

function App() {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const debounceQuery = useDebounceValue(query);

  useEffect(() => {
    setSuggestions([]);
    const fetchFruits = async () => {
      const data = await getAutoCompleteResults(debounceQuery);
      setSuggestions(data);
    };

    if (!query) {
      setSuggestions([]);
    }

    if (query.length) {
      fetchFruits();
    }
  }, [debounceQuery]);

  return (
    <>
      <input
        type='text'
        placeholder='Search here...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {suggestions.length > 0 &&
        suggestions.map((suggestion) => <p key={suggestion}>{suggestion}</p>)}
    </>
  );
}

export default App;
