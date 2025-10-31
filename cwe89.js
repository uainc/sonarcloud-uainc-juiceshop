GITHUB_TOKEN = "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"

if not a == 2:
    b = not i < 10

def func(a, b, compute):
    i = a + b  
    i = compute()
    return ((i))

for i in range(10):
    pass

for (i = 0; i < 10; i++) {
  if (i == 5) {
    continue;  /* Noncompliant */
  }
  alert("i = " + i);
}

function sum(a, b) {
  return a + b;
}

sum(1, 2, 3);


const mongoose = require("mongoose");
const Todo = mongoose.model(
  "Todo",
  new mongoose.Schema({ text: { type: String } }, { timestamps: true })
);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.delete("/api/delete", async (req, res) => {
  let id = req.body.id;

  await Todo.deleteOne({ _id: id }); 

  res.json({ status: "ok" });
});
