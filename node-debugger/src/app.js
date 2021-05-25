const app = require("express")();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const _ = require("underscore");

const users = [{ id: 1, name: "tony" }];

app.use(morgan("dev"));

app.use(bodyParser.json());

app.get("/users", function (req, res) {
  res.send({ success: true, users: users });
});

app.get("/users/:name", function (req, res) {
  const name = req.params.name;

  const user = _.find(users, function (u) {
    return u.name == name;
  });

  const result = user
    ? { success: true, user: user }
    : { success: false, reason: "user not found: " + name };

  res.send(result);
});

app.post("/users", function (req, res) {
  const user = req.body;

  console.log(user);

  if (!user || !user.name) {
    res.send({
      success: false,
      reason: "cannot create user (missing user name)",
    });
    return;
  }

  const existing = _.findWhere(users, { name: user.name });

  if (existing) {
    res.send({
      success: false,
      reason: "user already exists: " + existing.name,
    });
    return;
  }

  users.push(user);
  user.id = users.length;

  res.send({ success: true, user: user });
});

app.put("/users/:name", function (req, res) {
  const name = req.params.name,
    newName = req.body.name;

  const user = _.find(users, function (u) {
    return u.name == name;
  });

  if (user) {
    user.name = newName;
  }

  const result = user
    ? { success: true, user: user }
    : { success: false, reason: "user not found: " + name };

  res.send(result);
});

app.delete("/users/:name", function (req, res) {
  const name = req.params.name;

  const user = _.find(users, function (u) {
    return u.name == name;
  });

  const result = user
    ? { success: true, user: user }
    : { success: false, reason: "user not found: " + name };

  users = _.reject(users, function (u) {
    return u.name == name;
  });

  res.send(result);
});

app.listen(process.env.PORT || 3000);
