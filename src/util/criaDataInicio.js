function criaDataInicio(value) {
 console.log("value ", value);
  if (value === '' || value === undefined) {
    let dataInicio = new Date();
    dataInicio.setUTCDate(1);
    return `${dataInicio.getFullYear()}-${dataInicio.getUTCMonth()}-${dataInicio.getUTCDate()}`;
  }
  const dataInicio = new Date(value);
 console.log("dataInicio ", dataInicio);
  return `${dataInicio.getFullYear()}-${dataInicio.getMonth()}-${dataInicio.getUTCDate()}`;
}
module.exports=criaDataInicio