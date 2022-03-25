import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Graphics from "../graphics/Graphics";
import "react-toastify/dist/ReactToastify.css";
import "./input.scss";

function Input() {
  const [api, setApi] = useState({
    token: "",
    series: "",
    type: "line",
  });
  const [respApi, setRespApi] = useState();
  const [openGraphs, setOpenGraphs] = useState(false);

  const errorIncomplete = () => toast.error("Error, datos incompletos");
  const errorIncorrct = () => toast.error("Error, datos incorrectos");
  const success = () => toast.success("Petición exitosa");

  function getData() {
    if (api.token.length > 1 && api.series.length > 1) {
      fetch(
        `https://5i8qcjp333.execute-api.us-east-1.amazonaws.com/dev/series/${api.series}?token=${api.token}`,
        {
          headers: {
            Authorization:
              "01f04831044f073702d9244604d41c055e7c14bb96218e169926482fb5699788",
          },
        }
      )
        .then((response) => {
          if (response.status === 200) {
            success();
            setOpenGraphs(true);
            return response.json();
          } else {
            errorIncorrct();
          }
        })
        .then((data) => {
          setRespApi(data);
        })
        .catch(() => errorIncorrct());
    } else {
      errorIncomplete();
    }
  }

  const handleSubmit = (e) => {
    getData();
    e.preventDefault();
  };

  const handleInputTokenChange = (event) => {
    setApi({ ...api, token: event.target.value });
  };

  const handleInputSeriesChange = (event) => {
    setApi({ ...api, series: event.target.value });
  };

  const handleInputTypeChange = (event) => {
    setApi({ ...api, type: event.target.value });
  };

  return (
    <>
      <form
        className="container__input"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label>
          Type:
          <select
            value={api.type}
            name="Type"
            id="type"
            onChange={handleInputTypeChange}
          >
            <option value="line">Line</option>
            <option value="column2d">Bar</option>
            <option value="pie2d">Pie</option>
          </select>
        </label>
        <label>
          Token:
          <input
            value={api.token}
            type="text"
            id="token"
            onChange={handleInputTokenChange}
          />
        </label>
        <label>
          Series:
          <input
            value={api.series}
            type="text"
            id="series"
            onChange={handleInputSeriesChange}
          />
        </label>

        <input id="submit" type="submit" value="Fetch" />
        <ToastContainer />
      </form>
      <Graphics
        respApi={respApi}
        openGraphs={openGraphs}
        setOpenGraphs={setOpenGraphs}
        api={api}
      />
    </>
  );
}

export default Input;
