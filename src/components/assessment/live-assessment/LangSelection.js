import React, { useState, useEffect } from "react";
import style from "./LangSelection.module.scss";

import Select from "react-select";
import { useEngine } from "./engine/EngineProvider";

const _ArrLangs = [
  { label: "English", value: "EN" },
  { label: "Hindi", value: "HI" },
  { label: "Malayalam", value: "ML" },
  { label: "Tamil", value: "TA" },
  { label: "Kannada", value: "KN" },
  { label: "Telugu", value: "TE" },
  { label: "Marathi", value: "MR" },
  { label: "Bengali", value: "BN" },
  { label: "Gujarati", value: "GU" },
  { label: "Punjabi", value: "PA" },
  { label: "Odia", value: "OD" },
  { label: "Assamese", value: "AS" },
  { label: "Urdu", value: "UR" },
];

export default function LangSelection() {
  const { state, handleChangeLang } = useEngine();

  const [defaultValue, setDefaultValue] = useState(null);
  useEffect(() => {
    if (!state || !state.settings || !state.settings.language) return;

    setDefaultValue({
      label: _ArrLangs.find((f) => f.value === state.settings.language).label,
      value: state.settings.language,
    });
  }, [state]);

  const [options, setOptions] = useState([]);
  useEffect(() => {
    // const opts = [_ArrLangs[0]];
    const prefLang = state.settings.language;
    const selectedLang = state.settings.selectedLanguage;

    const opts = [{ label: _ArrLangs.find((f) => f.value === prefLang).label, value: prefLang }];
    if (prefLang !== "EN") opts.push({ label: "English", value: "EN" });

    setOptions(opts);
  }, []);

  const colourStyles = {
    container: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: "white !important",
      width: "120px !important",
    }),
    control: (styles, { isFocused }) => ({
      ...styles,
      boxShadow: "unset !important",
      borderColor: "#e6e6e6 !important",
      fontSize: "14px",
      backgroundColor: "white !important",
      borderRadius: "5px",
      width: "120px !important",
      minHeight: "0px",
      height: "32px",
      cursor: "pointer",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected ? "#9558C8" : "white",
        cursor: "pointer",
        width: "120px !important",
        "&:hover": {
          backgroundColor: "#bfa0d9",
        },
      };
    },
    input: (styles) => ({ ...styles, color: "transparent", width: "120px !important" }),
  };

  function handleChangeSelect(e) {
    handleChangeLang(e.value);
  }

  return (
    <div className={style.wrapper}>
      {/* <div className={style.text}>Select Lang</div> */}
      {defaultValue && (
        <Select
          defaultValue={defaultValue}
          options={options}
          styles={colourStyles}
          onChange={handleChangeSelect}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: () => null,
          }}
        />
      )}
    </div>
  );
}
