export function valueStyle(value: number) {
  if (value === 0) {
    return {
      color: ""
    };
  } else if (value > 0) {
    return {
      color: "#df1050"
    };
  } else {
    return {
      color: "#04f49b"
    };
  }
}


export function rankStyle(index: number) {
  switch (index) {
    case 0:
      return ["#2b2611", "#d8bd14", "#595014"];
    case 1:
      return ["#112123", "#13a8a8", "#144848"];
    case 2:
      return ["#2b2111", "#d89614", "#594214"];
    default:
      return ["", "", ""];

  }
}
