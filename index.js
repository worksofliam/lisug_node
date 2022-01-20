const express = require('express')
const app = express()

const db = require(`./db`);
const config = require(`./config`);

app.get('/', function (req, res) {
  res.send('Hello LISUG')
})

app.get(`/employee`, async (req, res) => {
  const result = await db.query(`SELECT * FROM SAMPLE.EMPLOYEE`);

  const people = result.map(row => ({
    id: row.EMPNO,
    firstName: row.FIRSTNME,
    lastName: row.LASTNAME,
    job: row.JOB
  }));
  res.json(people);
});

app.get(`/employee/:id`, async (req, res) => {
  const id = req.params.id;

  const [employee, activity] = await Promise.all([
    db.query(`SELECT * FROM SAMPLE.EMPLOYEE WHERE EMPNO = ?`, [id]),
    db.query(`SELECT * FROM SAMPLE.EMPPROJACT WHERE EMPNO = ?`, [id])
  ]);

  if (employee && employee.length === 1) {
    const chosen = employee[0];

    res.json({
      id: chosen.EMPNO,
      firstName: chosen.FIRSTNME,
      lastName: chosen.LASTNAME,
      job: chosen.JOB,
      activity
    });
  } else {
    res.status(404).send(`Employee with id ${id} not found`);
  }
})

async function startup() {
  db.connect(config.connectionString).then(() => {
    app.listen(3000);
  })
}

startup();