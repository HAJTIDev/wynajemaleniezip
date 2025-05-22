import './App.css';
import { useState } from 'react';
import bmwBiale from './images/bmw-biale.png';
import bmwCzarne from './images/bmw-czarne.png';
import bmwCzerwone from './images/bmw-czerwone.png';
import hondaBiala from './images/honda-biala.png';
import hondaCzarna from './images/honda-czarna.png';
import hondaCzerwona from './images/honda-czerwona.png';
import toyotaCzarna from './images/toyota-czarna.png';
import toyotaCzerwona from './images/toyota-czerwona.png';
import bmwSilver from './images/bmw-silver.png';

const cars = [
  { id: 1, src: bmwBiale, alt: 'BMW Białe', color: 'Biały', year: 2016, price: 450 },
  { id: 2, src: bmwCzarne, alt: 'BMW Czarne', color: 'Czarny', year: 2000, price: 250 },
  { id: 3, src: bmwCzerwone, alt: 'BMW Czerwone', color: 'Czerwony', year: 2010, price: 10 },
  { id: 4, src: hondaBiala, alt: 'Honda Biała', color: 'Biały', year: 2018, price: 180 },
  { id: 5, src: hondaCzarna, alt: 'Honda Czarna', color: 'Czarny', year: 2024, price: 230 },
  { id: 6, src: hondaCzerwona, alt: 'Honda Czerwona', color: 'Czerwony', year: 2008, price: 210 },
  { id: 7, src: toyotaCzarna, alt: 'Toyota Czarna', color: 'Czarny', year: 2018, price: 500 },
  { id: 8, src: toyotaCzerwona, alt: 'Toyota Czerwona', color: 'Czerwony', year: 2002, price: 270 },
  { id: 9, src: bmwSilver, alt: 'BMW Silver', color: 'Srebrny', year: 2000, price: 320 },
];

function App() {
  const [color, setColor] = useState('');
  const [year, setYear] = useState([2000, 2024]);
  const [price, setPrice] = useState([0, 500]);

  const filteredCars = cars.filter(
    (car) =>
      (color === '' || car.color === color) &&
      car.year >= year[0] &&
      car.year <= year[1] &&
      car.price >= price[0] &&
      car.price <= price[1]
  );

  const [selectedCarId, setSelectedCarId] = useState('');

  return (
    <div className="App">
      <header className="App-banner">Wypożyczalnia Samochodów</header>
      <div className="App-filters">
        <label>
          Kolor:
          <select value={color} onChange={(e) => setColor(e.target.value)}>
            <option value="">Wszystkie</option>
            <option value="Biały">Biały</option>
            <option value="Czarny">Czarny</option>
            <option value="Czerwony">Czerwony</option>
            <option value="Srebrny">Srebrny</option>
          </select>
        </label>
        <label>
          Rok:
          <input
            type="range"
            min="2000"
            max="2024"
            value={year[0]}
            onChange={(e) => setYear([+e.target.value, year[1]])}
          />
          <input
            type="range"
            min="2000"
            max="2024"
            value={year[1]}
            onChange={(e) => setYear([year[0], +e.target.value])}
          />
          <span>
            {year[0]} - {year[1]}
          </span>
        </label>
        <label>
          Cena:
          <input
            type="number"
            value={price[0]}
            onChange={(e) => setPrice([+e.target.value, price[1]])}
          />
          <input
            type="number"
            value={price[1]}
            onChange={(e) => setPrice([price[0], +e.target.value])}
          />
          <span>
            {price[0]} - {price[1]} PLN
          </span>
        </label>
      </div>
      <div className="App-gallery">
        {filteredCars.map((car) => (
          <div key={car.id} className="App-gallery-item">
            <img src={car.src} alt={car.alt} />
            <div className="App-gallery-name">{car.alt}</div>
          </div>
        ))}
      </div>
      <form className="App-rental-form" style={{ marginTop: 32 }}>
        <h2>Formularz wynajmu</h2>
        <div>
          <label>
            Wybierz auto:
            <select
              name="car"
              value={selectedCarId}
              onChange={(e) => setSelectedCarId(e.target.value)}
              required
            >
              <option value="">-- Wybierz auto --</option>
              {filteredCars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.alt} ({car.year}, {car.color}, {car.price} PLN)
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Imię:
            <input type="text" name="imie" required />
          </label>
        </div>
        <div>
          <label>
            Nazwisko:
            <input type="text" name="nazwisko" required />
          </label>
        </div>
        <div>
          <label>
            Od:
            <input type="date" name="od" required />
          </label>
        </div>
        <div>
          <label>
            Do:
            <input type="date" name="do" required />
          </label>
        </div>
        <div>
          <label>
            PESEL:
            <input type="text" name="pesel" pattern="\d{11}" maxLength={11} required />
          </label>
        </div>
        <button type="submit">Wynajmij</button>
      </form>
    </div>
  );
}

export default App;