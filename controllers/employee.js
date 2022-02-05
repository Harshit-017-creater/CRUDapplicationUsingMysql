const express = require("express");
const db = require("../model/connection");
const router = express.Router();

router.get("/showAllEmp", (req, res) => {
	let sql = "SELECT*FROM users";
	db.query(sql, (err, result) => {
		if (err) throw err;
		// res.status(200).json({ result });
		// console.log(result);
		res.render("list", { list: result });
	});
});

router.get("/showSpecificEmp/:id", (req, res) => {
	let id = req.params.id;
	let sql = `SELECT*FROM users WHERE id='${id}'`;
	db.query(sql, (err, result) => {
		if (err) throw err;
		res.status(200).json({ result });
	});
});

router.post("/createEmp", (req, res) => {
	// console.log(req.body);
	const { name, email, pno, password } = req.body;
	const user = { name, email, pno, password };
	let sql = "INSERT INTO users SET ?";
	db.query(sql, user, (err, result) => {
		if (err) throw err;
		// console.log(result);
		// res.status(200).json({ result });
		res.redirect("/updatedata");
	});
});
router.get("/createEmp", (req, res) => {
	res.render("AddEmp", { viewTitle: "Add Emp" });
});
router.get("/updatedata", (req, res) => {
	let sql = "SELECT*FROM users";
	db.query(sql, (err, result) => {
		if (err) throw err;
		res.render("update", { list: result });
	});
});
router.get("/updateEmp/:id", (req, res) => {
	const id = req.params.id;
	let sql = `SELECT * FROM users WHERE id ='${id}'`;
	db.query(sql, (err, result) => {
		if (err) throw err;
		res.render("Edit", { list: result[0], viewTitle: "Update Emp" });
	});
});
router.post("/finalUpdate", (req, res) => {
	const { name, email, pno, password } = { ...req.body };

	let sql = `UPDATE users SET name='${name}',pno='${pno}',password='${password}'WHERE email='${email}'`;
	db.query(sql, (err, result) => {
		if (err) throw err;
		res.redirect("/updatedata");
	});
});
router.get("/deleteEmp/:id", (req, res) => {
	let sql = `DELETE FROM users WHERE id=${req.params.id}`;
	db.query(sql, (err, result) => {
		if (err) throw err;
		res.redirect("/updatedata");
	});
});

module.exports = router;
