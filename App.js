import "bootstrap/dist/css/bootstrap.min.css";
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
  const [selectedCarId, setSelectedCarId] = useState('');
  const [formError, setFormError] = useState('');

  const filteredCars = cars.filter(
    (car) =>
      (color === '' || car.color === color) &&
      car.year >= year[0] &&
      car.year <= year[1] &&
      car.price >= price[0] &&
      car.price <= price[1]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    const form = e.target;
    const pesel = form.pesel.value;
    const dateFrom = form.od.value;
    const dateTo = form.do.value;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const peselChecksum = (pesel) => {
      const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
      let sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += parseInt(pesel[i], 10) * weights[i];
      }
      return (10 - (sum % 10)) % 10;
    };
    const peselChecksumValue = peselChecksum(pesel);
    if (peselChecksumValue !== parseInt(pesel[10], 10)) {
      setFormError('PESEL jest niepoprawny.');
      return;
    }
    if (!dateFrom) {
      setFormError('Proszę wybrać datę rozpoczęcia wynajmu.');
      return;
    }
    if (!dateTo) {
      setFormError('Proszę wybrać datę zakończenia wynajmu.');
      return;
    }
    const from = new Date(dateFrom);
    const to = new Date(dateTo);
    from.setHours(0, 0, 0, 0);
    to.setHours(0, 0, 0, 0);

    if (from <= today) {
      setFormError('Data rozpoczęcia wynajmu musi być późniejsza niż dzisiaj.');
      return;
    }
    if (to < from) {
      setFormError('Data zakończenia wynajmu musi być późniejsza niż data rozpoczęcia.');
      return;
    }

    // Pobierz wybrane auto
    const selectedCar = cars.find(car => car.id === parseInt(form.car.value, 10));
    if (!selectedCar) {
      setFormError('Proszę wybrać auto.');
      return;
    }
    // Oblicz liczbę dni (włącznie z dniem początkowym)
    const timeDiff = to - from;
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
    const pricePerDay = selectedCar.price;
    const totalPrice = days * pricePerDay;

    alert(`Wynajem na ${days} dni. Cena za każdy dzień: ${pricePerDay} zł. Łącznie do zapłaty: ${totalPrice} zł.`);

    form.reset();
    setSelectedCarId('');
  };

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="text-center bg-primary text-white p-3 rounded">Wypożyczalnia Samochodów</h1>
      </header>
      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <label className="form-label">
            Kolor:
            <select className="form-select" value={color} onChange={(e) => setColor(e.target.value)}>
              <option value="">Wszystkie</option>
              <option value="Biały">Biały</option>
              <option value="Czarny">Czarny</option>
              <option value="Czerwony">Czerwony</option>
              <option value="Srebrny">Srebrny</option>
            </select>
          </label>
        </div>
        <div className="col-md-4 mb-2">
          <label className="form-label w-100">
            Rok:
            <div className="d-flex align-items-center">
              <input
                type="range"
                min="2000"
                max="2024"
                value={year[0]}
                onChange={(e) => setYear([+e.target.value, year[1]])}
                className="form-range me-2"
                style={{ width: "50%" }}
              />
              <input
                type="range"
                min="2000"
                max="2024"
                value={year[1]}
                onChange={(e) => setYear([year[0], +e.target.value])}
                className="form-range me-2"
                style={{ width: "50%" }}
              />
              <span className="ms-2">{year[0]} - {year[1]}</span>
            </div>
          </label>
        </div>
        <div className="col-md-4 mb-2">
          <label className="form-label w-100">
            Cena:
            <div className="d-flex align-items-center">
              <input
                type="number"
                value={price[0]}
                onChange={(e) => setPrice([+e.target.value, price[1]])}
                className="form-control me-2"
                style={{ width: "40%" }}
              />
              <input
                type="number"
                value={price[1]}
                onChange={(e) => setPrice([price[0], +e.target.value])}
                className="form-control me-2"
                style={{ width: "40%" }}
              />
              <span className="ms-2">{price[0]} - {price[1]} PLN</span>
            </div>
          </label>
        </div>
      </div>
      <div className="row g-3 mb-4">
        {filteredCars.map((car) => (
          <div key={car.id} className="col-6 col-md-4 col-lg-3">
            <div className="card h-100 text-center">
              <img src={car.src} alt={car.alt} className="card-img-top" style={{ maxHeight: 120, objectFit: "contain" }} />
              <div className="card-body">
                <div className="card-title">{car.alt}</div>
                <div className="text-muted">{car.year} | {car.color} | {car.price} PLN</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <form className="card p-4 mx-auto" style={{ maxWidth: 480 }} onSubmit={handleSubmit}>
        <h2 className="mb-4">Formularz wynajmu</h2>
        <div className="mb-3">
          <label className="form-label">
            Wybierz auto:
            <select
              name="car"
              value={selectedCarId}
              onChange={(e) => setSelectedCarId(e.target.value)}
              className="form-select"
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
        <div className="mb-3">
          <label className="form-label">
            Imię:
            <input type="text" name="imie" className="form-control" required />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Nazwisko:
            <input type="text" name="nazwisko" className="form-control" required />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Od:
            <input type="date" name="od" className="form-control" required />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Do:
            <input type="date" name="do" className="form-control" required />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            PESEL:
            <input type="text" name="pesel" pattern="\d{11}" maxLength={11} className="form-control" required />
          </label>
        </div>
        {formError && <div className="alert alert-danger mb-3">{formError}</div>}
        <button type="submit" className="btn btn-primary w-100">Wynajmij</button>
      </form>
    </div>
  );
}

export default App;