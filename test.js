let counter = {
  current: 0,
  increase: function () {
    this.current++;
  },
};

console.log(counter.current); // 0
counter.increase();
console.log(counter.current); // 1

let strVersion=JSON.stringify(counter)

console.log(strVersion)
objVersion=JSON.parse(strVersion)
// objVersion.increase()
console.log(objVersion)
