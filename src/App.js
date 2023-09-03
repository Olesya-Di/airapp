import "./App.css";
import flights from "./flights.json";
import FlightСard from "./components/FlightСard";
import { useState, useEffect, useCallback, useMemo } from "react";
import InputBlock from "./components/InputBlock";
import CheckboxBlock from "./components/CheckboxBlock";
import Title from "./components/UI/Title";
import RadioBlock from "./components/RadioBlock";
import Label from "./components/UI/Label";

function App() {
  const [FLIGHTS, setFLIGHTS] = useState([]);
  const [indexFlight, setIndexFlight] = useState(2);
  const [airlineFilrer, setAirlineFilrer] = useState([]);
  const [sortByPriceFrom, setSortByPriceFrom] = useState("");
  const [sortByPriceTo, setSortByPriceTo] = useState("");
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [minPrices, setMinPrices] = useState({});
  const [isShowMore, setIsShowMore] = useState(false);

  const [sortByPriceAsc, setSortByPriceAsc] = useState(false);
  const [sortByPriceDesc, setSortByPriceDesc] = useState(false);
  const [sortByDuration, setSortByDuration] = useState(false);

  const [direct, setDirect] = useState(false);
  const [transfer, setTransfer] = useState(false);

  useEffect(() => {
    setFLIGHTS(flights.result.flights.map((f) => f.flight));
  }, []);

  const handleSortByPriceAscChange = () => {
    setSortByPriceAsc(!sortByPriceAsc);
    setSortByPriceDesc(false);
    setSortByDuration(false);
  };

  const handleSortByPriceDescChange = () => {
    setSortByPriceDesc(!sortByPriceDesc);
    setSortByPriceAsc(false);
    setSortByDuration(false);
  };

  const handleSortByDurationChange = () => {
    setSortByDuration(!sortByDuration);
    setSortByPriceAsc(false);
    setSortByPriceDesc(false);
  };

  const handleCheckboxAirlineChange = (e) => {
    const airline = e.target.value;
    if (e.target.checked) {
      setSelectedAirlines([...selectedAirlines, airline]);
    } else {
      setSelectedAirlines(selectedAirlines.filter((item) => item !== airline));
    }
  };

  const handleDirectChange = () => {
    setDirect(!direct);
  };

  const handleTransferChange = () => {
    setTransfer(!transfer);
  };

  useEffect(() => {
    const newMinPrices = {};
    FLIGHTS.forEach((flight) => {
      const airline = flight.legs[0].segments[0].airline.caption;
      if (
        !newMinPrices[airline] ||
        Number(flight.price.total.amount) < newMinPrices[airline]
      ) {
        newMinPrices[airline] = Number(flight.price.total.amount);
      }
    });
    setMinPrices(newMinPrices);
  }, [FLIGHTS]);

  const filterFlightsByAirlines = useCallback(() => {
    let filtered = [...FLIGHTS];
    //  сортировка по цене
    if (sortByPriceFrom && sortByPriceTo) {
      filtered = filtered.filter(
        (flight) =>
          flight.price.total.amount >= Number(sortByPriceFrom) &&
          flight.price.total.amount <= Number(sortByPriceTo)
      );
    } else if (sortByPriceFrom) {
      filtered = filtered.filter(
        (flight) => flight.price.total.amount >= Number(sortByPriceFrom)
      );
    } else if (sortByPriceTo) {
      filtered = filtered.filter(
        (flight) => flight.price.total.amount <= Number(sortByPriceTo)
      );
    }
    //  сортировка по возрастанию / убыванию
    if (sortByPriceAsc) {
      filtered = filtered.sort(
        (a, b) => Number(a.price.total.amount) - Number(b.price.total.amount)
      );
    } else if (sortByPriceDesc) {
      filtered = filtered.sort(
        (a, b) => Number(b.price.total.amount) - Number(a.price.total.amount)
      );
    } else if (sortByDuration) {
      filtered = filtered.sort(
        (a, b) =>
          a.legs[0].segments[0].travelDuration -
            b.legs[0].segments[0].travelDuration ||
          a.legs[1].segments[0].travelDuration -
            b.legs[1].segments[0].travelDuration
      );
    }
    //  сортировка по пересадкам
    if (direct && transfer) {
      filtered = [...filtered];
    } else if (direct) {
      filtered = filtered.filter(
        (flight) => !flight.legs[0].segments[1] || !flight.legs[1].segments[1]
      );
    } else if (transfer) {
      filtered = filtered.filter(
        (flight) => flight.legs[0].segments[1] && flight.legs[1].segments[1]
      );
    }
    //  сортировка по авиакомпаням
    if (selectedAirlines.length > 0) {
      filtered = filtered.filter((flight) =>
        selectedAirlines.includes(flight.legs[0].segments[0].airline.caption)
      );
    }

    setAirlineFilrer(filtered);
  }, [
    FLIGHTS,
    selectedAirlines,
    sortByPriceFrom,
    sortByPriceTo,
    sortByPriceAsc,
    sortByPriceDesc,
    sortByDuration,
    direct,
    transfer,
  ]);

  useEffect(() => {
    filterFlightsByAirlines();
  }, [FLIGHTS, selectedAirlines, filterFlightsByAirlines, direct, transfer]);

  useEffect(() => {
    indexFlight > Object.keys(airlineFilrer).length
      ? setIsShowMore(true)
      : setIsShowMore(false);
  }, [indexFlight, airlineFilrer]);

  const handleShowMore = () => {
    setIndexFlight(indexFlight + 2);
  };

  const airlines = [
    ...new Set(
      airlineFilrer.map((flight) => flight.legs[0].segments[0].airline.caption)
    ),
  ];

  return (
    <article className="App">
      <article className="inputsSection">
        <Title text="Сортировать" />
        <RadioBlock
          {...{
            sortByPriceAsc,
            handleSortByPriceAscChange,
            sortByPriceDesc,
            handleSortByPriceDescChange,
            sortByDuration,
            handleSortByDurationChange,
          }}
        />
        <Title text="Фильтровать" />
        <CheckboxBlock
          {...{ direct, transfer, handleDirectChange, handleTransferChange }}
        />
        <Title text="Цена" />
        <InputBlock
          type="number"
          {...{
            setSortByPriceFrom,
            sortByPriceFrom,
            setSortByPriceTo,
            sortByPriceTo,
          }}
        />
        <Title text="Авиакомпании" />
        <section>
          {airlines.map((airline) => (
            <section key={airline}>
              <input
                type="checkbox"
                id={airline}
                value={airline}
                checked={selectedAirlines.includes(airline)}
                onChange={handleCheckboxAirlineChange}
              />
              <Label
                htmlFor={airline}
                labelText={` - ${airline} от ${minPrices[airline]} р.`}
              />
            </section>
          ))}
        </section>
      </article>
      <section className="content">
        <article className="cardsSection">
          {airlineFilrer.slice(0, indexFlight).map((flight, i) => {
            return (
              <section key={i}>
                <FlightСard
                  flight={flight}
                  airline0={flight.legs[0].segments[0].airline.caption}
                  airline1={flight.legs[1].segments[0].airline.caption}
                  price={flight.price.total.amount}
                  departureCity0={
                    flight.legs[0].segments[0].departureCity.caption
                  }
                  departureCity1={
                    flight.legs[1].segments[0].departureCity?.caption
                  }
                  departureAirport0={
                    flight.legs[0].segments[0].departureAirport.caption
                  }
                  departureAirport1={
                    flight.legs[1].segments[0].departureAirport.caption
                  }
                  departureAirportCode0={
                    flight.legs[0].segments[0].departureAirport.uid
                  }
                  departureAirportCode1={
                    flight.legs[1].segments[0].departureAirport?.uid
                  }
                  arrivalCity0={flight.legs[0].segments[0].arrivalCity.caption}
                  arrivalCity1={flight.legs[1].segments[0].arrivalCity.caption}
                  arrivalAirport0={
                    flight.legs[0].segments[0].arrivalAirport.caption
                  }
                  arrivalAirport1={
                    flight.legs[1].segments[0].arrivalAirport.caption
                  }
                  arrivalAirportCode0={
                    flight.legs[0].segments[0].arrivalAirport.uid
                  }
                  arrivalAirportCode1={
                    flight.legs[1].segments[0].arrivalAirport.uid
                  }
                  departureDate0={flight.legs[0].segments[0].departureDate}
                  departureDate1={flight.legs[1].segments[0].departureDate}
                  travelDuration0={flight.legs[0].segments[0].travelDuration}
                  travelDuration1={flight.legs[1].segments[0].travelDuration}
                  arrivalDate0={flight.legs[0].segments[0].arrivalDate}
                  arrivalDate1={flight.legs[1].segments[0].arrivalDate}
                />
              </section>
            );
          })}
        </article>
        {!isShowMore && (
          <button className="btnShowMore" onClick={handleShowMore}>
            Показать еще
          </button>
        )}
      </section>
    </article>
  );
}

export default App;
