import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";

const FlightСard = ({
  flight,
  airline0,
  airline1,
  price,
  departureCity0,
  departureCity1,
  departureAirport0,
  departureAirport1,
  departureAirportCode0,
  departureAirportCode1,
  arrivalCity0,
  arrivalCity1,
  arrivalAirport0,
  arrivalAirport1,
  arrivalAirportCode0,
  arrivalAirportCode1,
  departureDate0,
  departureDate1,
  travelDuration0,
  travelDuration1,
  arrivalDate0,
  arrivalDate1,
}) => {
  const formatedTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const formatedDate = (dateFlight) => {
    const date = new Date(dateFlight);
    const day = date.getDate();
    const monthNames = [
      "янв.",
      "фев.",
      "мар.",
      "апр.",
      "мая",
      "июн.",
      "июл.",
      "авг.",
      "сен.",
      "окт.",
      "нояб.",
      "дек.",
    ];
    const monthIndex = date.getMonth();
    const dayNames = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
    const dayOfWeekIndex = date.getDay();
    return `${day} ${monthNames[monthIndex]} ${dayNames[dayOfWeekIndex]}`;
  };

  const formatedTimeTravelDuration = (seconds) => {
    const hours = Math.floor(seconds / 60);
    const minutes = Math.floor(seconds % 60);
    return `${hours.toString()} ч ${minutes.toString().padStart(2, "0")} мин`;
  };

  return (
    <section className="cardBlock">
      <section className="airline">
        <section className="airline__logo">{airline0}</section>
        <section className="airline__priceBlock">
          <section className="airline__priceBlock__price">{price} ₽</section>
          <section className="airline__priceBlock__text">
            Стоимость для одного взрослого пассажира
          </section>
        </section>
      </section>
      <section className="there">
        <section className="there__info">
          {departureCity0}, {departureAirport0}{" "}
          <span className="colorBlue">({departureAirportCode0}) &#8594; </span>
          {arrivalCity0}, {arrivalAirport0}{" "}
          <span className="colorBlue">({arrivalAirportCode0})</span>
        </section>

        <hr className="hrInfo" />

        <section className="there__time">
          <p>
            {formatedTime(departureDate0)}{" "}
            <span className="colorBlue">{formatedDate(departureDate0)}</span>
          </p>
          <p className="clockP"><AiOutlineClockCircle/> {formatedTimeTravelDuration(travelDuration0)}</p>
          <p>
            <span className="colorBlue">{formatedDate(arrivalDate0)}</span>{" "}
            {formatedTime(arrivalDate0)}
          </p>
        </section>

        {flight.legs[0].segments[1] ? (
          <section className="transferBlock">
            <hr className="hrTransfer" />
            <p> 1 пересадка</p>
            <hr className="hrTransfer" />
          </section>
        ) : (
          <hr className="hrNotTransfer" />
        )}
        <section className="there__airline">Рейс выполняет: {airline0}</section>
      </section>

      <hr className="betweenCard " />

      <section className="back">
        <section className="back__info">
          {departureCity1}, {departureAirport1}{" "}
          <span className="colorBlue">({departureAirportCode1}) &#8594; </span>
          {arrivalCity1}, {arrivalAirport1}{" "}
          <span className="colorBlue">({arrivalAirportCode1})</span>
        </section>

        <hr className="hrInfo" />

        <section className="back__time">
          <p>
            {formatedTime(departureDate1)}{" "}
            <span className="colorBlue">{formatedDate(departureDate1)}</span>
          </p>
          <p className="clockP"><AiOutlineClockCircle/> {formatedTimeTravelDuration(travelDuration1)}</p>
          <p>
            <span className="colorBlue">{formatedDate(arrivalDate1)}</span>{" "}
            {formatedTime(arrivalDate1)}
          </p>
        </section>

        {flight.legs[1].segments[1] ? (
          <section className="transferBlock">
            <hr className="hrTransfer" />
            <p> 1 пересадка</p>
            <hr className="hrTransfer" />
          </section>
        ) : (
          <hr className="hrNotTransfer" />
        )}

        <section className="back__airline">Рейс выполняет: {airline1}</section>
      </section>
      <button className="btnCard">ВЫБРАТЬ</button>
    </section>
  );
};

export default FlightСard;
