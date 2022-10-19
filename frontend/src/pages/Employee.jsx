import React, { useEffect, useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Model from "../components/Model";
import {
  addEmployee,
  deleteEmployee,
  getAllEmployee,
  updateEmployee,
} from "../reducers/empReducer";
import { useForm } from "react-hook-form";
import { components } from "react-select";
import { default as ReactSelect } from "react-select";
import { getTechnology } from "../reducers/techReducer";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from 'react-paginate'
const Employee = () => {
  const dispatch = useDispatch();
  const { employee, technology } = useSelector((state) => state);
  const [modalShow, setModalShow] = React.useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [designation, setdesignation] = useState("");
  const [contact, setcontact] = useState("");
  const [gender, setgender] = useState("");
  const [empId, setempId] = useState("");
  const [tech, settech] = useState([]);
  const [optionSelected, setoptionSelected] = useState([]);
  const [ddloption, setddloption] = useState([]);
  const [search, setSearch] = useState("");
  const [pageNo, setPageNo] = useState(1);
  
  useEffect(() => {
    
    dispatch(getAllEmployee({search : search,pageNo: pageNo}));
    dispatch(getTechnology({search : search,pageNo: pageNo}));
    settech(technology?.data?.data);
    // eslint-disable-next-line
  }, [tech, ddloption]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddAndUpdate = (data) => {
    
    if (!empId) {
      const tech_id = optionSelected.map((e) => e.value);
      data["technology"] = tech_id;
      dispatch(addEmployee(data));
      //dispatch(getAllEmployee());
      //dispatch(getTechnology());
     // settech(technology.data);
    } else {
      const tech_id = optionSelected.map((e) => e.value);
      data["technology"] = tech_id;
      dispatch(updateEmployee({empId,data}));
      //dispatch(getAllEmployee());
      //dispatch(getTechnology());
      //settech(technology.data);
    }
    //dispatch(getTechnology());
    dispatch(getAllEmployee({search : search,pageNo: pageNo}));
    setModalShow(false);
  };

  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label || props.title}</label>
        </components.Option>
      </div>
    );
  };

  const handleChange = (selected) => {
    setoptionSelected(selected);
  };
  const handleshow = () => {
    setModalShow(true);
    const t = technology.data?.data?.map((e) => {
      return {
        value: e._id,
        label: e.title,
      };
    });

    setddloption(t);
    setfirstName("");
    setlastName("");
    setemail("");
    setcontact("");
    setgender("");
    setdesignation("");
    setoptionSelected([]);
  };
  const handleDelete = (_id) => {
    dispatch(deleteEmployee(_id));
    dispatch(getAllEmployee());
  };
  const handleUpdate = (_id) => {
    const empData = employee.data.data.filter((e) => e._id === _id);
    setempId(_id);
    
    setfirstName(empData[0].firstName);
    setlastName(empData[0].lastName);
    setemail(empData[0].email);
    setcontact(empData[0].contact);
     setgender(empData[0].gender);
    setdesignation(empData[0].designation);
    const tt = empData[0].technology?.map((e) => {
      return {
        value: e._id,
        label: e.title,
      };
    });
    console.log({ gender });
    setoptionSelected(tt);
    const t = technology.data?.map((e) => {
      return {
        value: e._id,
        label: e.title,
      };
    });

    setddloption(t);
    setModalShow(true);
  };
  const handlesearch = ()=>{
    
    dispatch(getAllEmployee({search : search,pageNo: pageNo}))
  }
  function handlePageClick({ selected: selectedPage }) {
    setPageNo(selectedPage + 1)
    dispatch(getAllEmployee({search : "",pageNo:selectedPage +1}))
 }
  return (
    <Container>
      <div className="d-flex justify-content-between mt-4">
        <div>
        <Button className="ms-auto" onClick={handleshow}>
          Add Employee
        </Button>
        </div>
        <div>
        <Form >
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={(e)=>setSearch(e.target.value)}
            onKeyUp={handlesearch}
          />
        </Form>
        </div>
      </div>
      <Table responsive striped bordered hover className="mt-3">
        <thead>
          <tr className="text-center">
            <th>#No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>email</th>
            <th>designation</th>
            <th>contact</th>
            <th>gender</th>
            <th>technology</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {employee?.data?.data &&
            employee?.data?.data?.map((emp, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.email}</td>
                <td>{emp.designation}</td>
                <td>{emp.contact}</td>
                <td>{emp.gender}</td>
                <td>
                  {emp?.technology &&
                    emp?.technology.map((tech) => tech.title).join(", ")}
                </td>
                <td>
                  <AiOutlineDelete
                    size={30}
                    onClick={() => handleDelete(emp._id)}
                  />
                </td>
                <td>
                  <AiOutlineEdit
                    size={30}
                    onClick={() => handleUpdate(emp._id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div style={{float:"right"}}>
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={employee?.data?.pages}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        activeClassName="active"
        
      />
      </div>
      <Model
        show={modalShow}
        onHide={() => setModalShow(false)}
        heading={empId ? "Update Employee" : "Add Employee"}
        btntitle={empId ? "Update" : "Save"}
        onSubmit={handleSubmit(handleAddAndUpdate)}
      >
        <Form className="mt-3" onSubmit={handleSubmit(handleAddAndUpdate)}>
          <Form.Group className="mb-3 mt-3" controlId="formGroupEmail">
            <Form.Label>firstName</Form.Label>
            <Form.Control
              placeholder="Enter firstName"
              {...register("firstName", {
                required: "firstName is required",
              })}
              value={firstName}
              onChange={(e)=>setfirstName(e.target.value)}
            />
            {errors?.firstName?.type === "required" && (
              <p className="error">firstName is required</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3 mt-3" controlId="formGroupEmail">
            <Form.Label>lastName</Form.Label>
            <Form.Control
              placeholder="Enter lastName"
              {...register("lastName", {
                required: "lastName is required",
              })}
              value={lastName}
              onChange={(e)=>setlastName(e.target.value)}
            />
            {errors?.lastName?.type === "required" && (
              <p className="error">lastName is required</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3 mt-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              placeholder="Enter Email"
              {...register("email", {
                required: "email is required",
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
              value={email}
              onChange={(e)=>setemail(e.target.value)}
            />
            {errors?.email?.type === "required" && (
              <p className="error">Email is required</p>
            )}
            {errors?.email?.type === "pattern" && (
              <p className="error">Please enter a valid email</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupdesignation">
            <Form.Label>Designation</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Designation"
              {...register("designation", { required: true })}
              value={designation}
              onChange={(e)=>setdesignation(e.target.value)}
            />
            {errors?.password?.type === "required" && (
              <p className="error">Designation is required</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupdesignation">
            <Form.Label>contact</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter contact"
              {...register("contact", { required: true })}
              value={contact}
              onChange={(e)=>setcontact(e.target.value)}
            />
            {errors?.password?.type === "required" && (
              <p className="error">contact is required</p>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupdesignation">
            <Form.Label>Gender</Form.Label>
            <Form.Check
              inline
              label="Male"
              name="gender"
              type={"radio"}
              id={`inline-${"radio"}-1`}
              className="mx-2"
              value="Male"
              defaultChecked={"Male" === gender}
              onChange={(e) => setgender(e.target.value)}
              {...register("gender")}
            />
            <Form.Check
              inline
              label="Female"
              name="gender"
              type={"radio"}
              id={`inline-${"radio"}-2`}
              value="Female"
              defaultChecked={"Female" === gender}
              onChange={(e) => setgender(e.target.value)}
              {...register("gender")}
            />
          </Form.Group>

          <ReactSelect
            options={ddloption}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{
              Option,
            }}
            onChange={handleChange}
            allowSelectAll={true}
            value={optionSelected}
          />
        </Form>
      </Model>
    </Container>
  );
};

export default Employee;
