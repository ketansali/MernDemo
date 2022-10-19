import React, { useEffect, useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import {
//   addTechnology,
//   deleteTechnology,
//   getTechnology,
//   updateTechnology,
// } from "../reducers/techReducer";
import {
  addTechnology,
  deleteTechnology,
  getTechnology,
  updateTechnology,
} from "../reducers";
import Model from "../components/Model";
import { useForm } from "react-hook-form";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ReactPaginate from 'react-paginate'
//import { getAllEmployee } from "../reducers/empReducer";
const Technology = () => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const [tech, setTech] = useState("");
  const [techId, setTechId] = useState("");
  const [search, setSearch] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const { data, loading } = useSelector((state) => state.technology);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    dispatch(getTechnology({search : search,pageNo: pageNo}));
    // eslint-disable-next-line
  }, [tech]);
  const handleAdd = (data) => {
    !techId
      ? dispatch(addTechnology(data))
      : dispatch(updateTechnology({ techId, tech }));
    dispatch(getTechnology({search : "",pageNo:pageNo}));
    setModalShow(false);
  };
  const handleDelete = (_id) => {
    dispatch(deleteTechnology(_id));
    dispatch(getTechnology({search : search,pageNo: pageNo}));
  };
  const handleUpdate = (tech) => {
    setTech(tech.title);
    setTechId(tech._id);
    setModalShow(true);
  };
  const handleShow = () => {
    if (techId) {
      setTech("");
      setTechId("");
    }
    setModalShow(true);
  };
  const handlesearch = () => {
    
    dispatch(getTechnology({search : search,pageNo: pageNo}));
  };
  function handlePageClick({ selected: selectedPage }) {
    setPageNo(selectedPage + 1)
   dispatch(getTechnology({search : "",pageNo:selectedPage +1}))
}
  return (
    <Container>
      <div className="d-flex justify-content-between mt-4">
        <div>
          <Button className="ms-auto" onClick={handleShow}>
            Add Teachnology
          </Button>
        </div>
        <div>
          <Form>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
              onKeyUp={handlesearch}
            />
          </Form>
        </div>
      </div>

      <Table responsive striped bordered hover className="mt-3">
        <thead>
          <tr className="text-center">
            <th>#No</th>
            <th>Title</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data?.data &&
            data?.data?.map((tech, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{tech.title}</td>
                <td>
                  <AiOutlineDelete
                    size={30}
                    onClick={() => handleDelete(tech._id)}
                  />
                </td>
                <td>
                  <AiOutlineEdit size={30} onClick={() => handleUpdate(tech)} />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div style={{float:"right"}}>
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        pageCount={data?.pages}
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
        heading={techId ? "Update Technology" : "Add Technology"}
        btntitle={techId ? "Update" : "Save"}
        onSubmit={handleSubmit(handleAdd)}
      >
        <Form className="mt-3" onSubmit={handleSubmit(handleAdd)}>
          <Form.Group className="mb-3 mt-3" controlId="formGroupEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Title"
              {...register("title", {
                required: "title is required",
              })}
              value={tech}
              onChange={(e) => setTech(e.target.value)}
            />
            {errors?.title?.type === "required" && (
              <p className="error">title is required</p>
            )}
          </Form.Group>
        </Form>
      </Model>
    </Container>
  );
};

export default Technology;
