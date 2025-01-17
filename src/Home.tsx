import React, { useState } from "react";

const Home = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
  });
  const [tableData, setTableData] = useState([]);
  const [editClick, setEditClick] = useState(false);
  const [editIndex, setEditIndex] = useState("");

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editClick) {
      setTableData((prevTableData) => {
        const updatedData = [...prevTableData];
        updatedData[editIndex] = inputs;
        return updatedData;
      });
      setEditClick(false);
    } else {
      setTableData([...tableData, inputs]);
    }

    setInputs({
      name: "",
      email: "",
    });
  };

  const handleDelete = (index) => {
    const filterData = tableData.filter((item, i) => i !== index);
    setTableData(filterData);
  };

  const handleEdit = (index) => {
    const tempData = tableData[index];

    setInputs({ name: tempData.name, email: tempData.email });
    setEditClick(true);
    setEditIndex(index);
  };

  return (
    <div className="min-h-screen bg-[#004b43]">
      <h1 className="text-center text-5xl">Crud App</h1>
      <div className="bg-[#e5e4e4] max-w-fit m-auto p-12">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label>Name</label>
            <input name="name" value={inputs.name} onChange={handleChange} />
          </div>
          <div className="flex flex-col">
            <label>Email</label>
            <input
              name="email"
              value={inputs.email}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="w-full bg-[#014d64] text-white mt-3">
            {editClick ? "Update" : "Create"}
          </button>
        </form>
      </div>
      <div>
        <table className="w-full text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {tableData.map((item:any, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <button
                    onClick={() => handleEdit(i)}
                    className="mr-3 text-yellow-300"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
