function handleSubmitAmounts(event) {
  event.preventDefault();
  const allowAmount = Amount(["allowed", "billed", "listed"]);
    displayHtml("allow", "$" + allowAmount.allow);
    displayHtml("name", allowAmount.name)
}
function Amount(namesArr) {
  this.data = this.setData(namesArr)
  const allowed = this.data.allowed;
  const billed = this.data.billed;
  const listed = this.data.listed;
  this.allow = this.setAllowAmount(allowed, billed, listed);
  this.name = this.setName(this.data, this.allow);
}
Amount.prototype.setData = function(namesArr) {
  const values = namesArr.map(function(name) {
    return parseInt($("#" + name).val())
  })
  const data = {};
  values.forEach(function(value, index) {
    data[namesArr[index]] = value;
  })
  return data;
}
Amount.prototype.setAllowAmount = function(allowed, billed, listed) {
  return allowed > listed && billed > listed 
  ? allowed > billed
  ? billed
  : allowed
  : allowed > billed
    ? allowed
    : billed;
}
Amount.prototype.setName = function(data, allow) {
  return Object.keys(data).reduce(function(acc, key) {
    if(data[key] === allow) {
      acc = key;
    }
    return acc;
  }, 0)
}
function displayHtml(name, value) {
  $("#" + name).html(value)
}