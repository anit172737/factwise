import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

const defaultValues = {
  gender: "",
  country: "",
  dob: "",
  description: "",
};

const DetailsForm = ({ setOpenEdit, user, age, usersData, setUsersData }) => {
  const [newAge, setNewAge] = useState(age);
  const [newD, setNewD] = useState(user.description);
  const [newCountry, setNewCountry] = useState(user.country);
  const [newGender, setNewGender] = useState(user.gender);

  const {
    reset,
    control,
    setError,
    setValue,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  const handleAgeChange = (e) => {
    setNewAge(e.target.value);
  };

  const handleGenderChange = (e) => {
    setNewGender(e.target.value);
  };

  const handleCountryChange = (e) => {
    setNewCountry(e.target.value);
  };

  const handleDChange = (e) => {
    setNewD(e.target.value);
  };
  const onSubmit = (data) => {
    const modifiedArray = usersData.map((obj) => {
      if (obj.id === data.id) {
        return {
          ...obj,
          gender: data.gender,
          dob: data.dob.toString(),
          country: data.country,
          description: data.description,
        };
      }
      return obj;
    });

    setUsersData(modifiedArray);
    // if(user.id === )
    setOpenEdit(false);
  };

  useEffect(() => {
    setValue("id", user.id);
    setValue("dob", age);
    setValue("gender", user.gender);
    setValue("country", user.country);
    setValue("description", user.description);
  }, [user]);

  const wat = watch("country");
  console.log("wat", wat);
  return (
    <form className="detail" onSubmit={handleSubmit(onSubmit)}>
      <div className="detail_top">
        <div className="detail_top-div">
          <label className="detail_top-div-label">Age</label>
          <Controller
            id="dob"
            name="dob"
            control={control}
            render={({ field }) => (
              <input
                className="detail_top-div-input"
                value={newAge}
                onChange={handleAgeChange}
                {...field}
              />
            )}
          />
        </div>
        <div className="detail_top-div">
          <label className="detail_top-div-label">Gender</label>
          <Controller
            id="gender"
            name="gender"
            control={control}
            render={({ field }) => (
              //   <Select
              //     className="detail_top-div-input"
              //     value={newGender}
              //     onChange={handleGenderChange}
              //     options={genderOptions}
              //     {...field}
              //   />

              <select
                className="detail_top-div-input"
                onChange={(e) => setValue("gender", e.target.value)}
                {...field}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            )}
          />
        </div>
        <div className="detail_top-div">
          <label className="detail_top-div-label">Country</label>
          <Controller
            id="country"
            name="country"
            control={control}
            render={({ field }) => (
              <input
                className="detail_top-div-input"
                value={newCountry}
                onChange={handleCountryChange}
                {...field}
              />
            )}
          />
        </div>
      </div>
      <div className="detail_description">
        <label className="detail_top-div-label">Description</label>
        <Controller
          id="description"
          name="description"
          control={control}
          render={({ field }) => (
            <textarea
              className="detail_top-div-textArea"
              value={newD}
              onChange={handleDChange}
              {...field}
            />
          )}
        />
      </div>
      <div className="detail_icons">
        <button type="submit" className="detail_icons-btn">
          <CheckCircle className="detail_icons-submit" size={26} />
        </button>

        <XCircle
          className="detail_icons-delete"
          size={26}
          onClick={() => setOpenEdit(false)}
        />
      </div>
    </form>
  );
};

export default DetailsForm;
