import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { editUser, searchUser } from "../redux/userSlice";
import Select from "react-select";

const defaultValues = {
  gender: "",
  country: "",
  dob: "",
  description: "",
};

const DetailsForm = ({ setOpenEdit, user, age }) => {
  const { userList, searchList } = useSelector((state) => state.userMaster);
  const [newAge, setNewAge] = useState(age);
  const [newD, setNewD] = useState(user.description);
  const [newCountry, setNewCountry] = useState(user.country);
  const [newGender, setNewGender] = useState(user.gender);
  const dispatch = useDispatch();

  const {
    control,
    setValue,
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

  const handleCountryChange = (e) => {
    setNewCountry(e.target.value);
  };

  const handleDChange = (e) => {
    setNewD(e.target.value);
  };
  const onSubmit = (data) => {
    const modifiedArray = userList.map((obj) => {
      if (obj.id === data.id) {
        return {
          ...obj,
          gender: data.gender.value,
          dob: data.dob.toString(),
          country: data.country,
          description: data.description,
        };
      }
      return obj;
    });

    dispatch(editUser(modifiedArray));

    if (searchList.length !== 0) {
      const modifiedArray = searchList.map((obj) => {
        if (obj.id === data.id) {
          return {
            ...obj,
            gender: data.gender.value,
            dob: data.dob.toString(),
            country: data.country,
            description: data.description,
          };
        }
        return obj;
      });

      dispatch(searchUser(modifiedArray));
    }
    toast.success("User Edited Successfully");
    setOpenEdit(false);
  };

  useEffect(() => {
    setValue("id", user.id);
    setValue("dob", age);
    setValue("gender", {
      label: user.gender,
      value: user.gender,
    });
    setValue("country", user.country);
    setValue("description", user.description);
  }, [user]);

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
              <Select
                // className="detail_top-div-input"
                // value={newGender}
                // onChange={handleGenderChange}
                options={genderOptions}
                {...field}
              />

              //   <select
              //     className="detail_top-div-input"
              //     onChange={handleGenderChange}
              //     value={newGender.value}
              //     {...field}
              //   >
              //     <option value="Male">Male</option>
              //     <option value="Female">Female</option>
              //   </select>
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
        <XCircle
          className="detail_icons-delete"
          size={26}
          onClick={() => setOpenEdit(false)}
        />
        <button type="submit" className="detail_icons-btn">
          <CheckCircle className="detail_icons-submit" size={26} />
        </button>
      </div>
    </form>
  );
};

export default DetailsForm;
