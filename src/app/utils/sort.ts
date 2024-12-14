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
    const fileItems = element.inputs.filter(
      (input: any) => input.type === "file"
    );

    if (fileItems.length > 0) {
      uploadInputElements.push(element);
    } else {
      inputElements.push(element);
    }
  });

  return [...inputElements, ...uploadInputElements];
}

export { rearrangeElements };
