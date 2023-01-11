function parse(A) {
   console.log("myData", A);
   console.log(A.includes("W2:1"));
   return A;
}

var WIN_ON = [
   {
      _id: "W1",
      Gpio: 17,
      order: 1,
      win: "Side Window",
      open: 0,
      delay: 40,
      state: 1
   },
   {
      _id: "W2",
      Gpio: 12,
      order: 4,
      win: "Front Window",
      open: 0,
      delay: 50,
      state: 0
   },
   {
      _id: "W3",
      Gpio: 12,
      order: 3,
      win: "Front Window",
      open: 0,
      delay: 50,
      state: 1
   }
];

let delayArray = WIN_ON.map((item) => item.delay); // delayArray = [ 10,50 ]
let _idArray = WIN_ON.map((item) => item._id);
let numWindows = _idArray.length;
console.log("Windows : " + _idArray, delayArray, numWindows, "windows");

var MyData = "W1:0 W2:1 W3:1 W4:0 W5:0 PIR:0 DAY:1"
   .replace("W1:0 ", "") // windows 1-5 from server
   .replace("W2:0 ", "")
   .replace("W3:0 ", "")
   .replace("W4:0 ", "")
   .replace("W5:0", "")
   .trim();

MyData = MyData.substr(0, MyData.search("PIR")).trim();
parse(MyData);
