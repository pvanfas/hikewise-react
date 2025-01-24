import React, { useState, useEffect } from "react";
import style from "./Trainers.module.scss";

import { getRequest } from "utils/api";
import { splitArrChunks } from "utils/helper";

export default function Trainers({ apiUrl }) {
  const [trainersAll, setTrainersAll] = useState([]);
  const [trainersFiltered, setTrainersFiltered] = useState([]);

  const [trainersSplit4, setTrainersSplit4] = useState([]);

  const [searchString, setSearchString] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  function handleChangeSearch(e) {
    const { value } = e.target;
    setSearchString(value);
  }

  function filterExperts() {
    if (!searchString) return;

    let filterThem = trainersAll.filter((expert) =>
      expert.name.toLowerCase().includes(searchString.toLowerCase().trim())
    );
    setTrainersFiltered(filterThem);
  }

  function getTrainers() {
    setIsLoading(true);
    getRequest(apiUrl)
      .then((resp) => {
        setTrainersAll(resp.data);
        setTrainersFiltered(resp.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setTrainersSplit4(splitArrChunks(trainersFiltered, 4));
  }, [filterExperts]);

  useEffect(() => {
    filterExperts();
  }, [searchString]);

  useEffect(() => {
    getTrainers();
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.searchBar}>
        <form onChange={handleChangeSearch}>
          <div>
            <input type="text" name="searchBar" placeholder="Search name" />
          </div>
        </form>
      </div>

      <section>
        {trainersFiltered.map((trainer) => (
          <article>
            <div className={style.image}>
              <img src={trainer.photo} alt="" />
            </div>
            <div className={style.name}>{trainer.name}</div>
          </article>
        ))}
      </section>
    </div>
  );
}
