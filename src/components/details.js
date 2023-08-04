import React, { useEffect, useState } from "react";
import "../sass/details.scss";
import { Edit, Trash2 } from "react-feather";
import DetailsForm from "./detailsForm";
import DeleteForm from "./deleteForm";
import mainData from "../users.json";
import { useDispatch, useSelector } from "react-redux";
import { deleteUSer, searchUser } from "../redux/userSlice";
import toast from "react-hot-toast";

const Details = ({ user }) => {
  const { userList } = useSelector((state) => state.userMaster);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const dispatch = useDispatch();
  const calculateAge = (dateOfBirth) => {
    const currentDate = new Date();
    const dob = new Date(dateOfBirth);

    // Calculate the difference between the current date and the date of birth
    let ageDiff = currentDate - dob;

    // Convert the age difference from milliseconds to years
    let ageDate = new Date(ageDiff);
    let age = Math.abs(ageDate.getUTCFullYear() - 1970);

    return age;
  };

  let dob = user.dob;
  const age = dob?.includes("-") ? calculateAge(user.dob) : dob;

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    const arr = await userList.filter((e) => e.id !== user.id);
    dispatch(deleteUSer(arr));

    toast.success("Contact Deleted Successfully");
    setOpenDelete(false);
  };
  return (
    <>
      {openDelete && (
        <DeleteForm setOpenDelete={setOpenDelete} handleDelete={handleDelete} />
      )}
      {openEdit ? (
        <DetailsForm setOpenEdit={setOpenEdit} user={user} age={age} />
      ) : (
        <div className="detail">
          <div className="detail_top">
            <div className="detail_top-div">
              <label className="detail_top-div-label">Age</label>
              <p className="detail_top-div-p">{age} Years</p>
            </div>
            <div className="detail_top-div">
              <label className="detail_top-div-label">Gender</label>
              <p className="detail_top-div-p">{user.gender}</p>
            </div>
            <div className="detail_top-div">
              <label className="detail_top-div-label">Country</label>
              <p className="detail_top-div-p">{user.country}</p>
            </div>
          </div>
          <div className="detail_description">
            <label className="detail_top-div-label">Description</label>
            <p className="detail_top-div-description">{user.description}</p>
          </div>
          <div className="detail_icons">
            <Trash2
              className="detail_icons-delete"
              size={26}
              onClick={handleOpenDelete}
            />
            <Edit
              className="detail_icons-edit"
              size={26}
              onClick={handleOpenEdit}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
