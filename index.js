function handleSubmitAmounts(event) {
  event.preventDefault();
  var allowAmount = Amount(["allowed", "billed", "listed"]);
    displayHtml("allow", "$" + allowAmount.allow);
    displayHtml("name", allowAmount.name)
}
function Amount(namesArr) {
  var data = setData(namesArr)
  var allowed = data.allowed;
  var billed = data.billed;
  var listed = data.listed;
  var allow = setAllowAmount(allowed, billed, listed);
  var name = setName(data, allow);
  return {name, allow,};
}
function setData(namesArr) {
  var values = namesArr.map(function(name) {
    return parseInt($("#" + name).val())
  })
  var data = {};
  values.forEach(function(value, index) {
    data[namesArr[index]] = value;
  })
  return data;
}
function setAllowAmount(allowed, billed, listed) {
  return billed < listed 
  ? allowed / 2 > billed
  ? billed
  : allowed
  : allowed > billed
    ? billed
    : allowed;
}
function setName(data, allow) {
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