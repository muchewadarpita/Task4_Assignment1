import express from "express";
import mysql from "mysql";
const app = express();
app.use(express.json());

const db1 = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db",
});

app.get("/employee/:id", (req, res) => {
  const empId = req.params.id;
  const q = "SELECT * FROM employee WHERE Emp_NO= ? ";
  //db1.connect();
  db1.query(q, [empId], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/employee", (req, res) => {
  const q = "SELECT * FROM employee";
  //db1.connect();
  db1.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/employee/addemployee", (req, res) => {
  const q =
    "INSERT INTO employee(`Emp_NO`, `Emp_Name`, `Emp_Add`,`Emp_Phone`,`Dept_No`,`Dept_Name`,`Salary`) VALUES (?)";

  const values = [
    req.body.Emp_NO,
    req.body.Emp_Name,
    req.body.Emp_Add,
    req.body.Emp_Phone,
    req.body.Dept_No,
    req.body.Dept_Name,
    req.body.Salary,
  ];
  db1.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    //return res.json(data);
    return res.json("Employee has been created successfully.");
  });
});

app.delete("/employee/delete/:id", (req, res) => {
  const empId = req.params.id;
  const q = " DELETE FROM employee WHERE Emp_NO= ? ";

  db1.query(q, [empId], (err, data) => {
    if (err) return res.send(err);
    //return res.json(data);
    return res.json("Employee has been deleted successfully.");
  });
});

app.put("/employee/update/:id", (req, res) => {
  const empId = req.params.id;
  const q =
    "UPDATE employee SET `Emp_Name`= ?, `Emp_Add`= ?, `Emp_Phone`= ?, `Dept_No`= ? , `Dept_Name`= ?, `Salary`= ?  WHERE Emp_NO= ?";

  const values = [
    req.body.Emp_Name,
    req.body.Emp_Add,
    req.body.Emp_Phone,
    req.body.Dept_No,
    req.body.Dept_Name,
    req.body.Salary,
  ];

  db1.query(q, [...values, empId], (err, data) => {
    if (err) return res.send(err);
    //return res.json(data);
    return res.json("Employee has been updated successfully.");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});
