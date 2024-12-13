// interface Element {
//     id: number;
//     description: string;
//     title: string;
//     type: string;
//   }

function rearrangeElements(elements: any[]): any[] {
  const inputElements: any[] = [];
  const uploadInputElements: any[] = [];

  elements.forEach((element) => {
    if (element.type === "upload input") {
      uploadInputElements.push(element);
    } else {
      inputElements.push(element);
    }
  });

  return [...inputElements, ...uploadInputElements];
}

export { rearrangeElements };
