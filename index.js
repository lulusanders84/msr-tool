const handleSubmitAmounts = (event) => {
  event.preventDefault();
  const allowAmount = new Amount(["allowed", "billed", "listed"]);
    displayHtml("allow", allowAmount.allow);
    displayHtml("name", allowAmount.name)
}

class Amount {
  constructor(namesArr) {
    this.data = this.setData(namesArr)
    const { allowed, billed, listed } = this.data;
    this.allow = this.setAllowAmount(allowed, billed, listed);
    this.name = this.setName(this.data, this.allow);
  }
  setData = (namesArr) => {
    const values = namesArr.map(name => {
      return parseInt($(`#${name}`).val())
    })
    const data = {};
    values.forEach((value, index) => {
      data[namesArr[index]] = value;
    })
    return data;
  }
  setAllowAmount = (allowed, billed, listed) => {
    return allowed > listed && billed > listed 
    ? allowed > billed
    ? billed
    : allowed
    : allowed > billed
      ? allowed
      : billed;
  }
  setName = (data, allow) => {
    return Object.keys(data).reduce((acc, key) => {
     if(data[key] === allow) {
       acc = key;
     }
     return acc;
   }, 0)
   }
}

const displayHtml = (name, value) => {
  $(`#${name}`).html(value)
}