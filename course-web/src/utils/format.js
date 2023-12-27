  
  
  export function dateFormat(row, column, cellValue, index) {
    const daterc = row[column.property];
    return this.$moment(daterc).format("YYYY-MM-DD");      
  }